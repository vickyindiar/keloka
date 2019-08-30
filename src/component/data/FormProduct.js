import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
class FormProduct extends Component {
    constructor(props){
        super(props);
        this.state = {
            title: 'Barang'
        }
    }

    handleOnSubmit = (e) => {
        e.preventDefault();
    }

    render() {
        return (
            <React.Fragment>        
            <form>
                <div className="row">
                    <div className="col s4">
                        <TextField id="name" label="Name" name="name" margin="normal" variant="outlined" />
                    </div>
                    <div className="col s4">
                        <TextField id="sprice" label="Jual" name="sprice" margin="normal" variant="outlined" />
                    </div>
                    <div className="col s4">
                        <TextField id="stock" label="Stock" name="stock" margin="normal" variant="outlined" />
                    </div>
                </div>
            </form>
            </React.Fragment>
        )
    }
}

export default FormProduct
