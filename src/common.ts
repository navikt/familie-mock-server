import fs from 'fs';
import path from 'path';
import shortid from 'shortid';
import { Express, Request, Response, NextFunction } from 'express';

export const configureLatency = (app: Express) => {
    app.use((_req: Request, _res: Response, next: NextFunction) => {
        setTimeout(next, Math.floor(Math.random() * 300 + 100));
    });
};

export const getId = () => {
    return shortid.generate();
};

export const lesMockFil = (filnavn: string): string => {
    try {
        return JSON.parse(fs.readFileSync(path.join(__dirname, '/mocks/' + filnavn), 'UTF-8'));
    } catch (err) {
        throw err;
    }
};
