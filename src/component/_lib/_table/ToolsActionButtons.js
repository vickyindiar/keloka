import React, { Component } from 'react';

export class ToolsActionButtons extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <React.Fragment>
                <div className="btn-group">
                    <a id="btnAdd" className="waves-effect waves-light btn-small"><i className="material-icons right">note_add</i>Tambah</a>
                    <a id="btnEdit" className="waves-effect waves-light btn-small"><i className="material-icons right">edit</i>Ubah</a>
                    <a id="btnDelete" className="waves-effect waves-light btn-small"><i className="material-icons right">delete</i>Hapus</a>
                </div>
            </React.Fragment>
        )
    }
}

export default ToolsActionButtons
