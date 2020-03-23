const Schema = `
# ISO-8601 representasjon for en kalenderdato. YYYY-MM-DD. Eksempel: 2018-01-01.
scalar Date

# ISO-8601 representasjon for en kalenderdato med tid, trunkert til nærmeste sekund. YYYY-MM-DD'T'hh:mm:ss. Eksempel: 2018-01-01T12:00:00.
scalar DateTime

schema {
    query: Query
}

type Query {
    hentPerson(ident: ID!): Person
    hentIdenter(ident: ID!, grupper: [IdentGruppe!], historikk: Boolean = false): Identliste
}

type Identliste {
    identer: [IdentInformasjon!]!
}
type IdentInformasjon {
    ident: String!
    gruppe: IdentGruppe!
    historisk: Boolean!
}
enum IdentGruppe {
    AKTORID
    FOLKEREGISTERIDENT
    NPID
}

type Person {
    familierelasjoner: [Familierelasjon!]!
    foedsel: [Foedsel!]!
    kjoenn(historikk: Boolean = false): [Kjoenn!]!
    navn(historikk: Boolean = false): [Navn!]!
}

type Foedsel {
    foedselsaar: Int
    foedselsdato: Date
    foedeland: String
    foedested: String
    foedekommune: String
}

type Kjoenn {
    kjoenn: KjoennType
}

type Familierelasjon {
    relatertPersonsIdent: String!
    relatertPersonsRolle: Familierelasjonsrolle!
    minRolleForPerson: Familierelasjonsrolle
}

enum Familierelasjonsrolle {
    BARN
    MOR
    FAR
    MEDMOR
}

type Folkeregisterpersonstatus {
    status: String!
    forenkletStatus: String!
}

type Navn {
    fornavn: String!
    mellomnavn: String
    etternavn: String!
    forkortetNavn: String
    originaltNavn: OriginaltNavn
}

type OriginaltNavn {
    fornavn: String
    mellomnavn: String
    etternavn: String
}

type Personnavn {
    fornavn: String!
    mellomnavn: String
    etternavn: String!
}

enum KjoennType {
    MANN
    KVINNE
    UKJENT
}
`;

import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolver';

export default makeExecutableSchema({
    typeDefs: [Schema],
    resolvers: resolvers,
    logger: { log: (e: any) => console.log(e) },
});
