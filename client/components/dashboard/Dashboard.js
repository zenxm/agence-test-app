import React from 'react';
import { Tab, Tabs } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TabPanel from '../common/tabPanel';
// import { AddShoppingCart, ThumbUp, Assessment, Face } from '@material-ui/icons';
//
// import SummaryBox from './SummaryBox';
// import Product from './Product';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

const Dashboard = () => {
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <div>
      <Tabs value={value} onChange={handleChange} indicatorColor="primary" textColor="primary">
        <Tab label="Por Consultor" />
        <Tab label="Por Cliente" />
      </Tabs>
      <TabPanel value={value} index="one">
        Item One
      </TabPanel>
      <TabPanel value={value} index="two">
        Item Two
      </TabPanel>
    </div>
  );
};

export default Dashboard;
