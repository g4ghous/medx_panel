import React, { Component } from 'react';
import { Serverurl, Serverurlimg } from '../Common/ServerUrl';
import axios from 'axios';
import renderHTML from 'react-render-html';

export class ViewGuidelines extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            title: "",
            detail: "",
            title_ur: "",
            detail_ur: '',
            id: ''

        }
    }
    componentDidMount() {
        var id = localStorage.getItem("guide")
        var Check = parseInt(id)

        this.setState({
            guideId: Check,
        })

        console.log(id)
        var data = { 'id': Check, }
        console.log('params', data)
        axios({
            method: 'get',
            url: Serverurl + 'guideline/view',
            params: data,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            config: {
                headers: { 'Content-Type': 'application/json' }
            }
        })

            .then((res) => {
                console.log('guide:', res.data)
                if (res.status === 'true') {
                    console.log(data)
                }
                this.setState({
                    title: res.data.title,
                    detail: res.data.detail,
                    title_ur: res.data.title_ur,
                    detail_ur: res.data.detail_ur
                })
                console.log('data', res.data.data)

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
                                    <h4>Guideline Details</h4>
                                    <ul>
                                        <div class="row">
                                            <li class="col-12">
                                                <h5>Name</h5>
                                                <h6>{this.state.title}</h6>
                                            </li>
                                        </div>
                                        <div class="row">
                                            <li class="col-12"><h5>Description</h5>
                                                <h6>{this.state.detail}</h6>
                                            </li>
                                        </div>
                                    </ul>
                                    <h4 className="ar">رہنما اصول</h4>
                                    <ul>
                                        <div class="row">
                                            <li class="col-12">
                                                <h5 className="ar">نام</h5>
                                                <h6 className="ar">{this.state.title_ur}</h6>
                                            </li>
                                        </div>

                                        <div class="row">
                                            <li class="col-12">
                                                <h5 className="ar">تفصیل</h5>
                                                <h6 className="ar">{this.state.detail_ur}</h6>
                                            </li>
                                        </div>
                                    </ul>
                                    <div class="button-align">
                                        <a href="/component/GridGuidelines" type="button" class="btn btn-danger waves-effect waves-light submit-button">Back</a>
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

export default ViewGuidelines
