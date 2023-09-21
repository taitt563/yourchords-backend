import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import path from 'path';

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "yourchord"
})


con.connect(function (err) {
    if (err) {
        console.log("Error in Connection");
    } else {
        console.log("Connected");
    }
})
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
})
const upload = multer({
    storage: storage
})


app.post('/login', (req, res) => {
    const sql = "SELECT * FROM login Where username = ? AND  password = ?";
    con.query(sql, [req.body.username, req.body.password], (err, result) => {
        if (err) return res.json({ Status: "Error", Error: "Error in runnig query" });
        if (result.length > 0) {
            return res.json({ Status: "Success" })
        } else {
            return res.json({ Status: "Error", Error: "Wrong Username or Password" });
        }
    })
})
app.post('/signin', (req, res) => {
    const sql = "INSERT INTO login (username, password) VALUES (?, ?)";
    con.query(sql, [req.body.username, req.body.password], (err, result) => {
        if (err) return res.json({ Status: "Error", Error: "Error in runnig query" });
        if (result.length > 0) {
            return res.json({ Status: "Success" })
        } else {
            return res.json({ Status: "Error", Error: "Error" });
        }
    })
})
app.post('/createSong', upload.single('image'), (req, res) => {
    console.log(req.file);
    // const sql = "INSERT INTO song (`name`,`image`,`date`) VALUES (?)";
    // bcrypt.hash(req.body.password.toString(), 10, (err, hash) => {
    //     if(err) return res.json({Error: "Error in hashing password"});
    //     const values = [
    //         req.body.name,
    //         req.body.email,
    //         hash,
    //         req.body.address,
    //         req.body.salary,
    //         req.file.filename
    //     ]
    //     con.query(sql, [values], (err, result) => {
    //         if(err) return res.json({Error: "Inside singup query"});
    //         return res.json({Status: "Success"});
    //     })
    // } )
})
app.listen(8081, () => {
    console.log("Running");
})