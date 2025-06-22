const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db'); 

const Project = sequelize.define('Project', {
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  technologies: { type: DataTypes.STRING, allowNull: false },
  projectUrl: { type: DataTypes.STRING }
});

module.exports = Project;
