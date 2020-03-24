import express from 'express';
import { logError, logInfo } from './logging';
import configurePdl from './pdl/pdl';
import configureAktør from './aktør/aktør';
import { configureLatency } from './common';

const port = 1337;
const app = express();

configureLatency(app);
configurePdl(app);
configureAktør(app);

app.listen(port, '0.0.0.0', (err: Error) => {
    if (err) {
        logError('Mock server feilet ved oppstart!', err);
    } else {
        logInfo(`Mock server startet på port ${port}`);
    }
});
