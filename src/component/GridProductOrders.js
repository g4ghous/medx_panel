import avatar2 from '../component/assets/images/users/avatar2.jpg';
import React, { Component } from 'react';
import { Serverurl, Serverurlimg } from '../Common/ServerUrl';
import axios from 'axios';
import $ from 'jquery';

export class GridOrders extends Component {
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
            url: Serverurl + 'orderproducts_show',
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
            // console.log('data', res.data.data)
        }).catch((err) => {
            console.log(err)
            if (err) {
                // console.log('err', err.response)
                console.log({ err })
            }
        })
    }

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
                                            <h4>List Order Products</h4>
                                        </div>
                                        <div class="button-align">
                                            <a href="/component/gridOrders" type="button" class="btn btn-danger waves-effect waves-light submit-button">Orders</a>
                                        </div>
                                    </div>
                                    <div class="table-3">
                                        <table id="datatable2" class="table">
                                            <thead>
                                                <tr>

                                                    <th>Order id</th>
                                                    <th>Name</th>
                                                    <th>Qty</th>
                                                    <th>Price</th>

                                                </tr>
                                            </thead>


                                            <tbody>
                                            {this.state.data.map((order_products) =>
                                                    <tr key={order_products.id}>
                                                        <td>{order_products.order_id}</td>
                                                        <td>{order_products.name}</td>
                                                        <td>{order_products.quantity}</td>
                                                        <td>{order_products.price}</td>
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

export default GridOrders

