import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const Recipe = () => {
  let params = useParams();
  const [details, setDetails] = useState({});
  const [activeTab, setActiveTab] = useState("instructions");

  useEffect(() => {
    fetchDetails();
  }, [params.name]);

  const fetchDetails = async () => {
    const check = localStorage.getItem(params.name);

    if (check) {
      setDetails(JSON.parse(check));
      console.log("already existed");
    } else {
      const url = "https://api.spoonacular.com/recipes";
      const recipeId = params.name;
      const apiKey = process.env.REACT_APP_API_KEY;
      const res = await fetch(
        `${url}/${recipeId}/information?apiKey=${apiKey}`
      );
      const data = await res.json();
      localStorage.setItem(params.name, JSON.stringify(data));
      setDetails(data);
      console.log("restore");
    }
  };

  return (
    <DetailWrapper>
      <div>
        <h2>{details.title}</h2>
        <img src={details.image} alt={details.title} />
      </div>
      <Info>
        <Button
          className={activeTab === "instructions" ? "active" : ""}
          onClick={() => setActiveTab("instructions")}
        >
          Instructions
        </Button>
        <Button
          className={activeTab === "ingredients" ? "active" : ""}
          onClick={() => setActiveTab("ingredients")}
        >
          Ingredients
        </Button>
        {activeTab === "instructions" && (
          <div>
            <h3 dangerouslySetInnerHTML={{ __html: details.summary }}></h3>
            <h3 dangerouslySetInnerHTML={{ __html: details.instructions }}></h3>
          </div>
        )}

        {activeTab === "ingredients" && (
          <ul>
            {details?.extendedIngredients ? (
              details.extendedIngredients.map((ingredient) => (
                <li key={ingredient.id}>{ingredient.original}</li>
              ))
            ) : (
              <></>
            )}
          </ul>
        )}
      </Info>
    </DetailWrapper>
  );
};

const DetailWrapper = styled.div`
  margin-top: 10rem;
  margin-bottom: 5rem;
  display: flex;
  .active {
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
  }
  h2 {
    margin-bottom: 2rem;
  }
  li {
    font-size: 1.2rem;
    line-height: 2.5rem;
  }
  ul {
    margin-top: 2rem;
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  color: #313131;
  background: white;
  border: 2px solid black;
  margin-right: 2rem;
  font-weight: 600;
`;

const Info = styled.div`
  margin-left: 10rem;
`;

export default Recipe;
