import { Express, Request, Response } from 'express';
import { lesMockFil } from '../common';

export default (app: Express) => {
    const hentKodeverk = (kodeverk: string) => {
        return lesMockFil(`kodeverk_${kodeverk}.json`);
    };

    app.get('/rest/api/kodeverk/EEAFreg/koder/betydninger', (_req: Request, res: Response) => {
        res.json(hentKodeverk('EEAFreg'));
    });
};
