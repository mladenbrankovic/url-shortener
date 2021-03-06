import cors from 'cors';
import express, { json } from 'express';
import router from '~/src/api/router';
import { initSwagger } from '~/src/api/swagger';
import { appPort } from '~/src/config';
import { initMongo } from '~/src/db/mongo';
import { access, notify } from '~/src/util/logger';

const app = express();

app.use(json());
app.use(cors());

initMongo();
initSwagger(app);

// Middleware which logs each access to the console.
app.use((req, res, next) => {
  access(`${req.method} ${req.originalUrl}`);
  next();
});

app.use('/', router);

app.listen(appPort, () => {
  notify(`Server live on port ${appPort}`);
});
