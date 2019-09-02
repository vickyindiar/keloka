import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from "@material-ui/core/styles";
import { Grid, FormControl, InputLabel, Select, OutlinedInput, TextField } from '@material-ui/core';


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

    setLabelWidth = (v) =>{
        this.setState({ labelWidth : v });
    }

    componentDidMount = () => {
        this.setLabelWidth(this.state.inputLabel.current.offsetWidth);
    }


    render() {
        const { classes, dataProduct, dataSupplier, dataCustomer, dataBrand, dataCategory, dataQtytype } = this.props;
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

                        <Select native value={ this.state.brand } onChange={ this.handChangeBrand }
                                input={<OutlinedInput name="merk" labelWidth={this.state.labelWidth} id="outlined-merk-native-simple"/> }> 

                        <option value="" />
                        {
                            Object.values(dataBrand).map((v, i) =>{
                                return(
                                    <option value={v.id}> {v.name} </option>
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

export default withStyles(styles)(connect( propsState , {})(FormProduct))
