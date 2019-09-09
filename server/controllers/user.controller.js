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

export function findAllConsultants(req, res) {
  User.query((qb) => {
    qb.distinct()
      .innerJoin('permissao_sistema', 'cao_usuario.co_usuario', '=', 'permissao_sistema.co_usuario')
      .where('co_sistema', '=', 1)
      .andWhere('in_ativo', '=', 'S')
      .andWhere('co_tipo_usuario', 'in', [0, 1, 2]);
    return qb;
  })
    .fetchAll({ withRelated: ['permissao'] })
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

export function getRelatorio(req, res) {
  User.forge()
    .fetchAll({ withRelated: ['permissao'] })
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

export function getGraph(req, res) {
  User.forge()
    .fetchAll({ withRelated: ['permissao'] })
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

export function getPizza(req, res) {
  User.forge()
    .fetchAll({ withRelated: ['permissao'] })
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
