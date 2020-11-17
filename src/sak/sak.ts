import { Express, Request, Response } from 'express';

export default (app: Express) => {
    const bodyParser = require('body-parser');
    const jsonParser = bodyParser.json();

    app.post('/rest/api/skyggesak/api/v1/saker', jsonParser, (req: Request, res: Response) => {
        var response = req.body;
        response.id = Math.floor(Math.random() * Math.floor(1000000));
        req.header('Nav-Personident');
        res.json(req.body);
    });

    app.get('/rest/api/skyggesak/internal/alive', (_req: Request, res: Response) => {
        res.status(200).send();
    });
};
