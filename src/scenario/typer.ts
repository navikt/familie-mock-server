import { GQLForelderBarnRelasjon, GQLStatsborgerskap, GQLBostedsadresse } from '../pdl/types';

export interface IRestScenario {
    søker: IRestScenarioPerson;
    barna: IRestScenarioPerson[];
}

export interface IRestScenarioPerson {
    ident?: string; // Settes av mock-server
    aktørId?: string; // Settes av mock-server
    forelderBarnRelasjon?: GQLForelderBarnRelasjon[]; // Settes av mock-server
    fødselsdato: string;
    fornavn: string;
    etternavn: string;
    infotrygdSaker?: string;
    statsborgerskap: GQLStatsborgerskap[];
    bostedsadresser: GQLBostedsadresse[];
}
