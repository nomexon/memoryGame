import { useState, useEffect } from "react";

import GameCard from "./components/GameCard";
import "./App.css";

const arr = [
  { open: false, path: "/img/scroll-1.png" },
  { open: false, path: "/img/helmet-1.png" },
  { open: false, path: "/img/potion-1.png" },
  { open: false, path: "/img/ring-1.png" },
  { open: false, path: "/img/shield-1.png" },
  { open: false, path: "/img/sword-1.png" },
];
function randArr(params) {
  let res = [];
  let n = [...params, ...params];

  for (let i = 0; i < n.length; ) {
    function getRandomArbitrary(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    }
    let num = getRandomArbitrary(0, n.length);

    res.push({ ...n[num], id: Math.random() });
    n.splice([num], 1);
  }

  return res;
}
function App() {
  const [field, setField] = useState([]);
  const [start, setStart] = useState(false);
  const [count, setCount] = useState(0);
  const [firstCard, setFirstCard] = useState(null);
  const [secondCard, setSecondCard] = useState(null);
  const [disable, setDisable] = useState(false);

  function shuffleArr() {
    setField(randArr(arr));
    setStart(true);
    setCount(0);
    setFirstCard(null);
    setSecondCard(null);
  }

  function turn() {
    setCount((prev) => prev + 1);
    setFirstCard(null);
    setSecondCard(null);
  }

  function clickCard(card) {
    // если true значит disable активен
    if (card !== true) {
      if (firstCard) {
        //Проверка на нажатие одной и тойже карты
        if (firstCard.id !== card.id) {
          setSecondCard(card);
        }
      } else {
        setFirstCard(card);
      }
    }
  }
  useEffect(() => {
    // если есть 2 карты начинаем проверку и отключаем возможность кликать еще
    if (firstCard && secondCard) {
      setDisable(true);
      if (firstCard.path === secondCard.path) {
        // если совпадене меняем поле обекта open на true
        setField(
          field.map((item) => {
            if (item.id === firstCard.id || item.id === secondCard.id) {
              return { ...item, open: true };
            } else {
              return item;
            }
          })
        );
        setDisable(false);
        turn();
      } else {
        // при не совпадение ждем 1000 перед добавлением хода
        setTimeout(() => {
          turn();
          setDisable(false);
        }, 1000);
      }
    }
  }, [secondCard]);
  return (
    <div className="App">
      <h1 className="appHeader">Magic Match</h1>
      {start === false ? (
        <button className="btn" onClick={() => shuffleArr()}>
          Новая игра
        </button>
      ) : (
        <button className="btn" onClick={() => shuffleArr()}>
          Начать с начала
        </button>
      )}

      <div className="cards">
        {start === true
          ? field.map((item) => {
              return (
                <GameCard
                  key={item.id}
                  opened={
                    item === firstCard || item === secondCard || item.open
                  }
                  card={item}
                  disable={disable}
                  clickCard={clickCard}
                />
              );
            })
          : undefined}
      </div>
      {start === true ? <h2 className="count">Ходов: {count}</h2> : undefined}
    </div>
  );
}

export default App;
