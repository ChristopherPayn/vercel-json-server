import express from 'express';
import { readFile } from 'fs';
import path from 'path';

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.send('Hello Express');
});

app.get('/accounts', (req, res) => {
    let dbPath = path.join(process.cwd(), 'db.json');
    readFile(dbPath, (err, data) => {
        if (err) {
            throw err;
        };

        const accounts = JSON.parse(data).accounts;
        
        res.json(accounts);
    });
});

app.get('/accounts/:accountNumber', (req, res) => {
    let dbPath = path.join(process.cwd(), 'db.json');
    readFile(dbPath, (err, data) => {
        if (err) {
            throw err;
        };

        const { accountNumber } = req.params;

        console.log('FILTER:', { accountNumber })

        const account = JSON.parse(data).accounts.filter(acc => {
            return acc.accountNumber === accountNumber
        });
        
        res.json(account);
    });
});

app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`);
});

export default app;
