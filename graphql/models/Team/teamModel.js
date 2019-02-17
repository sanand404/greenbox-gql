import logger from '../../../lib/logging/loggingService';
import rdsService from '../../../lib/rds/rdsService';
import { RDS_PROCEDURE } from '../../../constants/rds';

class TeamModel {

  /**
   * This method fetch and returns all team records
   * @returns {Promise<Object>} - A promise resolveing the tax corrections records
   */
  fetchTeam = async () => {
    let response = null;
    try {
      const sqlQuery = `CALL ${RDS_PROCEDURE.LIST_TEAM}`;

      const queryValues = [];

      response = await rdsService.query({
        sql: sqlQuery,
        inserts: queryValues
      });
      logger.debug('GQL::Query::Transactions::fetchTeam::response:: ', response);
      return Promise.resolve(response[0]);
    }
    catch (error) {
      logger.error('GQL::QUERY::Team::fetchTeam::Error', error);
      return Promise.reject(error);
    }
  }
}

export default new TeamModel();
