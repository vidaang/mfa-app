import * as React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import AppTheme from '../../theme/AppTheme';
import ForgotPassword from '../../components/dialog-box/ForgotPassword';
import { GoogleIcon, FacebookIcon } from '../../components/icons/CustomIcons';
import { validateEmail, validatePassword, validateSignIn } from '../../utils/inputValidation';
import { setCurrentUserByEmail } from '../../utils/userStore';


export default function Login(props) {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const isValid = validateInputs();
    if (!isValid) {
      event.preventDefault();
      setLoading(false);
      return;
    }

    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const emailVal = email?.value || '';
    const passwordVal = password?.value || '';

    const signIn = validateSignIn(emailVal, passwordVal);
    if (!signIn.valid) {
      event.preventDefault();
      if (signIn.field === 'email') {
        setEmailError(true);
        setEmailErrorMessage(signIn.message);
      } else {
        setPasswordError(true);
        setPasswordErrorMessage(signIn.message);
      }
      setLoading(false);
      return;
    }
    event.preventDefault();
    setCurrentUserByEmail(emailVal);
    navigate('/mfa');
    setLoading(false);
  };

  const validateInputs = () => {
    const email = document.getElementById('email');
    const password = document.getElementById('password');

    const emailVal = email?.value || '';
    const passwordVal = password?.value || '';

    const emailRes = validateEmail(emailVal);
    if (!emailRes.valid) {
      setEmailError(true);
      setEmailErrorMessage(emailRes.message);
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    const passRes = validatePassword(passwordVal);
    if (!passRes.valid) {
      setPasswordError(true);
      setPasswordErrorMessage(passRes.message);
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    return emailRes.valid && passRes.valid;
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <Stack className="auth-container" direction="column" sx={{ justifyContent: 'space-between' }}>
        <Card className="auth-card" variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
          >
            Login
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gap: 2,
            }}
          >
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                error={emailError}
                helperText={emailErrorMessage}
                id="email"
                type="email"
                name="email"
                placeholder="your@email.com"
                autoComplete="email"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={emailError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                error={passwordError}
                helperText={passwordErrorMessage}
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="current-password"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={passwordError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <ForgotPassword open={open} handleClose={handleClose} />
            <Button
              type="submit"
              fullWidth
              loading={loading}
              loadingPosition="start"
              variant="contained"
            >
              Login
            </Button>
            <Link
              component="button"
              type="button"
              onClick={handleClickOpen}
              variant="body2"
              sx={{ alignSelf: 'center' }}
            >
              Forgot your password?
            </Link>
          </Box>
          <Divider>or</Divider>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => alert('Login with Google')}
              startIcon={<GoogleIcon />}
            >
              Login with Google
            </Button>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => alert('Login with Facebook')}
              startIcon={<FacebookIcon />}
            >
              Login with Facebook
            </Button>
            <Typography sx={{ textAlign: 'center' }}>
              Don&apos;t have an account?{' '}
              <Link
                component={RouterLink} 
                to="/signup"
                variant="body2"
                sx={{ alignSelf: 'center' }}
              >
                Sign up
              </Link>
            </Typography>
          </Box>
        </Card>
      </Stack>
    </AppTheme>
  );
}