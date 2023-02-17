import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { savePokemon, selectPokemon } from '../store/slices/pokemonSlice';
import { 
  getNextPage,
  transformPokemonData
} from '@pokemon/utils';

import { PokemonTable, PokemonModal } from '@pokemon/components'

import * as CONSTANTS from './constants'

export function Index() {
  const dispatch = useDispatch()
  const pokemonState = useSelector(selectPokemon)
  const { pokemon } = pokemonState
  const [currentPokemonId, setCurrentPokemonId] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [totalCount, setTotalCount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [columnWidth, setColumnWidth] = useState(0)
  const [previousPageURL, setPreviousPageURL] = useState('')
  const [nextPageURL, setNextPageURL] = useState('')

  const firstPageURL: string = CONSTANTS.firstPageURL

  const fetchPokemonList = (url: string): void => {
    setIsLoading(true)
    getNextPage(url).then(response => {
      const { count, previous, next, results } = response
      setTotalCount(count)
      setPreviousPageURL(previous)
      setNextPageURL(next)
      dispatch(savePokemon(transformPokemonData(results)))
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
      return pokemon.find((pokemon: any) => pokemon.id === currentPokemonId).url
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
          rows={pokemon}
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
