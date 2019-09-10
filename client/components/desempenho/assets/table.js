import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { months } from '../../../constants/ConsultantsFilter';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
  title: {
    margin: '15px',
  },
}));

const TableDesempenho = (props) => {
  const classes = useStyles();
  const { data } = props;
  return (
    <div>
      {data &&
        Object.keys(data).length &&
        Object.keys(data).map((key) => (
          <Paper key={key} className={classes.root}>
            <div className={classes.title}>{data[key] && data[key].name}</div>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Período</TableCell>
                  <TableCell align="right">Receita Líquida</TableCell>
                  <TableCell align="right">Custo Fixo</TableCell>
                  <TableCell align="right">Comissão</TableCell>
                  <TableCell align="right">Lucro</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data &&
                  data[key] &&
                  data[key].data &&
                  data[key].data.length &&
                  data[key].data.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell component="th" scope="row">
                        {`${months.find((m) => m.value === row.month).label} de ${row.year}`}
                      </TableCell>
                      <TableCell align="right">
                        {`${row.receitaLiquida < 0 ? '-R$ ' : 'R$ '}${row.receitaLiquida.toFixed(
                          2,
                        )}`}
                      </TableCell>
                      <TableCell align="right">
                        {`${row.cuxtoFijo < 0 ? '-R$ ' : 'R$ '}${row.cuxtoFijo.toFixed(2)}`}
                      </TableCell>
                      <TableCell align="right">
                        {`${row.comissao < 0 ? '-R$ ' : 'R$ '}${row.comissao.toFixed(2)}`}
                      </TableCell>
                      <TableCell align="right">
                        {`${row.lucro < 0 ? '-R$ ' : 'R$ '}${row.lucro.toFixed(2)}`}
                      </TableCell>
                    </TableRow>
                  ))}
                <TableRow key="Summary">
                  <TableCell component="th" scope="row">
                    Saldo
                  </TableCell>
                  <TableCell align="right">
                    {data &&
                      data[key] &&
                      `${data[key].receitaLiquidaTotal < 0 ? '-R$ ' : 'R$ '}${data[
                        key
                      ].receitaLiquidaTotal.toFixed(2)}`}
                  </TableCell>
                  <TableCell align="right">
                    {data &&
                      data[key] &&
                      `${data[key].cuxtoFijoTotal < 0 ? '-R$ ' : 'R$ '}${data[
                        key
                      ].cuxtoFijoTotal.toFixed(2)}`}
                  </TableCell>
                  <TableCell align="right">
                    {data &&
                      data[key] &&
                      `${data[key].comissaoTotal < 0 ? '-R$ ' : 'R$ '}${data[
                        key
                      ].comissaoTotal.toFixed(2)}`}
                  </TableCell>
                  <TableCell align="right">
                    {data &&
                      data[key] &&
                      `${data[key].lucroTotal < 0 ? '-R$ ' : 'R$ '}${data[key].lucroTotal.toFixed(
                        2,
                      )}`}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>
        ))}
    </div>
  );
};

export default TableDesempenho;
