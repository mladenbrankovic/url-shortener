import { connect, connection as db } from 'mongoose';
import { dbHost } from '~/src/config';
import { error, inform, log } from '../util/logger';

export function initMongo() {
  log('Initializing MongoDB');

  db.on('error', err => error(err));
  db.once('open', () => inform('Connected to MongoDB'));

  connect(`mongodb://${dbHost}/urls`, { useNewUrlParser: true, useUnifiedTopology: true });
}
