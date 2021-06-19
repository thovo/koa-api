// app.js
const Koa = require('koa');
const koaBody = require('koa-body');
const cors = require('@koa/cors');

const createServer = () => {
    const app = new Koa();
    app.use(cors());

    // Setup body parsing middleware
    app.use(koaBody());

    // Require route for tasks
    let tasks = require('./task');

    app.use(tasks.routes());
    return app;
};

module.exports = createServer;

