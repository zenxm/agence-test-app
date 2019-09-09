import bookshelf from '../config/bookshelf';

const TABLE_NAME = 'permissao_sistema';

/**
 * User model.
 */
class Permissions extends bookshelf.Model {
  /**
   * Get table name.
   */
  get tableName() {
    return TABLE_NAME;
  }

  /**
   * Table has timestamps.
   */
  get hasTimestamps() {
    return true;
  }
}

export default Permissions;
