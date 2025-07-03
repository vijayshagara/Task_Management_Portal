import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/authSlice';
import { useAuth } from '../../hooks/useAuth';

const Header = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Task Management Portal
        </Typography>
        {user && (
          <>
            <Typography variant="subtitle1" sx={{ mr: 2 }}>
              Welcome, {user.name} ({user.role})
            </Typography>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;