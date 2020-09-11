import React from 'react';
import 'antd/dist/antd.css';
import { observer } from 'mobx-react';
import Offer from '../../components/Card/Offer/index';
import offersStore from '../../stores/offersStore';

let offers = [1,2,3];

const OfferFeed = observer(class OfferFeed extends React.Component {
    constructor(props) {
        super(props);
    }
    async componentDidMount() {
        await offersStore.getOffers();
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

                <div>
                    {offersStore.offers.map((value, index) => {
                        // return <li key={index}>{value.created_on}</li>
                        return <Offer key={index} />
                    })}
                </div>
            </div>
        )
    }
});

export default OfferFeed;