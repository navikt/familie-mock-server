import { lesMockFil } from '../common';

const hentPerson = (ident: string) => {
    try {
        return lesMockFil(`person_${ident}.json`);
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
                ],
            };
        },
    },
};
