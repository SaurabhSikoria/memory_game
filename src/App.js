import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import Card from "./Components/Card";

const memoryCards = [
  { src: "/img/cartoon-tired-bald-man.jpg", flipped: false },
  { src: "/img/potion-1.png", flipped: false },
  { src: "/img/ring-1.png", flipped: false },
  { src: "/img/scroll-1.png", flipped: false },
  { src: "/img/shield-1.png", flipped: false },
  { src: "/img/sword-1.png", flipped: false },
];

const App = () => {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [firstGuess, setFirstGuess] = useState(null);
  const [secondGuess, setSecondGuess] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const shuffleCards = () => {
    const shuffledCards = [...memoryCards, ...memoryCards]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setFirstGuess(null);
    setSecondGuess(null);
    setCards(shuffledCards);
    setTurns(0);
  };

  const handleCard = (card) => {
    if (!disabled) firstGuess ? setSecondGuess(card) : setFirstGuess(card);
  };

  useEffect(() => {
    if (firstGuess && secondGuess) {
      setDisabled(true);
      if (firstGuess.src === secondGuess.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === firstGuess.src) {
              return { ...card, flipped: true };
            } else return card;
          });
        });
        resetGuess();
        console.log("success");
      } else {
        setTimeout(() => {
          resetGuess();
          console.log("failed");
        }, 1000);
      }
    }
  }, [firstGuess, secondGuess]);

  useEffect(() => {
    shuffleCards();
  }, []);

  const resetGuess = () => {
    setFirstGuess(null);
    setSecondGuess(null);
    setTurns((prev) => prev + 1);
    setDisabled(false);
  };

  return (
    <div className="App">
      <div className="container mt-5">
        <div className="jumbotron text-center">
          <h1 className="game-head display-1">Magic game</h1>
          <button className="btn btn-primary mt-4" onClick={shuffleCards}>
            New Game
          </button>
          <h1 className="mt-2">No. of turns : {turns}</h1>
        </div>
        <div className="card-grid row row-cols-1 row-cols-md-4 g-4 m-2">
          {cards.map((card) => (
            <Card
              key={card.id}
              card={card}
              isflipped={
                card.flipped || card === firstGuess || card === secondGuess
              }
              handleCard={handleCard}
              disabled={disabled}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
