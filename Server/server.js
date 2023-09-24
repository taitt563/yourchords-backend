import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import path from 'path';

const app = express();
app.use(cors(
    {
        origin: ["http://localhost:5173/"],
        methods: ["POST", "GET", "PUT"],
        credentials: true
    }
));
app.use(cookieParser());
app.use(express.json());
app.use(express.static('public'));

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

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json({ Error: "You are no Authenticated" });
    } else {
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if (err) return res.json({ Error: "Token wrong" });
            next();
        })
    }
}
app.get("/", verifyUser, (req, res) => {
    return res.json({ Status: "Success" })
})

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM login Where username = ? AND  password = ?";
    con.query(sql, [req.body.username, req.body.password], (err, result) => {
        if (err) return res.json({ Status: "Error", Error: "Error in runnig query" });
        if (result.length > 0) {
            const id = result[0].id;
            const token = jwt.sign({ id }, "jwt-secret-key", { expiresIn: '1d' });
            res.cookie('token', token);
            return res.json({ Status: "Success" })
        } else {
            return res.json({ Status: "Error", Error: "Wrong Username or Password" });
        }
    })
})
app.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({ Status: "Success" });
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
    const sql = "INSERT INTO song (`name`,`image`) VALUES (?)";
    if (req.body.name.length > 0) {
        const values = [
            req.body.name,
            req.file.filename,
        ]
        con.query(sql, [values], (err, result) => {
            if (err) return res.json({ Error: "Inside singup query" });
            return res.json({ Status: "Success" });
        })
    }
    else {
        return false;
    }

})
app.get('/getProfile/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM profile where id = ?";
    con.query(sql, [id], (err, result) => {
        if (err) return res.json({ Error: "Get song error in sql" });
        return res.json({ Status: "Success", Result: result })
    })
})

app.put('/updateProfile/:id', upload.single('image'), (req, res) => {
    const id = req.params.id;
    const sql = "UPDATE profile SET name= ? WHERE id= ?";
    const values = [
        req.body.name,
    ]
    con.query(sql, [values, id], (err, result) => {
        if (err) return res.json({ Error: "Inside singup query" });
        return res.json({ Status: "Success" });
    })
}
)

app.get('/get/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM song where id = ?";
    con.query(sql, [id], (err, result) => {
        if (err) return res.json({ Error: "Get song error in sql" });
        return res.json({ Status: "Success", Result: result })
    })
})

app.get('/getSong/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM song where id = ?";
    con.query(sql, [id], (err, result) => {
        if (err) return res.json({ Error: "Get song error in sql" });
        return res.json({ Status: "Success", Result: result })
    })
})

app.put('/updateSong/:id', (req, res) => {
    const id = req.params.id;
    const sql = "UPDATE song SET name = ? WHERE id = ?";
    con.query(sql, [req.body.name, id], (err, result) => {
        if (err) return res.json({ Error: "update song error in sql" });
        return res.json({ Status: "Success", Result: result })
    })

})
app.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    const sql = "Delete FROM song WHERE id = ?";
    con.query(sql, [id], (err, result) => {
        if (err) return res.json({ Error: "delete song error in sql" });
        return res.json({ Status: "Success", Result: result })
    })
})
app.get('/getSong', (req, res) => {
    const sql = "SELECT * FROM song";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Error: "Get song error in sql" });
        return res.json({ Status: "Success", Result: result })
    })
})
app.get('/getProfile', (req, res) => {
    const sql = "SELECT * FROM profile";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Error: "Get song error in sql" });
        return res.json({ Status: "Success", Result: result })
    })
})
app.get('/getAccount', (req, res) => {
    const sql = "SELECT * FROM login";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Error: "Get song error in sql" });
        return res.json({ Status: "Success", Result: result })
    })
})
app.delete('/deleteAccount/:id', (req, res) => {
    const id = req.params.id;
    const sql = "Delete FROM login WHERE id = ?";
    con.query(sql, [id], (err, result) => {
        if (err) return res.json({ Error: "delete song error in sql" });
        return res.json({ Status: "Success", Result: result })
    })
})
app.listen(8081, () => {
    console.log("Running");
})