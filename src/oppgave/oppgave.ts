import { Express, Request, Response } from 'express';
import { lesMockFil } from '../common';

export default (app: Express) => {
    const hentOppgave = () => {
        return lesMockFil(`oppgave_1.json`);
    };

    app.get('/rest/api/oppgave/api/v1/oppgaver', (_req: Request, res: Response) => {
        res.json(hentOppgave());
    });

    app.get('/rest/api/oppgave/api/v1/oppgaver/:oppgaveId', (_req: Request, res: Response) => {
        res.json(hentOppgave());
    });

    app.patch('/rest/api/oppgave/api/v1/oppgaver/:oppgaveId', (_req: Request, res: Response) => {
        res.json(hentOppgave());
    });

    app.post('/rest/api/oppgave/api/v1/oppgaver', (_req: Request, res: Response) => {
        res.json(hentOppgave());
    });

    app.patch('/rest/api/oppgave/api/v1/oppgaver', (_req: Request, res: Response) => {
        res.json(hentOppgave());
    });

    app.get('/rest/api/oppgave/isAlive', (_req: Request, res: Response) => {
        res.status(200).send();
    });
};
