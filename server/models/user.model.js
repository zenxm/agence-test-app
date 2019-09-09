import bookshelf from '../config/bookshelf';
import Permissions from './permission.model';

const TABLE_NAME = 'cao_usuario';

/**
 * User model.
 */

const User = bookshelf.Model.extend({
  tableName: TABLE_NAME,
  permissao() {
    return this.hasOne(Permissions, 'co_usuario', 'co_usuario');
  },
});

export default User;
