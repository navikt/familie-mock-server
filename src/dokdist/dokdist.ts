import { Express, Request, Response } from 'express';
import { getId } from '../common';

export default (app: Express) => {
    app.post('/rest/api/dokdist/rest/v1/distribuerjournalpost', (_req: Request, res: Response) => {
        res.json({
            bestillingsId: `${getId()}`,
        });
    });

    app.get('/rest/api/dokdist/isAlive', (_req: Request, res: Response) => {
        res.status(200).send();
    });
};
