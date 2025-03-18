import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supabase } from "../../config/supabase"; // Ensure correct import
import type { TestState } from "../../types/test";
import type { RootState } from "../store";

const initialState: TestState = {
  data: [],
  error: null,
};

// 🔄 Fetch Data from Supabase
export const fetchTestData = createAsyncThunk<
  any, // Changed to allow flexibility
  void,
  { rejectValue: string }
>("test/fetchTestData", async (_, { rejectWithValue }) => {
  try {
    console.log("🔄 Fetching test data from Supabase...");

    // ✅ Fetching from the correct table (protected_data)
    let { data, error } = await supabase.from("protected_data").select("*");

    if (error) {
      console.error("❌ Supabase Fetch Error:", error.message);
      return rejectWithValue(error.message);
    }

    console.log("✅ Fetched Data:", data);
    return data; // Fixed incorrect return type
  } catch (err) {
    console.error("❌ Fetch Error:", err);
    return rejectWithValue("Failed to fetch test data");
  }
});

const testSlice = createSlice({
  name: "test",
  initialState,
  reducers: {
    clearTestData: (state) => {
      state.data = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTestData.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchTestData.fulfilled, (state, action) => {
        state.data = action.payload; // ✅ Corrected response handling
        state.error = null;
      })
      .addCase(fetchTestData.rejected, (state, action) => {
        state.error = action.payload || "An error occurred";
      });
  },
});

// 🔥 Selectors
export const selectTestData = (state: RootState) => state.test.data;
export const selectTestError = (state: RootState) => state.test.error;

export const { clearTestData } = testSlice.actions;
export default testSlice.reducer;
