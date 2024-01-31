import { useState, useEffect } from "react";
import { Button } from "../button/Button";

interface CardsPizzaProps {
  pizzas: {
    id: number;
    name: string;
    price: number;
    base: string;
  };
}

export function CardsPizza(props: CardsPizzaProps) {
  const { pizzas } = props;
  const [dataBasket, setDataBasket] = useState([]);
  const [isInBasket, setIsInBasket] = useState(false);
  const upOrDown = ["baskets", "baskets-down"];

  const fetchBasket = () => {
    fetch("http://localhost:5000/baskets")
      .then(async (response) => setDataBasket(await response.json()))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchBasket();
  }, []);
  console.log(isInBasket);
  const filterBasket = dataBasket.map((x) => x.pizza_id);
  const foundInBasket = filterBasket.some((x) => x === pizzas.id);

  const basketUserPost = async () => {
    setIsInBasket(true);
    try {
      const response = await fetch("http://localhost:5000/baskets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: 1,
          pizza_id: pizzas.id,
          namePizza: pizzas.name,
          pricePizza: pizzas.price,
          numberPizza: 1,
        }),
      });

      if (!response.ok) {
        throw new Error("Impossible de rajouter au panier");
      }

      console.log("Object succes!");
    } catch (error) {
      console.error("Erreur", error);
    }
    fetchBasket();
    console.log(fetchBasket());
  };

  const basketUserUpdate = async (index: number) => {
    try {
      const response = await fetch(
        `http://localhost:5000/${upOrDown[index]}/${pizzas.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Impossible de rajouter au panier");
      }

      console.log("Object succes!");
    } catch (error) {
      console.error("Erreur", error);
    }
  };

  const [displayButtonBasket, setDisplayButtonBasket] = useState(
    <Button handleClick={() => basketUserPost()}>Ajouter au panier</Button>
  );
  useEffect(() => {
    if (isInBasket) {
      if (foundInBasket) {
        setDisplayButtonBasket(
          <>
            <Button handleClick={() => basketUserUpdate(1)}>--</Button>
            <Button handleClick={() => basketUserUpdate(0)}>++</Button>
          </>
        );
      }
    } else {
      setDisplayButtonBasket(
        <Button handleClick={() => basketUserPost()}>Ajouter au panier</Button>
      );
    }
  }, [foundInBasket]);

  return (
    <article className="CardsPizza">
      <div>photo</div>
      <aside>
        <h4>ingrédients</h4>
        <ul>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
        </ul>
      </aside>
      <p>prix</p>
      <> {displayButtonBasket}</>
    </article>
  );
}
