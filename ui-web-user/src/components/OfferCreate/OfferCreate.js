import React from 'react';
import 'antd/dist/antd.css';
import { observer } from 'mobx-react';
import {Button, Collapse} from 'antd';
import { CheckCircleTwoTone, CaretRightOutlined }           from '@ant-design/icons';
import Offer from '../Card/Offer';
import offersStore from '../../stores/offersStore';

const { Panel } = Collapse;

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const OfferCreate = observer(class OfferFeed extends React.Component {
    constructor(props) {
        super(props);
    }
    async createOffer() {
        await offersStore.createOffer({});
    }
    render() {
        return(
            <div>
                <Collapse expandIconPosition={'left'} accordion ghost expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}>
                    <Panel header="Описание" key="1">
                        <div style={{padding: "20px"}}>
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
                            <Offer />
                        </div>
                    </Panel>
                </Collapse>
            </div>
        )
    }
});

export default OfferCreate;