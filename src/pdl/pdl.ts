/* tslint:disable */
import { Express } from 'express';
import grahqlHttp from 'express-graphql';
import schema from './schema';
import { logInfo } from '../logging';

export default (app: Express) => {
    logInfo('pdl configure');
    app.use(
        '/rest/api/pdl',
        grahqlHttp({
            schema: schema,
            graphiql: true,
        }),
    );
};
