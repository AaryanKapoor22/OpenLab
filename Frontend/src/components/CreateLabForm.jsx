/* 
Name: Kevin, Matt, Aaryan, Camryn
CreateLabForm: form allows admin to add a new lab to the system (ADMIN ONLY)
*/
import React from "react";
import Joi from "joi-browser";
import Form from "../common/form";
import {getInstructors } from "../services/labManagerService";

class CreateLabForm extends Form {
  // set up the initial state of the form based on required fields
  state = {
    data: { labName: "", labDate: "", labLocation: "", labCapacity: "", labType: "", instructor: "" },
    instructors: [],
    errors: {},
  };
  // schema set for the form validation
  schema = {
    labName: Joi.string().required().label("labName"),
    labDate: Joi.date().required().label("labDate"),
    labLocation: Joi.string().required().min(5).label("labLocation"),
    labCapacity: Joi.number().required().label("labCapacity"),
    labType: Joi.string().valid('Open', 'Missed').required().label("labType"),
    instructor: Joi.string().required().label("instructor")
  };

  // fetch instructors data from the backend
  async componentDidMount() {
    const { data: instructors } = await getInstructors();
    console.log(instructors);  // Add this line to see the fetched data
    this.setState({ instructors });
  }
  // add lab
  doSubmit = () => {
    this.props.onLabAdded(this.state.data);
  };
  // only two lab types are allowed 
  render() {
    const labTypes = [
      { value: "Open", label: "Open" },
      { value: "Missed", label: "Missed" }
    ];
    // get instructors info
    const instructors = this.state.instructors.map(i => ({
      value: i._id,
      label: `${i.firstName} ${i.lastName}`
    }));

    return (
      <div>
        {/*  form to add a new lab */}
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("labName", "Lab Name")}
          {this.renderInput("labDate", "Lab Date", "date")}
          {this.renderInput("labLocation", "Lab Location")}
          {this.renderInput("labCapacity", "Lab Capacity")}
          {this.renderSelect("labType", "Lab Type", labTypes)}
          {this.renderSelect("instructor", "Instructor", instructors)}
          {this.renderButton("Add Lab")}
        </form>
      </div>
    );
  }
}

export default CreateLabForm;