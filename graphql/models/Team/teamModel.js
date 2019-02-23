import _ from 'lodash';
import logger from '../../../lib/logging/loggingService';
import rdsService from '../../../lib/rds/rdsService';
import { RDS_PROCEDURE, RDS_TABLES } from '../../../constants/rds';

class TeamModel {

  /**
   * This method fetch and returns all team records
   * @returns {Promise<Object>} - A promise resolving the team records
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
      logger.debug('GQL::Query::TeamModel::fetchTeam::response:: ', response);
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
    try {
      const { id, teamName } = params.teamDetails;

      const sqlQuery = `SELECT * FROM ${RDS_TABLES.TEAM} WHERE ?? = ?`;
      const queryValues = ['teamName', teamName];
      const response = await rdsService.query({ sql: sqlQuery, inserts: queryValues });

      logger.debug('GQL::Mutation::TeamModel::upsertTeam::response:: ', response);

      // If `ID` exists then update `Team`
      if (id) {
        return Promise.resolve(this.updateTeam(params));
      }
      // If response true then throw error
      else if (response.length) {
        return Promise.reject(`${teamName} is already exists`);
      }

      // If response is null/false create the new team
      return Promise.resolve(this.createTeam(params));

    }
    catch (error) {
      logger.error('GQL::Mutation::TeamModel:upsertTeam::Error:: ', error);
      return Promise.reject(error);
    }
  }

  /**
   * This method create the team
   * @params params - The team input object
   * @returns {Promise<Object>} - A promise resolving the Team record
   */
  createTeam = async (params) => {
    let response = null;
    const { teamName, teamFlag, isActive } = params.teamDetails;
    try {
      // Procedure call to create the team
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
      logger.info('GQL::Mutation::TeamModel::createTeam::response', response[0]);
      return Promise.resolve(response[0]);
    }
    catch (error) {
      logger.error('GQL::Mutation::TeamModel:createTeam::Error', error);
      return Promise.reject(error);
    }
  }

  /**
   * This method update the team detail
   * @params params - The team input object
   * @returns {Promise<Object>} - A promise resolving Team updated record
   */
  updateTeam = async(params) => {
    try {
      const insertColumnValues = [];
      let insertColumnName = '';
      const { id, teamName, teamFlag, isActive } = params.teamDetails;

      const allColumns = {
        teamName: teamName || null,
        teamFlag: teamFlag || null,
        isActive: isActive || null,
        teamCreatedAt: new Date().toISOString(),
        teamUpdatedAt: new Date().toISOString()
      };

      // Iterate the allColumns and assign the value if it exists in param
      let flag = true;
      _.map(allColumns, (item, index, count) => {
        console.log('index ', item, index);
        if (flag && item) {
          flag = false;
          insertColumnName += '?? = ?';
          insertColumnValues.push(index);
          insertColumnValues.push(item);
        }
        else if (item) {
          insertColumnName += ',?? = ?';
          insertColumnValues.push(index);
          insertColumnValues.push(item);
        }
      });

      const sqlQuery = `UPDATE ${RDS_TABLES.TEAM} SET ${insertColumnName} WHERE idTeam = ${id}`;

      const response = await rdsService.query({
        sql: sqlQuery,
        inserts: insertColumnValues
      });

      logger.debug('GQL::Mutation::TeamModel::updateTeam::response:: ', response);

      // ToDo:: Return updated `Team` record
      return Promise.resolve(response);
    }
    catch (error) {
      logger.error('GQL::Mutation::TeamModel:updateTeam::Error:: ', error);
      return Promise.reject(error);
    }
  }
}

export default new TeamModel();
