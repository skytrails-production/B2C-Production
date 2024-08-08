import React from 'react';
import { Form, Input, Button, InputNumber, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import Swal from 'sweetalert2';
import { apiURL } from '../../../Constants/constant';
import './Packageform.css';

const { TextArea } = Input;

function Packageform() {
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        const payload = {
            destination: values.destination,
            origin: values.origin,
            noOfDays: values.noOfDays,
            dayAt: values.dayAtDetails || [],
            activities: values.activities || [],
        };

        try {
            const response = await axios.post(`${apiURL.baseURL}/skyTrails/api/itinerary/dayWise/createDayWise`, payload);
            if (response.status === 200) {
                console.log("submitted");
                Swal.fire("Form Submitted Successfully");
                form.resetFields();
            } else {
                console.log("failed");
            }
        } catch (error) {
            console.error('Error submitting data:', error);
            Swal.fire("Error", "There was a problem submitting the form. Please try again.", "error");
        }
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" ,height:"100vh"}}>
            <div>
                <h1>DAY WISE DETAILS</h1>
            </div>
            <Form
                style={{ width: "50%", background: "white", padding: "18px" }}
                name="trip_form"
                form={form}
                onFinish={onFinish}
                autoComplete="off"
                layout="vertical"
                initialValues={{ dayAtDetails: [], activities: [] }} // Initialize as empty arrays
            >
                <Form.Item
                    name="destination"
                    label="Destination"
                    rules={[{ required: true, message: 'Please input the destination!' }]}
                >
                    <Input placeholder="Enter destination" />
                </Form.Item>

                <Form.Item
                    name="origin"
                    label="Origin"
                    rules={[{ required: true, message: 'Please input the origin!' }]}
                >
                    <Input placeholder="Enter origin" />
                </Form.Item>

                <div style={{ display: "flex", flexDirection: "row", gap: "12px" }}>
                    <Form.Item
                        name="noOfDays"
                        label="Number of Days"
                        rules={[{ required: true, message: 'Please input the number of days!' }]}
                        style={{ width: "100%" }}
                    >
                        <Input placeholder="Enter number of days" style={{ width: "100%" }} />
                    </Form.Item>
                </div>

                <Form.Item
                style={{width:"100%"}}
                    name="dayAtDetails"
                    label="Day Details"
                    rules={[
                        {
                            validator: async (_, dayAtDetails) => {
                                if (!dayAtDetails || dayAtDetails.length === 0) {
                                    return Promise.reject(new Error('At least one day detail is required'));
                                }
                            },
                        },
                    ]}
                >
                    <Form.List name="dayAtDetails" style={{width:"100%"}}>
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name, fieldKey, ...restField }) => (
                                    <Space key={key} style={{ display: 'flex', marginBottom: 8 ,width:"100%"}} align="baseline">
                                        <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
                                            <div style={{ display: "flex", flexDirection: "row", gap: "12px", width: "100%" }}>
                                                <Form.Item
                                                    {...restField}
                                                    style={{width:"100%"}}
                                                    label="Title"
                                                    name={[name, 'title']}
                                                    fieldKey={[fieldKey, 'title']}
                                                    rules={[{ required: true, message: 'Missing title' }]}
                                                >
                                                    <Input placeholder="Title" />
                                                </Form.Item>
                                                <Form.Item
                                                    {...restField}
                                                    label="Price"
                                                    style={{width:"100%"}}
                                                    name={[name, 'price']}
                                                    fieldKey={[fieldKey, 'price']}
                                                    rules={[{ required: true, message: 'Missing price' }]}
                                                >
                                                    <InputNumber placeholder="Price"  style={{width:"100%"}}/>
                                                </Form.Item>
                                            </div>
                                            <div style={{ display: "flex", flexDirection: "row", gap: "12px" ,width:"100%"}}>
                                                <Form.Item
                                                    {...restField}
                                                    style={{width:"100%"}}
                                                    label="Description"
                                                    name={[name, 'description']}
                                                    fieldKey={[fieldKey, 'description']}
                                                    rules={[{ required: true, message: 'Missing description' }]}
                                                >
                                                    <TextArea placeholder="Description"  style={{width:"100%"}}/>
                                                </Form.Item>
                                                <Form.Item
                                                    {...restField}
                                                    style={{width:"100%"}}
                                                    label="Type"
                                                    name={[name, 'type']}
                                                    fieldKey={[fieldKey, 'type']}
                                                    rules={[{ required: true, message: 'Missing type' }]}
                                                >
                                                    <Input placeholder="Type"  style={{width:"100%"}}/>
                                                </Form.Item>
                                                <MinusCircleOutlined onClick={() => remove(name)} />
                                            </div>
                                        </div>
                                    </Space>
                                ))}
                                <Form.Item>
                                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                        Add Day Detail
                                    </Button>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>
                </Form.Item>

                <Form.Item
                    name="activities"
                    label="Activities"
                    style={{width:"100%"}}
                    rules={[
                        {
                            validator: async (_, activities) => {
                                if (!activities || activities.length === 0) {
                                    return Promise.reject(new Error('At least one activity is required'));
                                }
                            },
                        },
                    ]}
                >
                    <Form.List name="activities"  style={{width:"100%"}}>
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name, fieldKey, ...restField }) => (
                                    <Space key={key} style={{ display: 'flex', marginBottom: 8,width:"100%" }} align="baseline">
                                        <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
                                            <div style={{ display: "flex", flexDirection: "row", gap: "12px", width: "100%" }}>
                                                <Form.Item
                                                    {...restField}
                                                    style={{width:"100%"}}
                                                    label="Title"
                                                    name={[name, 'title']}
                                                    fieldKey={[fieldKey, 'title']}
                                                    rules={[{ required: true, message: 'Missing title' }]}
                                                >
                                                    <Input placeholder="Title"  style={{width:"100%"}}/>
                                                </Form.Item>
                                                <Form.Item
                                                    {...restField}
                                                    label="Description"
                                                    name={[name, 'description']}
                                                    fieldKey={[fieldKey, 'description']}
                                                    style={{width:"100%"}}
                                                    rules={[{ required: true, message: 'Missing description' }]}
                                                >
                                                    <TextArea placeholder="Description"  style={{width:"100%"}} />
                                                </Form.Item>
                                            </div>
                                            <div style={{ display: "flex", flexDirection: "row", gap: "12px",width:"100%" }}>
                                                <Form.Item
                                                    {...restField}
                                                    label="Timing"
                                                    name={[name, 'timing']}
                                                    style={{width:"100%"}}
                                                    fieldKey={[fieldKey, 'timing']}
                                                    rules={[{ required: true, message: 'Missing timing' }]}
                                                >
                                                    <Input placeholder="Timing"  style={{width:"100%"}}/>
                                                </Form.Item>
                                                <Form.Item
                                                    {...restField}
                                                    label="Price"
                                                    style={{width:"100%"}}
                                                    name={[name, 'price']}
                                                    fieldKey={[fieldKey, 'price']}
                                                    rules={[{ required: true, message: 'Missing price' }]}
                                                >
                                                    <InputNumber placeholder="Price" style={{width:"100%"}} />
                                                </Form.Item>
                                                <MinusCircleOutlined onClick={() => remove(name)} />
                                            </div>
                                        </div>
                                    </Space>
                                ))}
                                <Form.Item>
                                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                        Add Activity
                                    </Button>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>
                </Form.Item>

                <Form.Item style={{ display: "flex", justifyContent: "center" }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default Packageform;
