import React from 'react';

import FormContainer from './Form';
import ContentContainer from './Content';

export default function HomeContainer() {
    return (
        <div id='home-container'>
            <div className="home-playground">
                <ContentContainer />
                <FormContainer />
            </div>
        </div>
    );
}
