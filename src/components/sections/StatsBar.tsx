import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const STATS = [
  { value: '$4,200', label: 'Average Savings Per Deal' },
  { value: '98%', label: 'Client Satisfaction Rate' },
  { value: '3,500+', label: 'Deals Negotiated' },
  { value: '15+', label: 'Years of Experience' },
];

export default function StatsBar() {
  return (
    <Box
      component="section"
      aria-label="Key statistics"
      sx={{ backgroundColor: '#DC2626', py: 4 }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={2} textAlign="center">
          {STATS.map(({ value, label }) => (
            <Grid item key={label} xs={6} md={3}>
              <Typography
                sx={{
                  fontFamily: '"Lexend", sans-serif',
                  fontSize: { xs: '1.75rem', md: '2.25rem' },
                  fontWeight: 700,
                  color: '#fff',
                  lineHeight: 1.1,
                  mb: 0.5,
                }}
              >
                {value}
              </Typography>
              <Typography
                sx={{
                  color: 'rgba(255,255,255,0.85)',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                }}
              >
                {label}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
