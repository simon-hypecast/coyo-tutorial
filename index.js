const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 5001;

// use the express-static middleware
app.use(express.static(path.join(__dirname, 'dist')));

// start the server listening for requests
app.listen(PORT,() => console.log(`Server is running on ${ PORT }`));
