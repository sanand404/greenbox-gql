import uuid from 'uuid/v1';
import * as db from './dynamo';
import logger from '../logging/loggingService';

const TableName = 'greenbox-dev-team';

export function createTeam(args) {
  logger.debug('Dynamo::Team::create::Args:: ', args);

  const params = {
    TableName,
    Item: {
      id: uuid(),
      ...args
    }
  };

  logger.debug('Dynamo::Team::create::params:: ', params);
  return db.createItem(params);
}

export function listTeam() {
  const params = {
    TableName
  };

  logger.info('Dynamo::Team::listTeam::params:: ', params);
  return db.scan(params);
}
