import React from 'react';
import { useClipboard } from "use-clipboard-copy";
import { ExternalLink } from 'react-external-link';

export default function ContentContainer() {
    const clipboard = useClipboard();

    const handleCopyClipboard = () => {
        clipboard.copy("https://buy.swap.me/?ref=");
    };

    return (
        <div className='content-container'>
            <div className="info-container">
                <h1>{'Swaptoken With '}<strong className="text-primary">{'Swap'}</strong>. <br /> {'Best price in the world'}</h1>
                <p>{'Fast and secure way to swap cryptocurrencies'}</p>

                <div className="button-container">
                    <ExternalLink href="https://app.swap.me">
                        <button className='btn btn-primary margin-right'>
                            {'Swap Now'}
                        </button>
                    </ExternalLink>
                    <button className='btn btn-outline-primary' onClick={handleCopyClipboard}>
                        {'Copy Referal Link'}
                    </button>
                </div>
            </div>
        </div>
    );
}
