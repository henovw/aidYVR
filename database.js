import pkg from 'pg';
import cors from 'cors';
import express from 'express';

const { Client } = pkg;


const app = express();
app.use(cors());
app.use(express.json());

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 54321,
    password: "2545",
    database: "postgres"
})

await client.connect()

app.get("/api/charities", async (req, res) => {
    try {
        const result = await client.query(`Select * from charity`)
        res.json(result.rows)
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
})

app.listen(2000, () => console.log("API server running on port 2000"))