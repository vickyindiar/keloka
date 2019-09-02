import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from "@material-ui/core/styles";
import { Grid, FormControl, InputLabel, Select, OutlinedInput, TextField } from '@material-ui/core';
import { getData } from "../../services/actions/dataAction";


const styles = theme => ({
    formControl: {
        width: '100%'
    },
});

class FormProduct extends Component {
    constructor(props){
        super(props);
        this.state = {
            name:'',
            brand:'',
            labelWidth: 0,
            inputLabel : React.createRef()
        }
    }

    handleOnSubmit = (e) => {
        e.preventDefault();
    }

    handChangeBrand = (e) => {
        alert(e.target.value);
    }
    handleClickBrand = () => {
       
    }

    setLabelWidth = (v) =>{
        this.setState({ labelWidth : v });
    }

    componentDidMount = () => {
        this.setLabelWidth(this.state.inputLabel.current.offsetWidth);
        if(this.props.dt.dataBrand.length === 0){
          this.props.setDataSource(3);

        }
    }




    render() {
        const { classes } = this.props;
        const { dataProduct, dataSupplier, dataCustomer, dataBrand, dataCategory, dataQtytype } = this.props.dt;
        const { inputLabel } = this.state;
        return (
            <React.Fragment>        
            <form>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <TextField id="name" label="Name" name="name" margin="dense" variant="outlined" />
                </Grid>
                <Grid item xs={4}>
                   <FormControl variant="outlined" className={classes.formControl} margin="dense">
                        <InputLabel ref={inputLabel} htmlFor="outlined-merk-native-simple"> Merk </InputLabel>

                        <Select native value={ this.state.brand } onChange={ this.handChangeBrand } onClick = {this.handleClickBrand} 
                                input={<OutlinedInput name="merk" labelWidth={this.state.labelWidth} id="outlined-merk-native-simple"/> }> 
                        <option value="" />>
                        {
                            Object.values(dataBrand).map((v, i) =>{
                                return(
                                    <option value={v.id} key={i}> {v.name} </option>
                                )
                            })
                        }
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={4}>
                    <TextField id="stock" label="Stock" name="stock" margin="dense" variant="outlined" />
                </Grid>
            </ Grid>
            </form>
            </React.Fragment>
        )
    }
}
const propsState = state => ({ dt : state.dataReducer });

const propsAction = dispatch => ({
    setDataSource: tab => dispatch(getData(tab)), 
   // showLoading: () => dispatch({type: TOOGLE_LOADING, payload: true}) 
});

export default withStyles(styles)(connect( propsState , propsAction)(FormProduct))
