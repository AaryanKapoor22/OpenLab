// form responsible for adding a lab session

import React from "react";
import Joi from "joi-browser";
import Form from "../common/form";
import { addLab ,getLabs} from "../services/professorService";

class LabAdderForm extends Form {

    // logic will have to be added based auth. (ADD USER's full name to instructor field)
  state = {
    data: { labName: "", labDate: "", labLocation: "", labCapacity: "", labType: "", instructor: "" }, // instructor has to be changed based on user signed in
    errors: {},
  };

  // define schema based on lab schema attributes
  schema = {
    labName: Joi.string().required().label("labName"),
    labDate: Joi.date().required().label("labDate"),
    labLocation: Joi.string().required().min(5).label("labLocation"),
    labCapacity: Joi.number().required().label("labCapacity"),
    labType: Joi.string().valid('Open', 'Missed').required().label("labType"), // https://joi.dev/api/?v=17.13.0 only should take in Open or Missed (based on requirements)
    instructor: Joi.string().required().label("instructor")
  };

  doSubmit = async () => {
    try {
        // notify user that lab has been added
        addLab(this.state.data);
        console.log(getLabs.length);
        this.props.onLabAdded();
        // console.log(addLab(this.state.data));
        alert("Lab has been added!");
    //   window.location = "/labs";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        // errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("labName", "Lab Name")}
          {this.renderInput("labDate", "Lab Date", "date")}
          {this.renderInput("labLocation", "Lab Location")}
          {this.renderInput("labCapacity", "Lab Capacity")}
          {this.renderInput("labType", "Lab Type")}
          {/* find a way to do it without the instructor field, such as passing in the instructors info from when they log in*/}
          {this.renderInput("instructor", "Instructor")} 
          {this.renderButton("Add Lab") }
        </form>
      </div>
    );
  }
}

export default LabAdderForm;

