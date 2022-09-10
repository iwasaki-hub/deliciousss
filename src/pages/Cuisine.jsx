import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";

const Cuisine = () => {
  const [cuisine, setCuisine] = useState([]);
  let params = useParams();

  useEffect(() => {
    getCuisine(params.type);
  }, [params.type]);

  const getCuisine = async (cuisineName) => {
    const check = localStorage.getItem(cuisineName);

    if (check) {
      setCuisine(JSON.parse(check));
    } else {
      const url = "https://api.spoonacular.com/recipes/complexSearch";
      const apiKey = process.env.REACT_APP_API_KEY;
      const res = await fetch(`${url}?apiKey=${apiKey}&cuisine=${cuisineName}`);
      const data = await res.json();
      localStorage.setItem(cuisineName, JSON.stringify(data.results));
      setCuisine(data.results);
    }
  };

  return (
    <Grid
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {cuisine.length > 0 &&
        cuisine.map((item) => {
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

const Grid = styled(motion.div)`
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

export default Cuisine;
