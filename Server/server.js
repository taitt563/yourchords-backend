import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bcrypt, { hash } from 'bcrypt';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import path from 'path';



const salt = 10;
const app = express();
app.use(cors(
    {
        origin: ["http://localhost:5173"],
        methods: ["POST", "GET", "PUT", "DELETE"],
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
app.post('/loginAdmin', (req, res) => {
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

    const sql = "SELECT * FROM user_acc Where username = ? AND role = 'chord' AND ban = 'Enable'";

    con.query(sql, [req.body.username], (err, result) => {
        if (err) return res.json({ Status: "Error", Error: "Error in runnig query" });
        if (result.length > 0) {
            bcrypt.compare(req.body.password.toString(), result[0].password, (err, response) => {
                if (err) {
                    console.log(err);
                }
                if (response) {
                    return res.json({ Status: "Success", Result: result })
                }
                return res.json("Error");
            })
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
    const password = req.body.password;
    bcrypt.hash(password.toString(), salt, (err, hash) => {
        if (err) {
            console.log(err);
        }

        con.query(sql, [req.body.username, hash, 'chord', req.body.name, req.body.email, req.body.address, req.body.username], (err, result) => {
            if (err) return res.json({ Status: "Error", Error: "Error in runnig query" });
            if (result.length > 0) {
                return res.json({ Status: "Success" });
            }
            if (result) {
                return res.json("Error");
            }
        })
    })
})
app.post('/loginMusician', (req, res) => {
    const sql = "SELECT * FROM user_acc Where username = ? AND role = 'musician' AND ban = 'Enable'";
    con.query(sql, [req.body.username], (err, result) => {
        if (err) return res.json({ Status: "Error", Error: "Error in runnig query" });
        if (result.length > 0) {
            bcrypt.compare(req.body.password.toString(), result[0].password, (err, response) => {
                if (err) {
                    console.log(err);
                }
                if (response) {
                    return res.json({ Status: "Success", Result: result })
                }
                return res.json("Error");
            })
        }
        else {
            return res.json({ Status: "Error", Error: "Wrong username or password" });
        }
    })
})
app.post('/signUpMusician', (req, res) => {
    let sql = "INSERT INTO user_acc (username, password , role) VALUES (?, ?, ?);";
    sql += "INSERT INTO profile (name, email , address, userId) VALUES (?, ?, ?, ?)";
    const password = req.body.password;
    bcrypt.hash(password.toString(), salt, (err, hash) => {
        if (err) {
            console.log(err);
        }
        con.query(sql, [req.body.username, hash, 'musician', req.body.name, req.body.email, req.body.address, req.body.username], (err, result) => {
            if (err) return res.json({ Status: "Error", Error: "Error in runnig query" });
            if (result.length > 0) {
                return res.json({ Status: "Success" });
            }
            if (result) {
                return res.json("Error");
            }
        })
    })
})
app.post('/login', (req, res) => {
    const sql = "SELECT * FROM user_acc Where username = ? AND role = 'user' AND ban = 'Enable'";
    con.query(sql, [req.body.username], (err, result) => {
        if (err) return res.json({ Status: "Error", Error: "Error in runnig query" });
        if (result.length > 0) {
            bcrypt.compare(req.body.password.toString(), result[0].password, (err, response) => {
                if (err) {
                    console.log(err);
                }
                if (response) {
                    return res.json({ Status: "Success", Result: result })
                }
                return res.json("Error");
            })
        }
        else {
            return res.json({ Status: "Error", Error: "Wrong username or password" });
        }
    })
})
app.post('/signUp', (req, res) => {
    let sql = "INSERT INTO user_acc (username, password , role) VALUES (?, ?, ?);";
    sql += "INSERT INTO profile (name, email , address, userId) VALUES (?, ?, ?, ?)";
    const password = req.body.password;
    bcrypt.hash(password.toString(), salt, (err, hash) => {
        if (err) {
            console.log(err);
        }
        con.query(sql, [req.body.username, hash, 'user', req.body.name, req.body.email, req.body.address, req.body.username], (err, result) => {
            if (err) return res.json({ Status: "Error", Error: "Error in runnig query" });
            if (result.length > 0) {
                return res.json({ Status: "Success" });
            }
            if (result) {
                return res.json("Error");
            }
        })
    })
})

app.post('/createSong', upload.single('thumbnail'), (req, res) => {
    const sql = "INSERT INTO song (`song_title`,`lyrics`,`thumbnail`,`link`) VALUES (?)";
    if (req.body.song_title.length > 0) {
        const values = [
            req.body.song_title,
            req.body.lyrics,
            req.file.filename,
            req.body.link,

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
app.post('/createPlaylist/:username', upload.single('image'), (req, res) => {
    let sql = `
    INSERT INTO collection (user_id, collection_name, date_creation, image)
    SELECT ?, ?, CURRENT_TIMESTAMP, ?
    FROM user_acc
    WHERE username = ?;
    `;

    if (req.body.collection_name.length > 0) {
        const values = [
            req.params.username,
            req.body.collection_name,
            req.file.filename,
            req.params.username,
        ];
        con.query(sql, values, (err, result) => {
            if (err) return res.json({ Error: "Error" });
            return res.json({ Status: "Success", Result: result });
        });
    } else {
        return res.json({ Error: "Collection name is missing" });
    }
});
app.post('/addToPlaylist', (req, res) => {
    const { song_id, collection_id } = req.body;

    if (!song_id || !collection_id) {
        return res.json({ Status: "Error", Error: "Missing song_id or collection_id" });
    }

    const sql = `
        INSERT INTO collection_songs (song_id, collection_id, date_added)
        VALUES (?, ?, CURRENT_TIMESTAMP);
    `;

    const values = [song_id, collection_id];
    console.log(values)
    con.query(sql, values, (err, result) => {
        if (err) {
            return res.json({ Status: "Error", Error: "Failed to add song to the playlist" });
        }
        return res.json({ Status: "Success", Result: result });
    });
});
app.get('/getPlaylist/:user_id', (req, res) => {
    const user_id = req.params.user_id;
    const sql = "SELECT * FROM collection where user_id = ?";
    con.query(sql, [user_id], (err, result) => {
        if (err) return res.json({ Error: "Get song error in sql" });
        return res.json({ Status: "Success", Result: result })
    })
})
app.get('/getProfile/:userId', (req, res) => {
    const userId = req.params.userId;
    const sql = "SELECT * FROM profile LEFT JOIN user_acc ON profile.userId = user_acc.username WHERE userId = ?";
    con.query(sql, [userId], (err, result) => {
        if (err) return res.json({ Error: "Get song error in sql" });
        return res.json({ Status: "Success", Result: result })
    })
})



app.put('/updateProfile/:userId', upload.single("image"), (req, res) => {
    const userId = req.params.userId;
    const sql = "UPDATE profile SET name = ?, surname=?, phoneNumber= ?, job=? , email = ?, address= ? WHERE userId = ?";

    con.query(sql, [req.body.name, req.body.surname, req.body.phoneNumber, req.body.job, req.body.email, req.body.address, userId], (err, result) => {
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
app.get('/getSong/', (req, res) => {
    const sql = "SELECT * FROM song WHERE status = '0'";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Error: "Get song error in sql" });
        return res.json({ Status: "Success", Result: result })
    })
})
app.get('/getSongChordManager/', (req, res) => {
    const sql = "SELECT * FROM song WHERE status = 0";
    con.query(sql, (err, result) => {
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
app.get('/getSongAdmin/', (req, res) => {
    const sql = "SELECT * FROM song WHERE status = '1'";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Error: "Get song error in sql" });
        return res.json({ Status: "Success", Result: result })
    })
})
app.get('/getAccount/:username', (req, res) => {
    const username = req.params.username;
    let sql = "SELECT * FROM profile LEFT JOIN user_acc ON profile.userId = user_acc.username WHERE username = ?";
    con.query(sql, [username], (err, result) => {
        if (err) return res.json({ Error: "Get song error in sql" });
        return res.json({ Status: "Success", Result: result })
    })
})
app.get('/getAccount/:userId', (req, res) => {
    const userId = req.params.userId;
    let sql = "SELECT * FROM profile LEFT JOIN user_acc ON profile.userId = user_acc.username WHERE userId = ?";
    con.query(sql, [userId], (err, result) => {
        if (err) return res.json({ Error: "Get song error in sql" });
        return res.json({ Status: "Success", Result: result })
    })
})


app.put('/updateSong/:id', upload.single("thumbnail"), (req, res) => {
    const id = req.params.id;
    const sql = "UPDATE song SET song_title = ?, lyrics = ?, link = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?";
    con.query(sql, [req.body.song_title, req.body.lyrics, req.body.link, id], (err, result) => {
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

app.put('/verifySong/:id', (req, res) => {
    const id = req.params.id;
    const sql = "UPDATE song SET status = true WHERE id = ?";
    con.query(sql, [id], (err, result) => {
        if (err) return res.json({ Error: "delete song error in sql" });
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

app.put('/replyFeedback/:username', (req, res) => {
    const username = req.params.username;
    let sql = "UPDATE feedback SET status = 1, reply = ?, date_reply = CURRENT_TIMESTAMP WHERE username = ?";
    con.query(sql, [req.body.reply, username], (err, result) => {
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
app.delete('/deleteAccount/:username', (req, res) => {
    const username = req.params.username;
    const sql = "Delete FROM user_acc WHERE username = ?";
    con.query(sql, [username], (err, result) => {
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
//notification verifySong
// app.get('/verifySongCount', (req, res) => {
//     const sql = "Select count(id) as songVerify from song WHERE status = '0' ";
//     con.query(sql, (err, result) => {
//         if (err) return res.json({ Error: "Error in runnig query" });
//         return res.json(result);
//     })
// })
app.listen(8081, () => {
    console.log("Running");
})