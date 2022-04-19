import { DataTypes } from 'sequelize'

import { db } from '../util/database'

import { Actor } from './actor.model'
import { Movie } from './movie.model'

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
)

export { ActorInMovie }
