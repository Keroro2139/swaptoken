import React from 'react';
import { useHistory } from 'react-router-dom';
import Async from 'react-async';
import { ethers } from "ethers";
import { useClipboard } from "use-clipboard-copy";
import { Contract } from "@ethersproject/contracts";
import { useForm } from "react-hook-form";

import { addresses, abis } from "../../contracts";
import InputRef from './InputRef';
import CryptoInput from './CryptoInput';

const defaultProvider = new ethers.providers.Web3Provider(window.ethereum);
const signer = defaultProvider.getSigner();
const busd = new Contract(addresses.busd, abis.erc20, defaultProvider);

let provider;

export default function FormContainer() {
    const clipboard = useClipboard();
    const history = useHistory();

    const { register, handleSubmit, control, getValues, setValue, watch, errors } = useForm();
    const [boloRate, setBoloRate] = React.useState('');
    const [bolo, setBolo] = React.useState('');
    const [focused, setFocused] = React.useState(false);
    const [currency, setCurrency] = React.useState({
        symbol: "USDT",
        name: "Tether",
        color: "#26a17b"
    });

    React.useEffect(() => {
        (async () => {
            if (typeof (web3) !== 'undefined') {
                await window.ethereum.enable()
                provider = new ethers.providers.Web3Provider(window.ethereum) // use Metamask or whatever the dApp browser provides
                const swap = new Contract(addresses.swaptoken, abis.swaptoken, provider);
                const boloRate = await swap.rate();
                setBoloRate(boloRate)
                const { chainId } = await provider.getNetwork()

                if (chainId !== 56) {

                } else {

                }

            } else {

                history.push("/metamask");
                return null;
            }
        })();
    }, []);

    const getBalance = async () => {
        // Should replace with the end-user wallet, e.g. Metamask
        if (busd && signer) {
            const tokenBalance = await busd.balanceOf(signer.getAddress());
            return tokenBalance.toString();
        }
        return "0";
    };

    const getAccount = () => {
        // Should replace with the end-user wallet, e.g. Metamask
        if (signer) {
            return signer.getAddress();
        }
        return "";
    };

    const handleFocused = () => {
        setFocused(true);
    };

    const handleUnFocused = () => {
        setFocused(false);
    };

    const handleChangeCurrency = (opt, newValue) => {
        if (newValue) {
            setCurrency(newValue);
        }
    };

    const onSubmit = (data) => {
        const defaultProvider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = defaultProvider.getSigner()
        const busd = new Contract(addresses.busd, abis.erc20, defaultProvider);
        const busdWithSigner = busd.connect(signer);
        const busdamount = ethers.utils.parseUnits(data.usd_amount, 18);
        const swap = new Contract(addresses.swaptoken, abis.swaptoken, defaultProvider);
        // const gas = swap.estimateGas.swap(busdamount, data.refAccount);
        //console.log(gas)
        const swapWithSigner = swap.connect(signer);
        var options = { gasPrice: 10000000000, gasLimit: 200000 };
        busdWithSigner.approve(addresses.swaptoken, busdamount).then((signedTX) => {
            console.log(signedTX)
            swapWithSigner.swap(busdamount, data.refAccount, options);
        });
    };


    console.log(watch('usd_amount'));
    return (
        <div className='form-card-container'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <p className='label'>Send</p>
                <CryptoInput
                    currency={currency}
                    control={control}
                    handleChangeCurrency={handleChangeCurrency}
                />

                <Async promiseFn={getBalance}>
                    {({ data, error, isLoading }) => {
                        (() => isLoading ? console.log("Async getBalance isLoading") : null)();
                        if (data) {
                            return (
                                <div className="balance-container">
                                    {`Balance: ${parseFloat(ethers.utils.formatEther(data)).toPrecision(4)}`}
                                </div>
                            )
                        }
                    }}
                </Async>

                <p className='label margin-top'>Referal Account</p>
                <div className={`crypto-input-container ${focused ? 'focused' : ''}`}>
                    <InputRef
                        name="refAccount"
                        control={control}
                        rules={{ required: true, pattern: /^0x[a-fA-F0-9]{40}$/ }}
                        props={{
                            fullWidth: true,
                            variant: 'standard',
                            placeholder: 'Referal Account',
                            onFocus: handleFocused,
                            onBlur: handleUnFocused,
                            InputProps: { disableUnderline: true },
                        }}
                    />
                </div>

                <div className="get-swap-container">
                    <div>{'Get'} <b>{getValues('usd_amount') ? parseFloat(getValues('usd_amount') * boloRate).toPrecision(4) : 0}</b> {'SWAP'}</div>
                </div>

                <Async promiseFn={getAccount}>
                    {({ data, error, isLoading }) => {
                        (() => isLoading ? console.log("Async getBalance isLoading") : null)();
                        if (data) {
                            return (
                                <div className='address-text'>
                                    <i className='fas fa-address-book' /> {data}
                                </div>
                            );
                        }
                    }}
                </Async>

                <button className="btn btn-primary submit-button">
                    {'Submit'}
                </button>
            </form>
        </div>
    );
}
