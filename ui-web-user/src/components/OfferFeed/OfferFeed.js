import React from 'react';
import 'antd/dist/antd.css';
import { observer } from 'mobx-react';

const OfferFeed = observer(class OfferFeed extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div>Offer Feed</div>
        )
    }
});

export default OfferFeed;