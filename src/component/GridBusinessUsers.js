import avatar2 from '../component/assets/images/users/avatar2.jpg';
import React, { Component } from 'react';
import { Serverurl, Serverurlimg } from '../Common/ServerUrl';
import axios from 'axios';
import $ from 'jquery';
import swal from "sweetalert";

export class GridBusinessUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        }
    }

    componentDidMount() {
        var data;
        axios({
            method: 'get',
            url: Serverurl + "user_show",
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
                data: res.data,
            })
            $(document).ready(function () {
                $('#datatable2').DataTable();
            });
            console.log('data', res.data.data)
        }).catch((err) => {
            console.log(err)
            if (err) {
                console.log('err', err.response)
                console.log({ err })
            }
        })
    }


    delete(id) {
        localStorage.setItem('deleteEvent', id)
        console.log("idp", id)
    }

    deleteBooking() {
        // var id = localStorage.getItem("deleteEvent")

        // var Check = parseInt(id)

        // this.setState({
        //     GuideId: Check,
        
        // })

            var id = localStorage.getItem("deleteEvent")
        var data;

        axios({
            method: 'DELETE',
            url: Serverurl + 'user_delete/' + id,
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
                if (res.status === 'true') {
                    swal("Poof! Your imaginary file has been deleted!", {
                        icon: "success",
                    });
                    this.setState({
                        loading: true
                    })
                } else {
                    swal("Your Record Succesfully Deleted!");
                }
                setTimeout(() => {
                    window.location.reload()
                }, 2000)
            })

            .catch((err) => {
                console.log(err)
                if (err) {
                    setTimeout(() => {
                        this.setState({
                            loading: false
                        })
                        this.setState((willSuccess) => {
                            if (willSuccess) {
                                swal("Check Your Internet Connection", {
                                    icon: "warning",
                                });
                            } else {
                                swal("Your Record Succesfully Deleted!");
                            }
                        })
                    }, 5000)
                }
            })
    }


    // viewUser(id) {
    //     localStorage.setItem('buserId', id)
    //     console.log(id)
    //     window.location.href = "/component/ViewSystemBusinessUser"
    // }

    // updateUser(id) {
    //     localStorage.setItem('buserupdateId', id)
    //     console.log(id)
    //     window.location.href = "/component/UpdateBusinessUser"
    // }

    render() {
        return (
            <div>
                <div className="container">
                    <div class="row justify-content-center">
                        <div class="col-lg-11 col-sm-11">
                            <div class="card">
                                <div class="card-body table-responsive">
                                    <div className="list-head-btn">
                                        <div className="head">
                                            <h4>List Users</h4>
                                        </div>
                                        <div class="button-align">
                                            <a href="/component/createBusinessUser" type="button" class="btn btn-danger waves-effect waves-light submit-button" >Add User</a>
                                        </div>
                                    </div>
                                    <div class="table-3">
                                        <table id="datatable2" class="table">
                                            <thead>
                                                <tr>
                                                    <th>User Id</th>
                                                    <th>Name</th>
                                                    <th>Email</th>
                                                    <th>Phone</th>
                                                    <th>User Type</th>
                                                    <th>Actions</th>

                                                </tr>
                                            </thead>


                                            <tbody>
                                                
                                            {this.state.data.map((disease) =>
                                                    <tr key={disease.id}>
                                                        <td>{disease.user_type == "admin" ? disease.admin_show_id : disease.user_type == "customer" ? disease.customer_show_id : disease.user_type == "rider" ? disease.rider_show_id : "null"}</td>
                                                        <td>{disease.name}</td>
                                                        <td>{disease.email}</td>
                                                        <td>{disease.phone}</td>
                                                        <td>{disease.user_type}</td>

                                                        <td>
                                                            <div class="icon-pad">
                                                                <a data-toggle="modal" data-target="#userEdit" onClick={this.delete.bind(this, disease.id)}><i className="fas fa-trash-alt"></i></a>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )}
                                                

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="user-modal">
                        <div className="modal fade" id="userEdit" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">Rider Delete</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <p>
                                            <strong>
                                                You're about to delete a User from this page. Are you sure?
                                            </strong>
                                        </p>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                        <button type="button" className="btn btn-primary" onClick={this.deleteBooking.bind(this)}>Delete</button>
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

export default GridBusinessUsers

