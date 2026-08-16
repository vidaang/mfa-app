// App header: top app bar with search and logout
import React from 'react'
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'
import InputBase from '@mui/material/InputBase';
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import LogoutIcon from '@mui/icons-material/Logout'
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom'
import { clearCurrentUser } from '../utils/userStore'
import { gray } from '../theme/themePrimitives';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

function Header() {
	const navigate = useNavigate()

	const handleLogout = () => {
		try {
			clearCurrentUser();
		} finally {
			navigate('/');
		}
	}

	return (
		<AppBar 
			position="sticky" 
			sx={{ 
				top: 0, 
				zIndex: (theme) => theme.zIndex.appBar,
			}}
		>
			<Toolbar
						sx={{ 
				backgroundColor: gray[900]
			}}
			>
				<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
					MFA Read & Write
				</Typography>
				<Box sx={{ flexGrow: 1 }} />
          		<Box sx={{ display: { xs: 'none', md: 'flex' } }}>
					<Search>
						<SearchIconWrapper>
						<SearchIcon />
						</SearchIconWrapper>
						<StyledInputBase
						placeholder="Search…"
						inputProps={{ 'aria-label': 'search' }}
						/>
					</Search>
					<Button
						color="inherit"
						onClick={handleLogout}
						startIcon={<LogoutIcon />}
					>
						Log out
					</Button>
				</Box>
			</Toolbar>
		</AppBar>
	)
}

export default Header;

