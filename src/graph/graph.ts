import { Express, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

export default (app: Express) => {
    app.get('/graph/me', (_: Request, res: Response) => {
        res.json({
            id: uuidv4(),
            onPremisesSamAccountName: 'Z111111',
            userPrincipalName: 'test.testesen@nav.no',
            displayName: 'Test Testersen',
            givenName: 'Test',
            surname: 'Testesen',
            enhet: '8888',
            officeLocation: '1234',
        });
    });

    app.get('/graph/users', (_: Request, res: Response) => {
        res.json([
            {
                id: uuidv4(),
                onPremisesSamAccountName: 'Z111111',
                userPrincipalName: 'test.testesen@nav.no',
                displayName: 'Test Testersen',
                givenName: 'Test',
                surname: 'Testesen',
                enhet: '8888',
                officeLocation: '1234',
            },
        ]);
    });
};
