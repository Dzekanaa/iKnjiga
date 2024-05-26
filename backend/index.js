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



app.post('/register', (req, res) => {
    const sql = 'INSERT INTO korisnici(Username, Email, Password) VALUES (?)';
    bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
        if (err) {
            return res.json({ Error: 'Error while hashing password' })
        }

        const values = [
            req.body.username,
            req.body.email,
            hash
        ];

        db.query(sql, [values], (err, result) => {
            if (err) {
                return res.json({ Error: 'Error while inserting data' })
            }
            const id = result.insertId; // Assuming KorisnikID is auto-incremented
            const token = jwt.sign({ id }, 'jwt-kljuc', { expiresIn: '1d' });
            res.cookie('token', token);

            return res.json({ Status: 'Success'});
        })
    });
})

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