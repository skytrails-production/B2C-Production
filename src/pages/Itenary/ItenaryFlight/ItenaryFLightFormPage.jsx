import React from 'react'
import { Tabs } from "antd";
import { AndroidOutlined, AppleOutlined } from '@ant-design/icons';
import ItenaryRoundFlightForm from './ItenaryRoundFlightForm';
const { TabPane } = Tabs;
const ItenaryFLightFormPage = ({ closeModal }) => {
    return (
        <div>
            <div

                className="row"
            >

                <div className="mt-3 p-0">
                    <div className="row">
                        <Tabs defaultActiveKey="2">
                            <TabPane tab="Oneway" key="1">
                            </TabPane>
                            <TabPane tab="Round Trip" key="2">
                                <ItenaryRoundFlightForm closeModal={closeModal} />
                            </TabPane>
                            <TabPane tab="Multicity" key="3">
                            </TabPane>
                        </Tabs>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ItenaryFLightFormPage
