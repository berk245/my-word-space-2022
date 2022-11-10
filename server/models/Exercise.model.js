const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/database");

const Exercise = db.define(
  "Exercise",
  {
    ExerciseID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    UserID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      ExerciseDate: {
        type: DataTypes.DATE,
        defaultValue: new Date(),
        allowNull: false
      },
      ExerciseCompleted:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0
      },
      QuestionCount: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      CorrectAnswers: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      }   
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

// `sequelize.define` also returns the model
module.exports = Exercise;
