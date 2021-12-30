const jwt = require('jsonwebtoken');
const jwkToPem = require('jwk-to-pem');

function getKey(header, callback){
    if (!header.jku || header.jku.indexOf('https://certificates.plugins.coyoapp.com/') < 0) {
        callback(new Error('Unknown or untrusted certificate URL: ' + header.jku), null);
        return;
    }

    https.get(header.jku, (resp) => {
        let data = '';

        resp.on('data', (chunk) => {
            data += chunk;
        });

        resp.on('end', () => {
            const key = JSON.parse(data);
            const pem = jwkToPem(key.key);
            callback(null, pem);
        });

    }).on("error", (err) => {
        callback(err, null);
    });
}


module.exports = {
    decode: (token) => {
        return jwt.decode(token, {complete: true});
    },
    verify: (token, callback) => {
        jwt.verify(token, getKey, {complete: true}, function(err, decoded) {
            callback(err, decoded);
        });
    }
}
