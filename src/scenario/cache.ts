import { IRestScenarioPerson } from './typer';
import generator from '../fnr/fnr-generator';
import { Familierelasjon } from 'pdl/types';

export let scenarioCache: { [ident: string]: IRestScenarioPerson } = {};

let fnrGenerators: { [fødselsdato: string]: any } = {};

export const genererFnr = (fødselsdato: string): string => {
    const cachetFnrGenerator = fnrGenerators[fødselsdato];
    const fnrGenerator = cachetFnrGenerator ? cachetFnrGenerator : generator(new Date(fødselsdato));

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

export const lagScenarioForPerson = (restScenarioPerson: IRestScenarioPerson) => {
    const ident: string = genererFnr(restScenarioPerson.fødselsdato);
    const restScenarioPersonMedIdent = {
        ...restScenarioPerson,
        ident,
    };

    scenarioCache = {
        ...scenarioCache,
        [ident]: restScenarioPersonMedIdent,
    };

    return restScenarioPersonMedIdent;
};

export const oppdaterFamilierelasjonerForPerson = (
    restScenarioPerson: IRestScenarioPerson,
    familierelasjoner: Familierelasjon[],
) => {
    const restScenarioPersonMedFamilierelasjoner = {
        ...restScenarioPerson,
        familierelasjoner,
    };

    scenarioCache = {
        ...scenarioCache,
        [restScenarioPersonMedFamilierelasjoner.ident!!]: restScenarioPersonMedFamilierelasjoner,
    };

    return restScenarioPersonMedFamilierelasjoner;
};
