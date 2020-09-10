import React from 'react';
import 'antd/dist/antd.css';
import { observer } from 'mobx-react';

const OfferCreate = observer(class OfferFeed extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div>
                <button>Создать предложение</button>
            </div>
        )
    }
});

export default OfferCreate;