import React from "react";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(formData.email)) {
      newErrors.email = "Only Gmail addresses are allowed";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message cannot be empty";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

   if (Object.keys(validationErrors).length === 0) {
  const existingMessages =
    JSON.parse(localStorage.getItem("contactMessages")) || [];

  const newMessage = {
    name: formData.name,
    email: formData.email,
    message: formData.message,
    date: new Date().toLocaleString(),
  };

  localStorage.setItem(
    "contactMessages",
    JSON.stringify([...existingMessages, newMessage])
  );

  setSuccess("Message sent successfully!");
  setFormData({ name: "", email: "", message: "" });

  setTimeout(() => setSuccess(""), 3000);
}

  };

  return (
    <section className="contact-section">
      <div className="contact-wrapper">
        <form className="contact-form" onSubmit={handleSubmit}>
          <h2>Contact Us</h2>

          {success && <p className="success-text">{success}</p>}

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <span className="error-text">{errors.name}</span>}

          <input
            type="email"
            name="email"
            placeholder="Email (Gmail only)"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className="error-text">{errors.email}</span>}

          <textarea
            name="message"
            placeholder="Message"
            value={formData.message}
            onChange={handleChange}
          />
          {errors.message && (
            <span className="error-text">{errors.message}</span>
          )}

          <button type="submit">Send Message</button>
        </form>
      </div>
    </section>
  );
}
