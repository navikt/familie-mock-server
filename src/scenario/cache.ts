import { IRestScenarioPerson } from './typer';
import generator from '../fnr/fnr-generator';
import { GQLForelderBarnRelasjon } from 'pdl/types';

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
    const ident: string =
        typeof restScenarioPerson.ident === 'undefined' || restScenarioPerson.ident === null
            ? genererFnr(restScenarioPerson.fødselsdato)
            : restScenarioPerson.ident;

    const restScenarioPersonMedIdenter = {
        ...restScenarioPerson,
        ident,
        aktørId: `${ident}99`,
        folkeregisteridentifikator: [
            {
                identifikasjonsnummer: ident,
                status: 'I_BRUK',
                type: 'FNR',
            },
        ],
    };

    scenarioCache = {
        ...scenarioCache,
        [restScenarioPersonMedIdenter.ident]: restScenarioPersonMedIdenter,
        [restScenarioPersonMedIdenter.aktørId]: restScenarioPersonMedIdenter,
    };

    return restScenarioPersonMedIdenter;
};

export const oppdaterForelderBarnRelasjonerForPerson = (
    restScenarioPerson: IRestScenarioPerson,
    forelderBarnRelasjon: GQLForelderBarnRelasjon[],
) => {
    const restScenarioPersonMedForelderBarnRelasjoner: IRestScenarioPerson = {
        ...restScenarioPerson,
        forelderBarnRelasjon,
    };

    scenarioCache = {
        ...scenarioCache,
        [restScenarioPersonMedForelderBarnRelasjoner.ident!!]: restScenarioPersonMedForelderBarnRelasjoner,
    };

    return restScenarioPersonMedForelderBarnRelasjoner;
};
