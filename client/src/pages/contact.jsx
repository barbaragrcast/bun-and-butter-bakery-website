import React from "react";
import ContactForm from "../components/contactForm";

const Contact = () => {
  return (
    <div id="contact-page">
      <div id="contact-container">
        <h1 className="parisienne-regular">Contact Us</h1>
        <p>We’d love to hear from you! Questions, feedback, or just to say hi 😊</p>
        <ContactForm />
      </div>
    </div>
  );
};

export default Contact;