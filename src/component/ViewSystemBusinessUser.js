import React, { Component } from 'react'
import { Serverurl, Serverurlimg } from '../Common/ServerUrl';
import axios from 'axios';
import renderHTML from 'react-render-html';


export class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            first_name_view: "",
            last_name_view: "",
            email_view: "",
            avatar_view: "",
            contact_number_view: "",
            status_view: "",
            user_name_view: "",
            user_type_view: "",
            designation_view: ""
        }
    }
    componentDidMount() {
        var id = localStorage.getItem('buserId')
        console.log(id)
        var data;
        axios({
            method: 'get',
            url: Serverurl + 'user/' + id,
            data: data,
            headers: {
                'Authorization': `bearer ${localStorage.getItem('token')}`,
            },
            config: {
                headers: { 'Content-Type': 'application/json' }
            }
        })

            .then((res) => {
                console.log('res', res)
                if (res.status === 'true') {
                    console.log(data)
                }
                this.setState({
                    first_name_view: res.data.data.first_name,
                    last_name_view: res.data.data.last_name,
                    avatar_view: res.data.data.avatar,
                    email_view: res.data.data.email,
                    contact_number_view: res.data.data.contact_number,
                    user_name_view: res.data.data.username,
                    status_view: res.data.data.status,
                    user_type_view: res.data.data.user_type_id,
                    designation_view: res.data.data.designation
                })
                console.log('data', data)
            }).catch((err) => {
                console.log(err)
                if (err) {
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
                                    <h4>Users Details</h4>
                                    <ul>
                                        <div class="row">
                                            <li class="col-12"><h5>Name</h5>
                                                {/* <h6>{this.state.first_name_view}{this.state.last_name_view}</h6> */}
                                            </li>
                                        </div>
                                        <div class="row">
                                            <li class="col-12">
                                                <h5>Email</h5>
                                                {/* <h6>{this.state.user_type_view == 1 ? "super admin" : "admin"}</h6> */}
                                            </li>
                                        </div>
                                        <div class="row">
                                            <li class="col-12">
                                                <h5>Phone</h5>
                                                {/* <h6>{this.state.user_type_view == 1 ? "super admin" : "admin"}</h6> */}
                                            </li>
                                        </div>
                                        
                                    </ul>
                                    <div class="button-align">
                                        <a href="/component/gridBusinessUsers" type="button" class="btn btn-danger waves-effect waves-light submit-button">Back</a>
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
