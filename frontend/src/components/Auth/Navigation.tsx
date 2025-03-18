// navigation
import { AppBar, Button, Toolbar } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { Link as RouterLink } from "react-router-dom";
import { Lock } from "@mui/icons-material";

export const Navigation = () => {
  const { user, signOut } = useAuth();

  return (
    <AppBar position="static" sx={{ mb: 3 }}>
      <Toolbar>
        <Button color="inherit" component={RouterLink} to="/">
          Home
        </Button>
        <Button color="inherit" component={RouterLink} to="/test">
          Test
        </Button>
        <Button
          color="inherit"
          component={RouterLink}
          to="/protected"
          startIcon={<Lock />}
        >
          ProtectedData
        </Button>

        {user ? (
          <Button color="inherit" onClick={signOut}>
            Logout
          </Button>
        ) : (
          <Button color="inherit" component={RouterLink} to="/login">
            Login
          </Button>
        )}

        <Button color="inherit" component={RouterLink} to="/countries">
          All Countries
        </Button>
      </Toolbar>
    </AppBar>
  );
};
