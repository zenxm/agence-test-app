import bookshelf from '../config/bookshelf';

const TABLE_NAME = 'permissao_sistema';

/**
 * Permissions model.
 */
const Permissions = bookshelf.Model.extend({
  tableName: TABLE_NAME,
});

export default Permissions;
