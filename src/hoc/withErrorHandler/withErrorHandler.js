import React, { Component } from "react";
import Auxiliary from "../Auxiliary/Auxiliary";
import Modal from "../../components/UI/Modal/Modal";

const withErrorHandler = (WrappedComponent, axios) => {

    return class extends Component {
        state = {
            error: null,
        }

        componentDidMount(){
            axios.interceptors.request.use(req => {
                this.setState({error:null});
                return req;
        });
            axios.interceptors.response.use(res => res, error => this.setState({error: error}));

        }
        errorConfirmedHander= () =>{
            this.setState({error:null});
        }

        render () {
            return (
                <Auxiliary>
                    <Modal show={this.state.error} modalClosed={this.errorConfirmedHander}>
                        {this.state.error? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Auxiliary>
            );
        }
    }
};

export default withErrorHandler;