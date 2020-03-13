const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const ProjectRouter = require('./projects/projectRouter');
const ActionRouter = require('../actions/actionRouter');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/projects', ProjectRouter);
server.use('/api/actions', ActionRouter);

server.get('/', (req, res) => {
    res.status(200).json({api: "API is up and running!!"});
});

module.exports = server;