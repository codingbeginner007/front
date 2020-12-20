import React from "react";
// import CvService from '/Users/Bobbhy/Documents/React/front/src/services/cv.service';
import { post } from "axios";
class Image extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      user: null,
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.fileUpload = this.fileUpload.bind(this);
  }

  onFormSubmit(e) {
    e.preventDefault(); // Stop form submit
    this.fileUpload(this.state.file).then(
      (response) => {
        console.log(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onChange(e) {
    console.log(e.target.files[0].type.split("/")[1]);
    const myRenamedFile = new File(
      [e.target.files[0]],
      this.state.user.accessToken.split(".")[1] +
        "." +
        e.target.files[0].type.split("/")[1]
    );
    this.setState({ file: myRenamedFile });
  }
  componentDidMount() {
    const user = JSON.parse(localStorage.getItem("user"));
    this.setState({ user: user });
  }
  fileUpload(file) {
    const url = "http://localhost:5000/api/cv/image";
    const formData = new FormData();
    formData.append("file", file);
    let value = "Bearer " + this.state.user?.accessToken;
    console.log(value);
    const config = {
      headers: {
        Authorization: value,
        "content-type": "multipart/form-data",
      },
    };
    return post(url, formData, config);
  }

  render() {
    console.log(this.state.file);
    return (
      <form onSubmit={this.onFormSubmit}>
        <h1>File Upload</h1>
        <input
          type="file"
          accept=".jpeg,.png,.jpg,.tif,.svg"
          onChange={this.onChange}
        />
        <button type="submit">Upload</button>
      </form>
    );
  }
}

export default Image;
