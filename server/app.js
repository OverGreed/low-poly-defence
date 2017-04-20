'use strict';

const express = require('express'),
    compression = require('compression'),
    fs = require('fs'),
    morgan = require('morgan'),
    logger = require('./libs/logger'),
    publicPath = fs.realpathSync(__dirname + '/../public');

const app = express();

app.use(compression({
    threshold: 0,
    filter: (req, res) => req.headers['x-no-compression'] ? false : compression.filter(req, res)
}));

app.use(morgan('dev', {
    'stream': logger.stream
}));

app.use('/', express.static(publicPath));

module.exports = app;