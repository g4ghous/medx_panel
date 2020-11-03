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
            url: Serverurl + "user/list",
            data: data,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            config: {
                headers: { 'Content-Type': 'application/json' }
            }

        }).then(res => {
            console.log('res', res.data.data)
            console.log('hey', res.data)
            this.setState({
                data: res.data.data,
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
                                            <a href="/component/createBusinessUser" type="button" class="btn btn-danger waves-effect waves-light submit-button" >Add Customer</a>
                                        </div>
                                    </div>
                                    <div class="table-3">
                                        <table id="datatable2" class="table">
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Email</th>
                                                    <th>Phone</th>
                                                    
                                                    <th>Actions</th>

                                                </tr>
                                            </thead>


                                            <tbody>
                                                
                                                    <tr >
                                                        <td>test</td>
                                                        <td>test@test.com</td>
                                                        <td>03121234567</td>
                                                       
                                                         <td>
                                                            <div class="icon-pad">
                                                                <a href="/component/updateBusinessUser"><i className="fas fa-pencil-alt"></i></a>
                                                                <a href="/component/ViewSystemBusinessUser"><i className="fas fa-eye"></i></a>
                                                                <i className="fas fa-trash-alt"></i>
                                                            </div>
                                                        </td> 
                                                    </tr>
                                                

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

