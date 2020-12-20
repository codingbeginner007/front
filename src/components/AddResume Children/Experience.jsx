import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../../css/cv.css";

const Experience = (props) => {
  const [inputs, setInputs] = useState([]);
  const [counter, setCounter] = useState(0);
  const [experiences, setExperience] = useState({});

  const appendInput = () => {
    var newInput = `input-${inputs.length}`;
    setInputs(inputs.concat([newInput]));
    console.log(counter);
    setCounter(counter + 1);
  };

  const onChangeValue = (e) => {
    let val = e.target.value;
    console.log(val);
    console.log(e.target.id);
    if (e.target.id == "experience0") {
      setExperience({ ...experiences, experience0: val });
    } else if (e.target.id == "experience1") {
      setExperience({ ...experiences, experience1: val });
    } else if (e.target.id == "experience2") {
      setExperience({ ...experiences, experience2: val });
    }
  };

  const upload = () => {
    console.log(experiences);
    //ApiService.uploadExperiences(experiences);
  };

  return (
    <div className="container">
      <div className="container ma">
        <div className="row">
          <Form>
            <div id="dynamicInput">
              <div className="row">
                <input
                  class="form-control"
                  type="text"
                  placeholder="Experience 1"
                  style={{
                    marginBottom: "10px",
                    marginRight: "30px",
                    width: "40vw",
                  }}
                  id="experience0"
                  onChange={onChangeValue}
                  defaultValue=""
                  value={experiences.experience}
                  required
                />
              </div>
              {inputs.map((input, index) => (
                <div className="row">
                  <input
                    class="form-control"
                    type="text"
                    id={`experience${index + 1}`}
                    placeholder={"Experience " + `${index + 2}`}
                    style={{ marginBottom: "10px", width: "40vw" }}
                    onChange={onChangeValue}
                    defaultValue=""
                    value={experiences[`experience${index + 1}`]}
                  />
                </div>
              ))}
            </div>
          </Form>
        </div>

        <div className="row">
          <div className="col">
            <Button variant="primary" onClick={upload}>
              Upload
            </Button>
          </div>
          {counter < 2 && (
            <div className="col">
              <Button variant="secondary" onClick={appendInput}>
                Add
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Experience;
