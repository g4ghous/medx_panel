import React, { Component } from 'react';
import { Serverurl } from '../Common/ServerUrl';
import axios from 'axios';
import swal from 'sweetalert';

export class CreatePrivacy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            name: "",
        }
    }
    
    handleChangeCampaign(event) {
        this.setState
            ({ value: event.target.value })

    }

    handleChangeAdventure(event) {
        this.setState({
            [event.target.name]: event.target.value,
            errorText:""
        })
    }

    addDisease(e) {

        var validation = true;

        if (this.state.name == "") {
            validation = false;
            this.setState({
                errorText: "*Disease Name is required"
            })
        }

        if (validation == true) {

            var data = {
                name: this.state.name,
            }
            this.setState({
                loading: true
            })

            console.log('mydata', data)

            var error = document.getElementById('err');
            if (this.state.name === "" ||
                this.state.status === ""
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
                    url: Serverurl + 'disease_add',
                    data: data,
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                    config: {
                        headers: { 'Content-Type': 'application/json' }
                    }
                })
                    .then((res) => {
                        console.log('res', res.data)
                        if (res.status === "true") {
                            swal("Poof! Your imaginary file has been deleted!", {
                                icon: "success",
                            });
                            this.setState({
                                loading: true
                            })
                        } else {
                            swal("Disease Succesfully Created!");
                        }
                        setTimeout(() => {
                            window.location.href = "/component/GridDisease"
                        }, 3000)
                        console.log('data', res.data)
                    })
                    .catch((err) => {
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


    render() {
        return (
            <div>
                <div class="container">
                    <div class="row">
                        <div class="col-lg-11 col-md-12 card">
                            <div class="parent">
                                {/* <ul class="nav nav-tabs" id="myTab" role="tablist">
                                    <li class="nav-item">
                                        <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">English</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">اردو</a>
                                    </li>
                                </ul> */}
                                {/* <div class="tab-content" id="myTabContent"> */}
                                    <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                        <h4 class="mt-0 header-title">Create Disease</h4>
                                        <div class="form-group row input-margin">
                                            <label for="example-text-input" class="col-sm-2 col-form-label">Name</label>
                                            <div class="col-sm-10">
                                                <input class="form-control" name="name" onChange={this.handleChangeAdventure.bind(this)} type="text" id="example-text-input" />
                                            </div>
                                        </div>
                                    </div>
    
                                        {this.state.errorText ?
                                            <p style={{ color: 'red' }}>{this.state.errorText}</p>
                                            : null
                                        }
                                        <div class="form-group row">
                                            <div class="button-align">
                                                <button type="button" class="btn btn-danger waves-effect waves-light submit-button" onClick={this.addDisease.bind(this)}>Submit</button>
                                            </div>
                                        </div>
                                    {/* </div> */}
                                </div>


                            </div>
                        </div>
                    </div>


                </div>
        )
    }
}

export default CreatePrivacy
