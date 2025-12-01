import React, { useState } from "react";
import "./ReviewForm.css";

const initialReviews = [
  {
    id: 1,
    doctorName: "Dr. John Doe",
    speciality: "Cardiology",
    reviewGiven: false,
    reviewerName: "",
    reviewText: "",
    rating: 0,
  },
  {
    id: 2,
    doctorName: "Dr. Jane Smith",
    speciality: "Dermatology",
    reviewGiven: false,
    reviewerName: "",
    reviewText: "",
    rating: 0,
  },
];

const ReviewForm = () => {
  const [reviews, setReviews] = useState(initialReviews);

  const [selectedReviewId, setSelectedReviewId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    review: "",
    rating: 0,
  });

  const handleFeedbackClick = (row) => {
    if (row.reviewGiven) return; 

    setSelectedReviewId(row.id);
    setFormData({
      name: "",
      review: "",
      rating: 0,
    });
    setShowWarning(false);
    setShowForm(true);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRatingClick = (value) => {
    setFormData((prev) => ({
      ...prev,
      rating: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.review || formData.rating === 0) {
      setShowWarning(true);
      return;
    }

    setShowWarning(false);

    const updated = reviews.map((r) =>
      r.id === selectedReviewId
        ? {
            ...r,
            reviewGiven: true,
            reviewerName: formData.name,
            reviewText: formData.review,
            rating: formData.rating,
          }
        : r
    );
    setReviews(updated);

    setShowForm(false);
    setSelectedReviewId(null);
    setFormData({ name: "", review: "", rating: 0 });
  };

  const renderStars = (currentRating, clickable = false) => {
    const stars = [1, 2, 3, 4, 5];
    return (
      <div className="rating-stars">
        {stars.map((star) => (
          <span
            key={star}
            className={
              "rating-star" + (star <= currentRating ? " selected" : "")
            }
            onClick={
              clickable
                ? () => {
                    handleRatingClick(star);
                  }
                : undefined
            }
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="reviews-container">
      <h2 className="reviews-title">Reviews</h2>

      <table className="reviews-table">
        <thead>
          <tr>
            <th>Serial Number</th>
            <th>Doctor Name</th>
            <th>Doctor Speciality</th>
            <th>Provide feedback</th>
            <th>Review Given</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((row, index) => (
            <tr key={row.id}>
              <td>{index + 1}</td>
              <td>{row.doctorName}</td>
              <td>{row.speciality}</td>
              <td>
                <button
                  type="button"
                  className="feedback-btn"
                  onClick={() => handleFeedbackClick(row)}
                  disabled={row.reviewGiven}
                >
                  {row.reviewGiven ? "Submitted" : "Click Here"}
                </button>
              </td>
              <td>
                {row.reviewGiven ? (
                  <div className="review-cell">
                    <div className="review-name">
                      <strong>{row.reviewerName}</strong>
                    </div>
                    <div className="review-text">{row.reviewText}</div>
                    {renderStars(row.rating, false)}
                  </div>
                ) : (
                  ""
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showForm && (
        <div className="feedback-form-wrapper">
          <div className="feedback-form-card">
            <h3>Give Your Review</h3>

            {showWarning && (
              <p className="warning">
                Please fill out all fields and select a rating.
              </p>
            )}

            <form onSubmit={handleSubmit}>
              <div className="feedback-form-group">
                <label htmlFor="name">Name:</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="feedback-form-group">
                <label htmlFor="review">Review:</label>
                <textarea
                  id="review"
                  name="review"
                  value={formData.review}
                  onChange={handleChange}
                  rows={4}
                />
              </div>

              <div className="feedback-form-group">
                <label>Rating:</label>
                {renderStars(formData.rating, true)}
              </div>

              <button type="submit" className="feedback-submit-btn">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewForm;
