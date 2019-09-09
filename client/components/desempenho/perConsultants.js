import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Container, Select, Button, InputLabel } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import MaterialIcon from 'react-material-iconic-font';
import { CONSULTANTS } from '../../redux/constants/entity';
import { years, months } from '../../constants/ConsultantsFilter';
import * as crudAction from '../../redux/actions/crudAction';

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
  },
  actions: {
    gridRowStart: 1,
    gridRowEnd: 3,
    gridColumnStart: 3,
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
  },
});

const PerConsultants = (props) => {
  const runOnce = true;
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

  React.useEffect(
    () => {
      props.actions.fetchAll(CONSULTANTS);
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

  const handleRelatorio = () => {};

  const handleGraph = () => {};

  const handlePizza = () => {};

  const { classes } = props;
  return (
    <Container className={classes.mainContainer}>
      <Container style={{ borderBottom: 'solid 1px black' }} className={classes.containerTitles}>
        Período
      </Container>
      <Container style={{ borderBottom: 'solid 1px black' }} className={classes.filterContainer}>
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
        <Select native value={dateFilter.yearTo} onChange={(e) => handleFilterChange(e, 'yearTo')}>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </Select>
      </Container>
      <Container className={classes.containerTitles}>Consultors</Container>
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
      <Container style={{ borderLeft: 'solid 1px black' }} className={classes.actions}>
        <Button variant="outlined" onClick={handleRelatorio}>
          <span style={{ marginRight: '5px' }}>
            <MaterialIcon type="file" />
          </span>
          Relatório
        </Button>
        <Button variant="outlined" onClick={handleGraph}>
          <span style={{ marginRight: '5px' }}>
            <MaterialIcon type="view-dashboard" rotate={180} />
          </span>
          Gráfico
        </Button>
        <Button variant="outlined" onClick={handlePizza}>
          <span style={{ marginRight: '5px' }}>
            <MaterialIcon type="pizza" rotate={180} />
          </span>
          Pizza
        </Button>
      </Container>
    </Container>
  );
};

PerConsultants.propTypes = {
  classes: PropTypes.object.isRequired,
  consultants: PropTypes.object,
};

const mapStateToProps = (state) => ({
  consultants: state.crud.consultants,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Object.assign({}, crudAction), dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(PerConsultants));
