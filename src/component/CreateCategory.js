import React, { Component } from 'react';
import { Serverurl } from '../Common/ServerUrl';
import axios from 'axios';
import $ from 'jquery';
import swal from 'sweetalert';




export class CreateCategory extends Component {
   
    constructor(props) {
        super(props); {
            this.state = {
                data: [],
                image:"",
                name:"",
                description:"",
            }
        }
    }

    addCategory(e) {


        var validation = true;

        const emailsyntax = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;


        if (this.state.image == "") {
            validation = false;
            this.setState({
                errorText: "*Category Image is required"
            })
        }

        if (this.state.name == "") {
            validation = false;
            this.setState({
                errorText: "*Category Name is required"
            })
        }

        if (this.state.description == "") {
            validation = false;
            this.setState({
                errorText: "*Category Description is required"
            })
        }



        if (validation == true) {

            let formData = new FormData();
            formData.append('image', this.state.image)
            formData.append('name', this.state.name)
            formData.append('description', this.state.description)
            

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
                    url: Serverurl + 'category_add',
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
                            swal("Category Succesfully Created!");
                        }
                        setTimeout(() => {
                            window.location.href = "/component/gridCategories"
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

    handleChangeCategory = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
            errorText:""
        })
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

    onKeyDown = (event) => {
        // 'keypress' event misbehaves on mobile so we track 'Enter' key via 'keydown' event
        if (event.key === 'Enter') {
            event.preventDefault();
            event.stopPropagation();
            this.addCategory();
        }
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
                                        <h4 class="mt-0 header-title">Add Category</h4>

                                        <div class="form-group row input-margin">
                                            <label for="example-search-input" class="col-sm-2 col-form-label">Image Upload</label>
                                            <div class="col-sm-12">
                                                <input type="file" id="input-file-now" name="image" class="dropify" onChange={this.handleFileInput.bind(this)}/>
                                            </div>
                                        </div>
                                        <div class="form-group row input-margin">
                                            <label for="example-text-input" class="col-sm-2 col-form-label">Name</label>
                                            <div class="col-sm-10">
                                                <input class="form-control" name="name" type="text" id="example-text-input" onChange={this.handleChangeCategory.bind(this)}/>
                                            </div>
                                        </div>

                                        <div class="form-group row input-margin">
                                            <label for="example-text-input" class="col-sm-2 col-form-label">Description</label>
                                            <div class="col-sm-10">
                                                <input class="form-control" name="description" type="text" id="example-text-input" onChange={this.handleChangeCategory.bind(this)}/>
                                            </div>
                                        </div>
                                        {this.state.errorText ?
                                            <p style={{ color: 'red' }}>{this.state.errorText}</p>
                                            : null
                                        }
                                         <div class="form-group row">
                                            <div class="button-align">
                                                <button type="button" class="btn btn-danger waves-effect waves-light submit-button" onClick={this.addCategory.bind(this)}>Submit</button>
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

export default CreateCategory

