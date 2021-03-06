import React from 'react';
// import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Checkbox from '@material-ui/core/Checkbox';
// import Tooltip from '@material-ui/core/Tooltip';
import red from '@material-ui/core/colors/red';

const style = theme => ({
    root:{
         backgroundColor: red[100]
        // color: theme.palette.common.white,
        // '&:hover': {
        //   color: red,
        // },
    },
    cell:{
        color: theme.palette.common.white,
    },
})

class DataTableHead extends React.Component {

    createSortHandler = property => event => {
      this.props.onRequestSort(event, property);
    };

    selectAllHandler = (e) => {
      this.props.onSelectAllClick(e);
    }
    
    render() {
      const { classes, columns, dataSource } = this.props;
      const { order, orderBy, selected } = this.props.dataConfig;
      const rowCount = Object.values(dataSource).length;
      return (
        <TableHead >
          <TableRow > 
            <TableCell padding="checkbox"  className={classes.root} >
              <Checkbox
                indeterminate={selected.length > 0 && selected.length < rowCount}
                checked={selected.length === Object.values(dataSource).length && rowCount > 0 }
                onChange={this.selectAllHandler }
                className={classes.cell}
              />
            </TableCell>
            {
              Object.values(columns).map(
              row => (
                <TableCell className={classes.root} key={row.id}  align={row.align}  padding="none" /* padding={row.disablePadding ? 'none' : 'default'} */ sortDirection={orderBy === row.id ? order : false} variant="head" >
                    <TableSortLabel className={classes.root}  active={orderBy === row.id} direction={order} onClick={this.createSortHandler(row.id)} >
                      {row.caption}
                    </TableSortLabel>
                </TableCell>
              ),
              this,
            )}
          </TableRow>
        </TableHead>
      );
    }
  }
  
DataTableHead.propTypes = {
  // numSelected: PropTypes.number.isRequired,
  // onRequestSort: PropTypes.func.isRequired,
  // onSelectAllClick: PropTypes.func.isRequired,
  // order: PropTypes.string.isRequired,
  // orderBy: PropTypes.string.isRequired,
  // rowCount: PropTypes.number.isRequired,
};
  
export default withStyles(style)(DataTableHead)