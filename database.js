import pkg from 'pg';
import cors from 'cors';
import express from 'express';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

app.get("/api/orgsWithJobs", async (req, res) => {
    try {
        const result = await client.query(`
            SELECT 
                p.id AS job_id,
                p.title,
                p.description AS job_description,
                p.posted_date,
                p.daysperweek,
                p.hourspershift,
                p.termlength,
                p.applylink,
                p.jobneeds,
                p.address,
                o.id AS organization_id,
                o.orgname,
                o.email,
                o.category AS org_category,
                o.donatelink,
                p.categories AS categories,
                p.lat,
                p.lng,
                o.logo,
                o.description AS org_description
            FROM posting p
            JOIN organization o
            ON p.organization_id = o.id
            ORDER BY o.id, p.id;
            `)
        res.json(result.rows)
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
})

app.post("/api/org/details", async (req, res) => {
    try {
        const { id } = req.body
        const result = await client.query(`
            SELECT orgname, email, category, 
            logo, description FROM organization WHERE id = $1`, [id])
        
        res.json(result.rows[0])

    } catch (e) {
        res.status(500).json({ error: e.message })
    }
})

app.post("/api/org/signup", async (req, res) => {
    const { orgname, email, category, donatelink, description,
        logo, password, lat, lng
     } = req.body

    if (!orgname || !email || !password) {
        return res.status(400).json({ error: "Missing required fields" });
    }
    try {
    // Check email uniqueness
    const exists = await client.query("SELECT id FROM organization WHERE email = $1", [email]);
    if (exists.rowCount > 0) {
        return res.status(409).json({ error: "Email already in use" });
    }

    // Hash password
    const hashed = await bcrypt.hash(password, 10);

    const insertSQL = `
        INSERT INTO organization
        (orgname, email, hashed_password, category, donatelink, description, logo)
        VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING id, orgname, email
        `;
    const result = await client.query(insertSQL, [
      orgname, email, hashed, category, donatelink, description, logo
    ]);

    res.status(201).json({ success: true, org: result.rows[0] });
  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({ error: "Internal server error when creating organization" });
  }
});

app.post("/api/org/signin", async (req, res) => {
    const { email, password } = req.body

    const result = await client.query("SELECT id, hashed_password FROM organization WHERE email=$1", [email])
    if (result.rowCount == 0) {
        throw new Error("Invalid credentials.");
    }

    const user = result.rows[0];
    const ok = await bcrypt.compare(password, user.hashed_password);
    if (!ok) throw new Error("Invalid credentials.");

    const returnable = await client.query("SELECT id, orgname, email, category, donatelink, logo, description FROM organization WHERE email=$1 RETURNING id", [email])
    res.json(returnable.rows)
})

app.post("/api/org/post", async (req, res) => {
    const { organization_id, title, description, daysperweek, hourspershift, 
        termlength, applylink, jobneeds, lat, lng, categories, address } = req.body

    const insertSQL = `INSERT INTO posting 
        (organization_id, title, description, daysperweek, hourspershift, termlength, applylink, jobneeds, lat, lng, categories, address) 
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING id;
    `

    try {
        const result = await client.query(insertSQL, [
            organization_id, title, description, daysperweek, hourspershift, termlength, applylink,
            jobneeds, lat, lng, categories, address
        ])
        res.status(201).json({ success: true, org: result.rows[0] })
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: "Internal server error when posting job." })
    }
})

app.post("/api/org/addresses", async (req, res) => {
    const { organization_id } = req.body
    try {
        const result = await client.query(`
            SELECT address FROM posting WHERE organization_id = ($1)
            `, [organization_id])
        res.json(result.rows)
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
})

app.post("/api/org/previousposts", async (req, res) => {
    const { organization_id } = req.body
    try {
        const result = await client.query(`
                SELECT 
                    p.id AS job_id,
                    p.title,
                    p.description AS job_description,
                    p.posted_date,
                    p.daysperweek,
                    p.hourspershift,
                    p.termlength,
                    p.applylink,
                    p.jobneeds,
                    p.address,
                    o.id AS organization_id,
                    p.categories AS categories,
                    p.lat,
                    p.lng
                FROM posting p
                JOIN organization o
                ON p.organization_id = o.id
                WHERE o.id = ($1)
                ORDER BY o.id, p.id;
                `, [organization_id])

        res.json(result.rows)
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
})

app.post("/api/org/deletepost", async (req, res) => {
    const { job_id } = req.body
    try {
        const result = await client.query(`
            DELETE FROM posting WHERE id = $1::int
            `, [job_id])
        res.json(result.rows)
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
})

app.listen(2000, () => console.log("API server running on port 2000"))