import React, { useState, useEffect } from 'react';
import './style.scss';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Img from '../../../LazyLoading/Img';
import { ConfigProvider, Select, Spin } from 'antd';
import axios from 'axios';
import newPackBanner from "../../../images/newpackageBanner.webp";
import { apiURL } from '../../../Constants/constant';
import { clearHolidayReducer } from '../../../Redux/OnePackageSearchResult/actionOneSearchPackage';
import { clearPackageData } from '../../../Redux/SearchPackage/actionSearchPackage';

const NewPackageForm = () => {
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedValue, setSelectedValue] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clearHolidayReducer());
        dispatch(clearPackageData());
    }, [dispatch]);

    const fetchOptions = async (searchTerm) => {
        setLoading(true);
        try {
            const response = await axios.get(`${apiURL.baseURL}/skyTrails/packagecitylist?keyword=${searchTerm}`);
            if (response.data.success) {
                const cityList = response.data.data.map((city) => ({
                    value: city,
                    label: city,
                }));
                setOptions(cityList);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const onSearch = async (value) => {
        if (value.trim().length === 0) return;
        await fetchOptions(value);
    };

    const onDropdownVisibleChange = async (open) => {
        if (open) {
            await fetchOptions('');
        }
    };

    const onChange = (value) => {
        setSelectedValue(value);
        navigate(`/holidaypackages/cities/${value}`);
    };

    const handleFormClicks = (e) => {
        e.preventDefault();
        if (selectedValue) {
            navigate(`/holidaypackages/cities/${selectedValue}`);
        }
    };

    return (
        <div className='heroBanner'>
            <div className="backdrop-img">
                <Img src={newPackBanner} />
            </div>
            <div className="opacity-layer"></div>
            <div className='container'>
                <div className="heroBannerContent">
                    <span className="title">Your journey for Fun filled Trips begins here</span>
                    <div className="searchInput">
                        <ConfigProvider
                            theme={{
                                components: {
                                    Select: {
                                        colorPrimary: '#111',
                                        colorBorder: "transparent",
                                        controlOutline: "none",
                                    }
                                },
                            }}
                        >
                            <Select
                                showSearch
                                placeholder="Search your destination...."
                                optionFilterProp="label"
                                onChange={onChange}
                                onSearch={onSearch}
                                onDropdownVisibleChange={onDropdownVisibleChange}
                                suffixIcon={null}
                                loading={loading}
                                notFoundContent={loading ? <Spin size="small" /> : null}
                                options={options}
                                placement="bottomLeft"
                            />
                        </ConfigProvider>
                        <button onClick={handleFormClicks}>Search</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewPackageForm;
