const express = require('express');
const app = express();
const jwt = require('./jwt');
const path = require('path');
const PORT = process.env.PORT || 5001;

// use the express-static middleware
app.use(express.static(path.join(__dirname, 'dist')));
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
});

// lifecycle API implementation
app.post('/lifecycle/uninstall', (req, res) => {
    console.log('Received life cycle event: uninstall %s', req.body.token);
    jwt.verify(req.body.token, (err, result) => {
        if (result) {
            console.log('verified payload: %j', result.payload);
            if (result.payload.iss.indexOf('coyo') >= 0) {
                console.log('Successful uninstallation');
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
});

// start the server listening for requests
app.listen(PORT,() => console.log(`Server is running on ${ PORT }`));
