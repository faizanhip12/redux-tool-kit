import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from 'react-router-dom';
import { updateTutorial, deleteTutorial } from "../slices/tutorials";
import TutorialDataService from "../services/TutorialService";
// import deleteTutorial from "../slices/tutorials"

function Tutorial() {
  const { id } = useParams()
  // console.log("id id id id id id id ", id)
  let navigate = useNavigate();

  const initialTutorialState = {
    id: null,
    title: "",
    description: "",
    published: false
  };
  const [currentTutorial, setCurrentTutorial] = useState(initialTutorialState)
  const [message, setMessage] = useState("")
  const dispatch = useDispatch();

  const tutorials = useSelector(state => state.tutorials);
  const getTutorial = id => {
    const tutorial = tutorials.find((tutorial) => tutorial.id == id)
    //  console.log("tutorial",tutorial)
    if (tutorial) {
      console.log("if")
      setCurrentTutorial(tutorial)
      // console.log("currentTutorialcurrentTutorialcurrentTutorial", tutorial)
    } else {
      console.log("else")
      TutorialDataService.get(id)
        .then(response => {
          setCurrentTutorial(response.data);
          // console.log("currentTutorialcurrentTutorialcurrentTutorial", response.data)

        })
        .catch(e => {
          console.log(e);
        });
    }
  }

  const handleInputChange = event => {
    const { name, value } = event.target;
    console.log("name name name", name)
    console.log("value value value", value)
    setCurrentTutorial({ ...currentTutorial, [name]: value });
  };
  // const getTutorial = id => {
  //   TutorialDataService.get(id)
  //     .then(response => {
  //       setCurrentTutorial(response.data);
  //       console.log("currentTutorialcurrentTutorialcurrentTutorial", response.data)

  //     })
  //     .catch(e => {
  //       console.log(e);
  //     });

  // };
  useEffect(() => {
    if (id)
      getTutorial(id);
  }, [id]);


  const updateStatus = status => {
    const data = {
      id: currentTutorial.id,
      title: currentTutorial.title,
      description: currentTutorial.description,
      published: status
    };

    dispatch(updateTutorial({ id: currentTutorial.id, data }))
      .unwrap()
      .then(response => {
        console.log(response);
        setCurrentTutorial({ ...currentTutorial, published: status });
        setMessage("The status was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };
  const removeTutorial = (id) => {
    console.log("deleteTutorialdeleteTutorialdeleteTutorial", id)
    dispatch(deleteTutorial({ id: currentTutorial.id }))
      .unwrap()
      .then(() => {
        navigate("/tutorials");
        console.log("data", currentTutorial.id)
      })
      .catch(e => {
        console.log(e);
      });


  };
  const updateContent = () => {
    console.log("currentTutorial", currentTutorial)
    dispatch(updateTutorial(currentTutorial))
      .unwrap()
      .then(() => {
        // navigate("/tutorials");
        // console.log("data", currentTutorial.id)
      })
      .catch(e => {
        console.log(e);
      });

  }

  return (
    <div>
      {currentTutorial ? (
        <div className="edit-form">
          <h4>Tutorial</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={currentTutorial.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentTutorial.description}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentTutorial.published ? "Published" : "Pending"}
            </div>
          </form>

          {currentTutorial.published ? (
            <button
            // className="badge badge-primary mr-2"
            // onClick={() => updateStatus(false)}
            >
              UnPublish
            </button>
          ) : (
            <button
              className="badge badge-primary mr-2"
            // onClick={() => updateStatus(true)}
            >
              Publish
            </button>
          )}

          {/* <button className="badge badge-danger mr-2" onClick={removeTutorial}>
            Delete
          </button> */}

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateContent}
          >
            Update
          </button>

          <button
            type="submit"
            className="badge badge-danger"
            onClick={() => removeTutorial(id)}
          >
            Delete
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Tutorial...</p>
        </div>
      )}
    </div>
  );
}

export default Tutorial