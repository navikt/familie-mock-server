import { Express, Request, Response } from 'express';

export default (app: Express) => {
    app.post(
        '/rest/api/infotrygd/ba/infotrygd/barnetrygd/saker',
        (_req: Request, res: Response) => {
            res.json({ barn: [], bruker: [] });
        },
    );
};
