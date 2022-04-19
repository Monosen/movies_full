import { DataTypes } from 'sequelize'

import { db } from '../util/database'

const User = db.define(
  'users',
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(255),
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      // admin | invited
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: 'invited'
    },
    status: {
      // active | disable | deleted
      type: DataTypes.STRING(10),
      allowNull: false,
      defaultValue: 'active'
    }
  },
  { timestamps: false }
)

export { User }
