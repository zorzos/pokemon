import { GridColDef, GridRowsProp } from '@mui/x-data-grid/models';

export interface PokemonModalProps {
    closeModal(): void;
    open: boolean;
    pokemonURL: string;
}

interface PokemonBaseStats {
    base_stat: number;
    name: string;
}

export interface PokemonModalDetails {
    abilities: string[];
    baseEXP: number;
    id: string;
    image: string;
    name: string;
    stats: PokemonBaseStats[];
    types: string[];
}

export interface PokemonTableProps {
    autoHeight: boolean;
    columns: GridColDef[],
    loading: boolean;
    navigate(direction: string): void;
    rows: GridRowsProp[],
    setCurrentPokemonId(id: number): void;
    totalCount: number;
}