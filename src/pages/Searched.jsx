import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";

const Searched = () => {
  const [searchedRecipes, setSearchedRecipes] = useState([]);

  let params = useParams();

  useEffect(() => {
    getSearched(params.search);
  }, [params.search]);

  const getSearched = async (cueryName) => {
    const check = localStorage.getItem(cueryName);

    if (check) {
      setSearchedRecipes(JSON.parse(check));
    } else {
      const url = "https://api.spoonacular.com/recipes/complexSearch";
      const apiKey = process.env.REACT_APP_API_KEY;
      const res = await fetch(`${url}?apiKey=${apiKey}&query=${cueryName}`);
      const data = await res.json();
      localStorage.setItem(cueryName, JSON.stringify(data.results));
      setSearchedRecipes(data.results);
    }
  };

  return (
    <Grid>
      {searchedRecipes.length > 0 &&
        searchedRecipes.map((item) => {
          return (
            <Card key={item.id}>
              <Link to={`/recipe/${item.id}`}>
                <img src={item.image} alt={item.title} />
                <h4>{item.title}</h4>
              </Link>
            </Card>
          );
        })}
    </Grid>
  );
};

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 3rem;
`;

const Card = styled.div`
  img {
    width: 100%;
    border-radius: 2rem;
  }
  a {
    text-decoration: none;
  }
  h4 {
    text-align: center;
    padding: 1rem;
  }
`;

export default Searched;
