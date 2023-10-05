import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import path from 'path';
// import { SqlClient} from 'msnodesqlv8';

const app = express();
app.use(cors(
    {
        origin: ["http://localhost:5173"],
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
    database: "your_chord",
    multipleStatements: true,
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
            req.role = decoded.role;
            req.id = decoded.id;
            next();
        })
    }
}

app.get('/', verifyUser, (req, res) => {
    return res.json({ Status: "Success", role: req.role, id: req.id })
})
app.post('/login', (req, res) => {
    console.log(req.body.username)
    const sql = "SELECT * FROM user_acc Where username = ? AND password = ? AND role = 'admin' AND ban = 'Enable'";
    con.query(sql, [req.body.username, req.body.password, req.body.ban], (err, result) => {
        if (err) return res.json({ Status: "Error", Error: "Error in runnig query" });
        if (result.length > 0) {
            return res.json({ Status: "Success" })
        }
        else {
            return res.json({ Status: "Error", Error: "Wrong username or password" });
        }
    })
})
app.post('/loginChordManager', (req, res) => {
    const sql = "SELECT * FROM user_acc Where username = ? AND password = ? AND role = 'chord' AND ban = 'Enable'";
    con.query(sql, [req.body.username, req.body.password], (err, result) => {
        if (err) return res.json({ Status: "Error", Error: "Error in runnig query" });
        if (result.length > 0) {
            return res.json({ Status: "Success", Result: result })
        }
        else {
            return res.json({ Status: "Error", Error: "Wrong username or password" });
        }
    })
})

app.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({ Status: "Success" });
})
app.post('/signUpChordManager', (req, res) => {
    let sql = "INSERT INTO user_acc (username, password , role) VALUES (?, ?, ?);";
    sql += "INSERT INTO profile (name, email , address, userId) VALUES (?, ?, ?, ?)";
    console.log(req);
    con.query(sql, [req.body.username, req.body.password, 'chord', req.body.name, req.body.email, req.body.address, req.body.username], (err, result) => {
        if (err) return res.json({ Status: "Error", Error: "Error in runnig query" });
        if (result.length > 0) {
            return res.json({ Status: "Success" });
        }
    })
})
app.post('/loginMusician', (req, res) => {
    const sql = "SELECT * FROM user_acc Where username = ? AND password = ? AND role = 'musician' AND ban = 'Enable'";
    con.query(sql, [req.body.username, req.body.password], (err, result) => {
        if (err) return res.json({ Status: "Error", Error: "Error in runnig query" });
        if (result.length > 0) {
            return res.json({ Status: "Success", Result: result })
        }
        else {
            return res.json({ Status: "Error", Error: "Wrong username or password" });
        }
    })
})
app.post('/signUpMusician', (req, res) => {
    let sql = "INSERT INTO user_acc (username, password , role) VALUES (?, ?, ?);";
    sql += "INSERT INTO profile (name, email , address, userId) VALUES (?, ?, ?, ?)";
    console.log(req);
    con.query(sql, [req.body.username, req.body.password, 'musician', req.body.name, req.body.email, req.body.address, req.body.username], (err, result) => {
        if (err) return res.json({ Status: "Error", Error: "Error in runnig query" });
        if (result.length > 0) {
            return res.json({ Status: "Success" });
        }
    })
})

app.post('/createSong', upload.single('thumnail'), (req, res) => {
    const sql = "INSERT INTO song (`song_title`,`lyrics`,`thumnail`) VALUES (?)";
    if (req.body.song_title.length > 0) {
        const values = [
            req.body.song_title,
            req.body.lyrics,
            req.file.filename,
        ]
        con.query(sql, [values], (err, result) => {
            if (err) return res.json({ Error: "Error" });
            return res.json({ Status: "Success" });
        })
    }
    else {
        return false;
    }
})
// app.post('/createSong', upload.single('image'), (req, res) => {
//     const sql = "INSERT INTO song (`song_title`,`lyrics`,`image`) VALUES (?)";
//     if (req.body.song_title.length > 0) {
//         const values = [
//             req.body.song_title,
//             req.body.lyrics,
//             req.file.filename,
//         ]
//         con.query(sql, [values], (err, result) => {
//             if (err) return res.json({ Error: "Error" });
//             return res.json({ Status: "Success" });
//         })
//     }
//     else {
//         return false;
//     }

// })
// app.post('/signUpChordManager', (req, res) => {
//     let sql = "INSERT INTO user_acc (username, password , role) VALUES (?, ?, ?);";
//     sql += "INSERT INTO profile (name, email , address, userId) VALUES (?, ?, ?, ?)";
//     console.log(req);
//     con.query(sql, [req.body.username, req.body.password, 'chord', req.body.name, req.body.email, req.body.address, req.body.username], (err, result) => {
//         if (err) return res.json({ Status: "Error", Error: "Error in runnig query" });
//         if (result.length > 0) {
//             return res.json({ Status: "Success" });
//         }
//     })
// })
app.get('/getProfile/:userId', (req, res) => {
    const userId = req.params.userId;
    const sql = "SELECT * FROM profile WHERE userId = ?";
    con.query(sql, [userId], (err, result) => {
        if (err) return res.json({ Error: "Get song error in sql" });
        console.log(result)
        return res.json({ Status: "Success", Result: result })
    })
})

app.put('/updateProfile/:userId', upload.single("image"), (req, res) => {
    const userId = req.params.userId;
    const sql = "UPDATE profile SET name = ?, email = ?, address= ? WHERE userId = ?";
    con.query(sql, [req.body.name, req.body.email, req.body.address, userId], (err, result) => {
        if (err) return res.json({ Error: "Error" });
        return res.json({ Status: "Success", Result: result });
    })
})

app.get('/get/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM song where id = ?";
    con.query(sql, [id], (err, result) => {
        if (err) return res.json({ Error: "Get song error in sql" });
        return res.json({ Status: "Success", Result: result })
    })
})

app.get('/getSong/:song_title', (req, res) => {
    const song_title = req.params.song_title;
    const sql = "SELECT * FROM song where song_title = ?";
    con.query(sql, [song_title], (err, result) => {
        if (err) return res.json({ Error: "Get song error in sql" });
        return res.json({ Status: "Success", Result: result })
    })
})
app.get('/getAccount/:username', (req, res) => {
    const username = req.params.username;
    const sql = "SELECT * FROM user_acc where username = ?";
    con.query(sql, [username], (err, result) => {
        if (err) return res.json({ Error: "Get song error in sql" });
        return res.json({ Status: "Success", Result: result })
    })
})
app.put('/updateSong/:song_title', upload.single("thumnail"), (req, res) => {
    const song_title = req.params.song_title;
    const sql = "UPDATE song SET song_title = ?, lyrics = ?, updated_at = CURRENT_TIMESTAMP WHERE song_title = ?";
    con.query(sql, [req.body.song_title, req.body.lyrics, song_title], (err, result) => {
        if (err) return res.json({ Error: "update song error in sql" });
        return res.json({ Status: "Success", Result: result })
    })

})
// app.put('/updateProfile/:userId', upload.single("image"), (req, res) => {
//     const userId = req.params.userId;
//     const sql = "UPDATE profile SET name = ?, email = ?, address= ? WHERE userId = ?";
//     con.query(sql, [req.body.name, req.body.email, req.body.address, userId], (err, result) => {
//         if (err) return res.json({ Error: "Error" });
//         return res.json({ Status: "Success", Result: result });
//     })
// })

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

app.get('/getFeedback', (req, res) => {
    const sql = "SELECT * FROM feedback";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Error: "Get song error in sql" });
        return res.json({ Status: "Success", Result: result })
    })
})
app.get('/viewFeedback/:username', (req, res) => {
    const username = req.params.username;
    let sql = "SELECT * FROM feedback WHERE username = ?";
    con.query(sql, [username], (err, result) => {
        if (err) return res.json({ Status: "Error", Error: "Error in runnig query" });
        if (result.length > 0) {
            return res.json({ Status: "Success", Result: result });
        }
    })
})
//manageAccountPage
app.get('/getAccount', (req, res) => {
    const sql = "SELECT * FROM user_acc";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Error: "Get song error in sql" });
        return res.json({ Status: "Success", Result: result })
    })
})
app.delete('/deleteAccount/:id', (req, res) => {
    const id = req.params.id;
    const sql = "Delete FROM user_acc WHERE id = ?";
    con.query(sql, [id], (err, result) => {
        if (err) return res.json({ Error: "delete song error in sql" });
        return res.json({ Status: "Success", Result: result })
    })
})

app.put('/banAccount/:username', (req, res) => {
    const username = req.params.username;
    const sql = "UPDATE user_acc SET ban = 'Disable' WHERE username = ?";
    con.query(sql, [username], (err, result) => {
        if (err) return res.json({ Error: "update song error in sql" });
        return res.json({ Status: "Success", Result: result })
    })
})
app.put('/unBanAccount/:username', (req, res) => {
    const username = req.params.username;
    const sql = "UPDATE user_acc SET ban = 'Enable' WHERE username = ?";
    con.query(sql, [username], (err, result) => {
        if (err) return res.json({ Error: "update song error in sql" });
        return res.json({ Status: "Success", Result: result })
    })
})
//homePageAdminCount
app.get('/adminCount', (req, res) => {
    const sql = "Select count(username) as admin from user_acc WHERE role = 'admin' ";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Error: "Error in runnig query" });
        return res.json(result);
    })
})
app.get('/adminCountActive', (req, res) => {
    const sql = "Select count(username) as adminActive from user_acc WHERE role = 'admin' AND ban = 'Enable' ";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Error: "Error in runnig query" });
        return res.json(result);
    })
})
app.get('/adminCountDisable', (req, res) => {
    const sql = "Select count(username) as adminDisable from user_acc WHERE role = 'admin' AND ban = 'Disable' ";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Error: "Error in runnig query" });
        return res.json(result);
    })
})
//homePageChordManagerCount
app.get('/chordManagerCount', (req, res) => {
    const sql = "Select count(username) as chordManager from user_acc WHERE role = 'chord' ";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Error: "Error in runnig query" });
        return res.json(result);
    })
})
app.get('/chordManagerCountActive', (req, res) => {
    const sql = "Select count(username) as chordManagerActive from user_acc WHERE role = 'chord' AND ban = 'Enable' ";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Error: "Error in runnig query" });
        return res.json(result);
    })
})
app.get('/chordManagerCountDisable', (req, res) => {
    const sql = "Select count(username) as chordManagerDisable from user_acc WHERE role = 'chord' AND ban = 'Disable' ";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Error: "Error in runnig query" });
        return res.json(result);
    })
})
//homePageMusicianCount
app.get('/musicianCount', (req, res) => {
    const sql = "Select count(username) as musician from user_acc WHERE role = 'musician' ";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Error: "Error in runnig query" });
        return res.json(result);
    })
})
app.get('/musicianCountActive', (req, res) => {
    const sql = "Select count(username) as musicianActive from user_acc WHERE role = 'musician' AND ban = 'Enable' ";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Error: "Error in runnig query" });
        return res.json(result);
    })
})
app.get('/musicianCountDisable', (req, res) => {
    const sql = "Select count(username) as musicianDisable from user_acc WHERE role = 'musician' AND ban = 'Disable' ";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Error: "Error in runnig query" });
        return res.json(result);
    })
})
//customerCount
app.get('/customerCount', (req, res) => {
    const sql = "Select count(username) as customer from user_acc WHERE role = 'user' ";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Error: "Error in runnig query" });
        return res.json(result);
    })
})
app.get('/customerCountActive', (req, res) => {
    const sql = "Select count(username) as customerActive from user_acc WHERE role = 'user' AND ban = 'Enable' ";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Error: "Error in runnig query" });
        return res.json(result);
    })
})
app.get('/customerCountDisable', (req, res) => {
    const sql = "Select count(username) as customerDisable from user_acc WHERE role = 'user' AND ban = 'Disable' ";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Error: "Error in runnig query" });
        return res.json(result);
    })
})
app.listen(8081, () => {
    console.log("Running");
})