import bookshelf from '../config/bookshelf';
import OrderService from './orderService.model';

const TABLE_NAME = 'cao_fatura';

/**
 * User model.
 */

const Invoice = bookshelf.Model.extend({
  tableName: TABLE_NAME,
  orderService() {
    return this.hasOne(OrderService, 'co_os', 'co_os');
  },
});

export default Invoice;
