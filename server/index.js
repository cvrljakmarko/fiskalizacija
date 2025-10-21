const express = require('express')
const path = require('path')
const fs = require('fs')
const cors = require('cors')

const app = express()
const PORT = 3000

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: false
}))
app.use(express.json())

// --- Mock auth state (in-memory) ---
const users = [
    {
        id: 'u1',
        email: 'demo@example.com',
        name: 'Demo User',
        // DO NOT use plaintext in real apps; this is a mock only
        password: 'password'
    }
]
// token -> userId
const activeTokens = new Map()

function generateToken(userId) {
    const raw = `${userId}:${Date.now()}:${Math.random().toString(36).slice(2)}`
    return Buffer.from(raw).toString('base64url')
}

function findUserByCredentials(email, password) {
    return users.find(
        (u) => String(u.email).toLowerCase() === String(email).toLowerCase() && u.password === password
    )
}

function sanitizeUser(user) {
    if (!user) return null
    const { password, ...safe } = user
    return safe
}

function requireAuth(req, res, next) {
    const auth = req.headers['authorization'] || ''
    if (!auth.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized' })
    }
    const token = auth.slice('Bearer '.length)
    const userId = activeTokens.get(token)
    if (!userId) {
        return res.status(401).json({ error: 'Invalid token' })
    }
    const user = users.find((u) => u.id === userId)
    if (!user) {
        return res.status(401).json({ error: 'Unknown user' })
    }
    req.user = sanitizeUser(user)
    req.token = token
    next()
}

// --- Auth routes ---
app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body || {}
    const user = findUserByCredentials(email, password)
    if (!user) return res.status(401).json({ error: 'Invalid credentials' })
    const token = generateToken(user.id)
    activeTokens.set(token, user.id)
    return res.json({ token, user: sanitizeUser(user) })
})

app.post('/api/auth/logout', requireAuth, (req, res) => {
    if (req.token) activeTokens.delete(req.token)
    return res.status(204).send()
})

app.get('/api/auth/me', requireAuth, (req, res) => {
    return res.json({ user: req.user })
})

// --- Helpers for ID policy ---
const toNumber = (idStr) => {
    // handles "0027" -> 27 (and tolerates non-digits if any)
    const n = parseInt(String(idStr).replace(/\D/g, ''), 10)
    return Number.isFinite(n) ? n : 0
}
const toId = (n) => String(n).padStart(4, '0')

// --- Load once into memory ---
function loadInitialTariffs() {
    const file = path.join(__dirname, 'data/articles.json')
    const raw = fs.readFileSync(file, 'utf-8')
    return JSON.parse(raw)
}

let tariffs = loadInitialTariffs()

// Compute next number from current max
let nextSeq = tariffs.reduce((max, t) => Math.max(max, toNumber(t.id)), 0) + 1

// --- Routes ---

// READ (all)
app.get('/api/articles', requireAuth, (req, res) => {
    res.json(tariffs)
})

// READ (by id)
app.get('/api/articles/:id', requireAuth, (req, res) => {
    const t = tariffs.find(x => String(x.id) === String(req.params.id))
    if (!t) return res.status(404).json({ error: 'Tariff not found' })
    res.json(t)
})

// CREATE (auto-assign ID, in-memory only)
app.post('/api/articles', requireAuth, (req, res) => {
    const { name, price } = req.body || {}

    if (!name || typeof price !== 'number') {
        return res.status(400).json({ error: 'name and numeric price are required' })
    }

    const id = toId(nextSeq++)
    const newTariff = { id, name, price }

    tariffs.push(newTariff)
    // NOTE: in-memory only. If you want simple persistence later:
    // fs.writeFileSync(path.join(__dirname, 'data/tariffs.json'), JSON.stringify(tariffs, null, 2))

    res.status(201).json(newTariff)
})

app.put('/api/articles/:id', requireAuth, (req, res) => {
    const id = String(req.params.id)
    const { name, price } = req.body || {}
    if (!name || typeof price !== 'number') {
        return res.status(400).json({ error: 'name and numeric price are required' })
    }
    const i = tariffs.findIndex(t => String(t.id) === id)
    if (i === -1) return res.status(404).json({ error: 'Tariff not found' })
    tariffs[i] = { ...tariffs[i], name: String(name).trim(), price: Number(price) }
    return res.json(tariffs[i])
})

app.patch('/api/articles/:id', requireAuth, (req, res) => {
    const id = String(req.params.id)
    const i = tariffs.findIndex(t => String(t.id) === id)
    if (i === -1) return res.status(404).json({ error: 'Tariff not found' })
    const next = { ...tariffs[i] }
    if (typeof req.body?.name === 'string') next.name = req.body.name.trim()
    if (typeof req.body?.price === 'number') next.price = req.body.price
    tariffs[i] = next
    return res.json(tariffs[i])
})

app.delete('/api/articles/:id', requireAuth, (req, res) => {
    const id = String(req.params.id)
    const i = tariffs.findIndex(t => String(t.id) === id)
    if (i === -1) return res.status(404).json({ error: 'Tariff not found' })

    tariffs.splice(i, 1)

    // If you want simple persistence later:
    // fs.writeFileSync(path.join(__dirname, 'data/tariffs.json'), JSON.stringify(tariffs, null, 2))

    return res.status(204).send()
})


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})
