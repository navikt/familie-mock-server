import { Express, Request, Response } from 'express';
import { IRestScenario, IRestScenarioPerson } from './typer';
import { lagScenarioForPerson } from './cache';

export default (app: Express) => {
    app.post('/rest/scenario', (req: Request, res: Response) => {
        const restScenario = req.body as IRestScenario;

        res.json({
            ...restScenario,
            søker: lagScenarioForPerson(restScenario.søker),
            barna: restScenario.barna.map((restScenarioPerson: IRestScenarioPerson) =>
                lagScenarioForPerson(restScenarioPerson),
            ),
        });
    });
};
