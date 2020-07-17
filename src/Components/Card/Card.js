import React from 'react';
import typeColors from '../../Helpers/typeColor'
import './Card.css';

function Card ({pokemon}){
    return(
        <div className="Card">
            <div className="Card__img">
                <img src={pokemon.sprites.front_default} alt=""/>
                
            </div>
            <div className="Card__name">
              {pokemon.name}

            </div>
            <div className="Card__types">
              {pokemon.types.map(type => {
                  return (
                      <div className="Card__type" style={{backgroundColor: typeColors[type.type.name]}}> 
                           {type.type.name}
                      </div>
                  )
                
              })}

            </div>
            <div className="Card__info">
               <div className="Card__data Card__data--weight">
                  <p className="title">Peso:</p> 
                  <p>{pokemon.weight}</p>
               </div>
               <div className="Card__data Card__data--height">
                  <p className="title">Altura:</p> 
                  <p>{pokemon.height}</p>
               </div>
               <div className="Card__data Card__data--ability">
                  <p className="title">Abilidades:</p> 
                  <p>{pokemon.abilities.map(ability => {
                     return (
                        <p>{ability.ability.name}</p>
                     )
                  })}</p>
               </div>

            </div>
        </div>
        
    )
}

export default Card;