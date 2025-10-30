const fetch = require('node-fetch'); 
const cheerio = require('cheerio');
const pRetry = require('p-retry');
const PQueue = require('p-queue').default;
const { CookieJar } = require('tough-cookie');
const { URL } = require('url');

function _pick(arr){ return arr[Math.floor(Math.random()*arr.length)]; }
function _sleep(ms){ return new Promise(r=>setTimeout(r,ms)); }
function _randBetween(a,b){ return Math.floor(Math.random()*(b-a+1))+a; }
function _log(...args){ if(__confuso.verbose) console.log('[~]',...args); }

const jar = new CookieJar();

async function _fetchy(rawUrl, opts={}) {
  const url = String(rawUrl);
  const ua = opts.userAgent||_pick(__confuso.userAgentPool);
  const headers = Object.assign({
    'user-agent': ua,
    'accept': __confuso.accept,
    'accept-language': 'en-US,en;q=0.9'
  }, opts.headers||{});

  const cookieString = await new Promise((res, rej) => jar.getCookieString(url, (err, c) => err?rej(err):res(c)));
  if (cookieString) headers['cookie'] = cookieString;

  return pRetry(async () => {
    _log('fetching', url);
    const ctl = new AbortController();
    const t = setTimeout(()=>ctl.abort(), __confuso.timeoutMs);
    let res;
    try {
      res = await fetch(url, {
        method: opts.method||'GET',
        headers,
        redirect: 'follow',
        signal: ctl.signal,
      });
    } finally { clearTimeout(t); }

    const setCookies = res.headers.raw()['set-cookie'];
    if (Array.isArray(setCookies)) {
      await Promise.all(setCookies.map(c => new Promise((resolve)=>jar.setCookie(c, url, {}, ()=>resolve()))));
    }

    if (!res.ok) {
      const err = new Error(`HTTP ${res.status} for ${url}`);
      err.code = res.status;
      throw err;
    }
    const text = await res.text();
    return { text, headers: res.headers, url: res.url };
  }, { retries: __confuso.maxRetries, onFailedAttempt: e => _log('attempt failed:', e.message) });
}

async function _crawlSeed(seedUrl, opts={}) {
  const seen = new Set();
  const q = new PQueue({ concurrency: __confuso.concurrency });
  const results = [];

  async function _process(u, depth = 0) {
    if (seen.has(u) || seen.size > 5000) return;
    seen.add(u);
    _log('=> queueing', u, 'depth', depth, 'seen', seen.size);

    q.add(async () => {
      const delay = _randBetween(__confuso.politeDelayMin, __confuso.politeDelayMax);
      _log('sleeping', delay, 'ms before', u);
      await _sleep(delay);

      try {
        const { text, url: finalUrl } = await _fetchy(u);
        const doc = _mkDoc(text, finalUrl);

        const title = doc.title();
        const h1s = doc.$('h1').map((i,e)=>doc.$(e).text()).get();
        const paragraphs = doc.$('p').map((i,e)=>doc.$(e).text()).get().slice(0,6);
        const finding = {
          url: finalUrl,
          title,
          h1s,
          excerpt: paragraphs.filter(Boolean).join(' | '),
          timestamp: (new Date()).toISOString()
        };
        results.push(finding);
        _log('scraped', finalUrl, 'title:', title || '(no title)');

        const links = doc.links();
        const baseHost = (new URL(seedUrl)).host;
        const exploration = links
          .filter(l => {
            try {
              const u2 = new URL(l);
              const ok = u2.protocol.startsWith('http') && (u2.host === baseHost || u2.pathname.length < 120);
              return ok && !l.match(/\.(jpg|jpeg|png|pdf|svg|zip|mp4|mp3)(\?|$)/i);
            } catch(e){ return false; }
          })
          .sort(()=>Math.random()-0.5)
          .slice(0, 6);

        _log('found', exploration.length, 'candidates from', finalUrl);
        for (const l of exploration) {
          if (!seen.has(l)) await _process(l, depth+1);
        }

      } catch (err) {
        _log('failed to fetch/process', u, '->', err && err.message);
      }
    });
  }

  await _process(seedUrl, 0);

  await q.onIdle();
  return results;
}

