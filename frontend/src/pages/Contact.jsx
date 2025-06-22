import { useState } from 'react';
import { sendContact } from '../api';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    console.log("Submitting Contact Form:", formData);
    try {
      await sendContact(formData);
      alert('Message sent!');
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      alert('Failed to send message');
    }
  };

  return (
    <>
    <h1>Conatct</h1>
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" onChange={handleChange} value={formData.name} required />
      <input name="email" placeholder="Email" onChange={handleChange} value={formData.email} required />
      <textarea name="message" placeholder="Message" onChange={handleChange} value={formData.message} required />
      <button type="submit">Send</button>
    </form>
    </>
  );
};

export default Contact;
