const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const prisma = require('@prisma/client');

const { PrismaClient } = prisma;
const jwt_secret = process.env.JWT_SECRET

const prismaClient = new PrismaClient();
const router = express.Router();

router.get('/', (req, res) => {
    res.send("up hesre")
})

// register
router.post("/register", async (req, res) => {
    // res.send("ok here!");
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required." });
    }
    const hashPass = await bcrypt.hash(password, 10);

    const user = await prismaClient.user.create({
        data: {
            email,
            password: hashPass
        },
    })
    res.status(200).json({meg: "user created successfully!", user})
})

// login
router.post('/login', async (req, res) => {
    // res.send("ok here")
    const { email, password } = req.body;
    const user = await prismaClient.user.findUnique({ where: { email } });

    if (user) {
        const token = jwt.sign({ userId: user.id }, jwt_secret, { expiresIn: '1h'});
        return res.status(200).json( {msg: "login successful!", token});
    }
    res.status(401).json({ msg: "invalid credentials" });
})

module.exports = router;