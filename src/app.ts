import express, { Request, Response, NextFunction } from 'express';
import { logError, logInfo } from './logging';
import configureAktør from './aktør/aktør';
import configureGraph from './graph/graph';
import configurePdl from './pdl/pdl';
import { configureLatency } from './common';

const port = 1337;
const app = express();

app.use((req: Request, _: Response, next: NextFunction) => {
    logInfo(`[${req.method}] ${req.originalUrl}`);
    next();
});

configureLatency(app);
configurePdl(app);
configureAktør(app);
configureGraph(app);

app.listen(port, '0.0.0.0', (err: Error) => {
    if (err) {
        logError('Mock server feilet ved oppstart!', err);
    } else {
        logInfo(`Mock server startet på port ${port}`);
    }
});
