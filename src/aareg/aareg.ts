import { Express, Request, Response } from 'express';
import { lesMockFil } from '../common';

const hentArbeidsforhold = (ident: string | undefined) => {
    try {
        return lesMockFil(`arbeidsforhold_${ident}.json`);
    } catch {
        return [];
    }
};

export default (app: Express) => {
    app.get('/rest/api/aareg/v1/arbeidstaker/arbeidsforhold', (req: Request, res: Response) => {
        const ident = req.header('Nav-Personident');

        return res.json(hentArbeidsforhold(ident));
    });

    app.get('/rest/api/aareg/ping', (_req: Request, res: Response) => {
        res.status(200).send();
    });
};
