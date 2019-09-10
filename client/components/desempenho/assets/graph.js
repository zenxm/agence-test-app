import React from 'react';
import {
  ComposedChart,
  Line,
  Scatter,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  title: {
    margin: '25px',
  },
}));

const colors = [
  '#413ea0',
  '#82ca9d',
  '#FF8042',
  '#a0004a',
  '#ca91be',
  '#9d7fff',
  '#ff0f00',
  '#00fe33',
  '#000000',
  '#cabc91',
  '#FFBB28',
  '#0088FE',
  '#ff239c',
  '#ffe400',
  '#0001fe',
];

const GraphDesempenho = (props) => {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <div className={classes.title}>Desempenho Graph</div>
      <ResponsiveContainer width="100%" height={400}>
        <ComposedChart
          data={props.data}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          {props.consultants &&
            props.consultants.length &&
            props.consultants.map((name, index) => (
              <Bar key={name} dataKey={name} barSize={50} fill={colors[index]} />
            ))}
          <Line type="monotone" dataKey="cuxtoFijoMedio" stroke="#ff7300" />
        </ComposedChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default GraphDesempenho;
