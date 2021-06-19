const createServer = require('./app');

// Bootstrap the server
createServer().listen(3000, () => {
    console.log('Server started at port 3000');
});