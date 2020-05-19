import { Express, Request, Response } from 'express';
import { getId } from 'common';

export default (app: Express) => {
    app.post(
        '/rest/api/dokarkiv/rest/journalpostapi/v1/journalpost',
        (_req: Request, res: Response) => {
            res.json({
                melding: 'OK',
                journalpostferdigstilt: true,
                journalpostId: `${getId()}`,
                dokumenter: [],
            });
        },
    );

    app.patch(
        '/rest/api/dokarkiv/rest/journalpostapi/v1/journalpost/:journalpostId/ferdigstill',
        (_req: Request, res: Response) => {
            res.status(200).send('OK');
        },
    );

    app.get('/rest/api/dokarkiv/internal/isAlive', (_req: Request, res: Response) => {
        res.status(200).send();
    });
};
