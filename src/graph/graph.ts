import { Express, Request, Response } from 'express';

export default (app: Express) => {
    app.get('/graph/me', (_: Request, res: Response) => {
        res.json({
            displayName: 'Test Testersen',
            enhet: '8888',
            officeLocation: '1234',
        });
    });
};
