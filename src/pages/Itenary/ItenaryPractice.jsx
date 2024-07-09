import React, { useEffect, useState, useRef } from "react";
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space } from 'antd';
import { Select } from "antd";

import { apiURL } from "../../Constants/constant";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";


let FromTimeout;
let FromCurrentValue;


const initialSelectedFromData = {
    Destination: "New Delhi",
    StateProvinceCode: "DL",
    cityid: "130443",
    country: "India",
    countrycode: "IN",
    stateprovince: "DELHI",
    __v: 0,
    _id: "63fc59c1ec25cae0ebcfd9b1",
};

const fetchFromCity = (value, callback) => {
    if (FromTimeout) {
        clearTimeout(FromTimeout);
        FromTimeout = null;
    }
    FromCurrentValue = value;
    const cityData = () => {
        axios
            .post(`${apiURL.baseURL}/skyTrails/city/hotelCitySearch?keyword=${value}`)
            .then((response) => {
                if (FromCurrentValue === value) {

                    console.log(response, "response")
                    const res = response.data.data;
                    const result = res?.map((item) => ({

                        Destination: item.Destination,
                        StateProvinceCode: item.StateProvinceCode,
                        cityid: item.cityid,
                        country: item.country,
                        countrycode: item.countrycode,
                        stateprovince: item.stateprovince,
                        __v: item.__v,
                        _id: item._id,
                        item,
                    }));
                    callback(result);
                }
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    };
    if (value) {
        FromTimeout = setTimeout(cityData, 200);
    } else {
        callback([]);
    }
};

const FromSearchInput = (props) => {
    const { onItemSelect } = props;
    const [fromData, setFromData] = useState([]);
    const [fromValue, setFromValue] = useState(initialSelectedFromData.Destination);
    const [selectedItem, setSelectedItem] = useState(initialSelectedFromData);

    console.log(fromData, "from data")

    const [FromPlaceholder, setFromPlaceholder] = useState('')
    const [FromDisplayValue, setFromDisplayValue] = useState(initialSelectedFromData.Destination);
    const [inputStyle, setInputStyle] = useState({});

    useEffect(() => {
        setFromData([
            {


                Destination: initialSelectedFromData.Destination,
                StateProvinceCode: initialSelectedFromData.StateProvinceCode,
                cityid: initialSelectedFromData.cityid,
                country: initialSelectedFromData.country,
                countrycode: initialSelectedFromData.countrycode,
                stateprovince: initialSelectedFromData.stateprovince,
                __v: initialSelectedFromData.__v,
                _id: initialSelectedFromData._id,
                item: initialSelectedFromData,
            },
        ]);
    }, []);

    const handleFromSearch = (newValue) => {
        fetchFromCity(newValue, setFromData);
    };

    const handleFromChange = (newValue) => {
        const selected = fromData.find((d) => d.cityid === newValue);
        setFromValue(selected ? selected.Destination : newValue);
        setFromDisplayValue(selected ? selected.Destination : newValue);
        setSelectedItem(selected ? selected.item : null);
        setInputStyle({ caretColor: 'transparent' });
        if (selected) {
            onItemSelect(selected.item);
        }
    };

    const handleFromFocus = () => {
        setFromPlaceholder('From');
        setFromDisplayValue(''); // Clear display value to show placeholder
        setInputStyle({});
    };

    const handleFromBlur = () => {
        setFromPlaceholder('');
        setFromDisplayValue(fromValue); // Reset display value to selected value
        setInputStyle({ caretColor: 'transparent' });
    };
    const renderFromOption = (option) => (
        <div>
            <div>
                {option.Destination} ({option.countrycode})
            </div>
            <div style={{ color: "gray" }}>{option.cityid}</div>
        </div>
    );

    return (
        <Select
            showSearch
            style={inputStyle}
            // value={fromValue}
            value={FromDisplayValue}
            // placeholder={props.placeholder}
            placeholder={FromPlaceholder || props.placeholder}
            // style={props.style}
            defaultActiveFirstOption={false}
            suffixIcon={null}
            filterOption={false}
            onSearch={handleFromSearch}
            onChange={handleFromChange}
            onFocus={handleFromFocus} // Set placeholder on focus
            onBlur={handleFromBlur}
            notFoundContent={null}
            options={fromData.map((d) => ({
                value: d.cityid,
                label: renderFromOption(d),
            }))}
        />
    );
};

const ItenaryPractice = () => {

    const [selectedFrom, setSelectedFrom] = useState(initialSelectedFromData);
    // const [selectNationality, setSelectNationality] = useState(initialSelectedToData);

    const nights = Array.from({ length: 30 }, (_, index) => index + 1);
    const handleFromSelect = (item) => {
        setSelectedFrom(item);
    };


    const onFinish = (values) => {
        console.log('Received values of form:', values);
    };


    return (
        <div>
            <Form
                name="dynamic_form_nest_item"
                onFinish={onFinish}
                style={{
                    maxWidth: 600,
                }}
                autoComplete="off"
            >
                <Form.List name="users">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, ...restField }) => (
                                <Space
                                    key={key}
                                    style={{
                                        display: 'flex',
                                        marginBottom: 8,
                                    }}
                                    align="baseline"
                                >
                                    <Form.Item
                                        {...restField}
                                        name={[name, "fromSearch"]}

                                    >
                                        <FromSearchInput
                                            // style={{
                                            //     width: "100%",
                                            // }}
                                            placeholder="Search"
                                            onItemSelect={handleFromSelect}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        {...restField}
                                        name={[name, "nightSelect"]}

                                    >
                                        <Select>
                                            {nights.map((night) => (
                                                <Select.Option key={night} value={`night${night}`}>
                                                    Night {night}
                                                </Select.Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                    <MinusCircleOutlined onClick={() => remove(name)} />
                                </Space>
                            ))}
                            <Form.Item>
                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                    Add field
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default ItenaryPractice
