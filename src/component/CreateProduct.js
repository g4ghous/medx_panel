import React, { Component } from 'react';
import { Serverurl } from '../Common/ServerUrl';
import axios from 'axios';
import $ from 'jquery';
import swal from 'sweetalert';

export class CreateProduct extends Component {
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
                category_id: "",
                disease_name: "",
                chemical_formula: "",
                tablets_pack: "",
                tablets_strip: "",
                discount_percent: "",
                category_name:"",
                brand_id:""
            }
        }
    }

    componentDidMount() {
        var data;
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
            // var category = []
            // var flag=false;
            // for (var i = 0; i < res.data.length; i++) {
            //     console.log("loop", res.data[i].name);
            //     category.push(res.data[i].name.toLowerCase())
            //     if(category[i]=="tablet" || category[i]=="tablets"){
            //         // this.setState{
            //             flag=true;
            //         // }
            //     }

            // }
            // console.log("flag",flag)
            // console.log("arr", category);

            // console.log('hey', res.data)
            
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
            console.log('res', res.data)
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
            console.log('res', res.data)
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

    

    addProduct(e) {


        var validation = true;

        const emailsyntax = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;


        if (this.state.image == "") {
            validation = false;
            this.setState({
                errorText: "*Product Image is required"
            })
        }

        if (this.state.name == "") {
            validation = false;
            this.setState({
                errorText: "*Product Name is required"
            })
        }

        if (this.state.brand_id == "") {
            validation = false;
            this.setState({
                errorText: "*Product Brand is required"
            })
        }

        if (this.state.description == "") {
            validation = false;
            this.setState({
                errorText: "*Product Description is required"
            })
        }

        if (this.state.price == "") {
            validation = false;
            this.setState({
                errorText: '*Product Price is required'
            })
        }

        if (this.state.price <= 0) {
            validation = false;
            this.setState({
                errorText: '*Product Price must have a valid value is required'
            })
        }

        if (this.state.stock == "") {
            validation = false;
            this.setState({
                errorText: '*Product stock quantity is required'
            })
        }

        if (this.state.stock <= 0) {
            validation = false;
            this.setState({
                errorText: '*Product stock quantity must have a valid value'
            })
        }

        if (this.state.category_id == "") {
            validation = false;
            this.setState({
                errorText: '*Product Category is required'
            })
        }

        if (this.state.disease_name == "") {
            validation = false;
            this.setState({
                errorText: '*Product Disease is required'
            })
        }

        // if (this.state.chemical_formula == "") {
        //     validation = false;
        //     this.setState({
        //         errorText: '*Product Formula is required'
        //     })
        // }

        if(this.state.category_name == "tablets" || this.state.category_name == "tablet"){

        if (this.state.tablets_pack == "") {
            validation = false;
            this.setState({
                errorText: '*No. of tablets in a pack is required'
            })
        }

        if (this.state.tablets_pack <= 0) {
            validation = false;
            this.setState({
                errorText: '*No. of tablets in a pack must have a valid value'
            })
        }

        if (this.state.tablets_strip == "") {
            validation = false;
            this.setState({
                errorText: '*No. of tablets in a strip is required'
            })
        }

        if (this.state.tablets_strip <= 0) {
            validation = false;
            this.setState({
                errorText: '*No. of tablets in a strip must have a valid value'
            })
        }

    }

        if (validation == true) {

            let formData = new FormData();
            formData.append('image', this.state.image)
            formData.append('name', this.state.name)
            formData.append('description', this.state.description)
            formData.append('price', this.state.price)
            formData.append('stock', this.state.stock)
            formData.append('category_id', this.state.category_id)
            formData.append('brand_id', this.state.brand_id)
            formData.append('disease_name', this.state.disease_name)
            formData.append('chemical_formula', this.state.chemical_formula)
            formData.append('tablets_pack', this.state.tablets_pack)
            formData.append('tablets_strip', this.state.tablets_strip)
            formData.append('discount_percent', this.state.discount_percent)

            this.setState({
                loading: true
            })

            console.log('mydata', formData)

            var error = document.getElementById('err');
            if (this.state.name === ''
            ) {
                this.setState({
                    error: 'Please fill fields carefully'
                })
                error.classList.add('errorMsg');
                setTimeout(() => {
                    error.classList.remove('errorMsg')
                    this.setState({
                        error: ''
                    })
                }, 3000)
            } else {
                axios({
                    method: 'post',
                    url: Serverurl + 'products_add',
                    data: formData,
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                    config: {
                        headers: { 'Content-Type': 'application/json' }
                    }
                })
                    .then((res) => {
                        console.log('res', res.data.data)
                        if (res.status === "true") {
                            swal("Poof! Your imaginary file has been deleted!", {
                                icon: "success",
                            });
                            this.setState({
                                loading: true
                            })
                        } else {
                            swal("Product Succesfully Created!");
                        }
                        setTimeout(() => {
                            window.location.href = "/component/gridProducts"
                        }, 3000)
                        console.log('data', res.formData)
                    })
                    .catch((err) => {
                        console.log({ err })

                        console.log("res", err.response.data.error.message)

                        var error_message = err.response.data.error.message;

                        console.log("error", error_message[0])

                        if (err) {
                            this.setState({
                                loading: true
                            })
                            setTimeout(() => {
                                this.setState({
                                    loading: false
                                })
                                this.setState((willSuccess) => {
                                    if (willSuccess) {
                                        swal(error_message[0], {
                                            icon: "warning",
                                        });
                                    } else {
                                        swal("Your imaginary file is safe!");
                                    }
                                })
                            }, 3000)
                        }
                    })
            }
        }
    }



    onKeyDown = (event) => {
        // 'keypress' event misbehaves on mobile so we track 'Enter' key via 'keydown' event
        if (event.key === 'Enter') {
            event.preventDefault();
            event.stopPropagation();
            this.addAdventure();
        }
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
                        console.log("Category Name", o.name.toLowerCase());
                        return true;
                    }
                })
                
                console.log("thank-category", event.target.value);
    }



    handleFileInput = (event) => {
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

                                        <div class="form-group row input-margin">
                                            <label for="example-search-input" class="col-sm-2 col-form-label">Image Upload</label>
                                            <div class="col-sm-12">
                                                <input type="file" id="input-file-now" name="image" class="dropify" onChange={this.handleFileInput.bind(this)} />
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
                                                <input class="form-control" name="name" type="text" id="example-text-input" onChange={this.handleChangeProduct.bind(this)} />
                                            </div>
                                        </div>

                                        {this.state.category_name == "medical instrument" ? 
                                            null
                                            :
                                            <div class="form-group row input-margin">
                                                <label for="example-text-input" class="col-sm-2 col-form-label">Chemical Formula</label>
                                                <div class="col-sm-10">
                                                    <input class="form-control" name="chemical_formula" type="text" id="example-text-input" onChange={this.handleChangeProduct.bind(this)} />
                                                </div>
                                            </div>
                                        }

                                        <div class="form-group row input-margin">
                                            <label for="example-text-input" class="col-sm-2 col-form-label">Description</label>
                                            <div class="col-sm-10">
                                                <input class="form-control" name="description" type="text" id="example-text-input" onChange={this.handleChangeProduct.bind(this)} />
                                            </div>
                                        </div>

                                        <div class="form-group row">
                                            <label class="col-sm-2 col-form-label">Stock</label>
                                            <div class="col-sm-10">
                                                <input class="form-control" name="stock" type="number" id="example-text-input" onChange={this.handleChangeProduct.bind(this)} />
                                            </div>
                                        </div>

                                        <div class="form-group row">
                                            <label for="example-email-input" class="col-sm-2 col-form-label">Price</label>
                                            <div class="col-sm-10">
                                                <input class="form-control" name="price" type="number" id="example-email-input" onChange={this.handleChangeProduct.bind(this)} />
                                            </div>
                                        </div>

                                        {this.state.category_name == "tablets" || this.state.category_name == "tablet" ? 
                                            <>
                                                <div class="form-group row">
                                                    <label class="col-sm-2 col-form-label">No. of Tablets in Packet</label>
                                                    <div class="col-sm-10">
                                                        <input class="form-control" name="tablets_pack" type="number" id="example-text-input" onChange={this.handleChangeProduct.bind(this)} />
                                                    </div>
                                                </div>
                                                <div class="form-group row">
                                                    <label class="col-sm-2 col-form-label">No. of Tablets in Strip</label>
                                                    <div class="col-sm-10">
                                                        <input class="form-control" name="tablets_strip" type="number" id="example-text-input" onChange={this.handleChangeProduct.bind(this)} />
                                                    </div>
                                                </div>
                                            </>
                                            :
                                            null
                                        }
                                        
                                        <div class="form-group row">
                                            <label for="example-email-input" class="col-sm-2 col-form-label">Discount(%)</label>
                                            <div class="col-sm-10">
                                                <input class="form-control" name="discount_percent" type="number" id="example-email-input" onChange={this.handleChangeProduct.bind(this)} />
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
                                                <button type="button" class="btn btn-danger waves-effect waves-light submit-button" onClick={this.addProduct.bind(this)}>Submit</button>
                                            </div>
                                        </div>
                                        {/* {this.state.errorText ?
                                            <p style={{ color: 'red' }}>{this.state.errorText}</p>
                                            : null
                                        }
                                        <div id="err">{this.state.error}</div> */}
                                    </div>

                                    {/* <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                        <h4 class="mt-0 header-title ar">صارف بنائیں</h4>

                                        <div class="form-group row input-margin urdu">
                                            <label for="example-search-input" class="col-sm-2 col-form-label">پروفائل تصویری اپ لوڈ</label>
                                            <div class="col-sm-12">
                                                <input type="file" id="input-file-now" name="avatar"  class="dropify" />
                                            </div>
                                        </div>
                                        <div class="form-group row input-margin urdu">
                                            <label for="example-text-input" class="col-sm-2 col-form-label">پہلا نام</label>
                                            <div class="col-sm-10">
                                                <input class="form-control" name="first_name" type="text" id="example-text-input" />
                                            </div>
                                        </div>

                                        <div class="form-group row input-margin urdu">
                                            <label for="example-text-input" class="col-sm-2 col-form-label">آخری نام</label>
                                            <div class="col-sm-10">
                                                <input class="form-control" name="last_name" type="text" id="example-text-input" />
                                            </div>
                                        </div>

                                        <div class="form-group row urdu">
                                            <label for="example-email-input" class="col-sm-2 col-form-label">ای میل</label>
                                            <div class="col-sm-10">
                                                <input class="form-control" name="email" type="email" id="example-email-input" />
                                            </div>
                                        </div>

                                        <div class="form-group row input-margin urdu">
                                            <label for="example-text-input" class="col-sm-2 col-form-label">صارف کا نام</label>
                                            <div class="col-sm-10">
                                                <input class="form-control" name="username" type="text" id="example-text-input" />
                                            </div>
                                        </div>

                                        <div class="form-group row urdu">
                                            <label for="example-number-input" class="col-sm-2 col-form-label">رابطہ نمبر</label>
                                            <div class="col-sm-10">
                                                <input class="form-control" name="contact_number" type="number" id="example-number-input" />
                                            </div>
                                        </div>
                                        <div class="form-group row urdu">
                                            <label for="example-password-input" class="col-sm-2 col-form-label">پاس ورڈ</label>
                                            <div class="col-sm-10">
                                                <input class="form-control" name="password" type="password" id="example-password-input" />
                                            </div>
                                        </div>
                                        <div class="form-group row urdu">
                                            <label class="col-sm-2 col-form-label">حالت</label>
                                            <div class="col-sm-10">
                                                <select name="status" class="form-control">
                                                    <option>حیثیت منتخب کریں</option>
                                                    <option value="active">فعال</option>
                                                    <option value="inactive">غیر فعال</option>
                                                    <option value="block"> بلاک کریں</option>
                                                </select>
                                            </div>
                                        </div>
                                        {this.state.errorText ?
                                            <p style={{ color: 'red' }}>{this.state.errorText}</p>
                                            : null
                                        }
                                        <div id="err">{this.state.error}</div>
                                       

                                    </div> */}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CreateProduct

