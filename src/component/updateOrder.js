import React, { Component } from 'react';
import { Serverurl } from '../Common/ServerUrl';
import axios from 'axios';
import $ from 'jquery';
import swal from 'sweetalert';

export class UpdateOrder extends Component {
    constructor(props) {
        super(props); {
            this.state = {
                data: [],
                orderId: "",
                status: '',
                errorText: ''
            }
        }
    }

    async componentDidMount() {
        var orderId = await localStorage.getItem('orderId');
        this.setState({ orderId })
        console.log('Order Id: ', orderId);

        axios({
            method: 'get',
            url: Serverurl + 'orders_show/' + orderId,
            // data: data,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            config: {
                headers: { 'Content-Type': 'application/json' }
            }

        }).then(res => {
            // console.log('res', res.data)
            console.log('Order Data', res.data)

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

    updateHandler = () => {
        var validation = true;
        console.log('Data', this.state.data)

        if(this.state.status == '') {
            this.setState({
                errorText: '*Status is required'
            })
            validation = false
        }

        if(validation == true) {
            this.setState({
                loading: true
            })

            var data = {
                "date": this.state.data.date,
                "status": this.state.status,
                "total": this.state.data.total,
                "name": this.state.data.name,
                "email": this.state.data.email,
                "phone": this.state.data.phone,
                "country": this.state.data.country,
                "city": this.state.data.city,
                "postal_code": this.state.data.postal_code,
                "address": this.state.data.address,
                "address_optional": this.state.data.address_optional
            }

            axios({
                method: 'post',
                url: Serverurl + "orders_edit/" + this.state.orderId,
                data: data,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
            })
            .then((response) => {
                this.setState({ loading: false });
                console.log('Response Data: ', response.data);

                swal("Order Successfully Edited!");
                setTimeout(() => {
                    window.location.href = "/component/gridOrders"
                }, 3000)
            })
            .catch((error) => {
                this.setState({ loading: false });
                swal("Something went wrong!");

                console.log('Error: ', error.response);
            });
        }
    }

    handleChangeProduct = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
            errorText: ""
        })
        console.log("Status", event.target.value);
    }
    
    render() {
        return (
            <div>

                <div class="container">
                    <div class="row">
                        <div class="col-lg-11 col-md-12 card">
                            <div class="parent">
                                {/* <ul class="nav nav-tabs" id="myTab" role="tablist">
                                    <li class="nav-item">
                                        <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Englsh</a>
                                    </li>
                                    {/* <li class="nav-item">
                                        <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">اردو</a>
                                    </li> 
                                </ul> */}
                                <div class="tab-content" id="myTabContent">
                                <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                        <h4 class="mt-0 header-title">Add Product</h4>

                                        <div class="form-group banner-position input-margin">
                                            <label for="example-search-input" class="col-form-label">Prescription Image</label>                                            
                                            <div className="banner">
                                                <img src={this.state.data.prescription} />
                                            </div>
                                        </div>       

                                        <div class="form-group row">
                                            <label class="col-sm-2 col-form-label">Status</label>
                                            <div class="col-sm-10">
                                                <select name="status" class="form-control" onChange={this.handleChangeProduct.bind(this)}>
                                                    <option value="">Select Status</option>                                                    
                                                    <option value="Order Placed">Order Placed</option>                                                    
                                                    <option value="Order Confirmed">Order Confirmed</option>                                                    
                                                    <option value="Order Shipped">Order Shipped</option>                                                    
                                                    <option value="Order Delivered">Order Delivered</option>                                                    
                                                    <option value="Order Cancelled">Order Cancelled</option>                                                    
                                                </select>
                                            </div>
                                        </div>

                                        {this.state.errorText ?
                                            <p style={{ color: 'red' }}>{this.state.errorText}</p>
                                            : null
                                        }

                                        <div class="form-group row">
                                            <div class="button-align">
                                                <button type="button" class="btn btn-danger waves-effect waves-light submit-button"
                                                    onClick={this.updateHandler.bind(this)} >Submit</button>
                                            </div>
                                        </div>
                                        {/* {this.state.errorText ?
                                            <p style={{ color: 'red' }}>{this.state.errorText}</p>
                                            : null
                                        }
                                        <div id="err">{this.state.error}</div> */}
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

export default UpdateOrder;

