import React, { useState } from 'react';
import { observer } from 'mobx-react';
import Offer from '../../components/Card/Offer/index';
import offersStore from '../../stores/offersStore';
import { Drawer, Button, PageHeader, Descriptions } from 'antd';

import 'antd/dist/antd.css';
import authStore from '../../stores/authStore';
import companyStore from '../../stores/companyStore';

const ProposalFeed = observer(class ProposalFeed extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <>
                <h3>Откликликнулись:</h3>
                <div>
                    {companyStore.profiles && companyStore.profiles.map((value, index) => {
                        return(
                            <div>
                                {value.legal_type} "{value.company_name}" {value.tax_id}
                            </div>
                        )
                    })}
                </div>
            </>
        );
    }
})

const OfferDetails = observer(class OfferDetails extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }
    onClose = () => {
        this.props.closeOfferDetails();
    };
    async componentDidUpdate() {
        // Получить идентификатор оффера
        // Загрузить отклики на оффер
        // Получить идентификаторы пользователей из отклика
        // Загрузить компании по идентификаторам пользователей
        
        if (this.props.visible) {
            console.log('PROPS: ', this.props);
            await offersStore.getProposals(this.props.offer_id);

            let user_ids = [];
            offersStore.proposals.forEach(value => {
                user_ids.push(value.user_id);
            })
            await companyStore.getCompanies({user_ids});
        }
    }
    render() {
        return(
            <>
                <Drawer
                    width={820}
                    title=""
                    placement="right"
                    closable={false}
                    onClose={this.onClose}
                    visible={this.props.visible}
                >
                    <PageHeader
                        ghost={false}
                        onBack={this.onClose}
                        title="Title"
                        subTitle="This is a subtitle"
                        extra={[
                            <Button key="1" type="primary">Откликнуться</Button>,
                        ]} 
                    />
                    <ProposalFeed />
                </Drawer>
            </>
        );
    }
})

const OfferFeed = observer(class OfferFeed extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
        proposals: null,
        offerDetailsVisible: false
    }
    async componentDidMount() {
        if (window.location.pathname == '/offers/published') {
            console.log('authStore.user_id', authStore.user_id);
            await offersStore.setOfferFilter({user_id: authStore.user_id});
            // await offersStore.setOfferFilter({user_id: authStore.user_id, offer_type: 'BUY'});
        } else if (window.location.pathname == '/offers/search') {
            await offersStore.resetOffersFilter();
        }
        await offersStore.getOffers();
        console.log('OfferFeed componentWillMount', window.location.pathname);
    }
    async componentWillUnmount() {
        await offersStore.resetOffers();
    }
    openOfferDetails = async (offer_id) => {
        this.setState({
            offer_id,
            offerDetailsVisible: true
        })
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
                <OfferDetails visible={this.state.offerDetailsVisible} closeOfferDetails={this.closeOfferDetails} offer_id={this.state.offer_id}/>
                <div>
                    {offersStore.offers && offersStore.offers.map((value, index) => {
                        return(
                            <Offer 
                                id={value.id}
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