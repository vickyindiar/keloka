import React from "react";
import PropTypes from "prop-types";
import "../../../styles/sass/component/_lib/_table/_dataTable.scss";
import {connect} from 'react-redux';
import { withStyles } from "@material-ui/core/styles";
import { handlePage, handleRowPage, handleRowClick, reSelect } from '../../../services/actions/tableAction'
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import DataTableTools from "./DataTableTools";
import DataTableHead from "./DataTableHead";



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

  render() {
    const { classes } = this.props;
    const { dataSource, columns, selected, rowsPerPage, page, order, orderBy } = this.props.tR;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, Object.values(dataSource).length - page * rowsPerPage);
    const sortingData = stableSort(dataSource, getSorting(order, orderBy));
    const slicingData = sortingData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    const cell = (n, i) => {
      let component = [];
      Object.values(columns).map((col, index) => {
        if( typeof(n[col.field]) === 'object' && n[col.field] !== null){
          component.push( <TableCell align="center" key={col.id+index}> { n[col.field].name } </TableCell> );
        }
        else if( (col.field === 'image' || col.field === 'photo') && n[col.field] !== null){
          component.push( <TableCell align="center" key={col.id+index}> <img alt="harusnya disini ada gambar" height="70" width="70" src={`http://127.0.0.1:8000${n[col.field]}`}></img> </TableCell> );
        }
        else{
          component.push( <TableCell align="center" key={col.id+index}> {  n[col.field] } </TableCell> );
        }
       });
       return component;
    }
    return (
      <Paper className={classes.root}>

        <DataTableTools > { this.props.children } </DataTableTools>

        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">

            <DataTableHead />
            
            <TableBody>
              {
                slicingData.map((n, i) => {
                const isSelected = selected.indexOf(n.id) !== -1;
                return (
                  <TableRow hover role="checkbox" key={n.id} tabIndex={-1} onClick={event => this.props.rowClick(n.id)} aria-checked={isSelected} selected={isSelected} >
                    <TableCell padding="checkbox" key={`checkbox-row-${i}`}>
                       <Checkbox checked={isSelected} />
                    </TableCell>
                    {
                        cell(n, i)
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
          rowsPerPageOptions={[10, 15, 20, 25]}
          component="div"
          count={Object.values(dataSource).length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{ "aria-label": "Previous Page" }}
          nextIconButtonProps={{ "aria-label": "Next Page" }}
          onChangePage={(e, p) =>  this.props.changePage(p)}
          onChangeRowsPerPage={(e) => this.props.changeRowPage(e.target.value)}
        />
      </Paper>
    );
  }
}

DataTable.propTypes = {
  classes: PropTypes.object.isRequired
};

const propsState = state => ({
  tR : state.tableReducer
})

const propsAction = dispatch => ({
    changePage: (page) => dispatch(handlePage(page)), 
    changeRowPage: (value) => dispatch(handleRowPage(value)),
    rowClick: (value) => dispatch(handleRowClick(value)),
    reSelect: (value) => dispatch(reSelect(value))
});

export default withStyles(styles)(connect(propsState, propsAction)(DataTable));
