import { Express, Request, Response } from 'express';

export default (app: Express) => {
    app.get('/rest/aktoerregister/api/v1/identer', (req: Request, res: Response) => {
        const ident = req.headers['nav-personidenter'];

        res.json({
            [ident as string]: {
                identer: [
                    {
                        ident: `${ident}1234`,
                        gjeldende: true,
                    },
                ],
                feilmelding: null,
            },
        });
    });

    app.get('/rest/aktoerregister/internal/isAlive', (_req: Request, res: Response) => {
        res.status(200).send();
    });
};
