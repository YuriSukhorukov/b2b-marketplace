import React from 'react';
import { 
    Card,
    Rate
} from 'antd';
import 'antd/dist/antd.css';

export default class OfferCard extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <Card>
                <Rate />
            </Card>
        );
    }
}