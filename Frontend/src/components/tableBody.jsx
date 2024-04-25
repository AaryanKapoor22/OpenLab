import React, { Component } from "react";
import Like from "./like";
import { Link } from "react-router-dom";
class TableBody extends Component {
  render() {
    const { recipes } = this.props; //this.props.recipes
    console.log(recipes);
    return (
      <tbody>
        {recipes.map((recipe, index) => (
          <tr key={index}>
            <td>
              <Link to={`/recipes/${recipe._id}`}> {recipe.name} </Link>
            </td>
            <td>
              <button
                onClick={() => {
                  this.props.onDelete(recipe);
                }}
                className="btn btn-danger btn-sm"
              >
                Delete
              </button>
            </td>
            <td>
              {" "}
              <Like
                liked={recipe.liked}
                onClick={() => {
                  this.props.onLike(recipe);
                }}
              ></Like>
            </td>
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
