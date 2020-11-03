import avatar2 from '../component/assets/images/users/avatar2.jpg';
import React, { Component } from 'react';
import { Serverurl, Serverurlimg } from '../Common/ServerUrl';
import axios from 'axios';
import $ from 'jquery';

export class GridNews extends Component {
    

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
                                            <h4>List NEWS</h4>
                                        </div>
                                        <div class="button-align">
                                            <a href="/component/CreateNews" type="button" class="btn btn-danger waves-effect waves-light submit-button" >Add NEWS</a>
                                        </div>
                                    </div>
                                    <div class="table-3">
                                        <table id="datatable2" class="table">
                                            <thead>
                                                <tr>
                                                    <th>Image</th>
                                                    <th>Title</th>
                                                    <th>Discription</th>
                                                    <th>Actions</th>


                                                </tr>
                                            </thead>


                                            <tr >
                                                <td></td>
                                                <td>Computer</td>
                                                <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </td>

                                                <td>
                                                    <div class="icon-pad">
                                                        <a href="/component/updateNews"><i className="fas fa-pencil-alt"></i></a>
                                                        <a href="/component/ViewNews"><i className="fas fa-eye"></i></a>
                                                        <i className="fas fa-trash-alt"></i>
                                                    </div>
                                                </td>
                                            </tr>
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

export default GridNews

