import React, { Component } from 'react';
import { Serverurl } from '../Common/ServerUrl';
import axios from 'axios';
import $ from 'jquery';
import swal from 'sweetalert';

export class UpdateProduct extends Component {
    constructor(props) {
        super(props); {
            this.state = {
                data: [],
                disease: [],
                category_list:[],
                brand_show:[],
                names: "",
                image: "",
                name: "",
                description: "",
                stock: "",
                price: "",
                category_id: null,
                disease_name: "",
                chemical_formula: "",
                tablets_pack: "",
                tablets_strip: "",
                discount_percent: "",
                category_name: "",
                brand_id: null,
                product_id: ""
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
        }).catch((err) => {
            console.log(err)
            if (err) {
                // console.log('err', err.response)
                console.log({ err })
            }
        })

        axios({
            method: 'get',
            url: Serverurl + 'category_show',
            data: data,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            config: {
                headers: { 'Content-Type': 'application/json' }
            }

        }).then(res => {
            console.log('cat', res.data)
            
            this.setState({
                category_list: res.data,
                // names: flag
            })
            console.log('n', this.state.names)
        }).catch((err) => {
            console.log(err)
            if (err) {
                // console.log('err', err.response)
                console.log({ err })
            }
        })

        var data;
        axios({
            method: 'get',
            url: Serverurl + 'disease_show',
            data: data,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            config: {
                headers: { 'Content-Type': 'application/json' }
            }

        }).then(res => {
            console.log('hey', res.data)
            this.setState({
                disease: res.data,
            })
            // console.log('data', res.data.data)
        }).catch((err) => {
            console.log(err)
            if (err) {
                // console.log('err', err.response)
                console.log({ err })
            }
        })

        var data;
        axios({
            method: 'get',
            url: Serverurl + 'brand_show',
            data: data,
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

        const { data } = this.state;

        if(validation == true) {
            this.setState({
                loading: true
            })

            var formData = new FormData();
            if(this.state.image) {
                formData.append("image", this.state.image);
            }
            formData.append("name", this.state.name ? this.state.name : data.name);
            formData.append('description', this.state.description ? this.state.description : data.description)
            formData.append('price', this.state.price ? this.state.price : data.price)
            formData.append('stock', this.state.stock ? this.state.stock : data.stock)
            formData.append('category_id', this.state.category_id ? this.state.category_id : data.category_id)
            formData.append('brand_id', this.state.brand_id ? this.state.brand_id : data.brand_id)
            formData.append('disease_name', this.state.disease_name ? this.state.disease_name : data.disease_name)
            formData.append('chemical_formula', this.state.chemical_formula ? this.state.chemical_formula : data.chemical_formula)
            formData.append('tablets_pack', this.state.tablets_pack ? this.state.tablets_pack : data.tablets_pack)
            formData.append('tablets_strip', this.state.tablets_strip ? this.state.tablets_strip : data.tablets_strip)
            formData.append('discount_percent', this.state.discount_percent ? this.state.discount_percent : data.discount_percent)

            axios({
                method: 'post',
                url: Serverurl + "products_edit/" + this.state.product_id,
                data: formData,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'multipart/form-data'
                },
            })
            .then((response) => {
                this.setState({ loading: false });
                console.log('Response Data: ', response.data);

                swal("Product Successfully Edited!");
                setTimeout(() => {
                    window.location.href = "/component/gridProducts"
                }, 3000)
            })
            .catch((error) => {
                this.setState({ loading: false });
                swal("Something went wrong!");

                console.log('Error: ', error.response);
            });
        }
    }

    handleFileInputLogo = (event) => {
        console.log(event.target.files, 'file')
        console.log(event.target.files[0], 'file 0')
        let file = event.target.files[0]

        this.setState({ image: file })

        if (event.target.files) {
            this.setState({
                [event.target.name]: event.target.files[0],
                file: URL.createObjectURL(event.target.files[0])
            })
        }
        console.log(event.target.files[0])
    }

    handleChangeProduct = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
            errorText: ""
        })
        console.log("thank", event.target.value);
    }

    handleChangeCategory = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
            errorText: ""
        })
        console.log("lisst", this.state.category_list);
        this.state.category_list.find(o => { // 'o' means object
                    if(o.id == event.target.value) {
                        this.setState({
                            category_name: o.name.toLowerCase()
                        })
                        console.log("helllo", o.name.toLowerCase());
                        return true;
                    }
                })
                
                console.log("thank-category", event.target.value);
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
                                        <h4 class="mt-0 header-title">Update Product</h4>

                                        <div class="form-group banner-position input-margin">
                                            <label for="example-search-input" class="col-form-label">Product Image</label>
                                            <div>
                                                <input type="file" name="image" onChange={this.handleFileInputLogo.bind(this)} class="form-control-file" />
                                            </div>
                                            <div className="banner">
                                                {this.state.file ?
                                                    <img src={this.state.file} />
                                                    :
                                                    <img src={this.state.data.image} />
                                                }
                                            </div>
                                        </div>

                                        <div class="form-group row">
                                            <label class="col-sm-2 col-form-label">Category</label>
                                            <div class="col-sm-10">
                                                <select name="category_id" class="form-control" onChange={this.handleChangeCategory.bind(this)}>
                                                    <option>Select Category</option>
                                                    {this.state.category_list.map((category) => {
                                                        return (
                                                            <option key={category.id} value={category.id}>{category.name}</option>                                                            
                                                        )
                                                    })}
                                                </select>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label class="col-sm-2 col-form-label">Brands</label>
                                            <div class="col-sm-10">
                                                <select name="brand_id" class="form-control" onChange={this.handleChangeProduct.bind(this)}>
                                                    <option>Select Brand</option>
                                                    {this.state.brand_show.map((category) => {
                                                        return (
                                                            <option key={category.id} value={category.id}>{category.name}</option>                                                            
                                                        )
                                                    })}
                                                </select>
                                            </div>
                                        </div>

                                        <div class="form-group row input-margin">
                                            <label for="example-text-input" class="col-sm-2 col-form-label">Name</label>
                                            <div class="col-sm-10">
                                                <input class="form-control" name="name" type="text" id="example-text-input" 
                                                    onChange={this.handleChangeProduct.bind(this)} placeholder={this.state.data.name} />
                                            </div>
                                        </div>

                                        <div class="form-group row input-margin">
                                            <label for="example-text-input" class="col-sm-2 col-form-label">Chemical Formula</label>
                                            <div class="col-sm-10">
                                                <input class="form-control" name="chemical_formula" type="text" id="example-text-input" 
                                                    onChange={this.handleChangeProduct.bind(this)} placeholder={this.state.data.chemical_formula} />
                                            </div>
                                        </div>

                                        <div class="form-group row input-margin">
                                            <label for="example-text-input" class="col-sm-2 col-form-label">Description</label>
                                            <div class="col-sm-10">
                                                <input class="form-control" name="description" type="text" id="example-text-input" 
                                                    onChange={this.handleChangeProduct.bind(this)} placeholder={this.state.data.description} />
                                            </div>
                                        </div>

                                        <div class="form-group row">
                                            <label class="col-sm-2 col-form-label">Stock</label>
                                            <div class="col-sm-10">
                                                <input class="form-control" name="stock" type="number" id="example-text-input" 
                                                    onChange={this.handleChangeProduct.bind(this)} placeholder={this.state.data.stock} />
                                            </div>
                                        </div>

                                        <div class="form-group row">
                                            <label for="example-email-input" class="col-sm-2 col-form-label">Price</label>
                                            <div class="col-sm-10">
                                                <input class="form-control" name="price" type="number" id="example-email-input" 
                                                    onChange={this.handleChangeProduct.bind(this)} placeholder={this.state.data.price} />
                                            </div>
                                        </div>

                                        {this.state.category_name == "tablets" || this.state.category_name == "tablet" ? 
                                            <>
                                                <div class="form-group row">
                                                    <label class="col-sm-2 col-form-label">No. of Tablets in Packet</label>
                                                    <div class="col-sm-10">
                                                        <input class="form-control" name="tablets_pack" type="number" id="example-text-input" 
                                                            onChange={this.handleChangeProduct.bind(this)} placeholder={this.state.data.tablets_pack} />
                                                    </div>
                                                </div>
                                                <div class="form-group row">
                                                    <label class="col-sm-2 col-form-label">No. of Tablets in Strip</label>
                                                    <div class="col-sm-10">
                                                        <input class="form-control" name="tablets_strip" type="number" id="example-text-input" 
                                                            onChange={this.handleChangeProduct.bind(this)} placeholder={this.state.data.tablets_strip} />
                                                    </div>
                                                </div>
                                            </>
                                            :
                                            null
                                        }
                                        
                                        <div class="form-group row">
                                            <label for="example-email-input" class="col-sm-2 col-form-label">Discount(%)</label>
                                            <div class="col-sm-10">
                                                <input class="form-control" name="discount_percent" type="number" id="example-email-input" 
                                                    onChange={this.handleChangeProduct.bind(this)} placeholder={this.state.data.discount_percent} />
                                            </div>
                                        </div>


                                        <div class="form-group row">
                                            <label class="col-sm-2 col-form-label">Disease</label>
                                            <div class="col-sm-10">
                                                <select name="disease_name" class="form-control" onChange={this.handleChangeProduct.bind(this)}>
                                                    <option>Select Disease</option>
                                                    {this.state.disease.map((disease) => {
                                                        return (
                                                            <option key={disease.id} value={disease.name}>{disease.name}</option>
                                                        )
                                                    })}
                                                </select>
                                            </div>
                                        </div>


                                        {/* <div class="form-group row">
                                            <label for="example-password-input" class="col-sm-2 col-form-label">Postal Code</label>
                                            <div class="col-sm-10">
                                                <input class="form-control" name="password" type="password" id="example-password-input" />
                                            </div>
                                        </div> */}
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

export default UpdateProduct

