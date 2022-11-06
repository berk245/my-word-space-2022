const LoginUser = require("../services/LoginUser");
const SignupUser = require("../services/SignupUser");
const AddNotebook = require("../services/Notebooks/AddNotebook");
const DeleteNotebook = require("../services/Notebooks/DeleteNotebook");
const EditNotebook = require("../services/Notebooks/EditNotebook");
const GetAllNotebooks = require("../services/Notebooks/GetAllNotebooks");
const GetAllWords = require("../services/Words/GetAllWords");
const AddWord = require("../services/Words/AddWord");
const EditWord = require("../services/Words/EditWord");
const DeleteWord = require("../services/Words/DeleteWord");

module.exports = {
  LoginUser: LoginUser,
  SignupUser: SignupUser,
  Notebooks: {
    AddNotebook: AddNotebook,
    DeleteNotebook: DeleteNotebook,
    EditNotebook: EditNotebook,
    GetAllNotebooks: GetAllNotebooks,
  },
  Words: {
    GetAllWords: GetAllWords,
    AddWord: AddWord,
    EditWord: EditWord,
    DeleteWord: DeleteWord,
  },
};
