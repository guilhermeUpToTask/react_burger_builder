import React, { Component } from "react";
import Auxiliary from "../Auxiliary/Auxiliary";
import Modal from "../../components/UI/Modal/Modal";

const withErrorHandler = (WrappedComponent, axios) => {

    return class extends Component {
        state = {
            error: null,
        }

        constructor(props) {
            super(props);
            this.reqInteceptor = axios.interceptors.request.use(req => {
                this.setState({ error: null });
                return req;
            });
            this.resInteceptor = axios.interceptors.response.use(res => res, error => this.setState({ error: error }));

        }

        componentWillUnmount(){
            console.log('will unmount'+ this.reqInteceptor + ' ' + this.resInteceptor);
            axios.interceptors.request.eject(this.reqInteceptor);
            axios.interceptors.response.eject(this.resInteceptor);
        }

        
        errorConfirmedHander = () => {
            this.setState({ error: null });
        }

        render() {
            return (
                <Auxiliary>
                    <Modal show={this.state.error} modalClosed={this.errorConfirmedHander}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Auxiliary>
            );
        }
    }
};

export default withErrorHandler;