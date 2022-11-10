const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/database");

const Notebook = db.define(
  "Notebook",
  {
    NotebookID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    CreatorID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      NotebookName: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 0
      },
      CreatedAt: {
        type: DataTypes.DATE,
        defaultValue: new Date(),
        allowNull: false
      },

  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

// `sequelize.define` also returns the model
module.exports = Notebook;
