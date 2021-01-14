import { Express, Request, Response } from 'express';
import { IRestScenario, IRestScenarioPerson } from './typer';
import { lagScenarioForPerson, oppdaterFamilierelasjonerForPerson } from './cache';
import { Familierelasjonsrolle } from '../pdl/types';

export default (app: Express) => {
    app.post('/rest/scenario', (req: Request, res: Response) => {
        const restScenario = req.body as IRestScenario;

        const søker = lagScenarioForPerson(restScenario.søker);
        const barna = restScenario.barna.map((restScenarioPerson: IRestScenarioPerson) =>
            lagScenarioForPerson(restScenarioPerson),
        );

        res.json({
            ...restScenario,
            søker: oppdaterFamilierelasjonerForPerson(
                søker,
                barna.map(restScenarioPerson => ({
                    relatertPersonsIdent: restScenarioPerson.ident!!,
                    relatertPersonsRolle: Familierelasjonsrolle.Barn,
                })),
            ),
            barna: barna.map((restScenarioPerson: IRestScenarioPerson) =>
                oppdaterFamilierelasjonerForPerson(restScenarioPerson, [
                    {
                        relatertPersonsIdent: søker.ident!!,
                        relatertPersonsRolle: Familierelasjonsrolle.Mor,
                    },
                ]),
            ),
        });
    });
};
