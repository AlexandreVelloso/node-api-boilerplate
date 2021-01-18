import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { Model } from 'objection';
import express from 'express';

import routes from './Routes';
import knex from '../database/connection';

Model.knex(knex);

const app = express();

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.json());

app.use(routes);

export default app;