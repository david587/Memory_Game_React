import './App.css';
import {useEffect, useState} from "react"
import SingleCard from './components/SingleCard'

//add matched propety to cards
const cardImages = [
  {"src": "/img/helmet-1.png",matched: false},
  {"src": "/img/potion-1.png",matched: false},
  {"src": "/img/ring-1.png",matched: false},
  {"src": "/img/scroll-1.png",matched: false},
  {"src": "/img/shield-1.png",matched: false},
  {"src": "/img/sword-1.png",matched: false}
] 

function App() {
  const [cards, setCards] = useState([]) //state for the card
  const [turns,setTurns] = useState(0) //state for the turns
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

  //shuffle card->when we press new game
  //Double the array and sort it randomly,add a id attribute
  const shuffleCards = ()=>{
    //now we have 12cards, duplication done
    const shuffledCards = [...cardImages,...cardImages]
    //sometimes its gonna be a posotive number , sometmes it will be a positive num
    //when negativ items will remain same order, when positive it will switch the order around
    //we will have a shuffled array
      .sort(()=> Math.random() - 0.5)
    //we add id to all cards
      .map((card)=>({...card , id: Math.random() }))

    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)
  }

  //handle choice
  //if we click the img-> get the card src 
  const handleChoice =(card) =>{
    //if it doesent have a value we update choice 1
    //if it have updatechoice 2
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  //compare 2 selected cards
  //if we update choices it fire the useEffect
  //we check  choces values, if there is a value
  //check if the match: if they match update card.src matched:true
  useEffect(()=>{
    if(choiceOne && choiceTwo){
      setDisabled(true)
      if(choiceOne.src === choiceTwo.src){
        ///update setcards state
        setCards(prevCards => {
          return prevCards.map(card => {
            if(card.src === choiceOne.src){
              // itt gonna return the new object with matched true propety
              return {...card, matched: true}
            }
            else {
              return card
            }
          })
        })
        resetTurn()
      }
      else{
       //set a timeout, dont reset instantly
        setTimeout(() =>resetTurn(),1000)
      }
    }
  },[choiceOne, choiceTwo])
  
  console.log(cards);

  //reset choices & increasing turn
  const resetTurn= () =>{
    setDisabled(false)
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
  }

  //Start the game automatically
  useEffect(()=>{
    shuffleCards()
  },[])

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
    
      <div className="card-grid">
      {cards.map(card =>(
        <SingleCard 
        key={card.id}
        card={card}
        handleChoice={handleChoice}
        //these will be true or false
        flipped ={card === choiceOne || card === choiceTwo || card.matched}
        disabled={disabled}
        />
      ))}
      </div>
      <p>Turns: {turns }</p>
    </div>
  );
}

export default App;
