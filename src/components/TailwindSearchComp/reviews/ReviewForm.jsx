import React, { useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FaStar } from "react-icons/fa";

const SubmitReview = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: 0, // Initially 0 stars
    comments: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Function to handle star click
  const handleStarClick = (ratingValue) => {
    setFormData({ ...formData, rating: ratingValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Review submitted:", formData);

    // Reset form after submission
    setFormData({ name: "", email: "", rating: 0, comments: "" });
  };

  return (
    <div className="w-full mx-auto mt-10 bg-white ">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Submit Your Review
      </h2>
      <form
        onSubmit={handleSubmit}
        style={{ backgroundColor: "#F9FAFC" }}
        className="p-5"
      >
        <div className="mb-4">
          <label className="block text-gray-700 font-medium text-sm mb-2">
            Rating
          </label>
          <div className="flex space-x-2 group">
            {/* Render 5 stars */}
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                // icon={FaStar}
                onClick={() => handleStarClick(star)}
                className={`cursor-pointer text-3xl transition-all duration-500 
                group-hover:text-indigo-600 ${
                  star <= formData.rating ? "text-indigo-500" : "text-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium text-sm mb-2">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your name"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium text-sm mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium text-sm mb-2">
            Comments
          </label>
          <textarea
            name="comments"
            value={formData.comments}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="5"
            placeholder="Share your experience"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-indigo-500 text-white font-bold py-2 px-4 rounded-lg w-full hover:bg-indigo-600 transition duration-200"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default SubmitReview;
