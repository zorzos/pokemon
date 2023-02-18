import React, { useEffect, useState } from 'react';
import { GridColDef } from '@mui/x-data-grid/models';
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

  const fetchPokemonList = async (url: string): Promise<any> => {
    setIsLoading(true)
    await getNextPage(url).then(response => {
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

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'Pokemon #', width: columnWidth / 7 },
    { field: 'name', headerName: 'Name', width: columnWidth / 3 },
    { field: 'url', headerName: 'URL', width: columnWidth / 3 },
  ]

  useEffect(() => {
    fetchPokemonList(firstPageURL)
    setColumnWidth(Math.floor(window.innerWidth / 10) * 10)
  }, [])

  useEffect(() => {
    if (currentPokemonId) setIsModalOpen(true)
  }, [currentPokemonId])

  return (
    <div className="pokemon-table-container">
        <PokemonTable
          autoHeight
          columns={columns}
          loading={isLoading}
          navigate={navigate}
          rows={pokemon}
          setCurrentPokemonId={setCurrentPokemonId}
          totalCount={totalCount}
        />
        <PokemonModal
          closeModal={() => closeModal()}
          open={isModalOpen}
          pokemonURL={getCurrentPokemonURL()}
        />
    </div>
  );
}

export default Index;
