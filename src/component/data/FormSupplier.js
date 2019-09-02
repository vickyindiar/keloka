import React, { Component } from 'react'
import { TextField } from '@material-ui/core';

class FormSupplier extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }


    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };
    render() {
        return (
            <div>

                <TextField
                    id="name"
                    label="Name"
                    // className={}
                    value={this.state.name}
                    onChange={this.handleChange('name')}
                    margin="normal"
                />
            </div>
        )
    }
}

export default FormSupplier
