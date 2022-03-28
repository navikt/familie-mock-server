import {
    GQLForelderBarnRelasjon,
    GQLStatsborgerskap,
    GQLBostedsadresse,
    GQLFamilierelasjon,
    GQLKontaktinformasjonForDoedsbo,
    GQLDoedsfall,
    GQLFolkeregisteridentifikator,
} from '../pdl/types';

export interface IRestScenario {
    søker: IRestScenarioPerson;
    barna: IRestScenarioPerson[];
}

export interface IRestScenarioPerson {
    ident?: string; // Settes av mock-server
    aktørId?: string; // Settes av mock-server
    familierelasjoner?: GQLFamilierelasjon[]; // Settes av mock-server
    forelderBarnRelasjon?: GQLForelderBarnRelasjon[]; // Settes av mock-server
    folkeregisteridentifikator: GQLFolkeregisteridentifikator[]; // Settes av mock-server
    fødselsdato: string;
    fornavn: string;
    etternavn: string;
    infotrygdSaker?: string;
    statsborgerskap: GQLStatsborgerskap[];
    bostedsadresser: GQLBostedsadresse[];
    kontaktinformasjonForDoedsbo?: GQLKontaktinformasjonForDoedsbo[];
    doedsfall?: GQLDoedsfall[];
}
