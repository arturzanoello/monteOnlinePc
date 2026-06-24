import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const targetUrl = searchParams.get('url');

  if (!targetUrl) {
    return NextResponse.json({ error: 'URL da peça é obrigatória' }, { status: 400 });
  }

  try {
    // 1. O servidor faz o fetch da página do produto (meupc.net, etc.)
    const response = await fetch(targetUrl, {
      headers: {
        // Disfarça a requisição como um navegador comum para evitar bloqueios
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    
    const html = await response.text();
    
    // 2. Carrega o HTML no Cheerio
    const $ = cheerio.load(html);

    // 3. Tenta extrair a imagem da metatag Open Graph (Padrão Ouro)
    let imageUrl = $('meta[property="og:image"]').attr('content');

    // 4. Fallback: Se não achar a tag OG, tenta buscar a primeira imagem relevante
    if (!imageUrl) {
       imageUrl = $('img').first().attr('src'); 
    }

    // Retorna a URL encontrada
    return NextResponse.json({ imageUrl });

  } catch (error) {
    console.error("Erro no scraping:", error);
    return NextResponse.json({ error: 'Falha ao buscar a imagem' }, { status: 500 });
  }
}
