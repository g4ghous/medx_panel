import avatar2 from '../component/assets/images/users/avatar2.jpg';
import React, { Component } from 'react';
import { Serverurl, Serverurlimg } from '../Common/ServerUrl';
import axios from 'axios';
import $ from 'jquery';

export class GridBusinessUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        }
    }

    componentDidMount() {
        var data;
        axios({
            method: 'get',
            url: Serverurl + "user_show",
            data: data,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            config: {
                headers: { 'Content-Type': 'application/json' }
            }

        }).then(res => {
            console.log('res', res.data)
            console.log('hey', res.data)
            this.setState({
                data: res.data,
            })
            $(document).ready(function () {
                $('#datatable2').DataTable();
            });
            console.log('data', res.data.data)
        }).catch((err) => {
            console.log(err)
            if (err) {
                console.log('err', err.response)
                console.log({ err })
            }
        })
    }


    


    // viewUser(id) {
    //     localStorage.setItem('buserId', id)
    //     console.log(id)
    //     window.location.href = "/component/ViewSystemBusinessUser"
    // }

    // updateUser(id) {
    //     localStorage.setItem('buserupdateId', id)
    //     console.log(id)
    //     window.location.href = "/component/UpdateBusinessUser"
    // }

    render() {
        return (
            <div>
                <div className="container">
                    <div class="row justify-content-center">
                        <div class="col-lg-11 col-sm-11">
                            <div class="card">
                                <div class="card-body table-responsive">
                                    <div className="list-head-btn">
                                        <div className="head">
                                            <h4>List Users</h4>
                                        </div>
                                        <div class="button-align">
                                            <a href="/component/createBusinessUser" type="button" class="btn btn-danger waves-effect waves-light submit-button" >Add User</a>
                                        </div>
                                    </div>
                                    <div class="table-3">
                                        <table id="datatable2" class="table">
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Email</th>
                                                    <th>Phone</th>
                                                    <th>User Type</th>
                                                    <th>Actions</th>

                                                </tr>
                                            </thead>


                                            <tbody>
                                                
                                            {this.state.data.map((disease) =>
                                                    <tr key={disease.id}>
                                                        <td>{disease.name}</td>
                                                        <td>{disease.email}</td>
                                                        <td>{disease.phone}</td>
                                                        <td>{disease.user_type}</td>

                                                        <td>
                                                            <div class="icon-pad">
                                                                <a data-toggle="modal" data-target="#userEdit"><i className="fas fa-trash-alt"></i></a>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )}
                                                

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default GridBusinessUsers

