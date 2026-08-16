import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import AppTheme from '../../theme/AppTheme';
import Header from '../../components/Header'
import CardGroup from '../../components/card/CardGroup';
import ActionToolbar from '../../components/toolbar/ActionToolbar';
import { canWrite } from '../../utils/roleAccess';
import { getCurrentUser } from '../../utils/userStore';
import DataTable from '../../components/tables/DataTable';
import tableData from '../../data/mockTableData.json';
import tableHeaders from '../../data/mockTableHeaders.json';

export default function Dashboard(props) {
  const [hasWriteAccess, setHasWriteAccess] = React.useState(false);

  React.useEffect(() => {
    const current = getCurrentUser();
    const allowed = canWrite(current?.email);
    setHasWriteAccess(allowed);
  }, []);

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <Header />
      <Stack className="dashboard-container" direction="column" spacing={2}>
        <Typography variant="h4">
          Employee Dashboard
        </Typography>
        <Typography variant="body1">
          View and manage employee data.
        </Typography>
        <Typography variant="h6">
          Summary
        </Typography>
        <CardGroup spacing={3}/>
        <Typography variant="h6">
          Data
        </Typography>
        {hasWriteAccess && <ActionToolbar />}
        <DataTable rowsProp={tableData} headersProp={tableHeaders} canEdit={hasWriteAccess} />
      </Stack>
    </AppTheme>
  );
}