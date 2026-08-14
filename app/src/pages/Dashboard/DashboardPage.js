import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
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
import DataTable from '../../components/tables/DataTable';
import { AuthContainer as DashboardContainer } from '../../components/AuthLayout';
import tableData from '../../data/mockTableData.json';
import tableHeaders from '../../data/mockTableHeaders.json';

export default function Dashboard(props) {

  return (
    <>
      <CssBaseline enableColorScheme />
      <DashboardContainer direction="column" sx={{ justifyContent: 'space-between' }}>
        <DataTable rowsProp={tableData} headersProp={tableHeaders} />
      </DashboardContainer>
    </>
  );
}