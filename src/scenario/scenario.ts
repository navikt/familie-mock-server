import { Express, Request, Response } from 'express';
import generator from '../fnr/fnr-generator';

let scenarioCache: { [ident: string]: IRestScenarioPerson } = {};

let fnrGenerators: { [fødselsdato: string]: any } = {};

export default (app: Express) => {
    const genererFnr = (fødselsdato: string): string => {
        const cachetFnrGenerator = fnrGenerators[fødselsdato];
        const fnrGenerator = cachetFnrGenerator
            ? cachetFnrGenerator
            : generator(new Date(fødselsdato));

        fnrGenerators = {
            ...fnrGenerators,
            [fødselsdato]: fnrGenerator,
        };

        let fnr = fnrGenerator.next().value;
        if (fnr) {
            return fnr;
        } else {
            throw new Error('Klarte ikke å generere fnr');
        }
    };

    app.post('/rest/scenario', (req: Request, res: Response) => {
        console.log('cache: ', scenarioCache);

        const restScenario = req.body as IRestScenario;

        console.log(restScenario);
        const søkerIdent: string = genererFnr(restScenario.søkerIdent.fødselsdato);
        const søkerRestScenarioPerson = {
            ...restScenario.søkerIdent,
            ident: søkerIdent,
        };

        const restScenarioMedIdent = {
            ...restScenario,
            søkerIdent: søkerRestScenarioPerson,
        };

        scenarioCache = {
            ...scenarioCache,
            [søkerIdent]: søkerRestScenarioPerson,
        };

        console.log(restScenarioMedIdent);
        console.log('cache etter: ', scenarioCache);
        res.json(restScenarioMedIdent);
    });
};

interface IRestScenario {
    søkerIdent: IRestScenarioPerson;
    barnasIdenter: IRestScenarioPerson[];
}

interface IRestScenarioPerson {
    ident?: string; // Settes av mock-server
    statsborgerskap: string;
    fødselsdato: string;
}
