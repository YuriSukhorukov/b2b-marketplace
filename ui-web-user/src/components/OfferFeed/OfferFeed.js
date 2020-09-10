import React from 'react';
import 'antd/dist/antd.css';
import { observer } from 'mobx-react';

let offers = [1,2,3];

const OfferFeed = observer(class OfferFeed extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div>
                <input placeholder="Искать предложения"></input>
                <a>Расширенный поиск</a>
                <div>
                    {offers.map((value, index) => {
                        return <li key={index}>{value}</li>
                    })}
                </div>
            </div>
        )
    }
});

export default OfferFeed;