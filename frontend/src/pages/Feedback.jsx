import React, { useState } from "react";
import '../styles/Feedback.css';

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: 0,
    location: "",
    feedback: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleRating = (value) => {
    setFormData({ ...formData, rating: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || formData.rating === 0 || !formData.location || !formData.feedback) {
      alert("Please fill all fields and select a rating.");
      return;
    }

    console.log("Submitted Data:", formData);
    alert("Feedback submitted successfully!");

    // Reset Form
    setFormData({
      name: "",
      email: "",
      rating: 0,
      location: "",
      feedback: "",
    });
  };

  return (
    <div className="container">
      <h2>Share Your Parking Experience</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Your name"
          required
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="Your email"
          required
        />

        <label>Rating</label>
        <div className="star-rating">
          {[1, 2, 3, 4, 5].map((num) => (
            <span
              key={num}
              className={`star ${formData.rating >= num ? "filled" : ""}`}
              onClick={() => handleRating(num)}
              style={{ cursor: "pointer" }}
            >
              &#9733;
            </span>
          ))}
        </div>

        <label htmlFor="location">Parking Location</label>
        <input
          type="text"
          id="location"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          placeholder="Enter parking location"
          required
        />

        <label htmlFor="feedback">Feedback</label>
        <textarea
          id="feedback"
          value={formData.feedback}
          onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
          placeholder="Share your experience..."
          required
        ></textarea>

        <button type="submit">Submit Feedback</button>
      </form>
    </div>
  );
}

export default FeedbackForm;
