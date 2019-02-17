import * as mysql from 'promise-mysql';
import dotenv from 'dotenv';
import logger from '../logging/loggingService';

dotenv.load();

class RDSService {

  _connectionProps = null;

  constructor() {
    const _rdsPort = parseInt(process.env.DB_RDS_PORT);
    const _rdsHostname = process.env.DB_RDS_HOSTNAME;
    const _rdsUsername = process.env.DB_RDS_USERNAME;
    const _rdsPassword = process.env.DB_RDS_PASSWORD;
    const _rdsDatabase = process.env.DB_RDS_DATABASE;


    this._connectionProps = {
      host: _rdsHostname,
      user: _rdsUsername,
      password: _rdsPassword,
      database: _rdsDatabase,
      port: _rdsPort,
      supportBigNumbers: true,
      bigNumberStrings: true,
      // ssl: 'Amazon RDS'
    };
  }

  /**
   * The method will execute a given query after escaping it as needed with values from the inserts array
   * @param {String} sql - The sql query. eg "SELECT * FROM ?? WHERE ?? = ?";
   * @param {Array[String]} inserts array of strings for the placeholders in sql.  eg: ['users', 'id', userId];
   * @returns {Promise<void>} A promise resolving to the query results
   */
  query = async ({ sql, inserts }) => {
    logger.debug('rdsService::query::Args::sql::%s ', sql);
    logger.debug('rdsService::query::Args::inserts:: ', inserts);
    if (this._connectionProps === null) {
      logger.error('rdsService::query::ConnectError::_connectionProps failed to initialize');
      return Promise.reject('_connectionProps failed to initialize');
    }

    let conn = null;
    try {
      conn = await mysql.createConnection(this._connectionProps);
    }
    catch (error) {
      logger.error('rdsService::query::ConnectErrorProps::', this._connectionProps);
      logger.error('rdsService::query::ConnectError::', error);
      return Promise.reject(error);
    }

    let response = null;
    try {
      response = await conn.query(sql, inserts);
      logger.debug('rdsService::query::QueryResponse::', response);
      return Promise.resolve(response);
    }
    catch (error) {
      logger.error('rdsService::query::QueryError::', error);
      return Promise.reject(error);
    }
    finally {
      await conn.end();
    }
  }
}
export default new RDSService();
