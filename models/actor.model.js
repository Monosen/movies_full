const { DataTypes } = require('sequelize');

const { db } = require('../util/database');

const Actor = db.define(
  'actors',
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    country: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    rating: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    profilecPic: {
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

module.exports = { Actor };