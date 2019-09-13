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

export class ToolsActionButtons extends Component {
    constructor(props){
        super(props);
        this.state = {
            openModal : false,
            titleModal: '',
            isSubmited: false
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

    handleOnSubmit = (e) => {
        e.preventDefault();
        this.setState({isSubmited: true});
    }

    submitDone = () => {
        this.setState({isSubmited: false});
    }
    render() {
        const { classes, selected } = this.props;
        return (
            <React.Fragment>
                <ButtonGroup size="small" aria-label="small outlined button group">
                    <Button variant="outlined" color="primary" onClick={(e) => this.handleClickOpen(e, 'Tambah')} disabled={false}>
                        <Icon>playlist_add</Icon>
                        TAMBAH
                    </Button>
                    <Button variant="outlined" className={classes.btnEdit} onClick={(e) => this.handleClickOpen(e, 'Ubah')} disabled={!selected.length > 0}>
                        <Icon>edit</Icon>
                        UBAH
                    </Button>
                    <Button variant="outlined" color="secondary" disabled={!selected.length > 0}>
                        <Icon>delete_forever</Icon>
                        HAPUS
                    </Button>
                </ButtonGroup>

                <Dialog open={this.state.openModal} onClose={this.handleClose} aria-labelledby="form-dialog-title" maxWidth={'md'}>
                    <form onSubmit={this.handleOnSubmit}>
                    <DialogTitle id="form-dialog-title"> { this.state.titleModal } </DialogTitle>
                    <DialogContent dividers>
                         { 
                             this.props.children !== undefined &&
                             React.cloneElement(this.props.children, { isSubmited: this.state.isSubmited, submitDone: () => this.submitDone() }) } 
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Batal
                        </Button>
                        <Button type="submit" color="primary">
                            Simpan
                        </Button>
                    </DialogActions>
                    </form>
                </Dialog>
         
            </React.Fragment>
        )
    }
}

export default withStyles(styles)(ToolsActionButtons)
