import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from "@material-ui/core/styles";
import { Grid, FormControl, InputLabel, FormControlLabel, Select, OutlinedInput,
         TextField, InputAdornment, IconButton, Icon, DialogContent, Box,
         Switch,  } from '@material-ui/core';
import { getData, storeData,  } from "../../services/actions/dataAction";
import { updateForm } from '../../services/actions/tableAction';
import { TOOGLE_LOADING } from '../../services/types/dataType';
import LoadingDot from "../_lib/_spinner/LoadingDot";
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
// import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

const styles = theme => ({
    formControl: {
        width: '100%'
    },
    pgInput:{
        width:'20%'
    },
    containerDrozone:{
        height: '30%',
        minHeight: '106px',
        marginTop: '10px',
        border: 'none'
    }
});

registerPlugin(FilePondPluginImagePreview)

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
            desc:'',
            image: '',
            labelWidth: 0,
            inputLabel : React.createRef(),
            isMultiple: false,
            pgInput: 1,
            dafaultState: {},
            validationMsg : ''
        }
    }


    validationNumber = (e) =>{
        let { value, min, max } = e.target;
        if(value <= Number(min)){
            value = Number(min);
        }
        else if(value >= Number(max)){
            value = Number(max);
        }
        return Number(value);
    }

    validationPgInput = () => {
        let result = false;
        if(this.state.name === ''){ result = 'Nama tidak boleh dikosongkan !'}
        else if(this.state.brand === ''){ result =  'Merk tidak boleh dikosongkan !'}
        else if(this.state.category === ''){ result =  'Kategori tidak boleh dikosongkan !' }
        else if(this.state.sprice === ''){ result =  'Harga Jual tidak boleh dikosongkan !'}
        else if(this.state.bprice === ''){ result =  'Harga Beli tidak boleh dikosongkan !'}
        else if(this.state.stock === ''){ result =  'Stock tidak boleh dikosongkan !'}
        else if(this.state.qtytype === ''){result =  'Satuan tidak boleh dikosongkan !' }
        else if(this.state.supplier === ''){ result =  'Pemasok tidak boleh dikosongkan !'}
        return result;
    }

    resetAllState = () => {
        this.setState({
            name:'',
            brand:'',
            category: '',
            sprice: '',
            bprice: '',
            stock:'',
            qtytype: '',
            supplier: '',
            color: '',
            desc:'',
            image: ''
        });
    }

    handleAddPgInput = (e) => {
        if(this.state.pgInput > 4){
            alert('tidak bisa tambah data lebih dari 5 record !')
        }
        else{
            let isValid = this.validationPgInput();
            if(!isValid){
                this.setState({...this.state, pgInput: this.state.pgInput + 1 },
                () => { 
                 //   this.props.0({...this.state});
                    this.resetAllState();
                }); 
            }
            else{
                alert(isValid);
            }
        }        
    }

    handleDelPgInput = (e) => {
        if(this.props.tR.cDataStore.hasOwnProperty((this.state.pgInput).toString())){
            
        }
    }


    handleBackPgInput = (e) => {
        const { cDataStore } = this.props.tR;
        debugger;
        const callback = () => {
            let row = {...cDataStore[this.state.pgInput.toString()]}
            this.setState({...row });
        }

        if(this.state.pgInput - 1 > 0){
            this.setState({pgInput: this.state.pgInput - 1}, () => { callback(); } )
        }
        else{
            e.preventDefault();
        }

    }

    handleNextPgInput = (e) => {

        const callback = () => {
            let row = {...this.props.tR.cDataStore[this.state.pgInput.toString()]}
            this.setState({...row });
        }

        if(this.props.tR.cDataStore.hasOwnProperty( (this.state.pgInput + 1).toString())){
            if(this.state.pgInput + 1 < 6){
                this.setState({pgInput: this.state.pgInput + 1}, () => { callback(); } )
            }
            else{
                e.preventDefault();
            }
        }
    }

    handleChange = prop => e => {
        let numberField = ['sprice', 'bprice', 'stock', 'pgInput'];
        let isValid = this.validationPgInput();
        if(numberField.includes(prop)){
            if(prop === 'pgInput'){
                if(!isValid){
                    this.setState({...this.state, [prop]: this.validationNumber(e) }, 
                    () => { 
                        this.props.updateFormProduct({...this.state});
                        setTimeout(() => {
                          this.resetAllState();
                        }, 50);
                    });
                }
                else{
                    e.preventDefault();
                    alert(isValid);
                }
            }
            else{
                this.setState({...this.state, [prop]: this.validationNumber(e) }, ()=>{ this.props.updateFormProduct({...this.state}) });

            }
        }
        else if(prop === 'isMultiple'){
            this.setState({ ...this.state, [prop]: e.target.checked }, ()=>{ this.props.updateFormProduct({...this.state}) });   
        }
        else if(prop === 'image'){
            this.setState({ ...this.state, [prop]: e[0].file }, ()=>{ this.props.updateFormProduct({...this.state}) } ); 
        }
        else{
            this.setState({ ...this.state, [prop]: e.target.value }, ()=>{ this.props.updateFormProduct({...this.state}) } ); 
        }   
    }

    setLabelWidth = (v) =>{
        this.setState({ labelWidth : v });
    }

    componentDidMount = () => {
       // this.props.showLoading(true);
        this.setLabelWidth(this.state.inputLabel.current.offsetWidth);
        this.props.updateFormProduct(null);
        if(this.props.dR.dataSupplier.length === 0){
            this.props.setDataSource(1);
        }
        if(this.props.dR.dataBrand.length === 0){
          this.props.setDataSource(3);
        }
        if(this.props.dR.dataCategory.length === 0){
            this.props.setDataSource(4);
        }
        if(this.props.dR.dataQtytype.length === 0){
            this.props.setDataSource(5);
        }
        if(this.props.dR.dataColor.length === 0){
            this.props.setDataSource(6);
        }
    }

    render() {
        const { classes } = this.props;
        const { dataSupplier, dataBrand, dataCategory, dataQtytype, dataColor, isLoading } = this.props.dR;
        const { inputLabel } = this.state;
        return (
            <React.Fragment> 
            { isLoading && <LoadingDot nclass="form-modal"/> }       

            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <TextField className={classes.formControl} id="name" label="Name" name="name" margin="dense" variant="outlined" value={ this.state.name } onChange={ (e) => { this.handleChange("name")(e) }}/>
                </Grid>
                <Grid item xs={4}>
                   <FormControl variant="outlined" className={classes.formControl} margin="dense">
                        <InputLabel ref={inputLabel} htmlFor="outlined-brand"> Merk </InputLabel>

                        <Select native value={ this.state.brand }  onChange={ (e) => { this.handleChange("brand")(e) }} input={<OutlinedInput name="brand" labelWidth={40} id="outlined-brand"/> }> 
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
                        <InputLabel ref={inputLabel} htmlFor="outlined-category"> Kategori </InputLabel>

                        <Select native value={ this.state.category } onChange={ (e) => { this.handleChange("category")(e) }} input={<OutlinedInput name="category" labelWidth={75} id="outlined-category"/> }> 
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
                    className={classes.formControl} 
                    id="outlined-adornment-sprice"
                    variant="outlined"
                    label="Jual"
                    margin="dense"
                    type="number"
                    inputProps={{min: 1, max: 999999999}}
                    value={this.state.sprice}
                    onChange={ (e) => { this.handleChange("sprice")(e) }}
                    InputProps={{ startAdornment: <InputAdornment position="start">Rp.</InputAdornment> }}
                />
                </Grid>
                <Grid item xs={4}>
                <TextField
                    className={classes.formControl} 
                    id="outlined-adornment-bprice"
                    variant="outlined"
                    label="Beli"
                    margin="dense"
                    type="number"
                    inputProps={{min: 1, max: 999999999}}
                    value={this.state.bprice}
                    onChange={ (e) => { this.handleChange("bprice")(e) }}
                    InputProps={{ startAdornment: <InputAdornment position="start">Rp.</InputAdornment> }}
                />
                </Grid>
                <Grid item xs={2}>
                 <TextField id="stock" label="Stok" name="stock" margin="dense" variant="outlined" type="number" inputProps={{min: 1, max: 999999}} value={this.state.stock}onChange={ (e) => { this.handleChange("stock")(e) } } />
                </Grid>
                <Grid item xs={2}>
                    <FormControl variant="outlined" className={classes.formControl} margin="dense">
                        <InputLabel ref={inputLabel} htmlFor="outlined-qtytype"> Satuan </InputLabel>

                        <Select native value={ this.state.qtytype } onChange={ (e) => { this.handleChange("qtytype")(e) }} input={<OutlinedInput name="qtytype" labelWidth={60} id="outlined-qtytype"/> }> 
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
                        <InputLabel ref={inputLabel} htmlFor="outlined-supplier"> Pemasok </InputLabel>

                        <Select native value={ this.state.supplier } onChange={ (e) => { this.handleChange("supplier")(e) }} input={<OutlinedInput name="supplier" labelWidth={78} id="outlined-supplier"/> }> 
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
                        <InputLabel ref={inputLabel} htmlFor="outlined-color"> Warna </InputLabel>

                        <Select native value={ this.state.color } onChange={ (e) => { this.handleChange("color")(e) }} input={<OutlinedInput name="color" labelWidth={57} id="outlined-color"/> }> 
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
                        // defaultValue=" "
                        rows="4"
                        rowsMax="4"
                        value={this.state.desc}
                        onChange={ (e) => { this.handleChange("desc")(e) }} 
                    />
                </Grid>
                <Grid item xs={4}>
                      <FilePond
                      onupdatefiles={  (e) => { this.handleChange("image")(e) }}
                      labelIdle='Tarik Gambar Atau <span class="filepond--label-action">Klik </span>'
                      />
                </Grid>  
            </Grid>
            <Box m={4} />
            <DialogContent dividers>
                <Grid container spacing={2} container direction="row" justify="flex-start" alignItems="flex-end" >
                    <FormControlLabel
                        control={ <Switch checked={this.state.isMultiple} onChange={this.handleChange('isMultiple')} value={this.isMultiple} color="primary" /> }
                        label="Tambah Data Sekaligus"
                    />
                    {
                        this.state.isMultiple && (
                            <div>
                                <IconButton onClick = {e => { this.handleBackPgInput(e) }}><Icon> chevron_left </Icon></IconButton>
                                <TextField className={classes.pgInput}
                                    id="pgInput"
                                    label="Data" 
                                    name="pgInput" 
                                    margin="dense"
                                    variant="outlined" 
                                    type="tel" 
                                    inputProps={{min: 1, max: 999999999}} 
                                    value={this.state.pgInput} 
                                    onChange={ (e) => { this.handleChange("pgInput")(e) }}
                                 />
                                <IconButton onClick = {e => { this.handleNextPgInput(e) }}><Icon> chevron_right </Icon></IconButton>
                                <IconButton onClick={ e => { this.handleAddPgInput(e) } }><Icon> add </Icon></IconButton>
                                <IconButton onClick={ e => { this.handleDelPgInput(e) } }><Icon> delete_sweep </Icon></IconButton>
                            </div>
                        )
                    }
                </Grid>
            </DialogContent>
            </React.Fragment>
        )
    }
}
const propsState = state => ({ dR : state.dataReducer, tR: state.tableReducer });

const propsAction = dispatch => ({
    setDataSource: tab => dispatch(getData(tab)), 
    storeDataSource: (tab, data) => dispatch(storeData(tab, data)),
    updateFormProduct: (v) => dispatch(updateForm(v)),
    showLoading: (v) => dispatch({type: TOOGLE_LOADING, payload: v}) 
});

export default withStyles(styles)(connect(propsState , propsAction)(FormProduct))
