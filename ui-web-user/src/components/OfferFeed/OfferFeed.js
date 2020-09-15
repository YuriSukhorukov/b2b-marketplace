import React, { useState } from 'react';
import { observer } from 'mobx-react';
import Offer from '../../components/Card/Offer/index';
import offersStore from '../../stores/offersStore';
import { Drawer, Button, PageHeader, Descriptions } from 'antd';

import 'antd/dist/antd.css';

const OfferDetails = (props) => {
    const onClose = () => {
        props.closeOfferDetails();
    };
    return(
        <>
            <Drawer
                width={820}
                title=""
                placement="right"
                closable={false}
                onClose={onClose}
                visible={props.visible}
            >
                <PageHeader
                    ghost={false}
                    onBack={onClose}
                    title="Title"
                    subTitle="This is a subtitle"
                    extra={[
                        <Button key="1" type="primary">Откликнуться</Button>,
                    ]} 
                />
            </Drawer>
        </>
    );
}

const OfferFeed = observer(class OfferFeed extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
        offerDetailsVisible: false
    }
    async componentDidMount() {
        await offersStore.getOffers();
    }
    openOfferDetails = async () => {
        this.setState({
            offerDetailsVisible: true
        })
        console.log('openOfferDetails');
    }
    closeOfferDetails = async () => {
        this.setState({
            offerDetailsVisible: false
        })
        console.log('closeOfferDetails');
    }
    render() {
        return(
            <div>
                <OfferDetails visible={this.state.offerDetailsVisible} closeOfferDetails={this.closeOfferDetails}/>
                <div>
                    {offersStore.offers.map((value, index) => {
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
                                openOfferDetails={this.openOfferDetails}
                            />
                        )
                    })}
                </div>
            </div>
        )
    }
});

export default OfferFeed;