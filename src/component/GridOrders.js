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
            order:[],
            name:""
        }
    }

    componentDidMount() {
        var data;
        axios({
            method: 'get',
            url: Serverurl + 'orders_show',
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

    view(id) {
        // localStorage.setItem('view', id)
        // console.log("idp", id)

        // var id = localStorage.getItem('view')
        // var data = {
        //     'id': id
        // };
        axios({
            method: 'get',
            url: Serverurl + 'orderproducts_search/' + id,
            // data: data,
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
                order: res.data,

            })
            $(document).ready(function () {
                $('#datatable3').DataTable();
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

    saveOrderId = (id) => {
        localStorage.setItem('orderId', id);
        // console.log('Booking Id: ', id)
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
                                            <h4>List Orders</h4>
                                        </div>
                                        <div class="button-align">
                                            {/* <a href="/component/GridProductOrders" type="button" class="btn btn-danger waves-effect waves-light submit-button" >Order Products</a> */}
                                        </div>
                                    </div>
                                    <div class="table-3">
                                        <table id="datatable2" class="table">
                                            <thead>
                                                <tr>

                                                    <th>Order id</th>
                                                    <th>Name</th>
                                                    <th>Phone</th>
                                                    <th>Address</th>
                                                    <th>Prescription</th>
                                                    <th>Date</th>
                                                    <th>Total</th>
                                                    <th>Status</th>
                                                    <th>Actions</th>

                                                </tr>
                                            </thead>

                                            <tbody>
                                                {this.state.data.map((order) =>
                                                    <tr key={order.id}>
                                                        <td>{order.id}</td>
                                                        <td>{order.name}</td>
                                                        <td>{order.phone}</td>
                                                        <td>{order.address}</td>
                                                        <td>
                                                            {order.prescription ?
                                                                <img src={order.prescription} height={50} width={50} />
                                                                :
                                                                "Not Uploaded"    
                                                            }
                                                        </td>
                                                        <td>{order.date}</td>
                                                        <td>{order.total}</td>
                                                        <td>{order.status}</td>
                                                        <td>
                                                            <div class="icon-pad">
                                                                <a href="/component/updateOrder" onClick={this.saveOrderId.bind(this, order.id)}>
                                                                    <i className="fas fa-pencil-alt"></i>
                                                                </a>
                                                                <a data-toggle="modal" data-target="#exampleModalCenter" onClick={this.view.bind(this, order.id)}><i className="fas fa-eye"></i></a>
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


                        
                        <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLongTitle">Order Details</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                    <div class="table-3">
                                        <table id="datatable3" class="table">
                                            <thead>
                                                <tr>

                                                    <th>Order id</th>
                                                    <th>Image</th>
                                                    <th>Name</th>
                                                    <th>Package Type</th>
                                                    <th>Qty</th>
                                                    <th>Price</th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.order.map((order_product) =>
                                                    <tr key={order_product.id}>
                                                        <td>{order_product.order_id}</td>
                                                        <td><img src={order_product.image} height={30} width={30} /></td>
                                                        <td>{order_product.name}</td>
                                                        <td>{order_product.package_type}</td>
                                                        <td>{order_product.quantity}</td>
                                                        <td>{order_product.price}</td>
                                                        
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                 </div>
                                    <div class="modal-footer">
                                        {/* <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button> */}
                                        {/* <button type="button" class="btn btn-primary">Save changes</button> */}
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

