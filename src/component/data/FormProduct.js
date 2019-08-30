import React, { Component } from 'react'

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
                    <span><h4>INI CONTENT PRODUCT</h4></span>
               
            </React.Fragment>
        )
    }
}

export default FormProduct
