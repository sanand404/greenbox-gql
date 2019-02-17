import logger from '../../../lib/logging/loggingService';
import rdsService from '../../../lib/rds/rdsService';
import { RDS_PROCEDURE } from '../../../constants/rds';

class TeamModel {

  /**
   * This method fetch and returns all team records
   * @returns {Promise<Object>} - A promise resolveing the team records
   */
  fetchTeam = async () => {
    let response = null;
    try {
      const sqlQuery = `CALL ${RDS_PROCEDURE.LIST_TEAM}()`;

      const queryValues = [];

      response = await rdsService.query({
        sql: sqlQuery,
        inserts: queryValues
      });
      logger.info('GQL::Query::Team::fetchTeam::response:: ', response);
      return Promise.resolve(response[0]);
    }
    catch (error) {
      logger.error('GQL::QUERY::Team::fetchTeam::Error', error);
      return Promise.reject(error);
    }
  }

  /**
   * This method upsert the team details in Team
   * @params params - The input object
   * @returns {Promise<Object>} - A promise resolving the Team record
   */
  upsertTeam = async(params) => {
    let response = null;
    const { teamName, teamFlag, isActive } = params.teamDetails;
    try {
      const sqlQuery = `CALL ${RDS_PROCEDURE.CREATE_TEAM}(?,?,?,?,?)`;

      const queryValues = [teamFlag,
        teamName,
        new Date().toISOString().slice(0, 19).replace('T', ' '),
        new Date().toISOString().slice(0, 19).replace('T', ' '),
        isActive];

      response = await rdsService.query({
        sql: sqlQuery,
        inserts: queryValues
      });
      logger.info('GQL::Mutation::Team::upsertTeam::response', response[0]);
      return Promise.resolve(response[0]);
    }
    catch (error) {
      logger.error('GQL::Mutation::Team:upsertTeam::Error', error);
      return Promise.reject(error);
    }
  }
}

export default new TeamModel();
