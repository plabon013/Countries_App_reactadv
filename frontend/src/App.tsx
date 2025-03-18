import { Box } from "@mui/material";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { TestData } from "./components/TestData";
import { Login } from "./components/Auth/Login";
import { ProtectedRoute } from "./components/Auth/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import { Navigation } from "./components/Auth/Navigation";
import { ProtectedTestData } from "./components/Auth/ProtectedTestData";
import { AuthRedirect } from "./components/Auth/AuthRedirect";
import CountryDetail from "./components/Countries/CountryDetail";
import CountriesList from "./components/Countries/CountriesList";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Box>
          <Navigation />
          <Box sx={{ p: 3 }}>
            <Routes>
              <Route
                path="/login"
                element={
                  <>
                    <AuthRedirect />
                    <Login />
                  </>
                }
              />
              <Route path="/test" element={<TestData />} />
              <Route
                path="/protected"
                element={
                  <ProtectedRoute>
                    <ProtectedTestData />
                  </ProtectedRoute>
                }
              />
              <Route path="/" element={<div>Home is here</div>} />;
              <Route path="/countries" element={<CountriesList />} />;
              <Route path="/country/:name" element={<CountryDetail />} />;
            </Routes>
          </Box>
        </Box>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
