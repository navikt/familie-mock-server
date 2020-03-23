import { lesMockFil } from '../common';

const hentPerson = (ident: string) => {
    return lesMockFil(`person_${ident}.json`);
};

export default {
    Query: {
        hentPerson(_obj: any, args: any, _context: any, _info: any) {
            const person = hentPerson(args.ident);
            console.log(person);
            if (person === undefined) {
                throw new Error('Personen finnes ikke');
            } else {
                return person;
            }
        },
    },
};
