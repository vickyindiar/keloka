import React, { Component } from 'react';
import { withStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Icon from '@material-ui/core/Icon';


const styles = theme => ({
    button: {
        margin: theme.spacing(1),
    },
    btnEdit: {
        //borderColor: '#689f38',
        borderBottomColor: '#689f38',
        borderTopColor: '#689f38',
        color : '#689f38'
    },
    leftIcon: {
        marginRight: theme.spacing(1),
    },
    rightIcon: {
        marginLeft: theme.spacing(1),
    },
    iconSmall: {
        fontSize: 20
    },
});

// const CssTextField = withStyles({
//     root: {
//       '& label.Mui-focused': {
//         color: 'green',
//       },
//       '& .MuiInput-underline:after': {
//         borderBottomColor: 'green',
//       },
//       '& .MuiOutlinedInput-root': {
//         '& fieldset': {
//           borderColor: 'red',
//         },
//         '&:hover fieldset': {
//           borderColor: 'yellow',
//         },
//         '&.Mui-focused fieldset': {
//           borderColor: 'green',
//         },
//       },
//     },
//   })(TextField);
  


export class ToolsActionButtons extends Component {
    constructor(props){
        super(props);
        this.state = {
            openModal : false,
            titleModal: ''
        }
    }

    setOpen = (v, f) => {
        if(v){
            this.setState({ openModal : v, titleModal: `${f} Data ${this.props.children.props.title}` });
        }
        else{
            this.setState({ openModal : v });
        }
    }

    handleClickOpen = (e, f) => {
        this.setOpen(true, f);
    }
    handleClose = () => {
        this.setOpen(false);
    }

    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <ButtonGroup size="small" aria-label="small outlined button group">
                    <Button variant="outlined" color="primary" onClick={(e) => this.handleClickOpen(e, 'Tambah')}>
                        <Icon>playlist_add</Icon>
                        TAMBAH
                    </Button>
                    <Button variant="outlined" className={classes.btnEdit} onClick={(e) => this.handleClickOpen(e, 'Ubah')}>
                        <Icon>edit</Icon>
                        UBAH
                    </Button>
                    <Button variant="outlined" color="secondary">
                        <Icon>delete_forever</Icon>
                        DELETE
                    </Button>
                </ButtonGroup>

                <Dialog open={this.state.openModal} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title"> { this.state.titleModal } </DialogTitle>
                    <DialogContent dividers>
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
