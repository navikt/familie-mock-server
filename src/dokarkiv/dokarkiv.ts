import { Express, Request, Response } from 'express';
import { cachedFerdigstilte, getId } from '../common';

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

    app.put(
        '/rest/api/dokarkiv/rest/journalpostapi/v1/journalpost/:journalpostId',
        (_req: Request, res: Response) => {
            const { journalpostId } = _req.params;
            res.json({
                journalpostId: journalpostId,
            });
        },
    );

    app.post(
        '/rest/api/dokarkiv/rest/journalpostapi/v1/dokumentInfo/:dokumentInfo/logiskVedlegg/',
        (_req: Request, res: Response) => {
            res.json({
                logiskVedleggId: 123,
            });
        },
    );

    app.delete(
        '/rest/api/dokarkiv/rest/journalpostapi/v1/dokumentInfo/:dokumentInfo/logiskVedlegg/:logiskVedleggId',
        (_req: Request, res: Response) => {
            res.status(200).send();
        },
    );

    app.patch(
        '/rest/api/dokarkiv/rest/journalpostapi/v1/journalpost/:journalpostId/ferdigstill',
        (_req: Request, res: Response) => {
            const { journalpostId } = _req.params;
            cachedFerdigstilte.set(journalpostId, 'FERDIGSTILL');
            res.status(200).send('OK');
        },
    );

    app.get('/rest/api/dokarkiv/internal/isAlive', (_req: Request, res: Response) => {
        res.status(200).send();
    });

    app.delete('/rest/api/dokarkiv/internal/ferdigstill/clear', (_req: Request, res: Response) => {
        cachedFerdigstilte.clear();
        res.status(200).send();
    });
};
