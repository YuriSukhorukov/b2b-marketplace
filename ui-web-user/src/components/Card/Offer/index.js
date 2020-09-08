import React from 'react';
import { 
    Card, 
    PageHeader,
    Descriptions,
    Tag
} from 'antd';
import { CheckCircleTwoTone, GlobalOutlined, EnvironmentOutlined} from '@ant-design/icons';
import SecureRate from '../../Rate/Secure/index';
import 'antd/dist/antd.css';
import './style.css';

export default class OfferCard extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <span>
                <Card size="medium" title="Сгущенка Рогачев" extra={<a href="#">Детали</a>} style={{ width: 1100, margin: 20 }}>
                    <div className="count">
                        <span style={{fontSize: 14}}>
                            <span>
                                Цена: <strong>10.000.000р.</strong>
                            </span>
                            <span style={{paddingLeft: 20}}>
                                Количество: <strong>40т.</strong>
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
                        <p style={{fontSize: 15, color: "black", paddingTop: 15}}>
                            { this.props.description }
                        </p>
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