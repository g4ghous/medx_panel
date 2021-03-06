import avatar2 from '../component/assets/images/users/avatar2.jpg';
import React, { Component } from 'react';
import { Serverurl, Serverurlimg } from '../Common/ServerUrl';
import axios from 'axios';
import $ from 'jquery';
import swal from 'sweetalert';

export class GridProducts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            productCategories: []
        }
    }

    componentDidMount() {
        this.productsShow();
    }

    productsShow = () => {
        var data;
        axios({
            method: 'get',
            url: Serverurl + 'products_show',
            data: data,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            config: {
                headers: { 'Content-Type': 'application/json' }
            }

        }).then(res => {
            console.log('res', res.data)
            this.setState({
                data: res.data,
            })
            $(document).ready(function () {
                $('#datatable2').DataTable();
            });
        }).catch((err) => {
            console.log(err)
            if (err) {
                // console.log('err', err.response)
                console.log({ err })
            }
        })
    }

    deleteProductHandler = (id) => {
        axios({
            method: 'delete',
            url: Serverurl + 'products_delete/' + id,
            // data: data,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            config: {
                headers: { 'Content-Type': 'application/json' }
            }

        }).then(res => {
            console.log('res', res.data)
            console.log('Response Data', res.data)

            this.productsShow();
            swal("Product deleted successfully!");

            // this.setState({
            //     data: res.data,
            // })
            $(document).ready(function () {
                $('#datatable2').DataTable();
            });
        }).catch((err) => {
            console.log(err)
            swal("Something went wrong!");
            if (err) {
                // console.log('err', err.response)
                console.log({ err })
            }
        })
    }

    saveProductId = (id) => {
        localStorage.setItem('productId', id);
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
                                            <h4>List Products</h4>
                                        </div>
                                        <div class="button-align">
                                            <a href="/component/CreateProduct" type="button" class="btn btn-danger waves-effect waves-light submit-button" >Add Product</a>
                                        </div>
                                    </div>
                                    <div class="table-3">
                                        <table id="datatable2" class="table">
                                            <thead>
                                                <tr>
                                                    <th>Image</th>
                                                    <th>Name</th>
                                                    <th>Description</th>
                                                    <th>Stock</th>
                                                    <th>Price</th>                                                     
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>


                                            <tbody>

                                            {this.state.data.map((product) =>
                                                    <tr key={product.id}>
                                                        <td><img src={product.image} width="50px"/></td>
                                                        <td>{product.name}</td>
                                                        <td>{product.description}</td>
                                                        <td>{product.stock}</td>
                                                        <td>{product.price}</td>
                                                        <td>
                                                            {/* <div class="icon-pad">
                                                                <a><i className="fas fa-pencil-alt"></i></a>
                                                            </div> */}
                                                        <div class="icon-pad">
                                                            <a href="/component/updateProduct" onClick={this.saveProductId.bind(this, product.id)}><i className="fas fa-pencil-alt"></i></a>
                                                            <a href="/component/ViewProduct" onClick={this.saveProductId.bind(this, product.id)}><i className="fas fa-eye"></i></a>
                                                            <i className="fas fa-trash-alt" onClick={this.deleteProductHandler.bind(this, product.id)}></i>
                                                        </div>
                                                        </td>
                                                    </tr>
                                                )}
                                                    <td>
                                                    </td>


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

export default GridProducts

