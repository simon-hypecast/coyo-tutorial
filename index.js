const express = require('express')
const app = express()
const path = require('path')
const jwt = require('./jwt')
const db = require('./db')
const PORT = process.env.PORT || 5000

// use the express-static middleware
app.use(express.static(path.join(__dirname, 'dist')))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// lifecycle API implementation
app.post('/lifecycle/install', (req, res) => {
    console.log('Received life cycle event: install %s', req.body.token);
    jwt.verify(req.body.token, (err, result) => {
        if (result) {
            console.log('verified payload: %j', result.payload);
            if (result.payload.iss.indexOf('coyo') >= 0) {
                console.log('Successful installation');
                db.query('INSERT INTO installation VALUES ($1, $2, $3)',
                    [result.payload.tenantId, result.payload.pluginId, result.payload.iss]);
                res.status(201).json({code: 100, message: 'ok'});
            } else {
                console.log('Unsupported COYO instance');
                res.status(400).json({code: 101, message: 'Unsupported COYO instance'})
            }
        } else {
            console.log('Error validating JWT: %s', err.message);
            res.status(400).json({code: 401, message: 'Token signature invalid'})
        }
    });
})

app.post('/lifecycle/uninstall', (req, res) => {
    console.log('Received life cycle event: uninstall %s', req.body.token);
    jwt.verify(req.body.token, (err, result) => {
        if (result) {
            console.log('verified payload: %j', result.payload);
            db.query('DELETE FROM installation WHERE tenant_id=$1 AND plugin_id=$2',
                [result.payload.tenantId, result.payload.pluginId]);
            res.status(201).json({code: 100, message: 'ok'});
        } else {
            console.log('Error validating JWT: %s', err.message);
            res.status(400).json({code: 401, message: 'Token signature invalid'})
        }
    });
})

// view rendering
app.get('/installations', async (req, res) => {
    try {
        const installations = await db.query('SELECT * FROM installation');
        const totalInstallations = await db.query('SELECT COUNT(DISTINCT tenant_id) FROM installation');
        const results = {
            'installations': (installations) ? installations.rows : null,
            'total': totalInstallations.rows[0].count
        };
        res.render('pages/installations', results);
    } catch (err) {
        console.error(err);
        res.send("Error " + err);
    }
})

// start the server listening for requests
app.listen(PORT,() => console.log(`Server is running on ${ PORT }`));
