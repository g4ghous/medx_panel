import React, { Component } from 'react';
import { Serverurl } from '../Common/ServerUrl';
import axios from 'axios';
import $ from 'jquery';
import swal from 'sweetalert';




export class CreateBusinessUser extends Component {
    constructor(props) {
        super(props); {
            this.state = {
                data: [],
                name:"",
                email:"",
                phone:"",
                password:"",
                c_password:"",
                user_type:""
            }
        }
    }

    addUser(e) {


        var validation = true;

        const emailsyntax = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;


        if (this.state.name == "") {
            validation = false;
            this.setState({
                errorText: "*User Name is required"
            })
        }

        if (this.state.email == "") {
            validation = false;
            this.setState({
                errorText: "*User Email is required"
            })
        }

        if (this.state.phone == "") {
            validation = false;
            this.setState({
                errorText: "*User Phone no. is required"
            })
        }

        if (this.state.user_type == "") {
            validation = false;
            this.setState({
                errorText: "*User Type is required"
            })
        }

        if (this.state.password == "") {
            validation = false;
            this.setState({
                errorText: "*User Password is required"
            })
        }

        if (this.state.c_password == "") {
            validation = false;
            this.setState({
                errorText: "*Password Confirmation is required"
            })
        }

        if (this.state.c_password != this.state.password) {
            validation = false;
            this.setState({
                errorText: "*Password's did not match"
            })
        }



        if (validation == true) {

            let formData = new FormData();
            formData.append('email', this.state.email)
            formData.append('name', this.state.name)
            formData.append('phone', this.state.phone)
            formData.append('password', this.state.password)
            formData.append('c_password', this.state.c_password)
            formData.append('user_type', this.state.user_type)

            

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
                    url: Serverurl + 'register',
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
                            swal("User Succesfully Created!");
                        }
                        setTimeout(() => {
                            window.location.href = "/component/gridBusinessUsers"
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
    
    handleChangeUser = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
            errorText:""
        })
        

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
                                        <h4 class="mt-0 header-title">Create User</h4>

                                        {/* <div class="form-group row input-margin">
                                            <label for="example-search-input" class="col-sm-2 col-form-label">Profile Image Upload</label>
                                            <div class="col-sm-12">
                                                <input type="file" id="input-file-now" name="avatar" onChange={this.handleFileInput.bind(this)} class="dropify" />
                                            </div>
                                        </div> */}
                                        <div class="form-group row">
                                            <label class="col-sm-2 col-form-label">User Type</label>
                                            <div class="col-sm-10">
                                                <select name="user_type" class="form-control" onChange={this.handleChangeUser.bind(this)}>
                                                <option>Select User Type</option>
                                                    <option value="admin">Admin</option>
                                                    <option value="customer">User</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div class="form-group row input-margin">
                                            <label for="example-text-input" class="col-sm-2 col-form-label">Name</label>
                                            <div class="col-sm-10">
                                                <input class="form-control" name="name" type="text" id="example-text-input" onChange={this.handleChangeUser.bind(this)}/>
                                            </div>
                                        </div>


                                        <div class="form-group row">
                                            <label for="example-email-input" class="col-sm-2 col-form-label">Email</label>
                                            <div class="col-sm-10">
                                                <input class="form-control" name="email" type="email" id="example-email-input" onChange={this.handleChangeUser.bind(this)}/>
                                            </div>
                                        </div>

                                        <div class="form-group row input-margin">
                                            <label for="example-text-input" class="col-sm-2 col-form-label">Phone</label>
                                            <div class="col-sm-10">
                                                <input class="form-control" name="phone" type="text" id="example-text-input" onChange={this.handleChangeUser.bind(this)}/>
                                            </div>
                                        </div>

                                        <div class="form-group row">
                                            <label for="example-number-input" class="col-sm-2 col-form-label">Password</label>
                                            <div class="col-sm-10">
                                                <input class="form-control" name="password" type="password" id="example-number-input" onChange={this.handleChangeUser.bind(this)}/>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="example-password-input" class="col-sm-2 col-form-label">Confirm Password</label>
                                            <div class="col-sm-10">
                                                <input class="form-control" name="c_password" type="password" id="example-password-input" onChange={this.handleChangeUser.bind(this)}/>
                                            </div>
                                        </div>
                                        
                                        {this.state.errorText ?
                                            <p style={{ color: 'red' }}>{this.state.errorText}</p>
                                            : null
                                        }
                                         <div class="form-group row">
                                            <div class="button-align">
                                                <button type="button" class="btn btn-danger waves-effect waves-light submit-button" onClick={this.addUser.bind(this)}>Submit</button>
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

export default CreateBusinessUser

