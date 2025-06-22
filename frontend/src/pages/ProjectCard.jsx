import { useState } from 'react';
import axios from 'axios';

const ProjectCard = ({ project }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: project.title,
    description: project.description,
    technologies: project.technologies,
    projectUrl: project.projectUrl
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`https://portfolio-mysql.onrender.com/api/projects/${project.id}`, formData);
      alert('Project updated successfully!');
      setIsEditing(false);
      window.location.reload();
    } catch (err) {
      alert(' Error updating project');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await axios.delete(`https://portfolio-mysql.onrender.com/api/projects/${project.id}`);
        alert(' Project deleted!');
        window.location.reload(); 
      } catch (err){
        alert('Error deleting project');
      }
    }
  };

  return (
    <div style={containerStyle}>
    <div style={cardStyle} >
      {isEditing ? (
        <>
          <input name="title" value={formData.title} onChange={handleChange} style={inputStyle} />
          <textarea name="description" value={formData.description} onChange={handleChange} style={inputStyle} />
          <input name="technologies" value={formData.technologies} onChange={handleChange} style={inputStyle} />
          <input name="projectUrl" value={formData.projectUrl} onChange={handleChange} style={inputStyle} />
          <div style={buttonContainer}>
            <button onClick={handleUpdate} style={saveBtn}>Save</button>
            <button onClick={() => setIsEditing(false)} style={cancelBtn}>Cancel</button>
          </div>
        </>
      ) : (
        <>
          <h3>{project.title}</h3>
          <p><strong>Description:</strong> {project.description}</p>
          <p><strong>Technologies:</strong> {project.technologies}</p>
          {project.projectUrl && (
            <a href={project.projectUrl} target="_blank" rel="noreferrer" style={linkStyle}>
              🔗 Visit Project
            </a>
          )}
          <div style={buttonContainer}>
            <button onClick={() => setIsEditing(true)} style={editBtn}> Edit</button>
            <button onClick={handleDelete} style={deleteBtn}>Delete</button>
          </div>
        </>
      )}
    </div>
    </div>
  );
};

const cardStyle = {
  border: '1px solid #ccc',
  borderRadius: '10px',
  padding: '1rem',
  backgroundColor: '#fff',
  boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  width: '400px',
};

const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '40vh',
  backgroundColor: '#f0f2f5',
};


const inputStyle = {
  width: '100%',
  padding: '8px',
  marginBottom: '10px',
  border: '1px solid #ccc',
  borderRadius: '5px'
};

const buttonContainer = {
  display: 'flex',
  gap: '10px',
  marginTop: '10px'
};

const saveBtn = {
  backgroundColor: '#28a745',
  color: '#fff',
  border: 'none',
  padding: '8px 16px',
  borderRadius: '5px',
  cursor: 'pointer'
};

const cancelBtn = {
  backgroundColor: '#6c757d',
  color: '#fff',
  border: 'none',
  padding: '8px 16px',
  borderRadius: '5px',
  cursor: 'pointer'
};

const editBtn = {
  backgroundColor: '#ffc107',
  color: '#000',
  border: 'none',
  padding: '8px 16px',
  borderRadius: '5px',
  cursor: 'pointer'
};

const deleteBtn = {
  backgroundColor: '#dc3545',
  color: '#fff',
  border: 'none',
  padding: '8px 16px',
  borderRadius: '5px',
  cursor: 'pointer'
};

const linkStyle = {
  marginTop: '0.5rem',
  textDecoration: 'none',
  color: '#007bff',
  fontWeight: 'bold'
};

export default ProjectCard;
