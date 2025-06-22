const Project = require('../models/Project');


exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.findAll();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
};


exports.createProject = async (req, res) => {
  try {
    const newProject = await Project.create(req.body);
    res.status(201).json(newProject);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create project' });
  }
};


exports.updateProject = async (req, res) => {
  const id = req.params.id;
  const { title, description, technologies, projectUrl } = req.body;

  try {
    const [updated] = await Project.update(
      { title, description, technologies, projectUrl },
      { where: { id } }
    );

    if (updated) {
      const updatedProject = await Project.findByPk(id);
      res.status(200).json(updatedProject);
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.deleteProject = async (req, res) => {
  try {
    const id = req.params.id;
    await Project.destroy({ where: { id } });
    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
