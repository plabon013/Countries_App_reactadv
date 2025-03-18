import { Alert, Box, CircularProgress, Typography } from "@mui/material";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  fetchTestData,
  selectTestData,
  selectTestError,
} from "../store/slices/testSlice";
import { DynamicTable } from "./DynamicTable";

export const TestData = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectTestData);
  const error = useAppSelector(selectTestError);

  useEffect(() => {
    console.log("🔄 Dispatching fetchTestData...");
    dispatch(fetchTestData());
  }, [dispatch]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h2" gutterBottom>
        Test Data
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        Status: {error ? "❌ Error" : data.length > 0 ? "✅ Connected" : "⏳ Loading..."} | Last Updated: {" "}
        {new Date().toLocaleString()}
      </Typography>

      {/* ✅ Display Loading Indicator */}
      {data.length === 0 && !error && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <CircularProgress />
        </Box>
      )}

      {/* ❌ Display Error Message */}
      {error && (
        <Box sx={{ mt: 2 }}>
          <Alert severity="error">Error: {error}</Alert>
        </Box>
      )}

      {/* ✅ Render Data Table */}
      {Array.isArray(data) && data.length > 0 ? (
        <DynamicTable data={data} />
      ) : (
        !error && data.length === 0 && (
          <Typography variant="body1" color="text.secondary">
            No data available.
          </Typography>
        )
      )}
    </Box>
  );
};