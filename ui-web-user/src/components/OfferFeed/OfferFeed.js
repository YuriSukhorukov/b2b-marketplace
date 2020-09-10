import React from 'react';
import 'antd/dist/antd.css';
import { observer } from 'mobx-react';
import Offer from '../../components/Card/Offer/index';

let offers = [1,2,3];

const OfferFeed = observer(class OfferFeed extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div>
                {/* <input placeholder="Искать предложения"></input>
                <a>Расширенный поиск</a>
                <div>
                    {offers.map((value, index) => {
                        return <li key={index}>{value}</li>
                    })}
                </div> */}
                <Offer />
                <Offer />
                <Offer />
                <Offer />
                <Offer />
                <Offer />
                <Offer />
                <Offer />
                <Offer />
                <Offer />
                <Offer />
                <Offer />
            </div>
        )
    }
});

export default OfferFeed;