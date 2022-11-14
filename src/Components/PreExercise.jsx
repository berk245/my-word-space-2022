import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { formatNotebooksArray, getExerciseQuestions, isUserAuthenticated } from "../utils";
function PreExercise({
  userNotebooks,
  userId,
  setExerciseData,
  setCurrentView,
}) {
  const [exerciseParameters, setExerciseParameters] = useState({
    amount: "",
    notebooks: [],
    wordTypes: [],
  });
  const [requestError, setRequestError] = useState(false)
  const navigate = useNavigate();
  if(!isUserAuthenticated()){
    navigate('/not-authorized')
  }

  const formattedNotebooks = formatNotebooksArray(userNotebooks);
  const wordTypes = [
    {
      label: "Adjective",
      key: "adjective",
      value: "adjective",
    },
    {
      label: "Noun",
      key: "Noun",
      value: "noun",
    },
    {
      label: "Verb",
      key: "Verb",
      value: "verb",
    },
  ];
  const onSelectChange = (type, e) => {
    if (type === "notebooks") {
      let notebooks = [];
      e.map((nb) => {
        notebooks.push(nb.value);
      });
      setExerciseParameters({ ...exerciseParameters, notebooks: notebooks });
    } else {
      let types = [];
      e.map((type) => {
        types.push(type.value);
      });

      setExerciseParameters({ ...exerciseParameters, wordTypes: types });
    }
  };


  const onSubmit = async() => {
    let exerciseData = await getExerciseQuestions(userId, exerciseParameters)

    if(exerciseData.error){
      setRequestError(exerciseData.error)
      return
    }
    setExerciseData(exerciseData)
    setCurrentView('exercise')
  };
  return (
    <div>
      <button onClick={() => navigate("/")}>Go back</button>
      <h2>Setup the exercise</h2>
      {requestError && <p>{requestError}</p>}
      <div className="">
        <span>Word Amount</span>
        <input
          onChange={(e) =>
            setExerciseParameters({
              ...exerciseParameters,
              amount: e.target.value,
            })
          }
          type="number"
          id="amount"
          name="amount"
        />
      </div>
      <div className="">
        <span>Notebooks</span>
        <Select
          isMulti
          options={formattedNotebooks}
          onChange={(e) => onSelectChange("notebooks", e)}
        />
      </div>

      <div className="">
        <span>Word Types</span>
        <Select
          isMulti
          options={wordTypes}
          onChange={(e) => onSelectChange("wordTypes", e)}
        />
      </div>

      <button onClick={onSubmit}>Begin exercise</button>
    </div>
  );
}

export default PreExercise;
