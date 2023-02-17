import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

import { capitalise, getPokemon } from '@pokemon/utils';
import { DialogContent, DialogContentText } from '@mui/material';

interface PokemonModalProps {
    open: boolean;
    closeModal(): void;
    pokemonURL: string;
}

interface PokemonBaseStats {
    name: string;
    base_stat: number;
}

interface PokemonModalDetails {
    id: string;
    name: string;
    image: string;
    types: string[];
    stats: PokemonBaseStats[];
    baseEXP: number;
    abilities: string[];
}

function PokemonModal(props: PokemonModalProps) {
    const [isLoading, setIsLoading] = useState(true)
    const [pokemonDetails, setPokemonDetails] = useState<PokemonModalDetails>({
        id: '',
        name: '',
        image: '',
        types: [],
        baseEXP: 0,
        abilities: [],
        stats: []
    })

    const {
        open, closeModal, pokemonURL
    } = props

    const fetchPokemon = (url: string): void => {
        setIsLoading(true)
        getPokemon(url).then(response => {
            const {
                abilities,
                id,
                name,
                sprites,
                types,
                base_experience,
                stats
            } = response
            const pokemonResponseDetails: PokemonModalDetails = {
                id: id,
                name: capitalise(name),
                image: sprites.front_default,
                types: types.map((typeItem: any) => capitalise(typeItem.type.name)),
                baseEXP: base_experience,
                abilities: abilities.map((abilityItem: any) => capitalise(abilityItem.ability.name)),
                stats: stats.map((statItem: any) => {
                    return {
                        name: capitalise(statItem.stat.name),
                        base_stat: statItem.base_stat
                    }
                })
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
            <CircularProgress /> :
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
                open={open}
                onClose={closeModal} 
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