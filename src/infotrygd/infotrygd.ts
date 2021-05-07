import { Express, Request, Response } from 'express';
import { IRestScenarioPerson } from '../scenario/typer';
import { scenarioCache } from '../scenario/cache';

export default (app: Express) => {
    const bodyParser = require('body-parser');
    const jsonParser = bodyParser.json();

    app.post(
        '/rest/api/infotrygd/ba/infotrygd/barnetrygd/saker',
        jsonParser,
        (_req: Request, res: Response) => {
            if (_req.body.brukere === undefined || _req.body.brukere[0] === undefined) {
                return res.status(400).json({ feilmelding: 'Mangler liste med brukere' });
            }

            const cachetPerson: IRestScenarioPerson | undefined =
                scenarioCache[_req.body.brukere[0]];

            if (cachetPerson === undefined) {
                return res.json({ barn: [], bruker: [] });
            }

            const infotrygdSaker = cachetPerson.infotrygdSaker;

            if (infotrygdSaker === undefined) {
                return res.json({ barn: [], bruker: [] });
            }
            return res.json(infotrygdSaker);
        },
    );
};