import logger from '../../../lib/logging/loggingService';
import rdsService from '../../../lib/rds/rdsService';
import { RDS_PROCEDURE } from '../../../constants/rds';
import * as dbTeam from '../../../lib/dynamodb/team';

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

  /**
   * This function create the team
   * @function createTeam
   * @async
   * @param {Object} teamInput - An object containing team details
   * @param {Object} context - logged-in user
   * @return {Promise<Object>} - A promise resolving team object
   */
  createTeam = async (teamInput, context) => {
    logger.debug('GQL::Mutation::Team::Model::createTeam::teamInput:: ', teamInput);
    logger.debug('GQL::Mutation::Team::Model::createTeam::context:: ', context);

    const _teamInput = { ...teamInput.input };
    _teamInput.createdAt = new Date().toISOString();
    _teamInput.updatedAt = new Date().toISOString();

    try {
      const newTeam = await dbTeam.createTeam(_teamInput);
      logger.debug('GQL::Mutation::Team::Model::createTeam::newTeam:: ', newTeam);

      return Promise.resolve(newTeam);
    }
    catch (error) {
      logger.error('GQL::Mutation::Team::Model::createTeam::Error:: ', error);
      return Promise.reject(error);
    }
  }

  /**
   * The method to list all teams
   * @function createTeam
   * @async
   * @return {Promise<Object>} - A promise resolving the list of Team
   */
  listTeam = async() => {
    try {
      const teams = await dbTeam.listTeam();
      logger.info('GQL::Query::Team::Model::listTeam::team:: ', teams);

      return Promise.resolve(teams);
    }
    catch (error) {
      logger.error('GQL::Query::Team::Model::listTeam::Error: ', error);
      return Promise.reject(error);
    }
  }

}

export default new TeamModel();
