import express, { Request, Response, NextFunction } from 'express';
import { logError, logInfo } from './logging';
import configureAktør from './aktør/aktør';
import configureGraph from './graph/graph';
import configurePdl from './pdl/pdl';
import configureDokdist from './dokdist/dokdist';
import configureDokarkiv from './dokarkiv/dokarkiv';
import configureOppgave from './oppgave/oppgave';
import configureNorg2 from './norg2/norg2';
import configureInfotrygd from './infotrygd/infotrygd';
import configureSaf from './saf/saf';
import configureKodeverk from './kodeverk/kodeverk';
import configureAareg from './aareg/aareg';
import configureSak from './sak/sak';
import configureScenario from './scenario/scenario';

import { configureLatency } from './common';

const port = 1337;
const app = express();

app.use((req: Request, _: Response, next: NextFunction) => {
    logInfo(`[${req.method}] ${req.originalUrl}`);
    next();
});

configureLatency(app);

configureAktør(app);
configurePdl(app);
configureGraph(app);
configureDokarkiv(app);
configureDokdist(app);
configureOppgave(app);
configureNorg2(app);
configureSaf(app);
configureKodeverk(app);
configureAareg(app);
configureSak(app);

app.use(express.json());
configureInfotrygd(app);
configureScenario(app);

app.listen(port, '0.0.0.0', (err: Error) => {
    if (err) {
        logError('Mock server feilet ved oppstart!', err);
    } else {
        logInfo(`Mock server startet på port ${port}`);
    }
});
