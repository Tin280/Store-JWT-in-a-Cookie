import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const storedJwt = localStorage.getItem("token");
  const [jwt, setJwt] = useState(storedJwt || null);
  const [foods, setFoods] = useState([]);
  const [fetchError, setFetchError] = useState(null);

  const getJwt = async () => {
    const { data } = await axios.get(`/jwt`); // Use relative URL
    setJwt(data.token);
  };

  const getFoods = async () => {
    try {
      const { data } = await axios.get(`/foods`); // Use relative URL
      setFoods(data);
      setFetchError(null);
    } catch (err) {
      setFetchError(err.message);
    }
  };

  return (
    <>
      <section style={{ marginBottom: "10px" }}>
        <button onClick={() => getJwt()}>Get JWT</button>
        {jwt && (
          <pre>
            <code>{jwt}</code>
          </pre>
        )}
      </section>
      <section>
        <button onClick={() => getFoods()}>Get Foods</button>
        <ul>
          {foods.map((food, i) => (
            <li key={i}>{food.description}</li>
          ))}
        </ul>
        {fetchError && <p style={{ color: "red" }}>{fetchError}</p>}
      </section>
    </>
  );
}

export default App;
