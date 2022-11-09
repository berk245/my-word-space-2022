const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/database");

const Word = db.define(
  "Word",
  {
    WordID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    NotebookID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    LastSeenAt: {
      type: DataTypes.DATE,
      defaultValue: null,
    },
    TimesSeen: {
      type: DataTypes.INTEGER,
      defaultValue: null,
    },
    CorrectAnswers: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    WordOriginal: {
      type: DataTypes.TEXT("long"),
      allowNull: false,
    },
    WordTranslation: {
      type: DataTypes.TEXT("long"),
      allowNull: false,
    },
    WordType: {
      type: DataTypes.ENUM("adjective", "noun", "verb", "other"),
      allowNull: false,
      defaultValue: "other",
    },
    CreatorID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Status: {
      type: DataTypes.ENUM("active", "deleted"),
      allowNull: false,
      defaultValue: "active",
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
    createdAt: false,
    updatedAt: false,
  }
);

// `sequelize.define` also returns the model
module.exports = Word;
