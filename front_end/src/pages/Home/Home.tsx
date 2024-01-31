import { useState, useEffect } from "react";
import { CardsPizza } from "../../components/CardsPizza/CardsPizza";

export function Home() {
  const [pizzaData, setPizzaData] = useState([]);
  

  useEffect(() => {
    fetch("http://localhost:5000/pizzas")
      .then(async (response) => setPizzaData(await response.json()))
      .catch((err) => console.error(err));
  }, []);

  return (
    <main className="Home">
      {pizzaData.map((pizza, index) => (
        <CardsPizza key={index} pizzas={pizza} />
      ))}
    </main>
  );
}
