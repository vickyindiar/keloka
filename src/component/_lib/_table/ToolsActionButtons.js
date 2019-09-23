import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Icon from '@material-ui/core/Icon';
import { handleOpenModal } from '../../../services/actions/dataAction';


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
            titleModal: '',
            isSubmited: false,
        }
    }


    handleOnSubmit = (e) => {
        e.preventDefault();
        this.setState({isSubmited: true});
    }

    submitDone = () => {
        this.setState({isSubmited: false} , () => { this.handleClose() });
    }

    handleDelete = (e) =>{
        this.props.doDelete(this.props.selected);
    }


    render() {
        const { classes } = this.props;
        const { selected } = this.props.tR;
        const { openModal } = this.props.dR;
        const dialogProps = {
            isSubmited : this.state.isSubmited,
            submitDone : () => this.submitDone(),

        }
        return (
            <React.Fragment>
                <ButtonGroup size="small" aria-label="small outlined button group">
                    <Button variant="outlined" color="primary" onClick={(e) => this.props.openModal(true) } disabled={false}>
                        <Icon>playlist_add</Icon>
                        TAMBAH
                    </Button>
                    <Button variant="outlined" className={classes.btnEdit} onClick={(e) => this.props.openModal(true)} disabled={!selected.length > 0}>
                        <Icon>edit</Icon>
                        UBAH
                    </Button>
                    <Button variant="outlined" color="secondary" disabled={!selected.length > 0} onClick={(e) => this.handleDelete(e) }>
                        <Icon>delete_forever</Icon>
                        HAPUS
                    </Button>
                </ButtonGroup>

                <Dialog open={openModal} aria-labelledby="form-dialog-title" maxWidth={'md'}>
                    <form onSubmit={this.handleOnSubmit}>
                    <DialogTitle id="form-dialog-title"> { this.state.titleModal } </DialogTitle>
                    <DialogContent dividers>
                        {/* { 
                             this.props.children !== undefined &&
                             React.cloneElement(this.props.children, { ...dialogProps }) 
                        }  */}
                        { this.props.children }
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={(e) => this.props.openModal(false)} color="primary">
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

const propsState = state => ({
    tR: state.tableReducer,
    dR: state.dataReducer
})

const propsAction = dispatch => ({
    openModal : (v) => dispatch(handleOpenModal(v))
});

export default withStyles(styles)(connect(propsState, propsAction)(ToolsActionButtons))
