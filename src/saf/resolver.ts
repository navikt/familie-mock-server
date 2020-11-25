import { lesMockFil } from '../common';

const hentJournalpost = (ident: string) => {
    try {
        return lesMockFil(`journalpost_${ident}.json`);
    } catch {
        return lesMockFil(`journalpost_default.json`);
    }
};

export default {
    Query: {
        journalpost(_obj: any, args: any, _context: any, _info: any) {
            const journalpost = hentJournalpost(args.journalpostId);

            if (journalpost === undefined) {
                throw new Error('Journalpost finnes ikke');
            } else {
                return journalpost;
            }
        },
    },
};
