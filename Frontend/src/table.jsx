import React, { useEffect, useState } from "react";
import TableBody from "./components/tableBody";
import TableHead from "./components/tableHead";
import {
  getRecipes,
  deleteRecipe,
  saveRecipe,
} from "./services/recipesService";
import auth from "./services/authService";

const Table = () => {
  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState("");
  const [rerender, setRerender] = useState(false);

  useEffect(() => {
    if (!auth.getCurrentUser()) {
      console.log("no user");
      window.location = "/login";
    }
    async function fetchData() {
      const { data } = await getRecipes();
      console.log(data);
      setRecipes(data);
    }
    fetchData();
  }, []);

  const handleSearch = (event) => {
    setQuery(event.target.value);
  };
  const handleLike = (recipe) => {
    const index = recipes.indexOf(recipe);
    let newRecipes = recipes;
    newRecipes[index].liked = !newRecipes[index].liked;
    setRecipes(newRecipes);
    setRerender(!rerender);
  };

  const handleDelete = async (recipe) => {
    console.log(recipe);
    const newRecipes = recipes.filter((p) => p._id !== recipe._id);

    setRecipes(newRecipes);
    try {
      await deleteRecipe(recipe._id);
    } catch (ex) {
      console.log("delete exception");
      if (ex.respond && ex.respond.status === 404) {
        alert("Recipe has already been deleted !");
        setRecipes(recipes);
      }
    }
  };
  const handleAdd = async () => {
    const NewRecipe = {
      name: "Chicken Salad",
      description: "Chicken Salad with cheese",
    };
    const { data: recipe } = await saveRecipe(NewRecipe);
    console.log(recipe);
    const newRecipes = [recipe, ...recipes];
    setRecipes(newRecipes);
  };
  const filterrecipeByName = () => {
    if (query) {
      const filtered = recipes.filter((p) =>
        p.name.toLowerCase().startsWith(query.toLowerCase())
      );
      return filtered;
    }
    return recipes;
  };

  const filteredRecipes = filterrecipeByName();

  return (
    <React.Fragment>
      <input
        type="text"
        className="form-control"
        name="search"
        placeholder="Search by Name"
        value={query}
        onChange={handleSearch}
      />
      <button className="btn btn-primary" onClick={handleAdd}>
        Add
      </button>
      <table className="table">
        <TableHead />

        <TableBody
          recipes={filteredRecipes}
          onDelete={handleDelete}
          onLike={handleLike}
        />
      </table>
    </React.Fragment>
  );
};

export default Table;
