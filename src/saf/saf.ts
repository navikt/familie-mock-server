/* tslint:disable */
import { Express } from 'express';
import grahqlHttp from 'express-graphql';
import schema from './schema';

export default (app: Express) => {
    app.post(
        '/rest/api/saf/graphql',
        grahqlHttp({
            schema: schema,
            graphiql: true,
        }),
    );
};
