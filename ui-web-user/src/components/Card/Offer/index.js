import React from 'react';
import { Card } from 'antd';
import SecureRate from '../../Rate/Secure/index';
import 'antd/dist/antd.css';

export default class OfferCard extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <Card>
                <SecureRate />
            </Card>
        );
    }
}