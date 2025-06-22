import { useState } from 'react';
import axios from 'axios';

const AddProject = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: '',
    projectUrl: ''
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('https://portfolio-mysql.onrender.com/api/projects', formData);
      alert('Project added successfully!');
      setFormData({ title: '', description: '', technologies: '', projectUrl: '' });
    } catch (err) {
      alert('Failed to add project');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" placeholder="Project Title" onChange={handleChange} value={formData.title} required />
      <textarea name="description" placeholder="Description" onChange={handleChange} value={formData.description} required />
      <input name="technologies" placeholder="Technologies" onChange={handleChange} value={formData.technologies} required />
      <input name="projectUrl" placeholder="Project URL (optional)" onChange={handleChange} value={formData.projectUrl} />
      <button type="submit">Add Project</button>
    </form>
  );
};

export default AddProject;
