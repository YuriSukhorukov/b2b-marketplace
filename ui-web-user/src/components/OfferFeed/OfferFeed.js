import React from 'react';
import 'antd/dist/antd.css';
import { observer } from 'mobx-react';
import Offer from '../../components/Card/Offer/index';
import offersStore from '../../stores/offersStore';

// let offers = [1,2,3];

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
                        console.log(value);                 
                        // return <li key={index}>{value.created_on}</li>
                        return(
                            <Offer 
                                key={index}
                                title={value.title}
                                description={value.description}
                                price={value.price}
                                amount={value.amount}
                                measure_unit_code={value.measure_unit_code}
                                currency_code={value.currency_code}
                                offer_type={value.offer_type}
                                date_publication={value.date_publication}
                                date_expires={value.date_expires}
                                country={value.country}
                                city={value.city}
                            />
                        )
                    })}
                </div>
            </div>
        )
    }
});

export default OfferFeed;