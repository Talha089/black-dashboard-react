import EventBus from 'eventing-bus';
import { connect } from "react-redux";
import React, { Component, Fragment } from "react";
import Button from '@material-ui/core/Button';
import { ValidatorForm } from 'react-material-ui-form-validator';

import { login } from "../../store/actions/Auth";
import logo from '../../assets/img/react-logo.png';
import { networkId, message } from "../../store/config.js";

import './index.css';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            netId: '',
            address: '',
        };
    };

    async componentDidMount() {
        // web3.eth.net.getId((err, netId) => {
        //   this.setState({ netId })
        // });
        if (!window.ethereum) {
            EventBus.publish("error", "Please install metamask");
            return;
        };
        this.checkAddresses();
    };

    componentWillReceiveProps() {
        this.checkAddresses();
    }

    checkAddresses = async () => {
        // let address = (await web3.currentProvider.enable())[0];
        this.setState({ address: "*** address" });
    };


    handleLogin = async () => {
        if (!window.ethereum) {
            EventBus.publish("error", "Please install metamask");
            return;
        };

        let { address } = this.state;
        const nonce = Math.floor(Math.random() * 10000000000);

        if (true) {
            this.props.login(address);
            setTimeout(() => this.props.history.push('/home'), 1000);
        }
        else EventBus.publish("error", "Please login through admin address");
    };


    render() {
        let { netId } = this.state;
        return (
            <div className="login-page">
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12 login-area">
                        <div className="login-form">
                            <p className="login-title">【ＬＯＧＩＮ】</p>
                            <hr className='mt-3' />
                            {(netId != networkId)
                                ? <div className="login-text pt-4"><p>{message}</p></div>
                                : <Fragment>
                                    <ValidatorForm className="validator-form mt-4" onSubmit={this.handleLogin}>
                                        <Button type="Submit" variant="contained" className='text-white login-btn mt-4'>
                                            LOGIN WITH METAMASK
                                        </Button>
                                    </ValidatorForm>
                                </Fragment>
                            }
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 login-area">
                        <img className="login-page-logo" src={logo} alt='logo' />
                    </div>
                </div>
            </div >
        );
    }
}

const mapDispatchToProps = {
    login
};

const mapStateToProps = ({ Auth }) => {
    let { } = Auth
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);