import avatar2 from '../component/assets/images/users/avatar2.jpg';
import React, { Component } from 'react';
import { Serverurl, Serverurlimg } from '../Common/ServerUrl';
import axios from 'axios';
import $ from 'jquery';

export class GridContact extends Component {
    

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
                                            <h4>List Messages</h4>
                                        </div>
                                    </div>
                                    <div class="table-3">
                                        <table id="datatable2" class="table">
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Email</th>
                                                    <th>Subject</th>
                                                    <th>Message</th>
                                                    
                                                    
                                                </tr>
                                            </thead>


                                            {/* <tbody>
                                                {this.state.data.map((users) =>
                                                    <tr key={users._id}>
                                                        <td>{users.name}</td>
                                                        <td>{users.user_name}</td>
                                                        <td>{users.email}</td>
                                                        <td>{users.phone_number}</td>
                                                        <td>{users.login_with}</td>
                                                        {/* <td>
                                                            <div class="icon-pad">
                                                                <a href="/component/updateBusinessUser"><i className="fas fa-pencil-alt"></i></a>
                                                                <a href="/component/ViewSystemBusinessUser"><i className="fas fa-eye"></i></a>
                                                                <i className="fas fa-trash-alt"></i>
                                                            </div>
                                                        </td> 
                                                    </tr>
                                                )}

                                            </tbody> */}
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

export default GridContact

