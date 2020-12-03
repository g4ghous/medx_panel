import React, { Component } from 'react'
import { Serverurl, Serverurlimg } from '../Common/ServerUrl';
import axios from 'axios';
import renderHTML from 'react-render-html';
import $ from 'jquery';

export class Home extends Component {
    constructor(props) {
        super(props); {
            this.state = {
                data: {},
                disease: [],
                category_list:[],
                brand_show:[],
                product_id: null,
                category: '',
                brand: ''
            }
        }
    }

    async componentDidMount() {
        var product_id = await localStorage.getItem('productId');
        this.setState({ product_id })
        console.log('Product Id: ', product_id);

        axios({
            method: 'get',
            url: Serverurl + 'products_show/' + product_id,
            // data: data,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            config: {
                headers: { 'Content-Type': 'application/json' }
            }

        }).then(res => {
            console.log('Response Data', res.data)

            this.setState({
                data: res.data,
            })
            $(document).ready(function () {
                $('#datatable2').DataTable();
            });

            //For category name
            axios({
                method: 'get',
                url: Serverurl + 'category_show',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                config: {
                    headers: { 'Content-Type': 'application/json' }
                }
    
            }).then(res => {
                console.log('cat', res.data)
    
                res.data.find(o => {
                    if(o.id === this.state.data.category_id) {
                        this.setState({
                            category: o.name
                        })
                        return true;
                    }
                })
                
                this.setState({
                    category_list: res.data
                })
            }).catch((err) => {
                console.log(err)
                if (err) {
                    // console.log('err', err.response)
                    console.log({ err })
                }
            })
            
            //For Brand name
            axios({
                method: 'get',
                url: Serverurl + 'brand_show',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                config: {
                    headers: { 'Content-Type': 'application/json' }
                }
    
            }).then(res => {
                console.log('hey', res.data)
                this.setState({
                    brand_show: res.data,
                })
                
                res.data.find(o => {
                    if(o.id === this.state.data.brand_id) {
                        this.setState({
                            brand: o.name
                        })
                        return true;
                    }
                })
            }).catch((err) => {
                console.log(err)
                if (err) {
                    // console.log('err', err.response)
                    console.log({ err })
                }
            })
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
            <div className="container">
                <div class="row justify-content-center">
                    <div class="col-lg-11 col-sm-11">
                        <div class="card">
                            <div class="card-body table-responsive">
                                <div className="head view-list-style">
                                    <h4>Product Details</h4>
                                    <ul>
                                        <div class="row">
                                            <li class="col-12">
                                                <h5>Image</h5>
                                                <img src={this.state.data.image} />
                                            </li>
                                        </div>
                                        <div class="row">
                                            <li class="col-12">
                                                <h5>Name</h5>
                                                <h6>{this.state.data.name}</h6>
                                            </li>
                                        </div>
                                        <div class="row">
                                            <li class="col-12">
                                                <h5>Description</h5>
                                                <h6>{this.state.data.description}</h6>
                                            </li>
                                        </div>
                                        <div class="row">
                                            <li class="col-12">
                                                <h5>Stock</h5>
                                                <h6>{this.state.data.stock}</h6>
                                            </li>
                                        </div>
                                        <div class="row">
                                            <li class="col-12">
                                                <h5>Price</h5>
                                                <h6>{this.state.data.price}</h6>
                                            </li>
                                        </div>
                                        <div class="row">
                                            <li class="col-12">
                                                <h5>Category</h5>
                                                <h6>{this.state.category}</h6>
                                            </li>
                                        </div>                                       
                                        <div class="row">
                                            <li class="col-12">
                                                <h5>Brand</h5>
                                                <h6>{this.state.brand}</h6>
                                            </li>
                                        </div>                                       
                                        <div class="row">
                                            <li class="col-12">
                                                <h5>Disease</h5>
                                                <h6>{this.state.data.disease_name}</h6>
                                            </li>
                                        </div>   

                                        {this.state.data.chemical_formula ?                                      
                                            <div class="row">
                                                <li class="col-12">
                                                    <h5>Chemical Formula</h5>
                                                    <h6>{this.state.data.chemical_formula}</h6>
                                                </li>
                                            </div>        
                                            :
                                            null
                                        }

                                        {this.state.data.tablets_pack && this.state.data.tablets_strip ?
                                            <>
                                                <div class="row">
                                                    <li class="col-12">
                                                        <h5>Total Tablets in Pack</h5>
                                                        <h6>{this.state.data.tablets_pack}</h6>
                                                    </li>
                                                </div>                                         
                                                <div class="row">
                                                    <li class="col-12">
                                                        <h5>Total Tablets in Strip</h5>
                                                        <h6>{this.state.data.tablets_strip}</h6>
                                                    </li>
                                                </div>  
                                            </> 
                                            :
                                            null
                                        }                                 
                                                                              
                                    </ul>
                                    <div class="button-align">
                                        <a href="/component/gridProducts" type="button" class="btn btn-danger waves-effect waves-light submit-button">Back</a>
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

export default Home
