// Small summary cards used on the dashboard (total employees, departments, etc.)
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const cards = [
  {
    id: 1,
    title: 'Total Employees',
    description: '8',
  },
  {
    id: 2,
    title: 'Total Departments',
    description: '3',
  },
  {
    id: 3,
    title: 'Age Range',
    description: '25 - 32',
  },
  {
    id: 4,
    title: 'Median Salary',
    description: '$100,000',
  },
];

function CardGroup() {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(min(200px, 100%), 1fr))',
        gap: 2,
      }}
    >
      {cards.map((card, index) => (
        <Card key={card.id}>
            <CardContent sx={{ height: '100%' }}>
                <Typography variant="h5" component="div">
                {card.description}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {card.title}
                </Typography>
            </CardContent>
        </Card>
      ))}
    </Box>
  );
}

export default CardGroup;