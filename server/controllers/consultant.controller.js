import HttpStatus from 'http-status-codes';
import moment from 'moment';
import User from '../models/user.model';
import Salary from '../models/salary.model';
import knex from '../config/knex';

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
  const { startDate, endDate, consultants } = req.body;
  console.log('startDate', moment(startDate).format('YYYY-MM-DD'));
  knex
    .raw(
      `${'SELECT user.co_usuario,' +
        'MONTH(factura.data_emissao) as month,' +
        'YEAR(factura.data_emissao) as year, ' +
        'user.no_usuario, ' +
        'sum(factura.valor - (factura.valor * factura.total_imp_inc / 100)) as receita_liquida, ' +
        'sum((factura.valor - (factura.valor * factura.total_imp_inc / 100)) * factura.comissao_cn / 100) as comissao ' +
        'FROM  cao_fatura factura ' +
        'inner join cao_os orderService on factura.co_os=orderService.co_os ' +
        'inner join cao_usuario user on orderService.co_usuario=user.co_usuario ' +
        'where (user.co_usuario in ("'}${consultants
        .toString()
        .replace(/,/g, '","')}") and factura.data_emissao between "${moment(startDate).format(
        'YYYY-MM-DD',
      )}" and "${moment(endDate).format('YYYY-MM-DD')}") ` +
        `group by user.co_usuario, user.no_usuario, MONTH(factura.data_emissao), YEAR(factura.data_emissao) ` +
        `order by user.co_usuario, YEAR(factura.data_emissao), MONTH(factura.data_emissao)`,
    )
    .then((result) =>
      Salary.forge()
        .fetchAll()
        .then(async (salary) => {
          const relatorio = await handleRelatorio(result[0], salary.toJSON());
          console.log('relatorio', relatorio);
          return res.json({
            error: false,
            data: relatorio,
          });
        })
        .catch((err) =>
          res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            error: err,
          }),
        ),
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

const handleRelatorio = (data, salary) => {
  const relatorio = [];
  data.forEach((userData) => {
    const userSalary = salary.find((sal) => sal.co_usuario === userData.co_usuario);
    const brutSalario = userSalary ? userSalary.brut_salario : 0;

    const relatorioData = {
      user: userData.co_usuario,
      name: userData.no_usuario,
      month: userData.month,
      year: userData.year,
      receitaLiquida: userData.receita_liquida,
      cuxtoFijo: brutSalario,
      comissao: userData.comissao,
      lucro: userData.receita_liquida - userData.comissao - brutSalario,
    };
    relatorio.push(relatorioData);
  });
  const result = relatorio.reduce((acc, current) => {
    acc[current.user] = acc[current.user] || {};
    (acc[current.user].data = acc[current.user].data || []).push(current);
    acc[current.user].receitaLiquidaTotal =
      (acc[current.user].receitaLiquidaTotal || 0) + current.receitaLiquida;
    acc[current.user].cuxtoFijoTotal = (acc[current.user].cuxtoFijoTotal || 0) + current.cuxtoFijo;
    acc[current.user].comissaoTotal = (acc[current.user].comissaoTotal || 0) + current.comissao;
    acc[current.user].lucroTotal = (acc[current.user].lucroTotal || 0) + current.lucro;
    acc[current.user].name = current.name;
    return acc;
  }, {});
  return result;
};
