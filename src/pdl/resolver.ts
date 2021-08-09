import { lesMockFilUtenParse } from '../common';
import dayjs from 'dayjs';
import { GQLPerson, GQLFoedsel, GQLNavn } from './types';
import { IRestScenarioPerson } from '../scenario/typer';
import { scenarioCache } from '../scenario/cache';

export const metadata = {
    endringer: [],
    master: 'true',
    historisk: false,
};

const lagPersonFraCache = (ident: string): GQLPerson | undefined => {
    try {
        const defaultPerson: GQLPerson = JSON.parse(lesMockFilUtenParse(`person_default.json`));
        const cachetPerson: IRestScenarioPerson | undefined = scenarioCache[ident];

        if (cachetPerson === undefined) {
            return hentPerson(ident);
        }

        return {
            ...defaultPerson,
            foedsel: [
                {
                    foedselsdato: cachetPerson.fødselsdato,
                    metadata,
                },
            ],
            navn: [
                {
                    fornavn: cachetPerson.fornavn,
                    etternavn: cachetPerson.etternavn,
                    metadata,
                },
            ],
            bostedsadresse: cachetPerson.bostedsadresser
                ? cachetPerson.bostedsadresser
                : defaultPerson.bostedsadresse,
            statsborgerskap: cachetPerson.statsborgerskap
                ? cachetPerson.statsborgerskap
                : defaultPerson.statsborgerskap,
            forelderBarnRelasjon: cachetPerson.forelderBarnRelasjon!!,
        };
    } catch {
        return undefined;
    }
};

const hentPerson = (ident: string): GQLPerson | undefined => {
    try {
        const person: GQLPerson = JSON.parse(lesMockFilUtenParse(`person_${ident}.json`));

        person.foedsel = person.foedsel.map((fødsel: GQLFoedsel) => {
            if (
                person.navn.filter((navn: GQLNavn) => navn.mellomnavn === 'fødselshendelse')
                    .length >= 1
            ) {
                return {
                    ...fødsel,
                    foedselsdato: dayjs().startOf('month').format('YYYY-MM-DD'),
                };
            } else {
                return fødsel;
            }
        });

        return person;
    } catch {
        return undefined;
    }
};

export default {
    Query: {
        hentPerson(_obj: any, args: any, _context: any, _info: any) {
            const person = lagPersonFraCache(args.ident);

            if (person === undefined) {
                throw new Error('Personen finnes ikke');
            } else {
                return person;
            }
        },
        hentIdenter(_obj: any, args: any, _context: any, _info: any) {
            const cachetPerson: IRestScenarioPerson | undefined = scenarioCache[args.ident];
            return {
                identer: [
                    {
                        ident: cachetPerson ? cachetPerson.ident : args.ident,
                        gruppe: 'FOLKEREGISTERIDENT',
                        historisk: false,
                    },
                    {
                        ident: cachetPerson ? cachetPerson.aktørId : 9876543210123,
                        gruppe: 'AKTORID',
                        historisk: false,
                    },
                ],
            };
        },
    },
};
