import React, { Component } from 'react';
import { withStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import DeleteIcon from '@material-ui/icons/Delete';


const styles = theme => ({
    button: {
        margin: theme.spacing(1),
      },
      leftIcon: {
        marginRight: theme.spacing(1),
      },
      rightIcon: {
        marginLeft: theme.spacing(1),
      },
      iconSmall: {
        fontSize: 20,
      },
});

export class ToolsActionButtons extends Component {
    constructor(props){
        super(props);
        this.state = {
            openModal : false
        }
    }

    setOpen = (v) => {
        this.setState({ openModal : v });
    }
    handleClickOpen = () => {
        this.setOpen(true);
    }
    handleClose = () => {
        this.setOpen(false);
    }

    render() {
        return (
            <React.Fragment>
                <ButtonGroup size="small" aria-label="small outlined button group">
                        <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
                            TAMBAH
                        </Button>
                        <Button variant="outlined" color="secondary" onClick={this.handleClickOpen} >UBAH</Button>
                        <Button variant="outlined" color="secondary">
                            <DeleteIcon />
                            DELETE
                        </Button>
                </ButtonGroup>

                <Dialog open={this.state.openModal} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                    <DialogContent>
                        { this.props.children }
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.handleClose} color="primary">
                        Subscribe
                    </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        )
    }
}

export default withStyles(styles)(ToolsActionButtons)
