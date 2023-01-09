const express = require("express");
const ExpressError = require("../expressError")
const router = new express.Router();
const db = require("../db");
const slugify = require('slugify')

router.get('/', async (req, res, next) => {
    try {
        const results = await db.query(`SELECT * FROM industries`);
        return res.json({ industries: results.rows})
    } catch (e) {
        return next(e);
    }
})

router.post('/', async (req, res, next) => {
    const { industry } = req.body;
    const results = await db.query(`INSERT INTO industries (industry) VALUES $1 RETURNING industry`, [industry]);
    return res.status(201).json({industries: results.rows[0]})
})


module.exports= routers;