const { DataTypes } = require('sequelize');

const { db } = require('../util/database');

const ActorInMovie = db.define(
  'actorsInMovies',
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false
    },
    actorId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    movieId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  { timestamps: false }
);

module.exports = { ActorInMovie };
