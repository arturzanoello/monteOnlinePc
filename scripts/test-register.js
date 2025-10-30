// Node test script to insert a user into the `usuario` table via Supabase REST API.
// Usage (bash):
// EXPO_PUBLIC_SUPABASE_URL="https://xyz.supabase.co" \
// EXPO_PUBLIC_SUPABASE_KEY="your-anon-or-service-key" \
// node scripts/test-register.js user@example.com mypassword

const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL
const SUPABASE_KEY = process.env.EXPO_PUBLIC_SUPABASE_KEY
const login = process.argv[2] || `test-${Date.now()}@example.com`
const senha = process.argv[3] || 'password123'

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('ERROR: set EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_KEY')
  process.exit(1)
}

const url = `${SUPABASE_URL.replace(/\/+$/, '')}/rest/v1/usuario`

async function run() {
  const body = [{ login, senha }]
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'return=representation'
    },
    body: JSON.stringify(body)
  })

  const text = await res.text()
  try {
    console.log('Status:', res.status)
    console.log(JSON.parse(text))
  } catch (e) {
    console.log('Response:', text)
  }
}

run().catch(err => {
  console.error('Request failed:', err)
  process.exit(1)
})
