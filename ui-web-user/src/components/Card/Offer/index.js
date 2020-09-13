import React from 'react';
import { 
    Card, 
    PageHeader,
    Descriptions,
    Tag,
    Typography
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

const { Paragraph } = Typography;

export default class OfferCard extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }
    componentDidUpdate() {
        console.log(this.props);
    }
    // state = {
    //     currency_symbol: null
    // }
    render() {
        const {
            title,
            description,
            price,
            amount,
            measure_unit_code,
            currency_code,
            offer_type,
            date_expires,
            country,
            city,
        } = this.props;

        let price_formatted = isNaN(price) ? 0 : currency_code == "RUB" ? new Intl.NumberFormat('ru-RU').format(price) : currency_code == "USD" ? new Intl.NumberFormat('en-IN').format(price) : price;
        let amount_formatted = isNaN(amount) ? null : Intl.NumberFormat('ru-RU').format(amount);
        
        let currency_symbol = currency_code == "RUB" ? <span>&#8381;</span> : currency_code == "USD" ? <span>&#65284;</span> : null;
        let measure_unit_symbol = measureSymbols[measure_unit_code];
        
        return(
            <span>
                <Card size="medium" title={title} extra={<a href="#">Детали</a>} style={{ width: "100%", marginTop: "20px" }}>
                    <div className="count">
                        <span style={{fontSize: 14}}>
                            <span>
                                Цена: <strong>{ price_formatted }{currency_symbol}</strong>
                            </span>
                            <span style={{paddingLeft: 20}}>
                                Количество: <strong>{amount_formatted}{measure_unit_symbol}</strong>
                            </span>
                            <span style={{paddingLeft: 20}}>
                                Опубликовано: <strong>1 января 2020 в 17:25</strong>
                            </span>
                            <span style={{paddingLeft: 20}}>
                                Истекает: <strong>11 января 2020 в 17:25</strong>
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
                            <span style={{display: "inline-flex", alignItems: "center"}}>
                                <CheckCircleTwoTone style={{ fontSize: '20px' }} twoToneColor="#52c41a" />
                                <strong className="features__div_margin_left_s">Верифицирован</strong>
                                <SecureRate className="features__div_margin_left_l" style={{ fontSize: 12 }}/>
                                <span><strong className="features__div_margin_left_l">400млн.</strong> оборот</span>
                                <EnvironmentOutlined className="features__div_margin_left_l" style={{ fontSize: '20px' }} />
                                <strong className="features__div_margin_left_s">Москва</strong>
                            </span>  
                        </div>
                    </div>
                </Card>
            </span>
        );
    }
}