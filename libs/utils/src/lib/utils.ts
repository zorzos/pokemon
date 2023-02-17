import axios from 'axios';

const getNextPage = async (url: string): Promise<any> => {
  const response = await axios.get(url)
  return response.data
}

const getPokemon = async (url: string): Promise<any> => {
  const response = await axios.get(url)
  return response.data
}

const capitalise = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

const transformPokemonData = (pokeapiData: any[]): any[] => {
  return pokeapiData.map((pokemon: any) => {
    const urlComponents = pokemon.url.split('/')
    const id = urlComponents[urlComponents.length - 2]
    return {
      id,
      name: capitalise(pokemon.name),
      url: pokemon.url
    }
  })
}

export {
  capitalise,
  getNextPage,
  getPokemon,
  transformPokemonData
}