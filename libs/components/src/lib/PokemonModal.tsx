import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

import {
    PokemonModalDetails,
    PokemonModalProps
 } from './types';
import { capitalise, getPokemon } from '@pokemon/utils';
import { DialogContent, DialogContentText } from '@mui/material';

function PokemonModal(props: PokemonModalProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [pokemonDetails, setPokemonDetails] = useState<PokemonModalDetails>({
        abilities: [],
        baseEXP: 0,
        id: '',
        image: '',
        name: '',
        stats: [],
        types: [],
    })

    const {
        open, closeModal, pokemonURL
    } = props

    const fetchPokemon = async (url: string): Promise<void> => {
        setIsLoading(true)
        await getPokemon(url).then(response => {
            const {
                abilities,
                base_experience,
                id,
                name,
                sprites,
                stats,
                types
            } = response
            const pokemonResponseDetails: PokemonModalDetails = {
                abilities: abilities.map((abilityItem: any) => capitalise(abilityItem.ability.name)),
                baseEXP: base_experience,
                id: id,
                image: sprites.front_default,
                name: capitalise(name),
                stats: stats.map((statItem: any) => {
                    return {
                        name: capitalise(statItem.stat.name),
                        base_stat: statItem.base_stat
                    }
                }),
                types: types.map((typeItem: any) => capitalise(typeItem.type.name))
            }
            setPokemonDetails(pokemonResponseDetails)
        })
        setIsLoading(false)
    }

    useEffect(() => {
        if (open) fetchPokemon(pokemonURL)
    }, [open])

    const renderContent = () => {
        const modalContent = isLoading ?
            <DialogContent dividers>
                <CircularProgress />
            </DialogContent> :
            <>
                <DialogTitle>{`#${pokemonDetails.id} ${pokemonDetails.name}`}</DialogTitle>
                <DialogContent dividers>
                    <img src={pokemonDetails.image} alt={pokemonDetails.name} />
                    <DialogContentText>Base EXP: {pokemonDetails.baseEXP}</DialogContentText>
                    <DialogContentText>Type(s): {pokemonDetails.types.toString()}</DialogContentText>
                    <DialogContentText>Abilities: {pokemonDetails.abilities.toString()}</DialogContentText>
                    <DialogContentText>
                        <div>
                            Base stats:
                            <ul>
                                {pokemonDetails.stats.map((stat) => {
                                    return <li>{`${stat.name}: ${stat.base_stat}`}</li>
                                })}
                            </ul>
                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeModal}>Close</Button>
                </DialogActions>
            </>
        
        return (
            <Dialog
                onClose={closeModal} 
                open={open}
            >
                {modalContent}
            </Dialog>
        )
    }

    return (
        renderContent()
    )
}

export default PokemonModal