const { DataTypes } = require('sequelize');

const { db } = require('../util/database');

const Movie = db.define(
  'movies',
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    duration: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    rating: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    img: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    genre: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    status: {
      // active | deleted
      type: DataTypes.STRING(10),
      allowNull: false,
      defaultValue: 'active'
    }
  },
  { timestamps: false }
);

module.exports = { Movie };
