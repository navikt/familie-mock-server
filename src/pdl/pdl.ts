/* tslint:disable */
import { Express } from 'express';
import grahqlHttp from 'express-graphql';
import schema from './schema';

export default (app: Express) => {
    app.post(
        '/rest/api/pdl/graphql',
        grahqlHttp({
            schema: schema,
            graphiql: true,
        }),
    );
    app.get(
        '/rest/api/pdl/graphql',
        grahqlHttp({
            schema: schema,
            graphiql: true,
        }),
    );
};
