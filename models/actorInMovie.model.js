const { DataTypes } = require('sequelize');

const { db } = require('../util/database');

const { Actor } = require('./actor.model');
const { Movie } = require('./movie.model');

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
      allowNull: false,
      references: { model: Actor, key: 'id' }
    },
    movieId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: Movie, key: 'id' }
    }
  },
  { timestamps: false }
);

module.exports = { ActorInMovie };
