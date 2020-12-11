export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
    /** ISO-8601 representasjon for en kalenderdato med tid, trunkert til nærmeste sekund. YYYY-MM-DD'T'hh:mm:ss. Eksempel: 2018-01-01T12:00:00. */
    DateTime: any;
    /** ISO-8601 representasjon for en kalenderdato. YYYY-MM-DD. Eksempel: 2018-01-01. */
    Date: any;
};

export type Adressebeskyttelse = {
    __typename?: 'Adressebeskyttelse';
    gradering: AdressebeskyttelseGradering;
    folkeregistermetadata?: Maybe<Folkeregistermetadata>;
    metadata: Metadata;
};

export enum AdressebeskyttelseGradering {
    StrengtFortroligUtland = 'STRENGT_FORTROLIG_UTLAND',
    StrengtFortrolig = 'STRENGT_FORTROLIG',
    Fortrolig = 'FORTROLIG',
    Ugradert = 'UGRADERT',
}

export type Bostedsadresse = {
    __typename?: 'Bostedsadresse';
    angittFlyttedato?: Maybe<Scalars['Date']>;
    coAdressenavn?: Maybe<Scalars['String']>;
    vegadresse?: Maybe<Vegadresse>;
    matrikkeladresse?: Maybe<Matrikkeladresse>;
    ukjentBosted?: Maybe<UkjentBosted>;
    folkeregistermetadata: Folkeregistermetadata;
    metadata: Metadata;
};

export type Doedsfall = {
    __typename?: 'Doedsfall';
    doedsdato?: Maybe<Scalars['Date']>;
};

/** Endring som har blitt utført på opplysningen. F.eks: Opprett -> Korriger -> Korriger */
export type Endring = {
    __typename?: 'Endring';
    /** Hvilke type endring som har blitt utført. */
    type: Endringstype;
    /** Tidspunktet for registrering. */
    registrert: Scalars['DateTime'];
    /**
     * Hvem endringen har blitt utført av, ofte saksbehandler (f.eks Z990200), men
     * kan også være system (f.eks srvXXXX). Denne blir satt til "Folkeregisteret"
     * for det vi får fra dem.
     */
    registrertAv: Scalars['String'];
    /** Hvilke system endringen har kommet fra (f.eks srvXXX). Denne blir satt til "FREG" for det vi får fra Folkeregisteret. */
    systemkilde: Scalars['String'];
    /**
     * Opphavet til informasjonen. I NAV blir dette satt i forbindelse med registrering (f.eks: Sykehuskassan).
     * Fra Folkeregisteret får vi opphaven til dems opplysning, altså NAV, UDI,
     * Politiet, Skatteetaten o.l.. Fra Folkeregisteret kan det også være tekniske
     * navn som: DSF_MIGRERING, m.m..
     */
    kilde: Scalars['String'];
};

export enum Endringstype {
    Opprett = 'OPPRETT',
    Korriger = 'KORRIGER',
    Opphoer = 'OPPHOER',
}

export type Familierelasjon = {
    __typename?: 'Familierelasjon';
    relatertPersonsIdent: Scalars['String'];
    relatertPersonsRolle: Familierelasjonsrolle;
    minRolleForPerson?: Maybe<Familierelasjonsrolle>;
};

export enum Familierelasjonsrolle {
    Barn = 'BARN',
    Mor = 'MOR',
    Far = 'FAR',
    Medmor = 'MEDMOR',
}

export type Foedsel = {
    __typename?: 'Foedsel';
    foedselsaar?: Maybe<Scalars['Int']>;
    foedselsdato?: Maybe<Scalars['Date']>;
    foedeland?: Maybe<Scalars['String']>;
    foedested?: Maybe<Scalars['String']>;
    foedekommune?: Maybe<Scalars['String']>;
};

export type Folkeregistermetadata = {
    __typename?: 'Folkeregistermetadata';
    ajourholdstidspunkt?: Maybe<Scalars['DateTime']>;
    gyldighetstidspunkt?: Maybe<Scalars['DateTime']>;
    opphoerstidspunkt?: Maybe<Scalars['DateTime']>;
    kilde?: Maybe<Scalars['String']>;
    aarsak?: Maybe<Scalars['String']>;
    sekvens?: Maybe<Scalars['Int']>;
};

export type Folkeregisterpersonstatus = {
    __typename?: 'Folkeregisterpersonstatus';
    status: Scalars['String'];
    forenkletStatus: Scalars['String'];
};

export enum IdentGruppe {
    Aktorid = 'AKTORID',
    Folkeregisterident = 'FOLKEREGISTERIDENT',
    Npid = 'NPID',
}

export type IdentInformasjon = {
    __typename?: 'IdentInformasjon';
    ident: Scalars['String'];
    gruppe: IdentGruppe;
    historisk: Scalars['Boolean'];
};

export type Identliste = {
    __typename?: 'Identliste';
    identer: Array<IdentInformasjon>;
};

export type Kjoenn = {
    __typename?: 'Kjoenn';
    kjoenn?: Maybe<KjoennType>;
};

export enum KjoennType {
    Mann = 'MANN',
    Kvinne = 'KVINNE',
    Ukjent = 'UKJENT',
}

export type Koordinater = {
    __typename?: 'Koordinater';
    x?: Maybe<Scalars['Float']>;
    y?: Maybe<Scalars['Float']>;
    z?: Maybe<Scalars['Float']>;
    kvalitet?: Maybe<Scalars['Int']>;
};

export type Matrikkeladresse = {
    __typename?: 'Matrikkeladresse';
    matrikkelId?: Maybe<Scalars['Int']>;
    bruksenhetsnummer?: Maybe<Scalars['String']>;
    tilleggsnavn?: Maybe<Scalars['String']>;
    postnummer?: Maybe<Scalars['String']>;
    kommunenummer?: Maybe<Scalars['String']>;
    koordinater?: Maybe<Koordinater>;
};

export type Metadata = {
    __typename?: 'Metadata';
    /**
     * I PDL så får alle forekomster av en opplysning en ID som representerer dens unike forekomst.
     * F.eks, så vil en Opprett ha ID X, korriger ID Y (der hvor den spesifiserer at den korrigerer X).
     * Dersom en opplysning ikke er lagret i PDL, så vil denne verdien ikke være utfylt.
     */
    opplysningsId?: Maybe<Scalars['String']>;
    /**
     * Master refererer til hvem som eier opplysningen, f.eks så har PDL en kopi av
     * Folkeregisteret, da vil master være FREG og eventuelle endringer på dette må
     * gå via Folkeregisteret (API mot dem eller andre rutiner).
     */
    master: Scalars['String'];
    /**
     * En liste over alle endringer som har blitt utført over tid.
     * Vær obs på at denne kan endre seg og man burde takle at det finnes flere
     * korrigeringer i listen, så dersom man ønsker å kun vise den siste, så må man
     * selv filtrere ut dette.
     * Det kan også ved svært få tilfeller skje at opprett blir fjernet. F.eks ved
     * splitt tilfeller av identer. Dette skal skje i svært få tilfeller. Dersom man
     * ønsker å presentere opprettet tidspunktet, så blir det tidspunktet på den
     * første endringen.
     */
    endringer: Array<Endring>;
    /**
     * Feltet betegner hvorvidt dette er en funksjonelt historisk opplysning, for
     * eksempel en tidligere fraflyttet adresse eller et foreldreansvar som er utløpt
     * fordi barnet har fylt 18 år.
     * I de fleste tilfeller kan dette utledes ved å se på de andre feltene i
     * opplysningen. Dette er imidlertid ikke alltid tilfellet, blant annet for
     * foreldreansvar.
     * Feltet bør brukes av konsumenter som henter informasjon fra GraphQL med
     * historikk, men som også trenger å utlede gjeldende informasjon.
     */
    historisk: Scalars['Boolean'];
};

export type Navn = {
    __typename?: 'Navn';
    fornavn: Scalars['String'];
    mellomnavn?: Maybe<Scalars['String']>;
    etternavn: Scalars['String'];
    forkortetNavn?: Maybe<Scalars['String']>;
    originaltNavn?: Maybe<OriginaltNavn>;
};

export type OriginaltNavn = {
    __typename?: 'OriginaltNavn';
    fornavn?: Maybe<Scalars['String']>;
    mellomnavn?: Maybe<Scalars['String']>;
    etternavn?: Maybe<Scalars['String']>;
};

export type Person = {
    __typename?: 'Person';
    adressebeskyttelse: Array<Adressebeskyttelse>;
    bostedsadresse: Array<Bostedsadresse>;
    doedsfall: Array<Doedsfall>;
    familierelasjoner: Array<Familierelasjon>;
    foedsel: Array<Foedsel>;
    kjoenn: Array<Kjoenn>;
    navn: Array<Navn>;
    sivilstand: Array<Sivilstand>;
    vergemaalEllerFremtidsfullmakt: Array<VergemaalEllerFremtidsfullmakt>;
    statsborgerskap: Array<Statsborgerskap>;
};

export type PersonAdressebeskyttelseArgs = {
    historikk?: Maybe<Scalars['Boolean']>;
};

export type PersonBostedsadresseArgs = {
    historikk?: Maybe<Scalars['Boolean']>;
};

export type PersonKjoennArgs = {
    historikk?: Maybe<Scalars['Boolean']>;
};

export type PersonNavnArgs = {
    historikk?: Maybe<Scalars['Boolean']>;
};

export type PersonSivilstandArgs = {
    historikk?: Maybe<Scalars['Boolean']>;
};

export type PersonVergemaalEllerFremtidsfullmaktArgs = {
    historikk?: Maybe<Scalars['Boolean']>;
};

export type PersonStatsborgerskapArgs = {
    historikk?: Maybe<Scalars['Boolean']>;
};

export type Personnavn = {
    __typename?: 'Personnavn';
    fornavn: Scalars['String'];
    mellomnavn?: Maybe<Scalars['String']>;
    etternavn: Scalars['String'];
};

export type Query = {
    __typename?: 'Query';
    hentPerson?: Maybe<Person>;
    hentIdenter?: Maybe<Identliste>;
};

export type QueryHentPersonArgs = {
    ident: Scalars['ID'];
};

export type QueryHentIdenterArgs = {
    ident: Scalars['ID'];
    grupper?: Maybe<Array<IdentGruppe>>;
    historikk?: Maybe<Scalars['Boolean']>;
};

export type Sivilstand = {
    __typename?: 'Sivilstand';
    type: Sivilstandstype;
    gyldigFraOgMed?: Maybe<Scalars['Date']>;
    myndighet?: Maybe<Scalars['String']>;
    kommune?: Maybe<Scalars['String']>;
    sted?: Maybe<Scalars['String']>;
    utland?: Maybe<Scalars['String']>;
    relatertVedSivilstand?: Maybe<Scalars['String']>;
    bekreftelsesdato?: Maybe<Scalars['String']>;
    folkeregistermetadata?: Maybe<Folkeregistermetadata>;
    metadata: Metadata;
};

export enum Sivilstandstype {
    Uoppgitt = 'UOPPGITT',
    Ugift = 'UGIFT',
    Gift = 'GIFT',
    EnkeEllerEnkemann = 'ENKE_ELLER_ENKEMANN',
    Skilt = 'SKILT',
    Separert = 'SEPARERT',
    RegistrertPartner = 'REGISTRERT_PARTNER',
    SeparertPartner = 'SEPARERT_PARTNER',
    SkiltPartner = 'SKILT_PARTNER',
    GjenlevendePartner = 'GJENLEVENDE_PARTNER',
}

export type Statsborgerskap = {
    __typename?: 'Statsborgerskap';
    land: Scalars['String'];
    gyldigFraOgMed?: Maybe<Scalars['Date']>;
    gyldigTilOgMed?: Maybe<Scalars['Date']>;
    folkeregistermetadata: Folkeregistermetadata;
    metadata: Metadata;
};

export type UkjentBosted = {
    __typename?: 'UkjentBosted';
    bostedskommune?: Maybe<Scalars['String']>;
};

export type Vegadresse = {
    __typename?: 'Vegadresse';
    matrikkelId?: Maybe<Scalars['Int']>;
    husnummer?: Maybe<Scalars['String']>;
    husbokstav?: Maybe<Scalars['String']>;
    bruksenhetsnummer?: Maybe<Scalars['String']>;
    adressenavn?: Maybe<Scalars['String']>;
    kommunenummer?: Maybe<Scalars['String']>;
    tilleggsnavn?: Maybe<Scalars['String']>;
    postnummer?: Maybe<Scalars['String']>;
    koordinater?: Maybe<Koordinater>;
};

export type VergemaalEllerFremtidsfullmakt = {
    __typename?: 'VergemaalEllerFremtidsfullmakt';
    type?: Maybe<Scalars['String']>;
};
