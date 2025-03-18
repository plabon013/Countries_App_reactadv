import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CountryState } from "../../types/country";
import { countriesApi } from "../../api/services/countries";
import { RootState } from "../store";

const initialState: CountryState = {
    countries: [],
    loading: false,
    error: null,
    selectedCountry: null,
}

export const fetchAlLCountries = createAsyncThunk('countries/fetchAllCountries', async () => {
    const response = await countriesApi.getAllCountries();
    return response;
})

export const countriesSlice = createSlice ({
    name: 'countries',
    initialState,
    reducers: {
        clearSelectedCountry: (state) => {
            state.selectedCountry = null;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
     builder.addCase(fetchAlLCountries.pending, (state)=> {
        state.loading = true;
     })
     .addCase(fetchAlLCountries.fulfilled, (state, action) => {
        state.loading =false;
        state.countries = action.payload;
     })
     .addCase(fetchAlLCountries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to load countries'
        // we force a type change here in case of the thing is rejected
        // we dont know what we get back, we tell it interpret it as a string
     })
    }

})

export const selectAllCountries = (state: RootState) => state.countries.countries; // its not connected into store.ts - now its connected
export const selCountriesLoading = (state: RootState) => state.countries.loading;
export const selectCountriesError = (state: RootState) => state.countries.error;

export const {clearSelectedCountry} = countriesSlice.actions;
export default countriesSlice.reducer;