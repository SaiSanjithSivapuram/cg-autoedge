import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';

export default function HeroSection() {
  return (
    <Box
      component="section"
      aria-label="Hero"
      sx={{
        background: 'linear-gradient(135deg, #0F172A 0%, #334155 100%)',
        minHeight: '90dvh',
        display: 'flex',
        alignItems: 'center',
        pt: { xs: '80px', md: '88px' },
        pb: { xs: 8, md: 10 },
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          background: "url('/hero-pattern.svg') center/cover no-repeat",
          opacity: 0.05,
          pointerEvents: 'none',
        },
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} lg={6}>
            <Typography
              variant="overline"
              sx={{
                color: '#DC2626',
                letterSpacing: '0.1em',
                fontWeight: 600,
                fontSize: '0.8125rem',
                display: 'block',
                mb: 1.5,
              }}
            >
              Professional Car Deal Negotiation
            </Typography>

            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2.25rem', sm: '2.75rem', md: '3.25rem' },
                fontWeight: 700,
                color: '#fff',
                lineHeight: 1.15,
                mb: 3,
              }}
            >
              Stop Overpaying.{' '}
              <Box component="br" sx={{ display: { xs: 'none', sm: 'block' } }} />
              <Box component="span" sx={{ color: '#DC2626' }}>
                We Negotiate.
              </Box>{' '}
              You Save.
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: 'rgba(255,255,255,0.82)',
                lineHeight: 1.8,
                maxWidth: 520,
                mb: 5,
                fontSize: '1.0625rem',
              }}
            >
              CG AutoEdge puts expert negotiators in your corner. We handle
              every conversation with dealerships so you get the best possible
              price — without the stress.
            </Typography>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              <Button

                href="/contact"
                variant="contained"
                color="secondary"
                size="large"
              >
                Get a Free Quote
              </Button>
              <Button

                href="/#how-it-works"
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
                See How It Works
              </Button>
            </Box>
          </Grid>

          <Grid item xs={12} lg={6} sx={{ display: { xs: 'none', lg: 'flex' }, justifyContent: 'flex-end', alignItems: 'center' }}>
            <Box sx={{ width: '100%', maxWidth: 440, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              {/* Savings stats row */}
              <Box
                sx={{
                  borderRadius: 3,
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  backdropFilter: 'blur(8px)',
                  p: 3,
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 2,
                }}
              >
                {[
                  { value: '$4,200', label: 'Avg. savings per deal' },
                  { value: '3,500+', label: 'Deals negotiated' },
                  { value: '98%', label: 'Client satisfaction' },
                  { value: '24–72h', label: 'Typical turnaround' },
                ].map(({ value, label }) => (
                  <Box key={label}>
                    <Typography
                      sx={{
                        fontFamily: 'var(--font-lexend), "Lexend", sans-serif',
                        fontWeight: 700,
                        fontSize: '1.5rem',
                        color: '#DC2626',
                        lineHeight: 1.1,
                        fontVariantNumeric: 'tabular-nums',
                      }}
                    >
                      {value}
                    </Typography>
                    <Typography sx={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.8125rem', mt: 0.25 }}>
                      {label}
                    </Typography>
                  </Box>
                ))}
              </Box>

              {/* Social proof quote */}
              <Box
                component="figure"
                sx={{
                  m: 0,
                  borderRadius: 3,
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  backdropFilter: 'blur(8px)',
                  p: 3,
                  borderLeft: '4px solid #DC2626',
                }}
              >
                <Typography
                  component="blockquote"
                  sx={{ m: 0, color: 'rgba(255,255,255,0.88)', lineHeight: 1.7, fontSize: '0.9375rem', mb: 2 }}
                >
                  &ldquo;CG AutoEdge saved me $3,800 off MSRP. I just showed up to sign and drive.&rdquo;
                </Typography>
                <Box component="figcaption" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8125rem' }}>
                    Marcus T. — Business Owner, Austin TX
                  </Typography>
                  <Chip
                    label="$3,800 saved"
                    size="small"
                    sx={{ backgroundColor: 'rgba(220,38,38,0.2)', color: '#FCA5A5', fontWeight: 600, fontSize: '0.75rem', height: 24 }}
                  />
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
