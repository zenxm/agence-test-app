import bookshelf from '../config/bookshelf';
import Users from './user.model';

const TABLE_NAME = 'cao_os';

/**
 * User model.
 */

const OrderService = bookshelf.Model.extend({
  tableName: TABLE_NAME,
  consultants() {
    return this.hasOne(Users, 'co_usuario', 'co_usuario');
  },
});

export default OrderService;
