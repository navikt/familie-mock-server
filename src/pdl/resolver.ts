import { lesMockFilUtenParse } from '../common';
import dayjs from 'dayjs';
import { Person, Foedsel, Navn } from './types';

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
            const person = hentPerson(args.ident);

            if (person === undefined) {
                throw new Error('Personen finnes ikke');
            } else {
                return person;
            }
        },
        hentIdenter(_obj: any, args: any, _context: any, _info: any) {
            return {
                identer: [
                    {
                        ident: args.ident,
                        gruppe: 'FOLKEREGISTERIDENT',
                        historisk: false,
                    },
                    {
                        ident: 9876543210123,
                        gruppe: 'AKTORID',
                        historisk: false,
                    },
                ],
            };
        },
    },
};
