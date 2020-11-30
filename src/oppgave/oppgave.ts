import { Express, Request, Response } from 'express';
import { lesMockFil } from '../common';

let cachedPostRequests = new Map();

export default (app: Express) => {
    const bodyParser = require('body-parser');
    const jsonParser = bodyParser.json();

    const hentOppgave = () => {
        return lesMockFil(`oppgave_1.json`);
    };

    const hentOppgaver = () => {
        return lesMockFil(`oppgaver.json`);
    };

    app.get('/rest/api/oppgave/api/v1/oppgaver', (_req: Request, res: Response) => {
        res.json(hentOppgaver());
    });

    app.get('/rest/api/oppgave/api/v1/oppgaver/:oppgaveId', (_req: Request, res: Response) => {
        res.json(hentOppgave());
    });

    app.patch('/rest/api/oppgave/api/v1/oppgaver/:oppgaveId', (_req: Request, res: Response) => {
        res.json(hentOppgave());
    });

    app.post('/rest/api/oppgave/api/v1/oppgaver', jsonParser, (_req: Request, res: Response) => {
        const callId = _req.header('Nav-Call-Id');
        if (callId != undefined && callId != null) {
            cachedPostRequests.set(callId, _req.body);
        }
        res.json(hentOppgave());
    });

    app.patch('/rest/api/oppgave/api/v1/oppgaver', jsonParser, (_req: Request, res: Response) => {
        res.json(hentOppgave());
    });

    app.get('/rest/api/oppgave/isAlive', (_req: Request, res: Response) => {
        res.status(200).send();
    });

    app.get('/rest/api/oppgave/cache/:callId', (_req: Request, res: Response) => {
        let { callId } = _req.params;
        if (cachedPostRequests.has(callId)) {
            res.json(cachedPostRequests.get(callId));
        } else {
            res.status(500).json({
                message: `Fant ikke oppgave fra callId ` + callId,
            });
        }
    });

    app.delete('/rest/api/oppgave/cache/clear', (_req: Request, res: Response) => {
        cachedPostRequests.clear();
        res.status(200).send();
    });
};
