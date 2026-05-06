import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function CtaSection() {
  return (
    <Box
      component="section"
      aria-labelledby="cta-heading"
      sx={{
        background: 'linear-gradient(135deg, #080C14 0%, #1A2440 100%)',
        py: { xs: 8, md: 10 },
      }}
    >
      <Container maxWidth="md">
        <Box textAlign="center">
          <Typography
            id="cta-heading"
            variant="h2"
            sx={{
              fontWeight: 700,
              fontSize: { xs: '1.875rem', md: '2.5rem' },
              color: '#fff',
              mb: 2.5,
            }}
          >
            Ready to Stop Overpaying?
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'rgba(255,255,255,0.82)',
              lineHeight: 1.8,
              mb: 5,
              fontSize: '1.0625rem',
              maxWidth: 560,
              mx: 'auto',
            }}
          >
            Join 3,500+ buyers who let us negotiate for them. Get your free quote in
            under 2 minutes — no commitment required.
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
            <Button href="/contact" variant="contained" color="secondary" size="large">
              Get a Free Quote
            </Button>
            <Button
              href="tel:+18002886334"
              variant="outlined"
              size="large"
              sx={{
                borderColor: 'rgba(255,255,255,0.65)',
                color: '#fff',
                '&:hover': {
                  borderColor: '#fff',
                  backgroundColor: 'rgba(255,255,255,0.08)',
                },
              }}
            >
              Call Us Now
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
