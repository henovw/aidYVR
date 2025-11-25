import pkg from 'pg';
import cors from 'cors';
import express from 'express';
import bcrypt from "bcrypt";

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
                o.id AS organization_id,
                o.orgname,
                o.email,
                o.category AS org_category,
                o.donatelink,
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
    res.status(500).json({ error: "Internal server error" });
  }
});


app.listen(2000, () => console.log("API server running on port 2000"))