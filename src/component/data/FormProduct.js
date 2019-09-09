import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from "@material-ui/core/styles";
import { Grid, FormControl, InputLabel, Select, OutlinedInput, TextField, InputAdornment } from '@material-ui/core';
import { getData } from "../../services/actions/dataAction";
import { DropzoneArea } from 'material-ui-dropzone';
import { TOOGLE_LOADING } from '../../services/types/dataType';
import LoadingDot from "../_lib/_spinner/LoadingDot";
import { minHeight } from '@material-ui/system';
import { NONAME } from 'dns';

const styles = theme => ({
    formControl: {
        width: '100%'
    },
    containerDrozone:{
        height: '30%',
        minHeight: '106px',
        marginTop: '10px',
        border: 'none'

    }
});

class FormProduct extends Component {
    constructor(props){
        super(props);
        this.state = {
            name:'',
            brand:'',
            category: '',
            sprice: '',
            bprice: '',
            stock:'',
            qtytype: '',
            supplier: '',
            color: '',
            image: '',
            labelWidth: 0,
            inputLabel : React.createRef(),
        }
    }

    handleOnSubmit = (e) => {
        e.preventDefault();
    }

    handleChange = prop => e => {
       this.setState({ ...this.state, [prop]: e.target.value });
    }

    setLabelWidth = (v) =>{
        this.setState({ labelWidth : v });
    }

    componentDidMount = () => {
        this.props.showLoading(true);
        this.setLabelWidth(this.state.inputLabel.current.offsetWidth);
        if(this.props.dt.dataSupplier.length === 0){
            this.props.setDataSource(1);
        }
        if(this.props.dt.dataBrand.length === 0){
          this.props.setDataSource(3);
        }
        if(this.props.dt.dataCategory.length === 0){
            this.props.setDataSource(4);
        }
        if(this.props.dt.dataQtytype.length === 0){
            this.props.setDataSource(5);
        }
        if(this.props.dt.dataColor.length === 0){
            this.props.setDataSource(6);
        }
        setTimeout(() => {
            this.props.showLoading(false);
        }, 5000);
    }

    render() {
        const { classes } = this.props;
        const { dataSupplier, dataBrand, dataCategory, dataQtytype, dataColor, isLoading } = this.props.dt;
        const { inputLabel } = this.state;
        return (
            <React.Fragment> 
            { isLoading && <LoadingDot nclass="form-modal"/> }       
            <form>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <TextField className={classes.formControl} id="name" label="Name" name="name" margin="dense" variant="outlined" onChange={ (e) => { this.handleChange("name")(e) }}/>
                </Grid>
                <Grid item xs={4}>
                   <FormControl variant="outlined" className={classes.formControl} margin="dense">
                        <InputLabel ref={inputLabel} htmlFor="outlined-brand-native-simple"> Merk </InputLabel>

                        <Select native value={ this.state.brand }  onChange={ (e) => { this.handleChange("brand")(e) }}
                                input={<OutlinedInput name="brand" labelWidth={40} id="outlined-brand-native-simple"/> }> 
                        <option value="" />
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
                    <FormControl variant="outlined" className={classes.formControl} margin="dense">
                        <InputLabel ref={inputLabel} htmlFor="outlined-category-native-simple"> Kategori </InputLabel>

                        <Select native value={ this.state.category } onChange={ (e) => { this.handleChange("brand")(e) }}
                                input={<OutlinedInput name="category" labelWidth={75} id="outlined-category-native-simple"/> }> 
                        <option value="" />
                        {
                            Object.values(dataCategory).map((v, i) =>{
                                return(
                                    <option value={v.id} key={i}> {v.name} </option>
                                )
                            })
                        }
                        </Select>
                    </FormControl>
                </Grid>
            </ Grid>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                <TextField
                    id="outlined-adornment-sprice"
                    variant="outlined"
                    label="Jual"
                    margin="dense"
                    value={this.state.sprice}
                    onChange={ (e) => { this.handleChange("sprice")(e) }}
                    InputProps={{ startAdornment: <InputAdornment position="start">Rp.</InputAdornment> }}
                />
                </Grid>
                <Grid item xs={4}>
                <TextField
                    id="outlined-adornment-bprice"
                    variant="outlined"
                    label="Beli"
                    margin="dense"
                    value={this.state.bprice}
                    onChange={ (e) => { this.handleChange("bprice")(e) }}
                    InputProps={{ startAdornment: <InputAdornment position="start">Rp.</InputAdornment> }}
                />
                </Grid>
                <Grid item xs={2}>
                 <TextField id="stock" label="Stok" name="stock" margin="dense" variant="outlined" onChange={ (e) => { this.handleChange("stock")(e) }}/>
                </Grid>
                <Grid item xs={2}>
                    <FormControl variant="outlined" className={classes.formControl} margin="dense">
                        <InputLabel ref={inputLabel} htmlFor="outlined-qtytype-native-simple"> Satuan </InputLabel>

                        <Select native value={ this.state.qtytype } onChange={ (e) => { this.handleChange("qtytype")(e) }}
                                input={<OutlinedInput name="qtytype" labelWidth={60} id="outlined-qtytype-native-simple"/> }> 
                        <option value="" />
                        {
                            Object.values(dataQtytype).map((v, i) =>{
                                return(
                                    <option value={v.id} key={i}> {v.name} </option>
                                )
                            })
                        }
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <FormControl variant="outlined" className={classes.formControl} margin="dense">
                        <InputLabel ref={inputLabel} htmlFor="outlined-supplier-native-simple"> Pemasok </InputLabel>

                        <Select native value={ this.state.supplier } onChange={ (e) => { this.handleChange("supplier")(e) }}
                                input={<OutlinedInput name="supplier" labelWidth={78} id="outlined-supplier-native-simple"/> }> 
                        <option value="" />
                        {
                            Object.values(dataSupplier).map((v, i) =>{
                                return(
                                    <option value={v.id} key={i}> {v.name} </option>
                                )
                            })
                        }
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={4}>
                    <FormControl variant="outlined" className={classes.formControl} margin="dense">
                        <InputLabel ref={inputLabel} htmlFor="outlined-color-native-simple"> Warna </InputLabel>

                        <Select native value={ this.state.color } onChange={ (e) => { this.handleChange("color")(e) }}
                                input={<OutlinedInput name="color" labelWidth={57} id="outlined-color-native-simple"/> }> 
                        <option value="" />
                        {
                            Object.values(dataColor).map((v, i) =>{
                                return(
                                    <option value={v.id} key={i}> {v.name} </option>
                                )
                            })
                        }
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <TextField
                        className={classes.formControl}
                        id="desc"
                        label="Keterangan"
                        // className={}
                        margin="dense"
                        variant="outlined"
                        multiline
                        defaultValue=" "
                        rows="4"
                        rowsMax="4"
                    />
                </Grid>
                <Grid item xs={4}>
                    <DropzoneArea
                        onChange={(e) => { this.handleChange("image")(e) }} 
                        showPreviewsInDropzone={true} 
                        acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                        maxFileSize={5000000}
                        dropzoneClass={classes.containerDrozone}
                        dropzoneText={'Tarik Gambar Atau Klik'}
                    />
                </Grid>  
            </Grid>
            </form>
            </React.Fragment>
        )
    }
}
const propsState = state => ({ dt : state.dataReducer });

const propsAction = dispatch => ({
    setDataSource: tab => dispatch(getData(tab)), 
    showLoading: (v) => dispatch({type: TOOGLE_LOADING, payload: v}) 
});

export default withStyles(styles)(connect( propsState , propsAction)(FormProduct))
