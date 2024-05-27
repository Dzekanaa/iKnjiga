import express from 'express'
import mysql from 'mysql'
import cors  from 'cors'
import jwt from 'jsonwebtoken'
import bcrypt, { hash } from 'bcrypt'
import cookieParser from 'cookie-parser'
const salt = 10;

const app = express();
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173'],
    methods: ["POST", "GET"],
    credentials: true
}));
app.use(cookieParser());



const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'iknjiga'
})

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if(!token) {
        return res.json({Error: 'Nisi overen korisnik'})
    } else {
        jwt.verify(token, "jwt-kljuc", (err, decoded) => {
            if(err) return res.json({Error: 'Token nije u redu'});

            else {
                req.id = decoded.id
                next();
            }
        })

    }
}

app.get('/', verifyUser, (req, res) => {
    const userId = Number(req.id); 
    return res.json({ Status: 'Success', id: userId });
});

app.get('/books', (req, res) => {
    const sql = 'SELECT * FROM knjige ORDER BY RAND() LIMIT 12';
    db.query(sql, (err, data) => {
        if (err) {
            return res.json({ Error: 'Get Books Error in server' });
        }
        if (data.length > 0) {
            return res.json({ Status: 'Success', books: data });
        } else {
            return res.json({ Error: 'Books not found' });
        }
    });
})

app.get('/mybooks', verifyUser, (req, res) => {
    const korisnikID = req.id;

    const sql = `
        SELECT k.* 
        FROM BibliotekaKnjige bk 
        JOIN Knjige k ON bk.KnjigaID = k.KnjigaID 
        WHERE bk.LicnaBibliotekaID = (
            SELECT LicnaBibliotekaID 
            FROM LicneBiblioteke 
            WHERE KorisnikID = ?
        )
    `;

    db.query(sql, [korisnikID], (err, data) => {
        if (err) {
            return res.status(500).json({ Error: 'Get Books Error in server' });
        }
        if (data.length > 0) {
            return res.status(200).json({ Status: 'Success', books: data });
        } else {
            return res.status(404).json({ Error: 'Books not found' });
        }
    });
});


app.post('/addbook', verifyUser, (req, res) => {
    const korisnikID = req.id; 
    const knjigaID = req.body.knjigaID; 
    
    const sqlInsertBook = 'INSERT INTO BibliotekaKnjige (LicnaBibliotekaID, KnjigaID) VALUES (?, ?)';
    
    db.query('SELECT LicnaBibliotekaID FROM LicneBiblioteke WHERE KorisnikID = ?', [korisnikID], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error while fetching user library' });
        }
        
        if (results.length === 0) {
            return res.status(404).json({ error: 'User library not found' });
        }
        
        const licnaBibliotekaID = results[0].LicnaBibliotekaID;
        
        db.query(sqlInsertBook, [licnaBibliotekaID, knjigaID], (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Error while adding book to library' });
            }
            
            return res.status(200).json({ message: 'Book added to library successfully' });
        });
    });
});


app.post('/register', (req, res) => {
    const sqlInsertUser = 'INSERT INTO Korisnici(Username, Email, Password) VALUES (?)';
    const sqlCreateLibrary = 'INSERT INTO LicneBiblioteke(KorisnikID) VALUES (?)';

    bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
        if (err) {
            return res.json({ Error: 'Error while hashing password' })
        }

        const userValues = [
            req.body.username,
            req.body.email,
            hash
        ];

        db.query(sqlInsertUser, [userValues], (err, result) => {
            if (err) {
                return res.json({ Error: 'Error while inserting user data' })
            }
            
            const userId = result.insertId;

            db.query(sqlCreateLibrary, [[userId]], (err, libraryResult) => {
                if (err) {
                    return res.json({ Error: 'Error while creating user library' })
                }
                
                const token = jwt.sign({ id: userId }, 'jwt-kljuc', { expiresIn: '1d' });
                res.cookie('token', token);

                return res.json({ Status: 'Success', UserId: userId });
            });
        });
    });
});


app.post('/user', verifyUser, (req, res) => {
    const userId = req.body.id;
    const sql = 'SELECT * FROM korisnici WHERE KorisnikID = ?';
    db.query(sql, [userId], (err, data) => {
        if (err) {
            return res.json({ Error: 'Get User Error in server' });
        }

        if (data.length > 0) {
            return res.json({ Status: 'Success', user: data[0] });
        } else {
            return res.json({ Error: 'User not found' });
        }
    });
});



app.post('/login', (req, res) => {
    const sql = 'SELECT * FROM korisnici WHERE Email = ?';
    db.query(sql, [req.body.email], (err, data) => {
        if (err) {
            return res.json({ Error: 'Login Error in server' });
        }

        if(data.length > 0){
            bcrypt.compare(req.body.password.toString(), data[0].Password, (err, response) => {
                if (err) {
                    return res.json({ Error: 'Password compare error' });
                }
                if(response) {
                    const id = data[0].KorisnikID;
                    const token = jwt.sign({id}, 'jwt-kljuc', {expiresIn: '1d'})
                    res.cookie('token', token);
                    return res.json({ Status: 'Success' });
                }
                return res.json({ Error: 'Wrong password' });
            });
        } else {
            return res.json({ Error: 'No email existing' });
        }
    });
});

app.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({Status: 'Success'})
})

app.listen(8801, 
    () => {
        console.log("mudo moe");
    }
)