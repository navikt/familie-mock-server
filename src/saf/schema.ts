/**
 * Skjemaet finner du her:
 * https://stash.adeo.no/projects/BOAF/repos/saf/raw/app/src/main/resources/schemas/saf.graphqls?at=refs%2Fheads%2Fmaster
 */

const Schema = `
# ISO-8601 representasjon for en kalenderdato. YYYY-MM-DD. Eksempel: 2018-01-01.
    scalar Date

# ISO-8601 representasjon for en kalenderdato med tid, trunkert til nærmeste sekund. YYYY-MM-DD'T'hh:mm:ss. Eksempel: 2018-01-01T12:00:00.
    scalar DateTime

schema {
    # Alle spørringer mot SAF GraphQL API.
        query: Query
}

# BrukerIdInput er et argument som identifiserer en aktør eller organisasjon.
    input BrukerIdInput {
    # Unik identifikator for en aktør eller organisasjon.
        id: String!

    # Indikator på hvilken type id som brukes i spørringen.
        type: BrukerIdType!
}

# Indikator på hvilken type id som brukes i spørringen.
    enum BrukerIdType {
    # NAV aktørid for en person.
        AKTOERID

    # Folkeregisterets fødselsnummer eller d-nummer for en person.
        FNR

    # Foretaksregisterets organisasjonsnummer for en juridisk person.
        ORGNR
}

# FagsakInput er et argument som identifiserer en fagsak.
    input FagsakInput {
    # Unik identifikator for en gitt fagsak.
        fagsakId: String!

    # Verdi for hvilket fagsystem denne fagsaken tilhører, for eksempel **PP01** for pensjonssaker.
                                                                                         fagsaksystem: String!
}

# Query roten til SAF GraphQL API.
    type Query {
    # * dokumentoversiktBruker returnerer en liste over alle dokumentene tilknyttet en bruker.  Listen er sortert omvendt kronologisk.
        # * Det er kun metadata om journalposter med tilhørende dokumenter som returneres. Det fysiske dokumentet kan hentes i saf - REST hentdokument.
    dokumentoversiktBruker(
        # Brukeren man ønsker å få ut dokumentoversikt for.
    # Hvis argumentet ikke er angitt så returneres en feil.
        brukerId: BrukerIdInput!

    # Dato for eldste journalpost.
        # Hvis angitt returneres alle journalposter fra og med denne datoen.
        # Hvis null er angitt så hentes alle journalposter.
        fraDato: Date

    # Dato for nyeste journalpost.
        # Hvis angitt returneres alle journalposter til og med denne datoen.
        # Hvis null er angitt så hentes alle journalposter.
        tilDato: Date

    # Filter for tema.
        # Hvis en tom liste er angitt som argument hentes journalposter på alle tema.
        tema: [Tema] = []

    # Filter for journalposttype.
        # Hvis en tom liste er angitt som argument hentes alle journalposttyper.
        journalposttyper: [Journalposttype] = [I, U, N]

    # Filter for journalstatus.
        # Hvis en tom liste er angitt som argument hentes alle journalstatuser
    journalstatuser: [Journalstatus] = [FERDIGSTILT, JOURNALFOERT, EKSPEDERT]

    # Første **n** resultater, brukes til å paginere forover.
        foerste: Int

    # Peker til resultat etter foerste, brukes til å paginere forover.
        etter: String
): Dokumentoversikt!

    # * dokumentoversiktFagsak returnerer en liste over alle dokumentene tilknyttet en fagsak.  Listen er sortert omvendt kronologisk.
        # * Det er kun metadata om journalposter med tilhørende dokumenter som returneres. Det fysiske dokumentet kan hentes i saf - REST hentdokument.
    dokumentoversiktFagsak(
        # Fagsaken man ønsker å få ut dokumentoversikt for.
    #  Hvis argumentet ikke er angitt så returneres en feil.
        fagsak: FagsakInput!

    # Dato for eldste journalpost.
        # Hvis angitt returneres alle journalposter fra denne datoen.
        # Hvis null er angitt så hentes alle journalposter.
        fraDato: Date

    # Filter for tema.
        # Hvis en tom liste er angitt som argument hentes journalposter på alle tema.
        tema: [Tema] = []

    # Filter for journalposttype.
        # Hvis en tom liste er angitt som argument hentes alle journalposttyper.
        # Standardverdi: 'I, U, N'
    journalposttyper: [Journalposttype] = [I, U, N]

    # Filter for journalstatus.
        # Hvis en tom liste er angitt som argument hentes alle journalstatuser.
        # Standardverdi: 'FERDIGSTILT, JOURNALFOERT, EKSPEDERT'
    journalstatuser: [Journalstatus] = [FERDIGSTILT, JOURNALFOERT, EKSPEDERT]

    # Første **n** resultater, brukes til å paginere forover.
        foerste: Int

    # Peker til resultat etter foerste, brukes til å paginere forover.
        etter: String
): Dokumentoversikt!

    # * dokumentoversiktJournalstatus returnerer en liste som matcher søkeparameterene.
        # * Det er kun metadata om journalposter med tilhørende dokumenter som returneres. Det fysiske dokumentet kan hentes i saf - REST hentdokument.
    dokumentoversiktJournalstatus(
        # Dato for eldste journalpost.
        # Hvis angitt returneres alle journalposter fra denne datoen.
        # Hvis null er angitt så hentes alle journalposter.
        fraDato: Date

    # Filter for tema.
        # Hvis en tom liste er angitt som argument hentes journalposter på alle tema.
        tema: [Tema] = []

    # Filter for journalposttype.
        # Hvis en tom liste er angitt som argument hentes alle journalposttyper.
        # Standardverdi: 'I, U, N'
    journalposttyper: [Journalposttype] = [I, U, N]

    # Filter for journalstatus.
        # Per i dag er det kun mulig å søke på statusene UTGAAR og UKJENT_BRUKER.
        # Standardverdi: null
    journalstatus: Journalstatus!

    # Første **n** resultater, brukes til å paginere forover.
        foerste: Int

    # Peker til resultat etter foerste, brukes til å paginere forover.
        etter: String
): Dokumentoversikt!

    # * Query returnerer metadata for en journalpost.
        # * Fysiske dokumentet tilknyttet journalposten kan hentes i saf - REST hentdokument
    journalpost(
        # ID til Journalposten man ønsker å hente detaljer for.
    # * Hvis argumentet ikke er angitt så returneres en feil.
        journalpostId: String!
): Journalpost

    # Henter metadata for en dokumentInfo (dokumentbeskrivelse) med tilknyttede journalposter.
        # Behovet er å hente journalposter som:
        # * Deler samme DokumentInfo (mange-til-mange relasjon via JPDokInfoRel). Dette vil typisk være resultat av et dokument som er journalført på flere saker/brukere.
        # * Er knyttet sammen via originalJournalpostId. Dette vil typisk være resultat av en splitting av et dokument, der det opprettes to nye DokumentInfo med hver sin del av originaldokumentet, og DokumentInfo.originalJournalpostId peker tilbake på journalposten (med status Utgått) som originaldokumentet lå på.
    tilknyttedeJournalposter(
        # ID til dokumentet man ønsker å hente tilknyttede Journalpost for.
    # * Hvis argumentet ikke er angitt så returneres en feil.
        dokumentInfoId: String!

    # Typen tilknyttet Journalpost.
        tilknytning: Tilknytning!
): [Journalpost]!
}

# Dokumentoversikt er en liste av journalposter som tilfredstiller query kriteriene.
    type Dokumentoversikt {
    # En liste av journalposter.
        journalposter: [Journalpost]!

    # Informasjon for å hjelpe med paginering.
        sideInfo: SideInfo!
}

# Informasjon om paginering.
    type SideInfo {
    # Når man paginerer forover, pekeren for å fortsette.
        sluttpeker: String

    # True/False verdi for om neste side eksisterer, når man paginerer forover
    finnesNesteSide: Boolean!
}

# * Fagsystemene som arkiverer kan legge til egne fagspesifikke attributter per journalpost.
    # * Disse er representert som et skjemaløst nøkkel-verdi-sett og valideres ikke av Joark. Et eksempel på et slikt sett kan være (bucid, 21521).
    type Tilleggsopplysning {
    # Nøkkelen til det fagspesifikke attributtet.
        nokkel: String

    # Verdien til det fagspesifikke attributtet.
        verdi: String
}

# Et sett med metadata som er nødvendig for å gjenfinne et dokument i arkivet. En journalpost kan ha ett eller flere dokumenter.
    type Journalpost {
    # Unik identifikator per Journalpost
    journalpostId: String!

    # Beskriver innholdet i journalposten samlet, f.eks. "Ettersendelse til søknad om foreldrepenger"
    tittel: String

    # Sier hvorvidt journalposten er et inngående dokument, et utgående dokument eller et notat.
        journalposttype: Journalposttype

    # Status på journalposten i joark, f.eks. MOTTATT eller JOURNALFØRT. Journalstatusen gir et indikasjon på hvor i journalførings- eller dokumentproduksjonsprosessen journalposten befinner seg.
        # * Journalposter som er resultat av en feilsituasjon og ikke skal hensyntas for saksbehandling har egne koder, som UTGAAR eller AVBRUTT.
        journalstatus: Journalstatus

    # Temaet/Fagområdet som journalposten og tilhørende sak tilhører, f.eks. "FOR".
        # * For sakstilknyttede journalposter, er det tema på SAK- eller PSAK-saken som er gjeldende tema.
        # * For journalposter som enda ikke har fått sakstilknytning, returneres tema på journalposten.inneholder Joark informasjon om antatt tema for journalposten.
                                                                                                                                                           tema: Tema

    # Dekode av 'Tema', f.eks. "Foreldrepenger"
    temanavn: String

    # Detaljering av tema på journalpost og tilhørende sak, f.eks. "ab0072".
        behandlingstema: String

    # Dekode av behandlingstema, f.eks "Foreldrepenger ved adopsjon"
    behandlingstemanavn: String

    # Sier hvilken sak journalposten er knyttet til. En journalpost kan maksimalt være knyttet til én sak, men et dokument kan være knyttet til flere journalposter og dermed flere saker.
        sak: Sak

    # * Personen eller organisasjonen som dokumentene i journalposten gjelder.
        # * Dersom journalposten er sakstilknyttet, henter SAF bruker fra GSAK/PSAK. Alternativt henter SAF den fra Joark.
        bruker: Bruker

    # Personen eller organisasjonen som er avsender eller mottaker av dokumentene i journalposten.
        avsenderMottaker: AvsenderMottaker

    # Identifikatoren til parten som er avsender eller mottaker av dokumentene på journalposten. Enten fødselsnummer eller organisasjonsnummer.
        avsenderMottakerId: String @deprecated(reason: "Feltet er deprekert og vil bli fjernet i fremtiden. Bruk avsenderMottaker.id i stedet.")

    # Navnet på personen eller organisasjonen som er avsender eller mottaker av dokumentene på journalposten.
        avsenderMottakerNavn: String @deprecated(reason: "Feltet er deprekert og vil bli fjernet i fremtiden. Bruk avsenderMottaker.navn i stedet.")

    # Landet forsendelsen er mottatt fra eller sendt til. Feltet skal i utgangspunktet kun være populert dersom avsender eller mottaker er en institusjon med adresse i utlandet.
        avsenderMottakerLand: String @deprecated(reason: "Feltet er deprekert og vil bli fjernet i fremtiden. Bruk avsenderMottaker.land i stedet.")

    # NAV-enheten som har journalført forsendelsen. I noen tilfeller brukes journalfEnhet til å rute journalføringsoppgaven til korrekt enhet i NAV. I slike tilfeller vil journalfEnhet være satt også for ikke-journalførte dokumenter.
        journalforendeEnhet: String  @deprecated(reason: "Feltet er deprekert og vil bli fjernet i fremtiden. Bruk journalfoerendeEnhet i stedet.")

    # NAV-enheten som har journalført forsendelsen. I noen tilfeller brukes journalfEnhet til å rute journalføringsoppgaven til korrekt enhet i NAV. I slike tilfeller vil journalfEnhet være satt også for ikke-journalførte dokumenter.
        journalfoerendeEnhet: String

    # Personen eller systembrukeren i NAV som har journalført forsendelsen.
        # * Bruken av feltet varierer, og kan inneholde den ansattes navn eller NAV-ident. Dersom forsendelsen er automatisk journalført, kan innholdet være f.eks. en servicebruker eller et batchnavn.
        journalfortAvNavn: String

    # Personen eller systembrukeren i NAV som har opprettet journalposten.
        # * Bruken av feltet varierer, og kan inneholde den ansattes navn eller NAV-ident. For inngående dokumenter kan innholdet være f.eks. en servicebruker eller et batchnavn.
        opprettetAvNavn: String

    # Kanalen dokumentene ble mottatt i eller sendt ut på f.eks. "SENTRAL_UTSKRIFT" eller "ALTINN".
        # * Dersom journalposten ikke har noen kjent kanal, returneres verdien "UKJENT"
    kanal: Kanal

    # Dekode av 'Kanal', f.eks "Sentral utskrift"
    kanalnavn: String

    # Utrykker at tilgangen til alle journalpost data for denne journalposten er begrenset, og at dataene ikke skal brukes i ordinær saksbehandling.
        skjerming: String

    # Datoen journalposten ble opprettet i arkivet. Datoen settes automatisk og kan ikke overskrives. Selv om hver journalpost har mange datoer (se 'RelevantDato') er datoOpprettet å anse som "fasit" på journalpostens alder.
        datoOpprettet: DateTime!

    # Liste over datoer som kan være relevante for denne journalposten, f.eks. DATO_EKSPEDERT. Hvilke relevante datoer som returneres, avhenger av journalposttypen.
        relevanteDatoer: [RelevantDato]

    # Antall ganger brevet har vært forsøkt sendt til bruker og deretter kommet i retur til NAV. Vil kun være satt for utgående forsendelser.
        antallRetur: String

    # Brukes for sporing og feilsøking på tvers av systemer.
        # Eksempler på eksternReferanseId kan være sykmeldingsId for sykmeldinger, Altinn ArchiveReference for Altinn-skjema eller SEDid for SED.
                                                                                                                                                 eksternReferanseId: String

    # Liste over fagspesifikke metadata som er tilknyttet journalpost.
        tilleggsopplysninger: [Tilleggsopplysning]

    # Liste over dokumentinfo tilknyttet journalposten.
        # * Dokumentene returneres i følgende sorteringsrekkefølge: Hoveddokumentet først, deretter vedleggene i tilfeldig rekkefølge.
        dokumenter: [DokumentInfo]
}

# Dato som kan være relevant for en journalpost. De ulike journalposttypene (inngående, utgående og notat) får returnert ulike relevante datoer.
    # * For eksempel er **DATO_EKSPEDERT** kun relevant for utgående dokumenter, og **DATO_REGISTRERT** kun for inngående.
                                                                                                                    type RelevantDato {
    # ISO-8601 representasjon for en kalenderdato med tid, trunkert til nærmeste sekund. *YYYY-MM-DD'T'hh:mm:ss*.
    # Eksempel: *2018-01-01T12:00:00*.
    dato: DateTime!

    # Markør for hvilken type dato som dato-feltet inneholder.
        datotype: Datotype!
}

# En sak i NAV har flere saksnumre (fagsaksnummer og arkivsaksnummer).
# * Fagsaken viser til saken slik denne er definert i et fagsystem. Saken identifiseres ved fagsakId + fagsaksystem.
    # * Arkivsaksnummer er "skyggesaken" som man tradisjonelt har journalført mot i Joark. Denne skal nå anses som en intern nøkkel i Joark.
    ##
# I tilfeller der informasjonen skal journalføres, men ikke passer inn på en fagsak, er det mulig å journalføre mot "generell sak". Generell sak kan anses som brukerens mappe på et tema.
    # Dersom arkivsaksystemet er PSAK, returneres den samme verdien som både arkivsaksnummer og fagsakId.
    type Sak {
    # Saksnummeret i PSAK eller SAK-tabellen i Joark (tidligere GSAK).
    # * NB: Arkivsak skal anses som Joark-internt. Fagsystemene skal kun bruke denne etter avtale.
        arkivsaksnummer: String @deprecated(reason: "NB: Arkivsak skal anses som Joark-internt. Fagsystemene skal kun bruke denne etter avtale.")

    # Sier hvorvidt arkivsaksnummeret peker på en sak i PSAK eller i SAK-tabellen i Joark (tidligere GSAK). For pensjons- og uføresaker vil arkivsaksystemet være PSAK. For alle andre sakstyper er arkivsaksystem GSAK.
        # * NB: Arkivsak skal anses som Joark-internt. Fagsystemene skal kun bruke denne etter avtale.
        arkivsaksystem: Arkivsaksystem @deprecated(reason: "NB: Arkivsak skal anses som Joark-internt. Fagsystemene skal kun bruke denne etter avtale.")

    # Tidspunktet saken først ble opprettet/brukt i arkivet. Fagsaken kan være opprettet i fagsystemet på et annet tidspunkt.
        datoOpprettet: DateTime

    # Saksnummeret i fagsystemet
    fagsakId: String

    # Kode som indikerer hvilket fagsystem, eventuelt nummerserie for fagsaker, som fagsaken befinner seg i.
        fagsaksystem: String
}

# Person eller organisasjon som har et forhold til NAV, f.eks. som mottaker av tjenester eller ytelser.
    type Bruker {
    # Brukerens identifikator. For personbrukere returneres personens aktørID eller fødselsnummer. For organisasjonsbrukere returneres et organisasjonsnummer.
        id: String

    # Angir hvilken type brukeren sin id er.
        type: BrukerIdType
}

# En person, organisasjon eller annen samhandler som er mottaker eller avsender av dokumentene på en journalpost.
    type AvsenderMottaker {
    # Identifikatoren til parten som er avsender eller mottaker av dokumentene på journalposten.
        # * Normalt et fødselsnummer eller organisasjonsnummer.
        id: String

    # Identifikatortypen til parten som er avsender eller mottaker av dokumentene på journalposten.
        type: AvsenderMottakerIdType

    # Navnet på personen eller organisasjonen som er avsender eller mottaker av dokumentene på journalposten.
        navn: String

    # Landet forsendelsen er mottatt fra eller sendt til. Feltet brukes kun dersom avsender / mottaker er en institusjon med adresse i utlandet.
        land: String

    # Angir hvorvidt bruker er lik avsender/mottaker av journalposten.
        # * Informasjonen er ikke garantert korrekt, da tjenesten sammenlikner avsenderMottaker med bruker tilknyttet journalposten, ikke bruker tilknyttet saken.
        erLikBruker: Boolean!
}

# Metadata tilknyttet et bestemt dokument i Joark (evt til flere varianter av samme dokument).
# * Dokumentinfo viser ikke til den fysiske filen, men til metadata som omhandler alle eventuelle varianter av dokumentet.
    type DokumentInfo {
    # Unik identifikator per dokumentinfo
    dokumentInfoId: String!

    # Dokumentets tittel, f.eks. *"Søknad om foreldrepenger ved fødsel"* eller *"Legeerklæring"*.
    tittel: String

    # Kode som sier noe om dokumentets innhold og oppbygning.
        # * For inngående skjema er brevkoden normalt en NAV-skjemaID f.eks. *"NAV 14-05.09"*. Enkelte vedlegg har en vedleggskode som sier noe om innholdet.
        # * For utgående dokumenter sier brevkoden noe om hvilken dokumentmal som er benyttet og hvordan dokumentet skal distribueres.
        brevkode: String

    # Dokumentstatus gir et indikasjon på hvorvidt dokumentet er ferdigstilt eller under arbeid, eventuelt avbrutt. Dersom dokumentet ikke har noen dokumentstatus, er dokumentet komplett / ferdigstilt.
        dokumentstatus: Dokumentstatus

    # Dato dokumentet ble ferdigstilt.
        datoFerdigstilt: DateTime

    # Et dokumentInfo-objekt kan være gjenbrukt på flere journalposter. OriginalJournalpostId peker på den journalposten som dokumentene var knyttet til på arkiveringstidspunktet.
        originalJournalpostId: String

    # Uttrykker at tilgangen til metadata for dette dokumentet er begrenset, og at dataene ikke skal brukes i ordinær saksbehandling.
        skjerming: String

    # Liste over andre dokumenter som også befinner seg inne i den fysiske filen som dokumentinfo-objektet peker på.
        logiskeVedlegg: [LogiskVedlegg]!

    # Liste over tilgjengelige varianter av dokumentet.
        dokumentvarianter: [Dokumentvariant]!
}

# Et dokument som forekommer inne i en fysisk fil med et annet navn og hovedinnhold.
    # * Dette skjer hyppig under skanning av papirpost, fordi dokumenter mottatt i samme konvolutt skannes i én operasjon, og ender opp som én fil i Joark.
    # * En bruker sender inn en papirsøknad om foreldrepenger, med en legeerklæring som vedlegg. Journalposten vil da ha ett dokument med navn *"Søknad om foreldrepenger ved fødsel"*, og det logiske vedlegget *"Legerklæring"*.
type LogiskVedlegg {
    # Unik identifikator per logisk vedlegg
    logiskVedleggId: String!

    # Tittel på det logiske vedlegget, f.eks. *"Legeerklæring"*
    tittel: String
}

# En variant av et dokumentet, som er beregnet på et spesielt formål, for eksempel langtidsbevaring eller automatisk saksbehandling.
    # * De fleste dokumenter vil kun returneres i variantformat ARKIV. Dersom det eksisterer andre varianter av dokumentet, vil disse også returneres, gitt at saksbehandler har rettigheter som tilsier at han/hun skal vite at det finnes andre varianter.
    type Dokumentvariant {
    # Typen variant som returneres. Normalt vil dette være ARKIV.
        # * Andre visningsvarianter er SLADDET
    # * Et dokument kan ha både en SLADDET og en ARKIV variant, men aldri flere varianter av samme type.
        variantformat: Variantformat!

    # Navnet på filen i arkivet. Navnet vil i de fleste tilfeller være autogenerert ved arkivering.
        filnavn: String

    # Unik identifikator per fil.
        # * NB: Feltet skal kun brukes etter avtale med Team Dokument.
        filuuid: String @deprecated(reason: "Feltet er deprekert og vil bli fjernet i fremtiden. Feltet skal kun brukes etter avtale med Team Dokument.")

    # Dokumentets filtype, f.eks. PDFA, XML eller JPG. Gyldige verdier finnes på siden Fagarkiv - Filtype.
        # * NB: Informasjonen er ikke garantert å samsvare med dokumentets faktiske filtype, da dette ikke valideres under arkivering.
        # * NB: Feltet skal kun brukes etter avtale med Team Dokument.
        filtype: String @deprecated(reason: "Feltet er deprekert og er kun til internt bruk. Feltet skal kun brukes etter avtale med Team Dokument.")

    # Sier hvorvidt saksbehandler som gjør oppslaget vil få tilgang til å åpne denne dokumentvarianten.
        # * Dersom verdien er false, vil tilgang bli avslått dersom saksbehandler forsøker å åpne dokumentet.
        saksbehandlerHarTilgang: Boolean!

    # Uttrykker at tilgangen til metadata for dette dokumentet er begrenset, og at dataene ikke skal brukes i ordinær saksbehandling.
        skjerming: SkjermingType
}

# Beskriver hvorfor journalposten eller dokumentet er skjermet. Det kan komme flere verdier enn disse i fremtiden.
    enum SkjermingType {
    # Indikerer at det er fattet et vedtak etter personopplysningsloven (GDPR - brukers rett til å bli glemt).
    POL

    # Indikerer at det har blitt gjort en feil under mottak, journalføring eller brevproduksjon, slik at journalposten eller dokumentene er markert for sletting.
                                                                                                                                                            FEIL
        }
# Beskriver en type dato som kan være relevant for en journalpost, for eksempel **DATO_OPPRETTET**. Ulike datotyper returneres for ulike journalstatuser.
    enum Datotype {
    # * Tidspunktet journalposten er opprettet i joark. Tidspunktet settes automatisk og kan ikke overskrives. Selv om hver journalpost har mange datoer (se relevanteDatoer) er datoOpprettet å anse som "fasit" på journalpostens alder.
        # * Returneres for alle journalposter
    DATO_OPPRETTET

    # * Tidspunktet dokumentene på journalposten ble sendt til print.
        # * Returneres for utgående journalposter
    DATO_SENDT_PRINT

    # * Tidspunktet dokumentene på journalposten ble sendt til bruker.
        # * Returneres for utgående journalposter
    DATO_EKSPEDERT

    # * Tidspunktet journalposten ble journalført (inngående) eller ferdigstilt (utgående).
        # * Returneres for alle journalposttyper
    DATO_JOURNALFOERT

    # * Tidspunkt dokumentene i journalposten ble registrert i NAV sine systemer.
        # * Returneres for inngående journalposter
    DATO_REGISTRERT

    # * Tidspunkt som dokumentene i journalposten ble sendt på nytt, grunnet retur av opprinnelig forsendelse.
        # * Returneres for utgående journalposter
    DATO_AVS_RETUR

    # * Dato på hoveddokumentet i forsendelsen. Registreres i noen tilfeller manuelt av saksbehandler.
        # * Returneres for alle journalposter
    DATO_DOKUMENT

}

# Indikerer hvor man kan finne saksparten som dokumentene er journalført mot, samt en peker til selve fagsaken, dersom det finnes en.
    # * For pensjons- og uføresaker vil arkivsaksystemet være PSAK. For alle andre sakstyper er arkivsaksystem GSAK.
    enum Arkivsaksystem {
    # Arkivsaksystem for alle NAV saker unntatt pensjon og uføre.
        GSAK

    # Arkivsaksystem for pensjon og uføre.
        PSAK
}

# Sier hvorvidt journalposten er et inngående dokument, et utgående dokument eller et notat.
    enum Journalposttype {
    # **Inngående dokument** - Dokumentasjon som NAV har mottatt fra en ekstern part. De fleste inngående dokumenter er søknader, ettersendelser av dokumentasjon til sak, eller innsendinger fra arbeidsgivere. Meldinger brukere har sendt til "Skriv til NAV" arkiveres også som inngående dokumenter..
        I

    # **Unngående dokument** - Dokumentasjon som NAV har produsert og sendt ut til en ekstern part. De fleste utgående dokumenter er informasjons- eller vedtaksbrev til privatpersoner eller organisasjoner. "Skriv til NAV"-meldinger som saksbehandlere har sendt til brukere arkiveres også som utgående dokumenter.
        U

    # **Notat** - Dokumentasjon som NAV har produsert selv, uten at formålet er å distribuere dette ut av NAV. Eksempler på notater er samtalereferater med veileder på kontaktsenter og interne forvaltningsnotater.
        N
}

# * Status på journalposten i arkivet, f.eks. **MOTTATT** eller **JOURNALFOERT**. Journalstatusen gir et indikasjon på hvor i journalførings- eller dokumentproduksjonsprosessen journalposten befinner seg.
    # * Journalposter som er resultat av en feilsituasjon og ikke skal hensyntas for saksbehandlinghar egne koder, som **UTGAAR** eller **AVBRUTT**.
enum Journalstatus {
    # Journalposten er mottatt, men ikke journalført. *"Mottatt"* er et annet ord for *"arkivert"* eller *"midlertidig journalført"*
    # * Statusen vil kun forekomme for inngående dokumenter.
        MOTTATT

    # Journalposten er ferdigstilt og ansvaret for videre behandling av forsendelsen er overført til fagsystemet.
        # * Journalposter med status **JOURNALFOERT** oppfyller minimumskrav til metadata i arkivet, som for eksempel tema, sak, bruker og avsender.
        JOURNALFOERT

    # Journalposten med tilhørende dokumenter er ferdigstilt, og journalen er i prinsippet låst for videre endringer.
        # * Tilsvarer statusen **JOURNALFOERT** for inngående dokumenter.
        FERDIGSTILT

    # Dokumentet er sendt til bruker. Statusen benyttes også når dokumentet er tilgjengeliggjort for bruker på DittNAV, og bruker er varslet.
        # * Statusen kan forekomme for utgående dokumenter og notater.
        EKSPEDERT

    # Journalposten er opprettet i arkivet, men fremdeles under arbeid.
        # * Statusen kan forekomme for utgående dokumenter og notater.
        UNDER_ARBEID

    # Journalposten har blitt unntatt fra saksbehandling etter at den feilaktig har blitt knyttet til en sak. Det er ikke mulig å slette en saksrelasjon, istedet settes saksrelasjonen til feilregistrert.
        # * Statusen kan forekomme for alle journalposttyper.
        FEILREGISTRERT

    # Journalposten er unntatt fra saksbehandling. Status **UTGAAR** brukes stort sett ved feilsituasjoner knyttet til skanning eller journalføring.
        # * Statusen vil kun forekomme for inngående dokumenter
    UTGAAR

    # Utgående dokumenter og notater kan avbrytes mens de er under arbeid, og ikke enda er ferdigstilt. Statusen **AVBRUTT** brukes stort sett ved feilsituasjoner knyttet til vedtaksproduksjon.
        # * Statusen kan forekomme for utgående dokumenter og notater.
        AVBRUTT

    # Journalposten har ikke noen kjent bruker.
        # ** NB: ** **UKJENT_BRUKER** er ikke en midlertidig status, men benyttes der det ikke er mulig å journalføre fordi man ikke klarer å identifisere brukeren forsendelsen gjelder.
        # * Statusen kan kun forekomme for inngående dokumenter.
        UKJENT_BRUKER

    # Statusen benyttes bl.a. i forbindelse med brevproduksjon for å reservere 'plass' i journalen for dokumenter som skal populeres på et senere tidspunkt.
        # Tilsvarer statusen **OPPLASTING_DOKUMENT** for inngående dokumenter.
        # * Statusen kan forekomme for utgående dokumenter og notater
    RESERVERT

    # Midlertidig status på vei mot **MOTTATT**.
    # Dersom en journalpost blir stående i status **OPPLASTING_DOKUMENT** over tid, tyder dette på at noe har gått feil under opplasting av vedlegg ved arkivering.
        # * Statusen kan kun forekomme for inngående dokumenter.
        OPPLASTING_DOKUMENT

    # Dersom statusfeltet i Joark er tomt, mappes dette til **UKJENT**
    UKJENT
}

# Kanalen dokumentene ble mottatt i eller sendt ut på, f.eks. **SENTRAL_UTSKRIFT** eller **ALTINN**.
# * Dersom journalposten ikke har noen kjent kanal, returneres verdien **UKJENT**
enum Kanal {
    # Forsendelsen er sendt inn via et Altinn-skjema.
        # * Brukes for inngående journalposter.
        ALTINN

    # Forsendelsen er mottatt eller distribuert via applikasjoner som EU har levert og som benyttes for utveksling av informasjon med andre EU-land.
        # * Brukes for inngående og utgående journalposter.
        EESSI

    # Forsendelsen er arkivert av applikasjonen EIA.
        # * Brukes for inngående journalposter.
        EIA

    # Dokumentene i journalposten er hentet fra en ekstern kilde, for eksempel informasjon om oppholdstillatelse fra Utlendingsdirektoratet.
        # * Brukes for inngående journalposter.
        EKST_OPPS

    # Brevet er skrevet ut lokalt og kan være sendt i posten på papir.
        # * Brukes for utgående journalposter og notater.
        LOKAL_UTSKRIFT

    # Forsendelsen er sendt inn digitalt via selvbetjeningsløsninger på nav.no, eller distribuert digitalt til brukers meldingsboks på nav.no.
        # * Brukes for inngående og utgående journalposter.
        NAV_NO

    # Brevet er overført til sentral distribusjon og sendt i posten på papir.
        # * Brukes for utgående journalposter.
        SENTRAL_UTSKRIFT

    # Brevet er sendt via digital post til innbyggere.
        # * Brukes for utgående journalposter.
        SDP

    # Forsendelsen er sendt inn på papir og skannet hos NETS.
        # * Brukes for inngående, utgående journalposter og notater.
        SKAN_NETS

    # Forsendelsen er sendt inn på papir og skannet på NAVs skanningsenter for pensjon og bidrag.
        # * Brukes for inngående journalposter.
        SKAN_PEN

    # Forsendelsen er sendt inn på papir og skannet hos Iron Moutain.
        # * Brukes for inngående, utgående journalposter og notater.
        SKAN_IM

    # Forsendelen er distribuert via integrasjonspunkt for eFormidling til Trygderetten.
        # * Brukes for utgående journalposter.
        TRYGDERETTEN

    # Forsendelsen er mottatt eller distribuert via Norsk Helsenett, helsesektorens løsning for elektronisk meldingsutveksling.
        # * Brukes for inngående og utgående journalposter.
        HELSENETTET

    # Forsendelsen skal ikke distribueres ut av NAV.
        # * Brukes for alle notater og noen utgående journalposter
    INGEN_DISTRIBUSJON

    # Forsendelsen er sendt inn digitalt via selvbetjeningsløsninger på nav.no, uten at avsenderen ble digitalt autentisert
    # * Brukes for inngående journalposter
    NAV_NO_UINNLOGGET

    # Forsendelsen har ingen kjent kanal.
        UKJENT
}

# Temaet/Fagområdet som en journalpost og tilhørende sak tilhører, f.eks. **FOR** (foreldrepenger).
    # * I NAV brukes Tema for å klassifisere journalposter i arkivet med tanke på gjenfinning, tilgangsstyring og bevaringstid.
    enum Tema {
    # Arbeidsavklaringspenger
    AAP

    # Aa-registeret
    AAR

    # Ajourhold - Grunnopplysninger
    AGR

    # Barnetrygd
    BAR

    # Bidrag
    BID

    # Bil
    BIL

    # Dagpenger
    DAG

    # Enslig forsørger
    ENF

    # Erstatning
    ERS

    # Farskap
    FAR

    # Feilutbetaling
    FEI

    # Foreldre- og svangerskapspenger
    FOR

    # Forsikring
    FOS

    # Midlertidig kompensasjonsordning for selvstendig næringsdrivende og frilansere
    FRI

    # Fullmakt
    FUL

    # Generell
    GEN

    # Gravferdsstønad
    GRA

    # Grunn- og hjelpestønad
    GRU

    # Helsetjenester og ortopediske hjelpemidler
    HEL

    # Hjelpemidler
    HJE

    # Inkluderende arbeidsliv
    IAR

    # Tiltakspenger
    IND

    # Kontantstøtte
    KON

    # Kontroll
    KTR

    # Medlemskap
    MED

    # Mobilitetsfremmende stønad
    MOB

    # Omsorgspenger, pleiepenger og opplæringspenger
    OMS

    # Oppfølging - Arbeidsgiver
    OPA

    # Oppfølging
    OPP

    # Pensjon
    PEN

    # Permittering og masseoppsigelser
    PER

    # Rehabilitering
    REH

    # Rekruttering og stilling
    REK

    # Retting av personopplysninger
    RPO

    # Rettferdsvederlag
    RVE

    # Sanksjon - Arbeidsgiver
    SAA

    # Saksomkostninger
    SAK

    # Sanksjon - Person
    SAP

    # Serviceklager
    SER

    # Sikkerhetstiltak
    SIK

    # Regnskap/utbetaling
    STO

    # Supplerende stønad
    SUP

    # Sykepenger
    SYK

    # Sykmeldinger
    SYM

    # Tiltak
    TIL

    # Trekkhåndtering
    TRK

    # Trygdeavgift
    TRY

    # Tilleggsstønad
    TSO

    # Tilleggsstønad arbeidssøkere
    TSR

    # Unntak fra medlemskap
    UFM

    # Uføretrygd
    UFO

    # Ukjent
    UKJ

    # Ventelønn
    VEN

    # Yrkesrettet attføring
    YRA

    # Yrkesskade / Menerstatning
    YRK
}

# Typen variant som returneres. Dette er normalt **ARKIV**, men kan også være **SLADDET**,**PRODUKSJON**, **PRODUKSJON_DLF** eller **FULLVERSJON**.
enum Variantformat {
    # Den *"offisielle"* versjonen av et dokument, som er beregnet på visning og langtidsbevaring. I de fleste tilfeller er arkivvarianten lik dokumentet brukeren sendte inn eller mottok (digitalt eller på papir).
    # * Arkivvarianten er alltid i menneskelesbart format, som PDF, PDF/A eller PNG.
        # * Alle dokumenter har en arkivvariant, med mindre bruker har fått innvilget vedtak om sletting eller skjerming av opplysninger i arkivet.
        ARKIV

    # Dette er en sladdet variant av originaldokumentet.
        # * **SLADDET** variant har ikke spesiell tilgangskontroll.
        SLADDET

    # Produksjonsvariant i eget proprietært format.
        # * Varianten finnes for dokumenter som er produsert i Metaforce eller Brevklient.
        PRODUKSJON

    # Produksjonsvariant i eget proprietært format.
        # * Varianten finnes kun for dokumenter som er produsert i Exstream Live Editor.
        PRODUKSJON_DLF

    # Variant av dokument som inneholder spørsmålstekster, hjelpetekster og ubesvarte spørsmål fra søknadsdialogen.
        # * Fullversjon genereres for enkelte søknadsskjema fra nav.no, og brukes ved klagebehandling.
        FULLVERSJON

    # Variant av dokumentet i strukturert format, f.eks. XML eller JSON.
        # * Originalvarianten er beregnet på maskinell lesning og behandling.
        ORIGINAL
}

# Dokumentstatus gir en indikasjon på hvorvidt dokumentet er ferdigstilt eller under arbeid, eventuelt avbrutt. Dersom dokumentet ikke har noen dokumentstatus, er dokumentet komplett / ferdigstilt.
    enum Dokumentstatus {
    # Dokumentet er under arbeid. Benyttes for redigerbare brev.
        UNDER_REDIGERING

    # Dokumentet er ferdigstilt. Benyttes for redigerbare brev.
        FERDIGSTILT

    # Dokumentet ble opprettet, men ble avbrutt under redigering. Benyttes for redigerbare brev.
        AVBRUTT

    # Dokumentet er kassert.
        KASSERT
}

# Forteller hvordan to eller flere journalposter er relatert til hverandre.
    enum Tilknytning {
    # Ved tilknytningstype 'Gjenbruk', deler to journalposter samme dokumentInfo og underliggende dokumenter. Dette vil typisk være tilfelle når et inngående dokument journalføres på flere saker/brukere.
        GJENBRUK
}

# Indikator på hvilken type id som brukes i spørringen.
    enum AvsenderMottakerIdType {
    # Folkeregisterets fødselsnummer eller d-nummer for en person.
        FNR

    # Foretaksregisterets organisasjonsnummer for en juridisk person.
        ORGNR

    # Helsepersonellregisterets identifikator for leger og annet helsepersonell.
        HPRNR

    # Unik identifikator for utenlandske institusjoner / organisasjoner. Identifikatorene vedlikeholdes i EUs institusjonskatalog.
        UTL_ORG

    # AvsenderMottakerId er tom
    NULL

    # Ukjent IdType
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
