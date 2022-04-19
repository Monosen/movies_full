import { DataTypes } from 'sequelize'

import { db } from '../util/database'

const Review = db.define(
  'reviews',
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
    comment: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    movieId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      // active | disable
      type: DataTypes.STRING(10),
      allowNull: false,
      defaultValue: 'active'
    }
  },
  { timestamps: false }
)

export { Review }
