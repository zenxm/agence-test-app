import HttpStatus from 'http-status-codes';
import User from '../models/user.model';

/**
 * Find all the users
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function findAll(req, res) {
  User.forge()
    .fetchAll()
    .then((user) =>
      res.json({
        error: false,
        data: user.toJSON(),
      }),
    )
    .catch((err) =>
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        error: err,
      }),
    );
}
