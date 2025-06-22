import { useEffect, useState } from 'react';
import axios from 'axios';
import ProjectCard from '../pages/ProjectCard';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: '',
    projectUrl: ''
  });

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/projects');
      setProjects(res.data);
    } catch (err) {
      console.error('Failed to load projects:', err);
    }
  };

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8080/api/projects', formData);
      alert('Project added successfully!');
      setProjects(prev => [...prev, res.data]); 
      setFormData({ title: '', description: '', technologies: '', projectUrl: '' }); 
      setShowForm(false); 
    } catch (err) {
      alert('Error adding project');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ textAlign: 'center' }}>My Projects</h2>

      
{!showForm && (
  <div style={{ display: 'flex', justifyContent: 'center', margin: '1.5rem 0' }}>
    <button
      onClick={() => setShowForm(true)}
      style={addButtonStyle}
    >
      ➕ Add Project
    </button>
  </div>
)}


      
      {showForm && (
        <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <input
            type="text"
            name="technologies"
            placeholder="Technologies (comma-separated)"
            value={formData.technologies}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <input
            type="url"
            name="projectUrl"
            placeholder="Project URL"
            value={formData.projectUrl}
            onChange={handleChange}
            style={inputStyle}
          />
          <div style={{ display: 'flex', gap: '10px' }}>
            <button type="submit" style={submitBtnStyle}>Submit</button>
            <button type="button" onClick={() => setShowForm(false)} style={cancelBtnStyle}>Cancel</button>
          </div>
        </form>
      )}

      {projects.length === 0 ? (
        <p style={{ textAlign: 'center' }}>No projects yet. Add one!</p>
      ) : (
        <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
          {projects.map(project => (
           <ProjectCard key={project.id} project={project} />

          ))}
        </div>
      )}
    </div>
  );
};

const inputStyle = {
  display: 'block',
  width: '100%',
  padding: '10px',
  marginBottom: '1rem',
  borderRadius: '4px',
  border: '1px solid #ccc'
};

const submitBtnStyle = {
  backgroundColor: '#28a745',
  color: '#fff',
  border: 'none',
  padding: '10px 20px',
  borderRadius: '5px',
  cursor: 'pointer'
};

const cancelBtnStyle = {
  backgroundColor: '#dc3545',
  color: '#fff',
  border: 'none',
  padding: '10px 20px',
  borderRadius: '5px',
  cursor: 'pointer'
};
const addButtonStyle = {
  padding: '12px 24px',
  backgroundColor: '#007acc',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  fontSize: '1rem',
  fontWeight: 'bold',
  cursor: 'pointer',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  transition: 'background-color 0.3s ease'
};


export default Projects;
