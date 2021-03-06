import { DataTypes } from 'sequelize'

import { db } from '../util/database'

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
      type: DataTypes.INTEGER,
      allowNull: false
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
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
)

export { Movie }
