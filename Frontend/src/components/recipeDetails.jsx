import React, { useState, useEffect } from "react";
import { saveRecipe, getRecipe } from "../services/recipesService";
import { useParams } from "react-router-dom";

const RecipeDetails = () => {
  const [recipe, setRecipe] = useState({});
  const { id } = useParams();
  useEffect(() => {
    async function fetchData() {
      const { data: recipe } = await getRecipe(id);
      if (!recipe) return this.props.history.replace("/not-found");
      setRecipe(recipe);
    }
    fetchData();
  });

  const handleUpate = async (curRecipe) => {
    curRecipe.name = "Updated";
    const { data: recipe } = await saveRecipe(curRecipe);
    setRecipe(recipe);
  };

  return (
    <div>
      <button
        className="btn btn-primary"
        onClick={() => {
          handleUpate(recipe);
        }}
      >
        {" "}
        Update{" "}
      </button>
      <h3>Recipe Details</h3>
      <div>Name: {recipe.name}</div>
      <div>Description: {recipe.description}</div>
    </div>
  );
};

export default RecipeDetails;
