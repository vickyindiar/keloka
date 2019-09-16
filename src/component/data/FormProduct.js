import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from "@material-ui/core/styles";
import { Grid, FormControl, InputLabel, FormControlLabel, Select, OutlinedInput,
         TextField, InputAdornment, IconButton, Icon, DialogContent, Box,
         Switch,  } from '@material-ui/core';
import { getData, storeData } from "../../services/actions/dataAction";
import { TOOGLE_LOADING } from '../../services/types/dataType';
import LoadingDot from "../_lib/_spinner/LoadingDot";
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
// import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'

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
            isSubmited: false,
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


    handleChange = prop => e => {
        let numberField = ['sprice', 'bprice', 'stock', 'pgInput'];

        if(numberField.includes(prop)){
            this.setState({...this.state, [prop]: this.validationNumber(e) } );
        }
        else if(prop === 'isMultiple'){
            this.setState({ ...this.state, [prop]: e.target.checked } );   
        }
        else if(prop === 'image'){
            this.setState({ ...this.state, [prop]: e[0].file } ); 
        }
        else{
            this.setState({ ...this.state, [prop]: e.target.value } ); 
        }
    }

    setLabelWidth = (v) =>{
        this.setState({ labelWidth : v });
    }


    doSubmit = () => {
        const paramater = new FormData();
        paramater.append('name', this.state.name);
        paramater.append('brand', this.state.brand);
        paramater.append('category', this.state.category);
        paramater.append('sprice', this.state.sprice);
        paramater.append('bprice', this.state.bprice);
        paramater.append('stock', this.state.stock);
        paramater.append('qtytype', this.state.qtytype);
        paramater.append('supplier', this.state.supplier);
        paramater.append('color', this.state.color);
        paramater.append('desc', this.state.desc);
        paramater.append('image', this.state.image);
        this.props.storeDataSource(this.props.dt.tabActive, paramater)
    }

    static getDerivedStateFromProps(nextProps, prevState){
        if (nextProps.isSubmited !== prevState.isSubmited) {
            return { 
              isSubmited: nextProps.isSubmited,
            };
        }
        else return null; // Triggers no change in the state
    }

    componentDidUpdate() {
      if(this.state.isSubmited){
        this.doSubmit();
        this.props.submitDone();
        this.setState({isSubmited: false});
      }
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
        }, 3000);
    }

    render() {
        const { classes } = this.props;
        const { dataSupplier, dataBrand, dataCategory, dataQtytype, dataColor, isLoading } = this.props.dt;
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
                    {/* <DropzoneArea
                        onChange={(e) => { this.handleChange("image")(e) }} 
                        showPreviewsInDropzone={true} 
                        acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                        maxFileSize={5000000}
                        dropzoneClass={classes.containerDrozone}
                        dropzoneText={'Tarik Gambar Atau Klik'}
                    /> */}
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
                                <IconButton><Icon> chevron_left </Icon></IconButton>
                                <TextField className={classes.pgInput} id="pgInput" label="Data" name="pgInput" margin="dense" variant="outlined"  type="number" inputProps={{min: 1, max: 999999999}} onChange={ (e) => { this.handleChange("pgInput")(e) }}/>
                                <IconButton><Icon> chevron_right </Icon></IconButton>
                                <IconButton><Icon> add </Icon></IconButton>
                                <IconButton><Icon> delete_sweep </Icon></IconButton>
                            </div>
                        )
                    }
                </Grid>
            </DialogContent>
            </React.Fragment>
        )
    }
}
const propsState = state => ({ dt : state.dataReducer });

const propsAction = dispatch => ({
    setDataSource: tab => dispatch(getData(tab)), 
    storeDataSource: (tab, data) => dispatch(storeData(tab, data)),
    showLoading: (v) => dispatch({type: TOOGLE_LOADING, payload: v}) 
});

export default withStyles(styles)(connect(propsState , propsAction)(FormProduct))
