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
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import { validateMfa } from '../../utils/inputValidation';
import { AuthCard as Card, AuthContainer as MultiFactorAuthContainer } from '../../components/AuthLayout';

export default function MultiFactorAuth(props) {
  const [mfaError, setMfaError] = React.useState(false);
  const [mfaErrorMessage, setMfaErrorMessage] = React.useState('');
  const [resend, setResend] = React.useState(false);
  const navigate = useNavigate();

  const handleResend = () => {
    setResend(true);
  };

  const handleSubmit = (event) => {
    const isValid = validateInputs();
    if (!isValid) {
      event.preventDefault();
      return;
    }
    event.preventDefault();
    navigate('/dashboard');
    const data = new FormData(event.currentTarget);
  };

  const validateInputs = () => {
    const mfa = document.getElementById('mfa');

    const mfaVal = mfa?.value || '';

    const mfaRes = validateMfa(mfaVal);
    if (!mfaRes.valid) {
      setMfaError(true);
      setMfaErrorMessage(mfaRes.message);
    } else {
      setMfaError(false);
      setMfaErrorMessage('');
    }

    return mfaRes.valid;
  };

  return (
    <>
      <CssBaseline enableColorScheme />
      <MultiFactorAuthContainer direction="column">
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
          >
            MFA
          </Typography>

          <p style={{ fontSize: '1rem' }}>
            We've sent a 6-digit code to your email. Please enter it below to verify your identity.
          </p>
          <p style={{ fontSize: '0.9rem', color: resend ? 'green' : 'inherit' }}>
            {resend ? 'A new code has been sent to your email!' : 'If you did not receive the code, click "Resend Code".'}
          </p>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gap: 2,
            }}
          >
            <FormControl>
              <FormLabel htmlFor="mfa">Enter Code</FormLabel>
              <TextField
                error={mfaError}
                helperText={mfaErrorMessage}
                id="mfa"
                type="mfa"
                name="mfa"
                placeholder="XXXXXX"
                autoComplete="mfa"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={mfaError ? 'error' : 'primary'}
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={validateInputs}
            >
              Verify
            </Button>
            <Link
              component="button"
              type="button"
              onClick={handleResend}
              variant="body2"
              sx={{ alignSelf: 'center' }}
            >
              Resend Code
            </Link>
          </Box>
        </Card>
      </MultiFactorAuthContainer>
    </>
  );
}