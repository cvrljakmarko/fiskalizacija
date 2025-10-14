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

// --- Helpers for ID policy ---
const toNumber = (idStr) => {
    // handles "0027" -> 27 (and tolerates non-digits if any)
    const n = parseInt(String(idStr).replace(/\D/g, ''), 10)
    return Number.isFinite(n) ? n : 0
}
const toId = (n) => String(n).padStart(4, '0')

// --- Load once into memory ---
function loadInitialTariffs() {
    const file = path.join(__dirname, 'data/tariffs.json')
    const raw = fs.readFileSync(file, 'utf-8')
    return JSON.parse(raw)
}

let tariffs = loadInitialTariffs()

// Compute next number from current max
let nextSeq = tariffs.reduce((max, t) => Math.max(max, toNumber(t.id)), 0) + 1

// --- Routes ---

// READ (all)
app.get('/api/tariffs', (req, res) => {
    res.json(tariffs)
})

// READ (by id)
app.get('/api/tariffs/:id', (req, res) => {
    const t = tariffs.find(x => String(x.id) === String(req.params.id))
    if (!t) return res.status(404).json({ error: 'Tariff not found' })
    res.json(t)
})

// CREATE (auto-assign ID, in-memory only)
app.post('/api/tariffs', (req, res) => {
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

app.put('/api/tariffs/:id', (req, res) => {
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

app.patch('/api/tariffs/:id', (req, res) => {
    const id = String(req.params.id)
    const i = tariffs.findIndex(t => String(t.id) === id)
    if (i === -1) return res.status(404).json({ error: 'Tariff not found' })
    const next = { ...tariffs[i] }
    if (typeof req.body?.name === 'string') next.name = req.body.name.trim()
    if (typeof req.body?.price === 'number') next.price = req.body.price
    tariffs[i] = next
    return res.json(tariffs[i])
})

app.delete('/api/tariffs/:id', (req, res) => {
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
