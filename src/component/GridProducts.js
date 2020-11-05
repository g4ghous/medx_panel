import avatar2 from '../component/assets/images/users/avatar2.jpg';
import React, { Component } from 'react';
import { Serverurl, Serverurlimg } from '../Common/ServerUrl';
import axios from 'axios';
import $ from 'jquery';

export class GridProducts extends Component {
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
                                                            <a href="/component/updateProduct"><i className="fas fa-pencil-alt"></i></a>
                                                            <a href="/component/ViewProduct"><i className="fas fa-eye"></i></a>
                                                            <i className="fas fa-trash-alt"></i>
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

