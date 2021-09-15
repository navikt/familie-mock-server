import { Express, Request, Response } from 'express';
import { IRestScenarioPerson } from '../scenario/typer';
import { scenarioCache } from '../scenario/cache';

export default (app: Express) => {
    app.post(
        '/rest/api/infotrygd/ba/infotrygd/barnetrygd/saker',
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

    app.post(
        '/rest/api/infotrygd/ba/infotrygd/barnetrygd/lopende-barnetrygd',
        (req: Request, res: Response) => {
            const cachetPersoner: IRestScenarioPerson[] = [
                ...req.body.barn.map((b: string) => scenarioCache[b]),
                ...req.body.brukere.map((b: string) => scenarioCache[b]),
            ];

            if (
                cachetPersoner.length > 0 &&
                cachetPersoner.some((person: IRestScenarioPerson) => person.infotrygdSaker !== null)
            ) {
                return res.json({ harLøpendeBarnetrygd: true });
            } else {
                return res.json({ harLøpendeBarnetrygd: false });
            }
        },
    );

    app.post(
        '/rest/api/infotrygd/ba/infotrygd/barnetrygd/aapen-sak',
        (req: Request, res: Response) => {
            const cachetPersoner: IRestScenarioPerson[] = [
                ...req.body.barn.map((b: string) => scenarioCache[b]),
                ...req.body.brukere.map((b: string) => scenarioCache[b]),
            ];

            if (
                cachetPersoner.length > 0 &&
                cachetPersoner.some((person: IRestScenarioPerson) => person.infotrygdSaker !== null)
            ) {
                return res.json({ harÅpenSak: true });
            } else {
                return res.json({ harÅpenSak: false });
            }
        },
    );
};
