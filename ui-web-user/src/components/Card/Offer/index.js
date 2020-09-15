import React from 'react';
import { 
    Card, 
    Tag,
    Typography,
    Divider,
} from 'antd';
import { CheckCircleTwoTone, GlobalOutlined, EnvironmentOutlined} from '@ant-design/icons';
import SecureRate from '../../Rate/Secure/index';
import 'antd/dist/antd.css';
import './style.css';

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
} from '../../../constants/measure.units.constants';

import {
    OFFER_TYPE_BUY,
    OFFER_TYPE_SELL
} from '../../../constants/offer/offer.types';

import {
    OFFER_CURRENCY_RUBLE,
    OFFER_CURRENCY_DOLLAR
} from '../../../constants/offer/offer.currencies';

const measureSymbols = {
    [MEASURE_UNIT_CODE_TON]: "т.",
    [MEASURE_UNIT_CODE_KILOGRAM]: "кг.",
    [MEASURE_UNIT_CODE_GRAM]: "гр.",
    [MEASURE_UNIT_CODE_SQUARE_METER]: "кв.м",
    [MEASURE_UNIT_CODE_LITER]: "л.",
    [MEASURE_UNIT_CODE_METER]: "м.",
    [MEASURE_UNIT_CODE_THING]: "шт.",
    [MEASURE_UNIT_CODE_CUBIC_METER]: "кб.м",
    [MEASURE_UNIT_CODE_PACK]: "у.",
}

const currencySymbols = {
    [OFFER_CURRENCY_RUBLE]: <span>&#8381;</span>,
    [OFFER_CURRENCY_DOLLAR]: <span>&#65284;</span>
}

const monthNames = {
    0: "января",
    1: "февраля",
    2: "марта",
    3: "апрель",
    4: "мая",
    5: "июня",
    6: "июля",
    7: "августа",
    8: "сентября",
    9: "октября",
    10: "ноября",
    11: "декабря",
}

const SYMBOL_RUBLE = <span>&#8381;</span>;
const SYMBOL_DOLLAR = <span>&#65284;</span>;

const { Paragraph } = Typography;

const OfferType = (props) => {
    const {offer_type} = props;
    return(
        <>
            <div>
            {
                offer_type == OFFER_TYPE_BUY ? <Tag color="green">Покупка</Tag> : offer_type == OFFER_TYPE_SELL ? <Tag color="red">Продажа</Tag> : <></>
            }
            </div>
        </>
    );
}

export default class OfferCard extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }
    componentDidUpdate() {
        console.log(this.props);
    }
    render() {
        const {
            title,
            description,
            price,
            amount,
            measure_unit_code,
            currency_code,
            offer_type,
            date_publication,
            date_expires,
            country,
            city,
        } = this.props;

        let price_formatted = isNaN(price) ? 0 : currency_code == "RUB" ? new Intl.NumberFormat('ru-RU').format(price) : currency_code == "USD" ? new Intl.NumberFormat('en-IN').format(price) : price;
        let amount_formatted = isNaN(amount) ? 0 : Intl.NumberFormat('ru-RU').format(amount);
        
        let currency_symbol = currencySymbols[currency_code];
        let measure_unit_symbol = measureSymbols[measure_unit_code];
        
        let dateExpiresFormatted = date_expires ? dateToFormat(date_expires) : null;
        let datePublicationFormatted = date_publication ? dateToFormat(date_publication) : null;
        
        return(
            <span>
                <Card size="medium" title={title} extra={<a href="#" onClick={(e)=>{e.preventDefault(); this.props.openOfferDetails && this.props.openOfferDetails()}}>Детали</a>} style={{ width: "100%", marginTop: "20px" }}>
                    <div className="count">
                        <span style={{fontSize: 14}}>
                            <span>
                                Цена: <strong>{ price_formatted }{currency_symbol}</strong>
                            </span>
                            <span style={{paddingLeft: 20}}>
                                Количество: <strong>{amount_formatted}{measure_unit_symbol}</strong>
                            </span>
                            <span style={{paddingLeft: 20}}>
                                Опубликовано: <strong>{datePublicationFormatted || '...'}</strong>
                            </span>
                            <span style={{paddingLeft: 20}}>
                                Истекает: <strong>{dateExpiresFormatted || '...'}</strong>
                            </span>
                        </span>
                    </div>                  
                    <span className="description">
                        <div style={{fontSize: 15, color: "black", paddingTop: 15}}>
                            <Paragraph
                                ellipsis={{
                                    rows: 3,
                                    expandable: true,
                                    suffix: '',
                                    onEllipsis: ellipsis => {
                                      console.log('Ellipsis changed:', ellipsis);
                                    },
                                  }}
                                  title={`${description}`}
                            >
                                {description}
                            </Paragraph>
                        </div>
                    </span>
                    <div style={{display: "block", paddingTop: 10}}>
                        <div>
                            <Tag>Продукты питания</Tag>
                            <Tag>Молочные продукты</Tag>
                            <Tag>Молоко концентрированное</Tag>
                        </div>
                        <div className="proposals" style={{paddingTop: 20}}>
                            <span>
                                <span>Откликлунись: <strong>Меньше 5</strong></span>
                            </span>
                        </div>
                        <div style={{paddingTop: 5}}>
                            <span style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                                <div style={{justifyItems: "baseline"}}>
                                    <CheckCircleTwoTone style={{ fontSize: '20px' }} twoToneColor="#52c41a" />
                                    <strong className="features__div_margin_left_s">Верифицирован</strong>
                                    <SecureRate className="features__div_margin_left_l" style={{ fontSize: 12 }}/>
                                    <span className="features__div_margin_left_l">Оборот: <strong>400млн.</strong></span>
                                    <EnvironmentOutlined className="features__div_margin_left_l" style={{ fontSize: '20px' }} />
                                    <strong className="features__div_margin_left_s">{city}</strong>
                                </div>
                                <OfferType offer_type={offer_type} />
                            </span>
                        </div>
                    </div>
                </Card>
            </span>
        );
    }
}

function dateToISOLikeButLocal(date_expires) {
    const date = new Date(date_expires);
    const offsetMs = date.getTimezoneOffset() * 60 * 1000;
    const msLocal =  date.getTime() - offsetMs;
    const dateLocal = new Date(msLocal);
    const iso = dateLocal.toISOString();
    const isoLocal = iso.slice(0, 19);
    return isoLocal;
}
function dateToFormat(date_expires) {
    let dateLocalISO = dateToISOLikeButLocal(date_expires)
    let date = new Date(dateLocalISO);        
    let year = date.getFullYear();
    let day = date.getDate();
    let monthNumber = date.getMonth();
    let monthName = monthNames[monthNumber];
    let time = date.toLocaleTimeString().split(':');
    let hours = time[0];
    let minutes = time[1];
    return `${day} ${monthName} ${year} в ${hours}:${minutes}`;
}