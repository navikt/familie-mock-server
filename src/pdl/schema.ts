/**
 * Skjemaet finner du her:
 * https://github.com/navikt/pdl/blob/master/apps/api/src/main/resources/schemas/pdl.graphqls
 */

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
    adressebeskyttelse(historikk: Boolean = false): [Adressebeskyttelse!]!
    bostedsadresse(historikk: Boolean = false): [Bostedsadresse!]!
    doedsfall: [Doedsfall!]!
    familierelasjoner: [Familierelasjon!]!
    foedsel: [Foedsel!]!
    kjoenn(historikk: Boolean = false): [Kjoenn!]!
    navn(historikk: Boolean = false): [Navn!]!
    sivilstand(historikk: Boolean = false):[Sivilstand!]!
    vergemaalEllerFremtidsfullmakt(historikk: Boolean = false): [VergemaalEllerFremtidsfullmakt!]!
    statsborgerskap(historikk: Boolean = false): [Statsborgerskap!]!
    opphold(historikk: Boolean = false):[Opphold!]!
}

type Foedsel {
    foedselsaar: Int
    foedselsdato: Date
    foedeland: String
    foedested: String
    foedekommune: String
}

type Doedsfall {
    doedsdato: Date
}

type VergemaalEllerFremtidsfullmakt {
    type: String
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

type Bostedsadresse {
    angittFlyttedato: Date
    coAdressenavn: String
    vegadresse: Vegadresse
    matrikkeladresse: Matrikkeladresse
    ukjentBosted: UkjentBosted
    folkeregistermetadata: Folkeregistermetadata!
    metadata: Metadata!
}

type Vegadresse {
    matrikkelId: Int
    husnummer: String
    husbokstav: String
    bruksenhetsnummer: String
    adressenavn: String
    kommunenummer: String
    tilleggsnavn: String
    postnummer: String
    koordinater: Koordinater
}

type Matrikkeladresse {
    matrikkelId: Int
    bruksenhetsnummer: String
    tilleggsnavn: String
    postnummer: String
    kommunenummer: String
    koordinater: Koordinater
}

type UkjentBosted {
    bostedskommune: String
}

type Sivilstand {
    type: Sivilstandstype!
    gyldigFraOgMed: Date
    myndighet: String
    kommune: String
    sted: String
    utland: String
    relatertVedSivilstand: String
    bekreftelsesdato: String

    folkeregistermetadata: Folkeregistermetadata
    metadata: Metadata!
}

enum Sivilstandstype {
    UOPPGITT
    UGIFT
    GIFT
    ENKE_ELLER_ENKEMANN
    SKILT
    SEPARERT
    REGISTRERT_PARTNER
    SEPARERT_PARTNER
    SKILT_PARTNER
    GJENLEVENDE_PARTNER
}

type Adressebeskyttelse {
    gradering: AdressebeskyttelseGradering!
    folkeregistermetadata: Folkeregistermetadata
    metadata: Metadata!
}

type Folkeregistermetadata {
    ajourholdstidspunkt: DateTime
    gyldighetstidspunkt: DateTime
    opphoerstidspunkt: DateTime
    kilde: String
    aarsak: String
    sekvens: Int
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

enum AdressebeskyttelseGradering {
    STRENGT_FORTROLIG_UTLAND,
    STRENGT_FORTROLIG,
    FORTROLIG,
    UGRADERT
}

type Statsborgerskap {
    land: String!
    gyldigFraOgMed: Date
    gyldigTilOgMed: Date
    folkeregistermetadata: Folkeregistermetadata!
    metadata: Metadata!
}

type Opphold {
    type: Oppholdstillatelse!
    oppholdFra: Date
    oppholdTil: Date
    folkeregistermetadata: Folkeregistermetadata!
    metadata: Metadata!
}

enum Oppholdstillatelse {
    MIDLERTIDIG
    PERMANENT
    OPPLYSNING_MANGLER
}

type Koordinater {
    x: Float
    y: Float
    z: Float
    kvalitet: Int
}

type Metadata {
    # I PDL så får alle forekomster av en opplysning en ID som representerer dens unike forekomst.
    # F.eks, så vil en Opprett ha ID X, korriger ID Y (der hvor den spesifiserer at den korrigerer X).
    # Dersom en opplysning ikke er lagret i PDL, så vil denne verdien ikke være utfylt.
    opplysningsId: String

    # Master refererer til hvem som eier opplysningen, f.eks så har PDL en kopi av Folkeregisteret, da vil master være FREG og eventuelle endringer på dette må gå via Folkeregisteret (API mot dem eller andre rutiner).
    master: String!

    # En liste over alle endringer som har blitt utført over tid.
    # Vær obs på at denne kan endre seg og man burde takle at det finnes flere korrigeringer i listen, så dersom man ønsker å kun vise den siste, så må man selv filtrere ut dette.
    # Det kan også ved svært få tilfeller skje at opprett blir fjernet. F.eks ved splitt tilfeller av identer. Dette skal skje i svært få tilfeller. Dersom man ønsker å presentere opprettet tidspunktet, så blir det tidspunktet på den første endringen.
    endringer: [Endring!]!

    # Feltet betegner hvorvidt dette er en funksjonelt historisk opplysning, for eksempel en tidligere fraflyttet adresse eller et foreldreansvar som er utløpt fordi barnet har fylt 18 år.
    # I de fleste tilfeller kan dette utledes ved å se på de andre feltene i opplysningen. Dette er imidlertid ikke alltid tilfellet, blant annet for foreldreansvar.
    # Feltet bør brukes av konsumenter som henter informasjon fra GraphQL med historikk, men som også trenger å utlede gjeldende informasjon.
    historisk: Boolean!
}

# Endring som har blitt utført på opplysningen. F.eks: Opprett -> Korriger -> Korriger
type Endring {
    # Hvilke type endring som har blitt utført.
    type: Endringstype!
    # Tidspunktet for registrering.
    registrert: DateTime!
    # Hvem endringen har blitt utført av, ofte saksbehandler (f.eks Z990200), men kan også være system (f.eks srvXXXX). Denne blir satt til "Folkeregisteret" for det vi får fra dem.
    registrertAv: String!
    # Hvilke system endringen har kommet fra (f.eks srvXXX). Denne blir satt til "FREG" for det vi får fra Folkeregisteret.
    systemkilde: String!
    # Opphavet til informasjonen. I NAV blir dette satt i forbindelse med registrering (f.eks: Sykehuskassan).
    # Fra Folkeregisteret får vi opphaven til dems opplysning, altså NAV, UDI, Politiet, Skatteetaten o.l.. Fra Folkeregisteret kan det også være tekniske navn som: DSF_MIGRERING, m.m..
    kilde: String!
}

enum Endringstype {
    OPPRETT
    KORRIGER
    OPPHOER
}
`;

import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolver';

export default makeExecutableSchema({
    typeDefs: [Schema],
    resolvers: resolvers,
    logger: { log: (e: any) => console.log(e) },
});
