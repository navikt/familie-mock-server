# familie-mock-server
Enkel server for mocking av data som brukes for lokal utvikling og til ende-til-ende tester for familie området.

# Kom i gang med utvikling

* Installere avhengigheter `yarn`
* Starte dev-server `yarn start:dev`. Denne kommandoen starter tsc-watch som følger med på oppdateringer i filer og re-kompilerer automatisk filene.

Pakkestrukturen er satt opp ved package-by-feature som betyr at hver tjeneste får sin egen mappe med all logikk.

# Bygg og deploy
Appen bygges på github actions og deployer nytt docker image til github package repo som kan brukes til e2e testene eller for lokal utvikling.

# Henvendelser

Spørsmål knyttet til koden eller prosjektet kan rettes til:

* Henning Håkonsen, `henning.hakonsen@nav.no`

## For NAV-ansatte

Interne henvendelser kan sendes via Slack i kanalen #team-familie.