import React, { useEffect, useState } from 'react';
import { 
  getNextPage,
  getPokemon,
  transformPokemonData
} from '@pokemon/utils';

import { PokemonTable, PokemonModal } from '@pokemon/components'

import * as CONSTANTS from './constants'

export function Index() {
  const [currentPokemonId, setCurrentPokemonId] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [totalCount, setTotalCount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [columnWidth, setColumnWidth] = useState(0)
  const [previousPageURL, setPreviousPageURL] = useState('')
  const [nextPageURL, setNextPageURL] = useState('')
  const [pokemonList, setPokemonList] = useState([])

  const firstPageURL: string = CONSTANTS.firstPageURL

  const fetchPokemonList = (url: string): void => {
    setIsLoading(true)
    getNextPage(url).then(response => {
      const { count, previous, next, results } = response
      setTotalCount(count)
      setPreviousPageURL(previous)
      setNextPageURL(next)
      setPokemonList(transformPokemonData(results))
    })
    setIsLoading(false)
  }

  const navigate = (direction: string): void => {
    if (direction === 'next') fetchPokemonList(nextPageURL)
    else fetchPokemonList(previousPageURL)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setCurrentPokemonId(0)
  }

  const getCurrentPokemonURL = () => {
    if (currentPokemonId) {
      return pokemonList.find((pokemon: any) => pokemon.id === currentPokemonId).url
    } else return ''
  }

  useEffect(() => {
    fetchPokemonList(firstPageURL)
    setColumnWidth(Math.floor(window.innerWidth / 10) * 10)
  }, [])

  useEffect(() => {
    if (currentPokemonId) {
      setIsModalOpen(true)
    }
  }, [currentPokemonId])

  return (
    <div className="pokemon-table-container">
        <PokemonTable
          totalCount={totalCount}
          navigate={navigate}
          loading={isLoading}
          autoHeight
          rows={pokemonList}
          columnWidth={columnWidth}
          setCurrentPokemonId={setCurrentPokemonId}
        />
        <PokemonModal
          open={isModalOpen}
          closeModal={() => closeModal()}
          pokemonURL={getCurrentPokemonURL()}
        />
    </div>
  );
}

export default Index;
