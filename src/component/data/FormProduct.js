import React, { Component } from 'react'

class FormProduct extends Component {
    constructor(props){
        super(props);
        this.state = {
            title: ''
        }
    }

    handleOnSubmit = (e) => {
        e.preventDefault();
    }

    render() {
        return (
            <React.Fragment>
                <div className="modalBarang modal">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3> {this.state.title} </h3>
                        </div>
                        <div className="modal-form">
                            <form onSubmit={this.handleOnSubmit}>

                            </form>
                        </div>
                    </div>
                    <div className="modal-footer">
                    </div>   
                </div> 
            </React.Fragment>
        )
    }
}

export default FormProduct
