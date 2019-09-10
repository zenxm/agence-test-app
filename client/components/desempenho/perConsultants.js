import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Container, Select, Button, InputLabel } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import MaterialIcon from 'react-material-iconic-font';
import { CONSULTANTS, RELATORIO, GRAPH, PIZZA } from '../../redux/constants/entity';
import { years, months } from '../../constants/ConsultantsFilter';
import * as crudAction from '../../redux/actions/crudAction';
import TableDesempenho from './assets/table';
import GraphDesempenho from './assets/graph';
import PizzaGraphDesempenho from './assets/pizzaGraph';
import IsMobile from '../../utils/isMobile';

const styles = () => ({
  menuButton: {
    marginLeft: 45,
  },
  menuButtonShift: {
    marginLeft: -15,
  },
  flex: {
    flex: 1,
  },
  mainContainer: {
    border: 'solid 1px gray',
    display: 'grid',
    gridTemplateColumns: '20% 60% 20%',
    padding: 'unset',
  },
  mainContainerMobile: {
    border: 'solid 1px gray',
    display: 'grid',
    gridTemplateColumns: '1fr',
    padding: 'unset',
  },
  containerTitles: {
    backgroundColor: '#c1cdd9',
    border: 'solid 1px gray',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: '10px',
  },
  formControl: {
    display: 'grid',
    gridTemplateColumns: '1fr auto 1fr',
    margin: '20px auto',
    padding: '10px',
  },
  actions: {
    gridRowStart: 1,
    gridRowEnd: 3,
    gridColumnStart: 3,
    display: 'grid',
    gridRowGap: '10px',
    padding: '20px 40px',
    borderLeft: 'solid 1px black',
  },
  actionsMobile: {
    gridRowStart: 3,
    gridRowEnd: 4,
    gridColumnStart: 1,
    display: 'grid',
    gridRowGap: '10px',
    padding: '20px 40px',
  },
  arrowContainer: {
    display: 'grid',
    gridRowGap: '5px',
    margin: 'auto',
  },
  dateFilter: {
    marginRight: '5px',
  },
  filterContainer: {
    display: 'flex',
    alignItems: 'center',
    borderBottom: 'solid 1px black',
    padding: '10px',
  },
});

const PerConsultants = (props) => {
  const runOnce = true;
  const [visible, setVisible] = React.useState(null);
  const [clients, setClients] = React.useState({
    clients: [],
    selected: [],
    toSelect: [],
    fromSelect: [],
  });
  const [dateFilter, setDateFilter] = React.useState({
    monthFrom: months[0],
    yearFrom: years[0],
    monthTo: months[1],
    yearTo: years[0],
  });
  const [isMobile, setIsMobile] = React.useState(IsMobile());

  const onResize = () => {
    setIsMobile(IsMobile());
  };

  React.useEffect(
    () => {
      props.actions.fetchAll(CONSULTANTS);
      window.addEventListener('resize', onResize);
      return () => {
        window.removeEventListener('resize', onResize);
      };
    },
    [runOnce],
  );
  React.useEffect(
    () => {
      if (props.consultants && props.consultants.data && props.consultants.data.length)
        setClients((prev) => ({
          ...prev,
          clients: props.consultants.data.map((c) => ({ name: c.no_usuario, user: c.co_usuario })),
        }));
    },
    [props.consultants],
  );

  function handleChangeMultiple(event, type) {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push({ user: options[i].value, name: options[i].label });
      }
    }
    setClients((prev) => ({ ...prev, [type]: value }));
  }

  const handleSelect = (type) => {
    if (type === 'select' && clients.toSelect && clients.toSelect.length)
      setClients((prev) => ({
        selected: [...prev.selected, ...prev.toSelect],
        clients: prev.clients.filter(
          (client) => prev.toSelect.findIndex((sel) => sel.user === client.user) === -1,
        ),
        toSelect: [],
        fromSelect: [],
      }));
    else if (type === 'deselect' && clients.fromSelect && clients.fromSelect.length)
      setClients((prev) => ({
        clients: [...prev.clients, ...prev.fromSelect],
        selected: prev.selected.filter(
          (client) => prev.fromSelect.findIndex((sel) => sel.user === client.user) === -1,
        ),
        toSelect: [],
        fromSelect: [],
      }));
  };

  const handleFilterChange = (event, type) => {
    const { value } = event.target;
    setDateFilter((prev) => ({ ...prev, [type]: value }));
  };

  const getQuery = () => {
    const startDate = moment(`${dateFilter.yearFrom}-${dateFilter.monthFrom}-01`, 'YYYY-MM-DD')
      .startOf('month')
      .format();
    const endDate = moment(`${dateFilter.yearTo}-${dateFilter.monthTo}-01`, 'YYYY-MM-DD')
      .endOf('month')
      .format();
    return {
      consultants: clients.selected.map((c) => c.user),
      startDate,
      endDate,
    };
  };

  const handleRelatorio = () => {
    props.actions.fetchWithQuery(RELATORIO, getQuery());
    setVisible('relatorio');
  };

  const handleGraph = () => {
    props.actions.fetchWithQuery(GRAPH, getQuery());
    setVisible('graph');
  };

  const handlePizza = () => {
    props.actions.fetchWithQuery(PIZZA, getQuery());
    setVisible('pizza');
  };

  const { classes } = props;
  return (
    <div>
      <Container className={isMobile ? classes.mainContainerMobile : classes.mainContainer}>
        <Container
          style={{ borderBottom: 'solid 1px black', display: isMobile ? 'none' : 'block' }}
          className={classes.containerTitles}
        >
          Período
        </Container>
        <Container className={classes.filterContainer}>
          <Select
            native
            value={dateFilter.monthFrom}
            className={classes.dateFilter}
            onChange={(e) => handleFilterChange(e, 'monthFrom')}
          >
            {months.map((month) => (
              <option key={month.value} value={month.value}>
                {month.short}
              </option>
            ))}
          </Select>
          <Select
            native
            value={dateFilter.yearFrom}
            className={classes.dateFilter}
            onChange={(e) => handleFilterChange(e, 'yearFrom')}
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </Select>
          <div className={classes.dateFilter}>a</div>
          <Select
            native
            value={dateFilter.monthTo}
            className={classes.dateFilter}
            onChange={(e) => handleFilterChange(e, 'monthTo')}
          >
            {months.map((month) => (
              <option key={month.value} value={month.value}>
                {month.short}
              </option>
            ))}
          </Select>
          <Select
            native
            value={dateFilter.yearTo}
            onChange={(e) => handleFilterChange(e, 'yearTo')}
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </Select>
        </Container>
        <Container
          className={classes.containerTitles}
          style={{ display: isMobile ? 'none' : 'block' }}
        >
          Consultors
        </Container>
        <div className={classes.formControl}>
          <Select
            multiple
            native
            value={clients.toSelect.map((c) => c.user)}
            onChange={(e) => handleChangeMultiple(e, 'toSelect')}
          >
            {clients.clients.map((c) => (
              <option key={c.user} value={c.user}>
                {c.name}
              </option>
            ))}
          </Select>
          <Container className={classes.arrowContainer}>
            <Button variant="outlined" onClick={() => handleSelect('select')}>
              <MaterialIcon type="forward" />
            </Button>
            <Button variant="outlined" onClick={() => handleSelect('deselect')}>
              <MaterialIcon type="forward" rotate={180} />
            </Button>
          </Container>
          <Select
            multiple
            native
            value={clients.fromSelect.map((c) => c.user)}
            onChange={(e) => handleChangeMultiple(e, 'fromSelect')}
          >
            {clients.selected.map((c) => (
              <option key={c.user} value={c.user}>
                {c.name}
              </option>
            ))}
          </Select>
        </div>
        <Container className={isMobile ? classes.actionsMobile : classes.actions}>
          <Button variant="outlined" onClick={handleRelatorio}>
            <span style={{ marginRight: '5px' }}>
              <MaterialIcon type="file" />
            </span>
            <div>Relatório</div>
          </Button>
          <Button variant="outlined" onClick={handleGraph}>
            <span style={{ marginRight: '5px' }}>
              <MaterialIcon type="view-dashboard" rotate={180} />
            </span>
            <div>Gráfico</div>
          </Button>
          <Button variant="outlined" onClick={handlePizza}>
            <span style={{ marginRight: '5px' }}>
              <MaterialIcon type="pizza" rotate={180} />
            </span>
            <div>Pizza</div>
          </Button>
        </Container>
      </Container>
      {visible === 'relatorio' ? (
        <TableDesempenho data={props.relatorio && props.relatorio.data} />
      ) : null}
      {visible === 'graph' ? (
        <GraphDesempenho
          data={props.graph && props.graph.data}
          consultants={clients.selected.map((c) => c.name)}
        />
      ) : null}
      {visible === 'pizza' ? (
        <PizzaGraphDesempenho
          data={props.pizza && props.pizza.data}
          consultants={clients.selected.map((c) => c.name)}
        />
      ) : null}
    </div>
  );
};

PerConsultants.propTypes = {
  classes: PropTypes.object.isRequired,
  consultants: PropTypes.object,
  relatorio: PropTypes.object,
  graph: PropTypes.object,
  pizza: PropTypes.object,
};

const mapStateToProps = (state) => ({
  consultants: state.crud.consultants,
  relatorio: state.crud.relatorio,
  graph: state.crud.graph,
  pizza: state.crud.pizza,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Object.assign({}, crudAction), dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(PerConsultants));
