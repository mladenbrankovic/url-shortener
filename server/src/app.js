// import { json } from 'body-parser';
import express, { json } from 'express';
import router from '~/src/api/router';
import { initSwagger } from '~/src/api/swagger';
import { port } from '~/src/config';
import { initMongo } from '~/src/db/mongo';
import { access, notify } from '~/src/util/logger';

const app = express();

app.use(json());

initMongo();
initSwagger(app);

app.use((req, res, next) => {
  access(req.originalUrl);
  next();
});

app.use('/', router);

app.listen(port, () => {
  notify(`Server live on port ${port}`);
});
