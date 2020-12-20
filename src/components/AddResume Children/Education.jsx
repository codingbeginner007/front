import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function SimpleModal() {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Text in a modal</h2>
      <p id="simple-modal-description">
        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
      </p>
      <SimpleModal />
    </div>
  );

  return (
    <div>
      <button type="button" onClick={handleOpen}>
        Open Modal
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}

// import React, { useState } from "react";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
// import ApiService from "../../services/upload-cv";
// import "../../css/cv.css";

// const Experiences = (props) => {
//   const [inputs, setInputs] = useState([]);
//   const [counter, setCounter] = useState(0);
//   const [experiences, setExperience] = useState({});

//   const appendInput = () => {
//     var newInput = `input-${inputs.length}`;
//     setInputs(inputs.concat([newInput]));
//     console.log(counter);
//     setCounter(counter + 1);
//   };

//   const onChangeValue = (e) => {
//     let val = e.target.value;
//     console.log(val);
//     console.log(e.target.id);
//     if (e.target.id == "experience0") {
//       setExperience({ ...experiences, experience0: val });
//     } else if (e.target.id == "experience1") {
//       setExperience({ ...experiences, experience1: val });
//     } else if (e.target.id == "experience2") {
//       setExperience({ ...experiences, experience2: val });
//     }
//   };

//   const upload = () => {
//     console.log(experiences);
//     //ApiService.uploadExperiences(experiences);
//   };

//   return (
//     <div className="container">
//       <div className="container ma">
//         <div className="row">
//           <Form>
//             <div id="dynamicInput">
//               <div className="row">
//                 <input
//                   class="form-control"
//                   type="text"
//                   style={{
//                     marginBottom: "10px",
//                     marginRight: "30px",
//                     width: "40vw",
//                   }}
//                   id="experience0"
//                   onChange={onChangeValue}
//                   defaultValue=""
//                   value={experiences.experience}
//                   required
//                 />
//               </div>
//               {inputs.map((input, index) => (
//                 <div className="row">
//                   <input type="text" pattern="[0-9]*" min="1990" max="2020" />
//                   <input
//                     class="form-control"
//                     type="text"
//                     id={`experience${index + 1}`}
//                     style={{ marginBottom: "10px", width: "40vw" }}
//                     onChange={onChangeValue}
//                     defaultValue=""
//                     value={experiences[`experience${index + 1}`]}
//                   />
//                 </div>
//               ))}
//             </div>
//           </Form>
//         </div>

//         <div className="row">
//           <div className="col">
//             <Button variant="primary" onClick={upload}>
//               Upload
//             </Button>
//           </div>
//           {counter < 4 && (
//             <div className="col">
//               <Button variant="secondary" onClick={appendInput}>
//                 Add
//               </Button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };
// export default Experiences;
