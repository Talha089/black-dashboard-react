import React, { useState, useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { ValidatorForm } from 'react-material-ui-form-validator';
import Button from '@material-ui/core/Button';
import EventBus from 'eventing-bus';
import { login, signOut, checkNetwork, getAdminNonce } from "../../store/actions/Auth";
import logo from '../../assets/img/react-logo.png';
import { networkId, message } from "../../store/config.js";
import { ConnectWallet, useConnectionStatus, useAddress, useSDK, useDisconnect, useChain } from '@thirdweb-dev/react';

import './index.css';

const Login = ({ history }) => {
    const [netId, setNetId] = useState('');
    const [address, setAddress] = useState('');
    const sdk = useSDK();
    const chain = useChain();
    const dispatch = useDispatch();
    const disconnect = useDisconnect();
    const connectionStatus = useConnectionStatus();

    let { auth } = useSelector(st => st.Auth);


    useEffect(() => {
        const checkAddresses = async () => {
            // let address = (await web3.currentProvider.enable())[0];
            setAddress("*** address");
        };

        const fetchNetId = async () => {
            // web3.eth.net.getId((err, netId) => {
            //   setNetId(netId)
            // });
        };

        if (!window.ethereum) {
            EventBus.publish("error", "Please install metamask");
            return;
        }

        fetchNetId();
        checkAddresses();
    }, []);




    useEffect(() => {
        if (connectionStatus === "connected") setTimeout(() => handleConnectWallet(), 500);
        if (connectionStatus && connectionStatus == "disconnected") dispatch(signOut());
    }, [connectionStatus]);



    const handleConnectWallet = (e) => {
        console.log('*****handles')
        if (!auth && connectionStatus === "connected") {
            console.log('nId', networkId);
            if ((chain?.['chainId']) !== networkId) {
                console.log('****** chain', chain);
                console.log('***** chainId', chain['chainId'])
                console.log('***** networkId', networkId)
                dispatch(checkNetwork(false));
                EventBus.publish('info', message);
                return disconnect();
            }
            else {
                console.log('****** else')
                // dispatch(checkNetwork(true));

                // signatureMessage();
                console.log('********* publicAddress', address)
                dispatch(getAdminNonce({ publicAddress: "address" }))
            }
        }
    };

    const signatureMessage = async () => {
        try {
            let message = `cheebapet.io wants you to sign in with your wallet`;
            let result = await sdk?.wallet.sign(message);
            console.log('***** dispatching')
            if (result) dispatch(login({ publicAddress: address, signature: result }));
        } catch (error) {
            disconnect();
            console.error("Error signing message:", error);
        }
    };


    const handleLogin = async () => {
        if (!window.ethereum) {
            EventBus.publish("error", "Please install metamask");
            return;
        }

        const nonce = Math.floor(Math.random() * 10000000000);

        if (true) {
            // login(address);
            setTimeout(() => history.push('/home'), 1000);
        } else {
            EventBus.publish("error", "Please login through admin address");
        }
    };

    return (
        <div className="login-page">
            <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12 login-area">
                    <div className="login-form">
                        <p className="login-title">【ＬＯＧＩＮ】</p>
                        <hr className='mt-3' />
                        {/* <div className="login-text pt-4"><p>{message}</p></div> */}
                        <ValidatorForm className="validator-form mt-4" onSubmit={handleLogin}>
                            {/* <Button type="Submit" variant="contained" className='text-white login-btn mt-4'>
                                    LOGIN WITH METAMASK
                                </Button> */}

                            {(connectionStatus == 'disconnected' || connectionStatus == 'connected') && (
                                <ConnectWallet
                                    theme={"dark"}
                                    modalSize={"wide"}
                                    switchToActiveChain={true}
                                    modalTitle={"CheebaPet NFT"}
                                />
                            )}
                        </ValidatorForm>

                    </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 login-area">
                    <img className="login-page-logo" src={logo} alt='logo' />
                </div>
            </div>
        </div>
    );
};

export default Login;