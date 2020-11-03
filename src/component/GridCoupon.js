import avatar2 from '../component/assets/images/users/avatar2.jpg';
import React, { Component } from 'react';
import { Serverurl, Serverurlimg } from '../Common/ServerUrl';
import axios from 'axios';
import $ from 'jquery';

export class GridCoupon extends Component {
    
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
                                            <h4>List Coupons</h4>
                                        </div>
                                        <div class="button-align">
                                            <a href="/component/CreateCoupon" type="button" class="btn btn-danger waves-effect waves-light submit-button" >Add Coupon</a>
                                        </div>
                                    </div>
                                    <div class="table-3">
                                        <table id="datatable2" class="table">
                                            <thead>
                                                <tr>
                                                    <th>Code</th>
                                                    <th>Coupon Type</th>
                                                    <th>Coupon Amount</th>
                                                    <th>Discription</th>
                                                    <th>Product IDs</th>
                                                    <th>Usage / Limit</th>
                                                    <th>Expiry Date</th>
                                                    <th>Actions</th>

                                                    
                                                </tr>
                                            </thead>


                                            <tbody>

                                                <tr >
                                                    <td>2xvvq96k</td>
                                                    <td>Discount</td>
                                                    <td>50%</td>
                                                    <td>₨490.00</td>
                                                    <td></td>
                                                    <td></td>
                                                    <td>20/8/2020</td>

                                                    <td>
                                                        <div class="icon-pad">
                                                            <a href="/component/updateCoupon"><i className="fas fa-pencil-alt"></i></a>
                                                            <a href="/component/ViewCoupon"><i className="fas fa-eye"></i></a>
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

export default GridCoupon

