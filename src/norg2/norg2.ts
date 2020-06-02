import { Express, Request, Response } from 'express';
import { lesMockFil } from '../common';

export default (app: Express) => {
    const hentEnhet = (_enhet?: string) => {
        return lesMockFil(`enhet_4820.json`);
    };

    app.get('/rest/api/norg2/api/v1/enhet/:enhet', (req: Request, res: Response) => {
        const { enhet } = req.params;
        res.json(hentEnhet(enhet));
    });
};
