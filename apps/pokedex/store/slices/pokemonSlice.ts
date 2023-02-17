import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    pokemon: []
};

export const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    savePokemon: (state, action) => {
        state.pokemon = action.payload;
    },
  },
});

export const { savePokemon } = pokemonSlice.actions;
export const selectPokemon = (state) => state.pokemon;
export default pokemonSlice.reducer;