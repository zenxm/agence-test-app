import bookshelf from '../config/bookshelf';
import OrderService from './orderService.model';

const TABLE_NAME = 'cao_salario';

/**
 * User model.
 */

const SalaryModel = bookshelf.Model.extend({
	tableName: TABLE_NAME,
});

export default SalaryModel;
