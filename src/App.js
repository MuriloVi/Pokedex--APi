import React from 'react';
import logo from './logo.svg';
import './App.css';

//components
import Card from './Components/Card/Card'

//code use
import { getAllPokemon, getPokemon } from './services/pokemon'
import {useState, useEffect} from 'react'

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [nextURL, setNextURL] = useState('');
  const [prevURL, setPrevURL] = useState('');
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('')
  const [filteredPokemons, setFilteredPokemons] =useState([])
  const initialURL = 'https://pokeapi.co/api/v2/pokemon';

  useEffect(()=>{
     async function fetchData (){
       let response = await getAllPokemon(initialURL)
       console.log(response)
       setNextURL(response.next)
       setPrevURL(response.prevURL)
       await loadingPokemon(response.results)
       setLoading(false)

     }
     fetchData()
  }, [])
useEffect(()=>{
  setFilteredPokemons(
    pokemonData.filter(pokemon =>{
      return pokemon.name.toLowerCase().includes( search.toLowerCase())
    })
  )
},[search, pokemonData])
  const next = async () => {
     setLoading(true)
     let data = await getAllPokemon(nextURL)
     await loadingPokemon(data.results)
     setNextURL(data.next)
     setPrevURL(data.previous)
     setLoading(false)

  }
  const prev = async () => {
    if (!prevURL) return;
    setLoading(true)
    let data = await getAllPokemon(prevURL)
    await loadingPokemon(data.results)
    setNextURL(data.next)
    setPrevURL(data.previous)
    setLoading(false)

 }

  const loadingPokemon =  async (data) => {
    let _pokemonData = await Promise.all(data.map(async pokemon => {
      let pokemonRecord = await getPokemon(pokemon.url)
      return pokemonRecord
    }))
    setPokemonData(_pokemonData)
  }

 
  
  return (
    <div >
      <div className="Pokedex">Pokedex</div>
      <div className="input-box">
        <input placeholder="Procure um pokemon..." onChange={e => setSearch(e.target.value)}></input>
        
      </div>
      {loading ? <h1 style={{textAlign:'center'}}>Loading...</h1> : (
      <>
      <div className="btn">
        <button onClick={prev}>Anterior</button>
        <button onClick={next}>Próximo</button>
      </div>
      <div className="grid-container">
        {filteredPokemons.map((pokemon, i) =>{
          return <Card key={i} pokemon={pokemon}/>
        })}
      </div>
      </>
      )}
    </div>
  );
}

export default App;
