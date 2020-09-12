import React from 'react';
import 'antd/dist/antd.css';
import { observer } from 'mobx-react';
import {Button, Collapse, Input, DatePicker, TimePicker, Select} from 'antd';
import { CheckCircleTwoTone, CaretRightOutlined } from '@ant-design/icons';
import Offer from '../Card/Offer';
import offersStore from '../../stores/offersStore';

const { Panel }     = Collapse;
const { Option }    = Select;

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

// const measure_unit

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
    }
    state = {
        title: undefined,
        description: undefined,
        price: undefined,
        measure_unit: undefined,
        currency_code: undefined,
        offer_type: undefined,
        date_expires: undefined,
        country: undefined,
        city: undefined,
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
        if (!date) return;
        // console.log(event);
        // console.log(date);
        // console.log(new Date(date).toISOString());
        await this.setState({
            date_expires: new Date(date).toISOString()
        });
        // console.log('date_expires: ', this.state.date_expires);
    }
    async onChangeTime(event, date) {
        var d = new Date(this.state.date_expires);

        let time = date.split(':');
        let hours = time[0];
        let minutes = time[1];
        let seconds = time[2];

        d.setHours(hours);
        d.setMinutes(minutes);
        d.setSeconds(seconds);
        
        await this.setState({
            date_expires: new Date(d).toISOString()
        });
        // console.log(this.state);
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
            measure_unit: value
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




                <Select placeholder="Единица измерения" style={{ width: 120 }} value={this.state.measure_unit} onChange={this.onChangeMeasureUnit}>
                    <Option value="1">Килограмм</Option>
                    <Option value="2">Грамм</Option>
                    <Option value="3">Квадратный метр</Option>
                    <Option value="4">Литр</Option>
                    <Option value="5">Метр</Option>
                    <Option value="6">Штука</Option>
                    <Option value="7">Кубический метр</Option>
                    <Option value="8">Упаковка</Option>
                </Select>





                <Select placeholder="Тип предложения" style={{ width: 120 }} value={this.state.offer_type} onChange={this.onChangeOfferType}>
                    <Option value="SELL">Продажа</Option>
                    <Option value="BUY">Покупка</Option>
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
                    // name="date_expires"
                    // format="YYYY-MM-DDTHH:mm:ss.sssZ"
                />
                <Input 
                    placeholder="Страна" 
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
                                currency_code={this.state.currency_code}
                            />
                        </div>
                    </Panel>
                </Collapse>
            </div>
        )
    }
});

export default OfferCreate;