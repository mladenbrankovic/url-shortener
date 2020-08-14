import { connect, connection as db } from 'mongoose';
import { dburl } from '~/src/config';
import { error, inform } from '../util/logger';

export function initMongo() {
  connect(`mongodb://${dburl}/urls`, { useNewUrlParser: true, useUnifiedTopology: true });

  db.on('error', (err) => error(err));
  db.once('open', () => inform('Connected to MongoDB'));
}
