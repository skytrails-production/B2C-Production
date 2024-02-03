import React, { useState } from 'react';
import './SSDCform.css';
import { apiURL } from "../../Constants/constant";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// const countries = ['ROMANIA'];
// const subDepartments = ['SHUTTERING', 'SHUTTERING SUPERVISOR', 'STEEL FIXER','STEEL FIXER SUPERVISOR', 'SUPERVISOR', 'COOK'];

function Ssdcform({jobs}) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    city: '',
    country:jobs.country,
    subCategory: '',
    experience: '',
    currentSalary: '',
    company: '',
    years:'',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    mobile: '',
    city: '',
    experience: '',
    subCategory:'',
    currentSalary: '',
    company: '',
    years:'',
  });



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Your custom validation logic goes here
    const newErrors = {};

    if (formData.name === '') {
      newErrors.name = 'Name is required';
    }

    if (formData.email === '' || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Invalid email';
    }

    if (formData.mobile === '') {
      newErrors.mobile = 'Phone is required';
    }
    // category

    if (formData.city === '') {
      newErrors.city = 'City is required';
    }

    if (formData.subCategory === '') {
      newErrors.subCategory = 'category is required';
    }

    if (formData.experience === '') {
      newErrors.experience = 'Select Experience';
    }

    if (formData.experience === 'Yes') {
      if (formData.currentSalary === '') {
        newErrors.currentSalary = 'Salary Range is required';
      }

      if (formData.company === '') {
        newErrors.company = 'Current Company Name is required';
      }

      if (formData.years === '') {
        newErrors.years = 'Years is required';
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      console.log('Form validation failed.');
    } else {
      
      try {
        const response = await axios.post(`${apiURL.baseURL}/skyTrails/ssdc/registration`, formData);
        // console.log('API response:', response.data);
        if (response.status === 200) {
          toast.success("Form submitted successfully!");
          setFormData({
            name: '',
            email: '',
            mobile: '',
            city: '',
            experience: '',
            currentSalary: '',
            company: '',
            years:'',
          });
        }
      } catch (error) {
        console.error('API error:', error);
        toast.error("Failed to submit form. Please try again later.");
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="Appcontent">
        <form onSubmit={handleSubmit} className="formcontainer">
          <div className="ssdc-training-center-heading1">Registration Form</div>
         
          <div className="form-row">
            <label className="ssdc-form-label">
              Name:
              <input
                className="ssdcform"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <div className="error-message">{errors.name}</div>}
            </label>
            <label className="ssdc-form-label">
              Email:
              <input
                className="ssdcform"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <div className="error-message">{errors.email}</div>}
            </label>
          </div>
          <div className="form-row">
            <label className="ssdc-form-label">
              Phone:
              <input
                className="ssdcform"
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
              />
              {errors.mobile && <div className="error-message">{errors.mobile}</div>}
            </label>
            <label className="ssdc-form-label">
              City:
              <input
                className="ssdcform"
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
              {errors.city && <div className="error-message">{errors.city}</div>}
            </label>
          </div>
          <label className="ssdc-form-label">
            Country:
            <select
              className="ssdcform"
              name="country"
              value={formData.country}
              onChange={handleChange}
            >
              <option  value={jobs.country} >
              {jobs.country}
              </option>
            </select>
          </label>
          <label className="ssdc-form-label">
            Subdepartment:
            <select
              className="ssdcform"
              name="subCategory"
              value={formData.subCategory}
              onChange={handleChange}
            >
            <option value="" disabled hidden>
      Select Category
    </option>
              {jobs.jobs.map((item,index) => (
                
                <option key={index} value={item.category}>
                  {item.category}
                </option>
              ))}
            </select>
             {errors.subCategory && <div className="error-message">{errors.subCategory}</div>}
          </label>
          <label className="ssdc-form-label">
            Experience:
            <select
              className="ssdcform"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
            >
              <option value="">Select Experience</option>
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
            {errors.experience && <div className="error-message">{errors.experience}</div>}
          </label>
          {formData.experience === 'Yes' && (
            <>
              <label className="ssdc-form-label">
                Salary Range:
                <select
                  className="ssdcform"
                  name="currentSalary"
                  value={formData.currentSalary}
                  onChange={handleChange}
                >
                  <option value="">Select Salary Range</option>
                  <option value="10,000 - 20,000">10,000 - 20,000</option>
                  <option value="20,000 - 40,000">20,000 - 40,000</option>
                  <option value="40,000 - 80,000">40,000 - 80,000</option>
                  <option value="80,000 - Above">80,000 - Above</option>
                </select>
                {errors.currentSalary && <div className="error-message">{errors.currentSalary}</div>}
              </label>
              <label className="ssdc-form-label">
                 Company Name:
                <input
                  className="ssdcform"
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                />
                {errors.company && <div className="error-message">{errors.company}</div>}
              </label>
              <label className="ssdc-form-label">
                Years:
                <input
                  className="ssdcform"
                  type="number"
                  name="years"
                  value={formData.years}
                  onChange={handleChange}
                />
                {errors.years && <div className="error-message">{errors.years}</div>}
              </label>
            </>
          )}
          <button className="ssdcbutton" type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default Ssdcform;
