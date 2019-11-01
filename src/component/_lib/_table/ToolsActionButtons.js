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
import { handleOpenModal, deleteData, storeData } from '../../../services/actions/dataAction';
import { setDataTable } from '../../../services/actions/tableAction';


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
        debugger;
        let data = null;
        let row = null;
        let st = this.props.tR.cDataStore;
        let paramater = [];
        for (let index = 0; index < st.length; index++) {
            data = new FormData();
            row = st[index];
            for(var key in row){
                data.append(key, st[index][key]);
            }
            paramater.push(data);
        }

        this.props.storeDataSource(this.props.dR.tabActive, paramater)
    }

    render() {
        const { classes } = this.props;
        const { selected } = this.props.tR;
        const { openModal } = this.props.dR;

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
                    <Button variant="outlined" color="secondary" disabled={!selected.length > 0} onClick={(e) => this.props.deleteData(this.props.dR.tabActive, selected) }>
                        <Icon>delete_forever</Icon>
                        HAPUS
                    </Button>
                </ButtonGroup>

                <Dialog open={openModal} aria-labelledby="form-dialog-title" maxWidth={'md'} disableEscapeKeyDown={false} disableBackdropClick={false} onClose={(e) => this.props.openModal(false)}>
                    <form onSubmit={(e) => this.handleOnSubmit(e)}>
                    <DialogTitle id="form-dialog-title"> { this.state.titleModal } </DialogTitle>
                    <DialogContent dividers>
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
    openModal : (v) => dispatch(handleOpenModal(v)),
    deleteData: (v, p) => dispatch(deleteData(v, p, (d, c) => dispatch(setDataTable(d, c)))),
    storeDataSource: (t, v) => dispatch(storeData(t, v))
});

export default withStyles(styles)(connect(propsState, propsAction)(ToolsActionButtons))
