import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { lighten } from "@material-ui/core/styles/colorManipulator";
import { fade } from "@material-ui/core/styles/colorManipulator";
import SearchIcon from "@material-ui/icons/Search";
import ToolsActionButtons from '../../_lib/_table/ToolsActionButtons';
import { connect } from 'react-redux';
import { handleFilter } from '../../../services/actions/tableAction';
const toolbarStyles = theme => ({
  root: { paddingRight: theme.spacing() },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85)
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark
        },
  spacer: {
    flex: "1 1 200px"
  },
  actions: {
    color: theme.palette.text.secondary
  },
  title: {
    flex: "0 0 auto"
  },
  grow: {
    flexGrow: 1
  },
  search: {
    position: "relative",
    borderRadius: "5px",
    backgroundColor: fade(theme.palette.common.black, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.black, 0.25)
    },
    marginLeft: theme.spacing(3),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing(6),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  visibleColumn: {
    // borderRadius:'20px',
    // backgroundColor: theme.palette.secondary.dark,
  },
  visibleColumnIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    borderRadius: "20px"
  },
  viewColumnIcon: {
    color: theme.palette.common.black
  }
});

class DataTableTools extends React.Component {

  render() {
    const { classes } = this.props;
    const { selected, title } = this.props.tR;

    const showFilterSearch = (
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <input 
          id="search-input"
          placeholder="Search"
          value={this.props.tR.valueSearch}
          onChange={(e) => this.props.changeFilter(e.target.value)}
          type="text"
          className="search-field"
          name="q"
          autoComplete="off"
          aria-label="Search box"
        />
        <label htmlFor="search-input" />
      </div>
    ); 

    return (
      <Toolbar className={classNames(classes.root, {[classes.highlight]: selected.length > 0 })} >
        <div className={classes.title}>
          <Typography variant="h6" id="tableTitle">
            {" "}
            {title}{" "}
          </Typography>
        </div>
        <div className={classes.spacer} />
        <div className={classes.grow} />
        {/* <div className={classes.visibleColumn}>
          <a
            className="btn waves-effect tooltipped"
            id="btn-visibleColumn"
            data-tooltip="I am a tooltip"
            data-position="left"
          >
            <div className={classes.visibleColumnIcon}>
              <ViewColumn className={classes.viewColumnIcon} />
            </div>
          </a>
        </div> */}
        <ToolsActionButtons selected={selected}>
          {this.props.children}
        </ToolsActionButtons>
        {showFilterSearch}
      </Toolbar>
    );
  }
}

DataTableTools.propTypes = {
  classes: PropTypes.object.isRequired
};

const propsState = state => ({
  tR : state.tableReducer
})

const propsAction = dispatch => ({
    changeFilter: (value) => dispatch(handleFilter(value))
});

export default withStyles(toolbarStyles)(connect(propsState, propsAction)(DataTableTools));
