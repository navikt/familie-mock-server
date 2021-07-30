import { lesMockFilUtenParse } from '../common';
import dayjs from 'dayjs';
import { Person, Foedsel, Navn } from './types';
import { IRestScenarioPerson } from '../scenario/typer';
import { scenarioCache } from '../scenario/cache';

const lagPersonFraCache = (ident: string): Person | undefined => {
    try {
        const defaultPerson: Person = JSON.parse(lesMockFilUtenParse(`person_default.json`));
        const cachetPerson: IRestScenarioPerson | undefined = scenarioCache[ident];

        if (cachetPerson === undefined) {
            return hentPerson(ident);
        }

        defaultPerson.foedsel = [
            {
                foedselsdato: cachetPerson.fødselsdato,
            },
        ];
        defaultPerson.navn = [
            {
                fornavn: cachetPerson.fornavn,
                etternavn: cachetPerson.etternavn,
            },
        ];
        defaultPerson.bostedsadresse = cachetPerson.bostedsadresser;
        defaultPerson.statsborgerskap = cachetPerson.statsborgerskap;

        defaultPerson.familierelasjoner = cachetPerson.familierelasjoner!!;
        defaultPerson.forelderBarnRelasjon = cachetPerson.familierelasjoner!!;

        return defaultPerson;
    } catch {
        return undefined;
    }
};

const hentPerson = (ident: string): Person | undefined => {
    try {
        const person: Person = JSON.parse(lesMockFilUtenParse(`person_${ident}.json`));

        person.foedsel = person.foedsel.map((fødsel: Foedsel) => {
            if (
                person.navn.filter((navn: Navn) => navn.mellomnavn === 'fødselshendelse').length >=
                1
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
