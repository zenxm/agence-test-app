import React from 'react';
import { Tab, Tabs } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TabPanel from '../common/tabPanel';
import PerClient from './perClients';
import PerConsultants from './perConsultants';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

const a11yProps = (index) => ({
  id: `wrapped-tab-${index}`,
  'aria-controls': `wrapped-tabpanel-${index}`,
});

const Desempenho = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState('one');

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <div className={classes.root}>
      <Tabs value={value} onChange={handleChange} indicatorColor="primary" textColor="primary">
        <Tab label="Por Consultor" value="one" {...a11yProps('one')} />
        <Tab label="Por Cliente" value="two" {...a11yProps('two')} />
      </Tabs>
      <TabPanel value={value} index="one">
        <PerConsultants />
      </TabPanel>
      <TabPanel value={value} index="two">
        <PerClient />
      </TabPanel>
    </div>
  );
};

export default Desempenho;
