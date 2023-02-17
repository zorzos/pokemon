import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { pokemonSlice } from './slices/pokemonSlice';

const makeStore = () =>
  configureStore({
    reducer: {
      [pokemonSlice.name]: pokemonSlice.reducer
    },
    devTools: true,
  });

export const wrapper = createWrapper(makeStore);