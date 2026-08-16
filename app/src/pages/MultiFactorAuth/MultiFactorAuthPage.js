import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import AppTheme from '../../theme/AppTheme';
import { validateMfa } from '../../utils/inputValidation';

export default function MultiFactorAuth(props) {
  const [mfaError, setMfaError] = React.useState(false);
  const [mfaErrorMessage, setMfaErrorMessage] = React.useState('');
  const [resend, setResend] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const handleResend = () => {
    setResend(true);
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
    event.preventDefault();
    setLoading(false);
    navigate('/dashboard');
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
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <Stack className="auth-container" direction="column">
        <Card className="auth-card" variant="outlined">
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
              loading={loading}
              loadingPosition="start"
              variant="contained"
              onClick={handleSubmit}
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
      </Stack>
    </AppTheme>
  );
}