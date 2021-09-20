import express from "express";
import http from 'http';
import { Server } from 'socket.io';
import * as winston from 'winston';

const port = 8080; // default port to listen

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer);

export const simpleLogger = winston.createLogger({
    level: "info",
    format: winston.format.simple(),
    transports: [new winston.transports.Console()],
});

app.use('/', express.static('../socket-test-frontend/dist'))

io.on('connection', (socket) => {
    simpleLogger.info('a user connected');
    socket.on('disconnect', () => {
        simpleLogger.info('user disconnected');
    });
});

// start the Express server
httpServer.listen(port, () => {
    simpleLogger.info(`server started at http://localhost:${port}`);
});