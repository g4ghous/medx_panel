import React, { Component } from 'react'
import { Serverurl, Serverurlimg } from '../Common/ServerUrl';
import axios from 'axios';
import renderHTML from 'react-render-html';


export class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            name_view:"",
            email_view:"",
            msg_view:""
        }
    }
    componentDidMount() {
        var id = localStorage.getItem('viewContact')
        console.log(id)
        var data;
        axios({
            method: 'get',
            url: Serverurl + 'contact_show/' + id,
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
                // if (res.status === 'true') {
                //     console.log(data)
                // }
                this.setState({
                    name_view:res.data.name,
                    email_view: res.data.email,
                    msg_view:res.data.message
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
                                                <h6>{this.state.name_view}</h6>
                                            </li>
                                        </div>
                                        <div class="row">
                                            <li class="col-12">
                                                <h5>Email</h5>
                                                <h6>{this.state.email_view}</h6>
                                            </li>
                                        </div>
                                        <div class="row">
                                            <li class="col-12">
                                                <h5>Message</h5>
                                                <h6>{this.state.msg_view}</h6>
                                            </li>
                                        </div>
                                        
                                    </ul>
                                    <div class="button-align">
                                        <a href="/component/gridContact" type="button" class="btn btn-danger waves-effect waves-light submit-button">Back</a>
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
