import React from "react";
import PropTypes from "prop-types";
import "../../../styles/sass/component/_lib/_table/_dataTable.scss";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import DataTableTools from "./DataTableTools";
import DataTableHead from "./DataTableHead";
import LoadingDot from "../_spinner/LoadingDot";

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = Object.values(array).map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === "desc"
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3)
  },
  table: {
    minWidth: 1020,
    height: "auto"
  },
  tableWrapper: {
    overflowX: "auto"
  },
  loading:{
    margin: "0 auto"
  }
});

class DataTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      prevDataSource: [],
      dataSource: [],
      columns: [],
      order: "asc",
      orderBy: "",
      selected: [],
      page: 0,
      rowsPerPage: 7,
      selectTable: false,
      showFilter: true,
      isLoading: this.props.isLoading,
      stae: false
    };
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = "desc";

    if (this.state.orderBy === property && this.state.order === "desc") {
      order = "asc";
    }

    this.setState({ order, orderBy });
  };

  handleSelectAllClick = event => {
    debugger;
    if (event.target.checked) {
      this.setState(state => ({ selected: this.state.dataSource.map(n => n.id) }));
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  static getDerivedStateFromProps(nextProps, prevState){
    if (JSON.stringify(nextProps.dataSource) !== JSON.stringify(prevState.prevDataSource)) {
        return { 
          prevDataSource: nextProps.dataSource,
          dataSource: nextProps.dataSource, 
          columns: nextProps.columns 
        };
    }
    else return null; // Triggers no change in the state
  }

  handleFilterChange = (value) => {
    let filtered = [];
    let cols = [];
    let { dataSource, columns } = this.props;

    for(var prop in columns){ 
      cols.push(columns[prop].field);
    }
    if ( Object.values(dataSource).length > 0) {
      filtered = Object.values(dataSource).filter(e => {
        return Object.keys(e).some(s => {
          if (cols.includes(s)) {
            if(e[s] === undefined || e[s] === null){  return false;  }
            else if(typeof(e[s]) === 'object'){return e[s].name.toString().toUpperCase().includes(value.toString().toUpperCase()); }
            else{ return e[s].toString().toUpperCase().includes(value.toString().toUpperCase()); }
          } else {
            return false;
          }
        });
      });
    } else {
      filtered = [];
    }
    this.setState({ dataSource: filtered });
  };
  isSelected = id => this.state.selected.indexOf(id) !== -1;
  
  render() {
    const { classes, isLoading } = this.props;
    const { rowsPerPage, page, order, orderBy, dataSource, columns } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, Object.values(dataSource).length - page * rowsPerPage);
    const sortingData = stableSort(dataSource, getSorting(order, orderBy));
    const slicingData = sortingData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    return (
  
      <Paper className={classes.root}>
        { isLoading && <LoadingDot nclass="data-table"/> }
        <DataTableTools dataState={this.state}  onFilterChanged={this.handleFilterChange} />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <DataTableHead  dataConfig={this.state} columns={columns} dataSource={dataSource} onSelectAllClick={this.handleSelectAllClick} onRequestSort={this.handleRequestSort} />
            <TableBody>
              {
                slicingData.map((n, i) => {
                const isSelected = this.isSelected(n.id);
                return (
                  <TableRow hover role="checkbox" key={n.id} tabIndex={-1} onClick={event => this.handleClick(event, n.id)} aria-checked={isSelected} selected={isSelected} >
                    <TableCell padding="checkbox" key={`checkbox-row-${i}`}>
                       <Checkbox checked={isSelected} />
                    </TableCell>
                    {
                      Object.values(columns).map((col, index) => {
                       return <TableCell align="center" key={col.id+index}> 
                                {
                                 typeof(n[col.field]) === 'object' && n[col.field] !== null ? n[col.field].name : n[col.field]
                                }
                              </TableCell>;
                      })
                    }
                  </TableRow>
                );
              })
              }
              {
                emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />         
                </TableRow>
                )
              }
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={Object.values(dataSource).length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{ "aria-label": "Previous Page" }}
          nextIconButtonProps={{ "aria-label": "Next Page" }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}

DataTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DataTable);
