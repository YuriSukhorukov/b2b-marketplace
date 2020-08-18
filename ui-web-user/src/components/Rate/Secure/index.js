import React from 'react';
import { Rate } from 'antd';
import 'antd/dist/antd.css';
import './style.css';

const rates = [
    'Ужасная степень надежности и качества услуг', 
    'Низкая степень надежности и качества услуг', 
    'Удовлетворительная степень надежности и качества услуг', 
    'Достаточная степень надежности и качества услуг', 
    'Максимальная степень надежности и качества услуг'
];
const desc = [
    'Поставщик не выполняет свои обязательства', 
    'Поставщик не заслуживает доверия как деловой партнер', 
    'Репутация поставщика противоречива', 
    'Имеются незначительные отклонения при выполнениии обязательств', 
    'Полное соблюдение контрактных обязательств по условиям поставки, качеству, цене'
];

export default class SecureRate extends React.Component {
    constructor(props) {
        super(props);
        this.props = props
    }
    state = {
        value: 5,
    }
    handleChange = value => {
        console.log(value);
        this.setState({ value });
    }
    render(props) {
        const { value } = this.state;
        return(
            <span>
                <Rate disabled={true} tooltips={desc} onChange={this.handleChange} value={value} {...this.props} />
                {/* {value ? <span className="ant-rate-text">{rates[value - 1]}</span> : ''} */}
            </span>
        );
    }
}