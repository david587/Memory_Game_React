import "./SingleCard.css"

export default function SingleCard({card,handleChoice, flipped, disabled}) {

    const handleClick = ()=>{
      if(!disabled){
        handleChoice(card)
      }
    }

  return (
    <div className="card">
      {/* //if the card not flipped the cover shows
      //if the card flipped show the ficture */}
    <div className={flipped ? "flipped" : ""}>
      <img  className="front" src={card.src} alt="card front"/>
      <img onClick={handleClick} className="back"
        src="/img/cover.png" alt="card back" />
    </div>
  </div>
  )
}
