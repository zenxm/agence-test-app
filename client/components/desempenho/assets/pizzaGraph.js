import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

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

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
    justifyItems: 'center',
    display: 'grid',
  },
  title: {
    margin: '25px',
  },
}));

const PizzaGraph = (props) => {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <div className={classes.title}>Pizza Graph</div>
      <PieChart width={400} height={400}>
        <Pie
          data={props.data}
          cx={200}
          cy={200}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={150}
          fill="#8884d8"
          dataKey="receitaLiquida"
        >
          <Legend />
          <Tooltip />
          {props.data &&
            props.data.length &&
            props.data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
        </Pie>
      </PieChart>
    </Paper>
  );
};

export default PizzaGraph;
