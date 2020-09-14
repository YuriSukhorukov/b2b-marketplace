import React from 'react';
import 'antd/dist/antd.css';
import { observer } from 'mobx-react';
import {Button, Collapse, Input, DatePicker, TimePicker, Select} from 'antd';
import { CheckCircleTwoTone, CaretRightOutlined } from '@ant-design/icons';
import Offer from '../Card/Offer';
import offersStore from '../../stores/offersStore';

import {
    MEASURE_UNIT_CODE_TON,
    MEASURE_UNIT_CODE_KILOGRAM,
    MEASURE_UNIT_CODE_GRAM,
    MEASURE_UNIT_CODE_SQUARE_METER,
    MEASURE_UNIT_CODE_LITER,
    MEASURE_UNIT_CODE_METER,
    MEASURE_UNIT_CODE_THING,
    MEASURE_UNIT_CODE_CUBIC_METER,
    MEASURE_UNIT_CODE_PACK,
} from '../../constants/measure.units.constants';

import {
    OFFER_TYPE_BUY,
    OFFER_TYPE_SELL
} from '../../constants/offer/offer.types';

import {
    OFFER_CURRENCY_RUBLE,
    OFFER_CURRENCY_DOLLAR
} from '../../constants/offer/offer.currencies';

const { Panel }     = Collapse;
const { Option }    = Select;

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const OfferCreate = observer(class OfferFeed extends React.Component {
    constructor(props) {
        super(props);
        this.onChange               = this.onChange.bind(this);
        this.onChangeDate           = this.onChangeDate.bind(this);
        this.onChangeTime           = this.onChangeTime.bind(this);
        this.onChangeOfferType      = this.onChangeOfferType.bind(this);
        this.createOffer            = this.createOffer.bind(this);
        this.onChangeCurrencyCode   = this.onChangeCurrencyCode.bind(this);
        this.onChangeMeasureUnit    = this.onChangeMeasureUnit.bind(this);
        // this.onChangeAmount         = this.onChangeAmount.bind(this);
    }
    state = {
        // title: undefined,
        // description: undefined,
        // price: undefined,
        // measure_unit_code: undefined,
        // currency_code: undefined,
        // offer_type: undefined,
        // date_expires: undefined,
        // country: undefined,
        // city: undefined,
        title: "Сгущенка",
        description: "Оригинальная сгущенка Рогачевъ.",
        price: 1000000,
        amount: 44,
        measure_unit_code: MEASURE_UNIT_CODE_KILOGRAM,
        currency_code: OFFER_CURRENCY_RUBLE,
        offer_type: OFFER_TYPE_SELL,
        // date_expires: new Date().toISOString(),
        // time_expires: new Date().toISOString(),
        date_expires: undefined,
        time_expires: undefined,
        country: "Российская Федерация",
        city: "Москва"
    }
    async createOffer() {
        await offersStore.setOfferTitle(this.state.title);
        await offersStore.setOfferDescription(this.state.description);
        await offersStore.setOfferPrice(this.state.price);
        await offersStore.setOfferCurrencyCode(this.state.currency_code);
        await offersStore.setOfferOfferType(this.state.offer_type);
        await offersStore.setOfferDataExpires(this.state.date_expires);
        await offersStore.setOfferCountry(this.state.country);
        await offersStore.setOfferCity(this.state.city);

        await offersStore.createOffer({});
    }
    async onChange(event) {
        await this.setState({
            [event.target.name]: event.target.value
        });
    }

    async onChangeDate(event, date) {
        if (!date) {
            await this.setState({
                date_expires: undefined
            });
            return;
        }

        let time        = this.state.time_expires ? this.state.time_expires.split(':') : '00:00:00'.split(':');
        let hours       = time[0];
        let minutes     = time[1];
        let seconds     = '00';//time[2];
        let d           = new Date(date);

        d.setHours(hours);
        d.setMinutes(minutes);
        d.setSeconds(seconds);

        await this.setState({
            date_expires: d.toISOString()
        });

        console.log(this.state.date_expires);
    }

    async onChangeTime(event, date) {
        console.log(date)
        await this.setState({
            time_expires: date
        });
        
        if (this.state.date_expires) {
            let time        = this.state.time_expires ? this.state.time_expires.split(':') : '00:00:00'.split(':');
            let hours       = time[0];
            let minutes     = time[1];
            let seconds     = '00';//time[2];
            let d           = new Date(this.state.date_expires);

            d.setHours(hours);
            d.setMinutes(minutes);
            d.setSeconds(seconds);
            
            await this.setState({
                date_expires: new Date(d).toISOString()
            });
        }

        console.log(this.state.date_expires);
    }
    async onChangeOfferType(value) {
        console.log(value);
        this.setState({
            offer_type: value
        });
    }
    async onChangeCurrencyCode(value) {
        console.log(value);
        this.setState({
            currency_code: value
        });
    }
    async onChangeMeasureUnit(value) {
        console.log(value);
        this.setState({
            measure_unit_code: value
        });
    }
    render() {
        return(
            <div>
                <Input 
                    placeholder="Название" 
                    onChange={this.onChange} value={this.state.title} name="title"
                />
                <Input 
                    placeholder="Описание" 
                    onChange={this.onChange} value={this.state.description} name="description"
                />
                <Input 
                    placeholder="Цена" 
                    onChange={this.onChange} value={this.state.price} name="price"
                />
                <Input 
                    placeholder="Количество" 
                    onChange={this.onChange} value={this.state.amount} name="amount"
                />

                <Select placeholder="Единица измерения" style={{ width: 200 }} value={this.state.measure_unit_code} onChange={this.onChangeMeasureUnit}>
                    <Option value={MEASURE_UNIT_CODE_TON}>Тонна</Option>
                    <Option value={MEASURE_UNIT_CODE_KILOGRAM}>Килограмм</Option>
                    <Option value={MEASURE_UNIT_CODE_GRAM}>Грамм</Option>
                    <Option value={MEASURE_UNIT_CODE_SQUARE_METER}>Квадратный метр</Option>
                    <Option value={MEASURE_UNIT_CODE_LITER}>Литр</Option>
                    <Option value={MEASURE_UNIT_CODE_METER}>Метр</Option>
                    <Option value={MEASURE_UNIT_CODE_THING}>Штука</Option>
                    <Option value={MEASURE_UNIT_CODE_CUBIC_METER}>Кубический метр</Option>
                    <Option value={MEASURE_UNIT_CODE_PACK}>Упаковка</Option>
                </Select>

                <Select placeholder="Тип предложения" style={{ width: 120 }} value={this.state.offer_type} onChange={this.onChangeOfferType}>
                    <Option value={OFFER_TYPE_SELL}>Продажа</Option>
                    <Option value={OFFER_TYPE_BUY}>Покупка</Option>
                </Select>
                <Select placeholder="Валюта" style={{ width: 120 }} value={this.state.currency_code} onChange={this.onChangeCurrencyCode}>
                    <Option value="RUB">Рубль</Option>
                    <Option value="USD" disabled>Доллар</Option>
                </Select>

                <DatePicker 
                    onChange={this.onChangeDate} 
                    placeholder="Дата"
                    // name="date_expires"
                    // format="YYYY-MM-DDTHH:mm:ss.sssZ"
                />
                <TimePicker 
                    placeholder="Время"
                    onChange={this.onChangeTime}
                    format="HH:mm"
                    // name="date_expires"
                    // format="YYYY-MM-DDTHH:mm:ss.sssZ"
                />
                <Input 
                    disabled
                    placeholder="Российская Федерация" 
                    onChange={this.onChange} value={this.state.country} name="country"
                />
                <Input 
                    placeholder="Город" 
                    onChange={this.onChange} value={this.state.city} name="city"
                />



                
                



                
                
                <Collapse expandIconPosition={'left'} accordion ghost expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}>
                    <Panel header="Описание" key="1">
                        <div style={{padding: "20px", borderTop: "1px solid #f0f0f0"}}>
                            <p>{text}</p>
                        </div>
                    </Panel>
                    <Panel header="Детали" key="2" disabled>
                        <p>{text}</p>
                    </Panel>
                    <Panel header="Местонахождение" key="3" disabled>
                        <p>{text}</p>
                    </Panel>
                    <Panel header="Объем" key="4" disabled>
                        <p>{text}</p>
                    </Panel>
                    <Panel header="Цена" key="5" disabled>
                        <p>{text}</p>
                    </Panel>
                    <Panel header="Предпросмотр" key="6">
                        <div style={{padding: "0px", borderTop: "1px solid #f0f0f0"}}>
                            <div style={{display: "flex", justifyContent: "space-between", marginTop: "20px"}}>
                                <p>Просмотр и публикация</p>
                                <Button onClick={this.createOffer} type="primary">Опубликовать предложение</Button>
                            </div>
                            <Offer 
                                title={this.state.title} 
                                description={this.state.description}
                                price={this.state.price}
                                amount={this.state.amount}
                                currency_code={this.state.currency_code}
                                measure_unit_code={this.state.measure_unit_code}
                                date_expires={this.state.date_expires}
                                // date_publication={new Date().toISOString()} // удалить
                                city={this.state.city}
                                offer_type={this.state.offer_type}
                            />
                        </div>
                    </Panel>
                </Collapse>
            </div>
        )
    }
});

export default OfferCreate;