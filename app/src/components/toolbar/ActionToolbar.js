// Action toolbar: action buttons for data operations (add, export, send)
import React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import AddIcon from '@mui/icons-material/Add';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import SendIcon from '@mui/icons-material/Send';

function ActionToolbar() {
  return (
    <div className="action-toolbar">
        <ButtonGroup variant="contained" aria-label="Basic button group">
        <Button startIcon={<AddIcon />}>Add a new record</Button>
        <Button startIcon={<FileDownloadIcon />}>Export data to CSV</Button>
        <Button startIcon={<SendIcon />}>Send via email</Button>
        </ButtonGroup>
    </div>
  );
}

export default ActionToolbar;