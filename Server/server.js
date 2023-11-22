const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const fs = require('fs');

const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
const spacs = JSON.parse(fs.readFileSync('./swagger.json'));
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(spacs))
const salt = 10;
app.use(cors({
    origin: ['http://localhost:5173'],
    methods: ['POST', 'GET', 'PUT', 'DELETE'],
    credentials: true,
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.static('public'));

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'your_chord',
    multipleStatements: true,
});

con.connect(function (err) {
    if (err) {
        console.log('Error in Connection');
    } else {
        console.log('Connected');
    }
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({
    storage: storage,
});
const storageChord = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/chord');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
    },
});

const uploadChord = multer({
    storage: storageChord,
});

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json({ Error: 'You are not authenticated' });
    } else {
        jwt.verify(token, 'jwt-secret-key', (err, decoded) => {
            if (err) return res.json({ Error: 'Token is invalid' });
            req.role = decoded.role;
            req.id = decoded.id;
            next();
        });
    }
};

app.get('/', verifyUser, (req, res) => {
    return res.json({ Status: "Success", role: req.role, id: req.id })
})

//LOGIN
app.post('/login', (req, res) => {
    const roles = ['admin', 'chord', 'user', 'musician'];
    const sql = "SELECT * FROM user_acc WHERE username = ? AND role IN (?)";

    con.query(sql, [req.body.username, roles], (err, results) => {
        if (err) {
            return res.json({ Status: "Error", Error: "Error in the query" });
        }

        if (results.length === 0) {
            return res.json({ Status: "Error", Error: "User not found" });
        }

        const user = results[0];

        bcrypt.compare(req.body.password.toString(), user.password, (err, response) => {
            if (err) {
                return res.json({ Status: "Error", Error: "Error in password comparison" });
            }

            if (response) {
                if (user.ban === 'Pending') {
                    return res.json({ Status: "ErrorPending", Error: "User is pending approval. Please wait for admin approval.", ban: 'Pending' });
                } else if (user.ban === 'Disable') {
                    return res.json({ Status: "ErrorDisable", Error: "User is disabled", ban: 'Disable' });
                }

                return res.json({ Status: "Success", Role: user.role, Result: user });
            } else {
                return res.json({ Status: "Error", Error: "Wrong username or password" });
            }
        });
    });
});
app.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({ Status: "Success" });
})
app.put('/requestAccountMusician/:username', (req, res) => {
    const username = req.params.username;
    console.log(res)

    const sql = "UPDATE user_acc SET ban = 'Pending', role = 'musician' Where username = ? ";
    con.query(sql, [username], (err, result) => {
        if (err) return res.json({ Error: "update song error in sql" });
        return res.json({ Status: "Success", Result: result })
    })
})
app.put('/requestAccountChordValidator/:username', (req, res) => {
    const username = req.params.username;
    console.log(res)

    const sql = "UPDATE user_acc SET ban = 'Pending', role = 'chord' Where username = ? ";
    con.query(sql, [username], (err, result) => {
        if (err) return res.json({ Error: "update song error in sql" });
        return res.json({ Status: "Success", Result: result })
    })
})
app.put('/acceptAccountMusician/:username', (req, res) => {
    const username = req.params.username;
    console.log(res)

    const sql = "UPDATE user_acc SET ban = 'Enable', role = 'musician' Where username = ? ";
    con.query(sql, [username], (err, result) => {
        if (err) return res.json({ Error: "update song error in sql" });
        return res.json({ Status: "Success", Result: result })
    })
})
app.put('/rejectAccountMusician/:username', (req, res) => {
    const username = req.params.username;
    console.log(res)

    const sql = "UPDATE user_acc SET ban = 'Enable', role = 'user' Where username = ? ";
    con.query(sql, [username], (err, result) => {
        if (err) return res.json({ Error: "update song error in sql" });
        return res.json({ Status: "Success", Result: result })
    })
})
app.put('/acceptAccountChordValidator/:username', (req, res) => {
    const username = req.params.username;
    const sql = "UPDATE user_acc SET ban = 'Enable', role = 'chord' Where username = ? ";
    con.query(sql, [username], (err, result) => {
        if (err) return res.json({ Error: "update song error in sql" });
        return res.json({ Status: "Success", Result: result })
    })
})
app.put('/rejectAccountChordValidator/:username', (req, res) => {
    const username = req.params.username;
    const sql = "UPDATE user_acc SET ban = 'Enable', role = 'user' Where username = ? ";
    con.query(sql, [username], (err, result) => {
        if (err) return res.json({ Error: "update song error in sql" });
        return res.json({ Status: "Success", Result: result })
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
        con.query(sql, [req.body.username, hash, req.body.role, req.body.name, req.body.email, req.body.address, req.body.username], (err, result) => {
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

// PLAYLIST
app.post('/createPlaylist/:username', upload.single('image'), (req, res) => {
    const checkDuplicateSql = `
    SELECT COUNT(*) AS count
    FROM collection
    WHERE user_id = ? AND collection_name = ?;
    `;
    con.query(checkDuplicateSql, [req.params.username, req.body.collection_name], (err, result) => {
        if (err) {
            return res.json({ Error: "Error" });
        }

        if (result[0].count > 0) {
            return res.json({ Error: "Collection name already exists for this user" });
        } else {
            const insertSql = `
            INSERT INTO collection (user_id, collection_name, date_creation, image)
            SELECT ?, ?, CURRENT_TIMESTAMP, ?
            FROM user_acc
            WHERE username = ?;
            `;

            if (req.body.collection_name.length > 0) {
                const values = [
                    req.params.username,
                    req.body.collection_name,
                    req.body.image,
                    req.params.username,
                ];
                con.query(insertSql, values, (err, result) => {
                    if (err) {
                        return res.json({ Error: "Error" });
                    }
                    return res.json({ Status: "Success", Result: result });
                });
            } else {
                return res.json({ Error: "Collection name is missing" });
            }
        }
    });
});
app.post('/addToPlaylist', (req, res) => {
    const { song_id, collection_id } = req.body;

    if (!song_id || !collection_id) {
        return res.json({ Status: "Error", Error: "Missing song_id or collection_id" });
    }

    // Query to check if the song is already in the playlist
    const checkDuplicateSql = `
        SELECT COUNT(*) AS count FROM collection_songs
        WHERE song_id = ? AND collection_id = ?;
    `;
    const checkDuplicateValues = [song_id, collection_id];
    con.query(checkDuplicateSql, checkDuplicateValues, (checkErr, checkResult) => {
        if (checkResult[0].count > 0) {
            return res.json({ Status: "Error" });
        }
        // If not a duplicate, insert the song into the playlist
        const insertSql = `
            INSERT INTO collection_songs (song_id, collection_id, date_added)
            VALUES (?, ?, CURRENT_TIMESTAMP);
        `;
        const insertValues = [song_id, collection_id];
        con.query(insertSql, insertValues, (insertErr, insertResult) => {
            if (insertErr) {
                return res.json({ Status: "Error" });
            }

            return res.json({ Status: "Success", Result: insertResult });
        });
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
app.get('/viewPlaylist/:id', (req, res) => {
    const id = req.params.id;
    let sql1 = "SELECT * FROM collection_songs LEFT JOIN collection ON collection_songs.collection_id = collection.id WHERE collection.id = ?";
    con.query(sql1, [id], (err, result1) => {
        if (err) {
            return res.json({ Error: "Error in SQL query 1" });
        }
        let sql2 = "SELECT * FROM collection_songs LEFT JOIN song ON collection_songs.song_id = song.id WHERE collection_songs.collection_id = ?";
        con.query(sql2, [id], (err, result2) => {
            if (err) {
                return res.json({ Error: "Error in SQL query 2" });
            }
            return res.json({ Status: "Success", Result: result1, Result: result2 });
        });
    });
});
app.delete('/deleteSongPlaylist/:collection_id/:song_id', (req, res) => {
    const collection_id = req.params.collection_id;
    const song_id = req.params.song_id;
    const sql = "DELETE FROM collection_songs WHERE collection_id = ? AND song_id = ?";
    con.query(sql, [collection_id, song_id], (err, result) => {
        if (err) {
            return res.json({ Error: "Failed to delete the song from the collection" });
        } else {
            return res.json({ Status: "Success", Result: result });
        }
    });
});
app.delete('/deleteCollection/:id', (req, res) => {
    const id = req.params.id;
    const deleteSongsQuery = "DELETE FROM collection_songs WHERE collection_id = ?";
    con.query(deleteSongsQuery, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ Error: "Failed to delete songs from the collection" });
        }
        const deleteCollectionQuery = "DELETE FROM collection WHERE id = ?";
        con.query(deleteCollectionQuery, [id], (err, result) => {
            if (err) {
                return res.status(500).json({ Error: "Failed to delete the collection" });
            } else {
                return res.json({ Status: "Success", Result: result });
            }
        });
    });
});
app.get('/countSongPlaylist/:id', (req, res) => {
    const collection_id = req.params.id;

    const songCountQuery = "SELECT COUNT(song_id) as songCount FROM collection_songs WHERE collection_id = ?";
    const collectionQuery = "SELECT * FROM collection WHERE id = ?";

    con.query(songCountQuery, [collection_id], (err, songCountResult) => {
        if (err) {
            console.error("Error counting songs:", err);
            return res.status(500).json({ Error: "Error counting songs" });
        }

        con.query(collectionQuery, [collection_id], (err, collectionResult) => {
            if (err) {
                console.error("Error fetching collection:", err);
                return res.status(500).json({ Error: "Error fetching collection" });
            }

            const result = {
                songCount: songCountResult[0].songCount,
                collection: collectionResult[0]
            };

            return res.json(result);

        });
    });
});

//PROFILE
app.get('/getProfile/:userId', (req, res) => {
    const userId = req.params.userId;
    const sql = "SELECT * FROM profile LEFT JOIN user_acc ON profile.userId = user_acc.username WHERE userId = ?";
    con.query(sql, [userId], (err, result) => {
        if (err) return res.json({ Error: "Get song error in sql" });
        return res.json({ Status: "Success", Result: result })
    })
})
app.put('/updateProfile/:userId', (req, res) => {
    const userId = req.params.userId;
    const sql = "UPDATE profile SET name = ?, surname=?, phoneNumber= ?, job=? , email = ?, address= ?, image= ? WHERE userId = ?";

    con.query(sql, [req.body.name, req.body.surname, req.body.phoneNumber, req.body.job, req.body.email, req.body.address, req.body.image, userId], (err, result) => {
        if (err) return res.json({ Error: "Error" });
        return res.json({ Status: "Success", Result: result });
    })

})
app.get('/getProfile', (req, res) => {
    const sql = "SELECT * FROM profile";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Error: "Get song error in sql" });
        return res.json({ Status: "Success", Result: result })
    })
})

//SONG
app.get('/get/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM song where id = ?";
    con.query(sql, [id], (err, result) => {
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
app.get('/getSongReject/', (req, res) => {
    const sql = "SELECT * FROM song WHERE status = 2";
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
app.put('/updateSong/:id', upload.single("thumbnail"), (req, res) => {
    const id = req.params.id;

    // Lấy thông tin hiện tại của bài hát từ database
    const getCurrentSongInfoSQL = "SELECT lyrics FROM song WHERE id = ?";
    con.query(getCurrentSongInfoSQL, [id], (err, currentSongInfo) => {
        if (err) return res.json({ Error: "get current song info error in sql" });

        const currentLyrics = currentSongInfo[0].lyrics;

        // Kiểm tra nếu lyrics đã thay đổi
        if (currentLyrics !== req.body.lyrics) {
            // Nếu thay đổi, cập nhật lyrics và đặt status thành 0
            const updateSongSQL = "UPDATE song SET song_title = ?, lyrics = ?, link = ?, status = 0, updated_at = CURRENT_TIMESTAMP WHERE id = ?";
            con.query(updateSongSQL, [req.body.song_title, req.body.lyrics, req.body.link, id], (err, result) => {
                if (err) return res.json({ Error: "update song error in sql" });
                return res.json({ Status: "Success", Result: result });
            });
        } else {
            // Nếu không có thay đổi về lyrics, chỉ cập nhật thông tin khác
            const updateSongSQLWithoutLyrics = "UPDATE song SET song_title = ?, link = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?";
            con.query(updateSongSQLWithoutLyrics, [req.body.song_title, req.body.link, id], (err, result) => {
                if (err) return res.json({ Error: "update song (without lyrics) error in sql" });
                return res.json({ Status: "Success", Result: result });
            });
        }
    });
});

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
app.put('/rejectSong/:id', (req, res) => {
    const id = req.params.id;
    const sql = "UPDATE song SET status = 2 WHERE id = ?";
    con.query(sql, [id], (err, result) => {
        if (err) return res.json({ Error: "delete song error in sql" });
        return res.json({ Status: "Success", Result: result })
    })
})
app.post('/createSong', upload.single('thumbnail'), (req, res) => {
    const sql = "INSERT INTO song (`song_title`,`lyrics`,`thumbnail`,`link`) VALUES (?)";
    if (req.body.song_title.length > 0) {
        const values = [
            req.body.song_title,
            req.body.lyrics,
            req.body.thumbnail,
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

//CHORD
app.post('/createChord', uploadChord.single('image'), (req, res) => {
    const sql = "INSERT INTO chord (`chord_name`,`description`,`image`) VALUES (?)";
    if (req.body.chord_name.length > 0) {
        const values = [
            req.body.chord_name,
            req.body.description,
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
app.get('/getChord', (req, res) => {
    const sql = "SELECT * FROM chord ";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Error: "Get song error in sql" });
        return res.json({ Status: "Success", Result: result })
    })
})

//SCALE
app.get('/getChordScale', (req, res) => {
    const { root, scale, type } = req.query;
    const sql = "SELECT * FROM chord_type WHERE root = ? AND scale = ? AND type = ?";
    con.query(sql, [root, scale, type], (err, result) => {
        if (err) return res.json({ Error: "Error fetching chord from the database" });
        return res.json({ Status: "Success", Result: result });
    });
});

//ACCOUNT
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

//feedback
app.get('/getFeedback', (req, res) => {
    const sql = "SELECT * FROM feedback";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Error: "Get song error in sql" });
        return res.json({ Status: "Success", Result: result })
    })
})
app.get('/getFeedback/:username', (req, res) => {
    const username = req.params.username;
    const sql = "SELECT * FROM feedback WHERE username = ?";
    con.query(sql, [username], (err, result) => {
        if (err) return res.json({ Error: "Get song error in sql" });
        return res.json({ Status: "Success", Result: result })
    })
})
app.get('/viewFeedback/:id', (req, res) => {
    const id = req.params.id;
    let sql = "SELECT * FROM feedback WHERE id = ?";
    con.query(sql, [id], (err, result) => {
        if (err) return res.json({ Status: "Error", Error: "Error in runnig query" });
        if (result.length > 0) {
            return res.json({ Status: "Success", Result: result });
        }
    })
})
app.put('/replyFeedbackCustomer/:id', (req, res) => {
    const id = req.params.id;
    let sql = "UPDATE feedback f " +
        "INNER JOIN profile p ON f.username = p.userId " +
        "SET f.email = p.email, f.comment = ?, f.date_feedback = CURRENT_TIMESTAMP, f.image = p.image, f.rating = ? " +
        "WHERE f.id = ?";
    const values = [req.body.comment, req.body.rating, id];

    con.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error in SQL query:", err);
            return res.json({ Status: "Error", Error: "Error in running query" });
        }

        if (result.affectedRows > 0) {
            return res.json({ Status: "Success", Result: result });
        } else {
            return res.json({ Status: "No feedback found for the username" });
        }
    });
});


app.put('/reply/:id', (req, res) => {
    const { userId } = req.body;
    const feedbackId = req.params.id;

    let updateQuery = "UPDATE feedback " +
        "SET username_ad = (SELECT p.userId FROM profile p WHERE p.userId = ?), " +
        "    email_ad = (SELECT p.email FROM profile p WHERE p.userId = ?), " +
        "    image_ad = (SELECT p.image FROM profile p WHERE p.userId = ?), " +
        "    reply = ?, " +
        "    date_reply = CURRENT_TIMESTAMP " +
        "WHERE id = ?";

    let selectQuery = "SELECT * FROM feedback WHERE id = ?";
    const values = [userId, userId, userId, req.body.reply, feedbackId];
    con.beginTransaction((err) => {
        if (err) {
            console.error("Error in starting transaction:", err);
            return res.json({ Status: "Error", Error: "Error in starting transaction" });
        }

        con.query(updateQuery, values, (err, result) => {
            if (err) {
                con.rollback(() => {
                    console.error("Error in updating feedback:", err);
                    return res.json({ Status: "Error", Error: "Failed to update feedback" });
                });
            }

            con.query(selectQuery, [feedbackId], (err, feedbackData) => {
                if (err) {
                    con.rollback(() => {
                        console.error("Error in selecting feedback:", err);
                        return res.json({ Status: "Error", Error: "Failed to select feedback data" });
                    });
                }
                con.commit((err) => {
                    if (err) {
                        con.rollback(() => {
                            console.error("Error in committing transaction:", err);
                            return res.json({ Status: "Error", Error: "Error in committing transaction" });
                        });
                    }

                    return res.json({ Status: "Success", Result: feedbackData });
                });
            });
        });
    });
});



app.post('/feedbackCustomer', (req, res) => {
    const { userId, comment, rating } = req.body;

    let sql = "INSERT INTO feedback (username, email, image, comment, date_feedback, rating) " +
        "SELECT p.userId, p.email, p.image, ?, CURRENT_TIMESTAMP, ? " +
        "FROM profile p " +
        "WHERE p.userId = ?";

    const values = [comment, rating, userId];

    con.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error in SQL query:", err);
            return res.json({ Status: "Error", Error: "Error in running query" });
        }

        if (result.affectedRows > 0) {
            return res.json({ Status: "Success", Result: result });
        } else {
            return res.json({ Status: "Error", Error: "Failed to insert feedback" });
        }
    });
});






app.listen(8081, () => {
    console.log("Running");
})