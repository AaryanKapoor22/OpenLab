import React from "react";
import Joi from "joi-browser";
import Form from "../common/form";
import {getInstructors } from "../services/labManagerService";

class CreateLabForm extends Form {
  state = {
    data: { labName: "", labDate: "", labLocation: "", labCapacity: "", labType: "", instructor: "" },
    instructors: [],
    errors: {},
  };

  schema = {
    labName: Joi.string().required().label("labName"),
    labDate: Joi.date().required().label("labDate"),
    labLocation: Joi.string().required().min(5).label("labLocation"),
    labCapacity: Joi.number().required().label("labCapacity"),
    labType: Joi.string().valid('Open', 'Missed').required().label("labType"),
    instructor: Joi.string().required().label("instructor")
  };

  async componentDidMount() {
    const { data: instructors } = await getInstructors();
    console.log(instructors);  // Add this line to see the fetched data
    this.setState({ instructors });
  }

  doSubmit = () => {
    this.props.onLabAdded(this.state.data);
  };

  render() {
    const labTypes = [
      { value: "Open", label: "Open" },
      { value: "Missed", label: "Missed" }
    ];

    const instructors = this.state.instructors.map(i => ({
      value: i._id,
      label: `${i.firstName} ${i.lastName}`
    }));

    return (
      <div>
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