import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import FadeInUp from '@/components/ui/FadeInUp';

const STEPS = [
  {
    number: '1',
    title: 'Tell Us What You Want',
    description:
      'Fill out a quick form with the make, model, and any preferences. No commitment required — it takes under 2 minutes.',
  },
  {
    number: '2',
    title: 'We Research & Strategize',
    description:
      'Our team analyses market data, dealer incentives, and fair-market pricing to build a negotiation strategy tailored to your deal.',
  },
  {
    number: '3',
    title: 'We Negotiate on Your Behalf',
    description:
      'We contact dealerships, present counter-offers, and handle all back-and-forth until we lock in the best possible price.',
  },
  {
    number: '4',
    title: 'You Drive Away Happy',
    description:
      'We present the final offer with a full breakdown. You approve, sign, and pick up your car — simple as that.',
  },
];

export default function HowItWorksSection() {
  return (
    <Box
      id="how-it-works"
      component="section"
      aria-labelledby="how-it-works-heading"
      sx={{ backgroundColor: '#F8FAFC', py: { xs: 8, md: 10 } }}
    >
      <Container maxWidth="lg">
        <Box textAlign="center" mb={7}>
          <Typography
            variant="overline"
            sx={{ color: '#DC2626', letterSpacing: '0.1em', fontWeight: 600, fontSize: '0.8125rem' }}
          >
            Simple Process
          </Typography>
          <Typography
            id="how-it-works-heading"
            variant="h2"
            sx={{ fontWeight: 700, fontSize: { xs: '1.875rem', md: '2.25rem' }, color: '#1E293B', mt: 0.5, mb: 2 }}
          >
            How It Works
          </Typography>
          <Box sx={{ width: 56, height: 4, backgroundColor: '#DC2626', borderRadius: 1, mx: 'auto', mb: 2.5 }} />
          <Typography
            variant="body1"
            sx={{ color: '#64748B', maxWidth: 560, mx: 'auto', lineHeight: 1.75 }}
          >
            Four straightforward steps stand between you and the best price on your next car.
          </Typography>
        </Box>

        <Grid container spacing={3} alignItems="stretch">
          {STEPS.map(({ number, title, description }, i) => (
            <Grid item key={number} xs={12} sm={6} lg={3} sx={{ display: 'flex', flexDirection: 'column' }}>
              <FadeInUp delay={i * 0.08} style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <Card sx={{ flex: 1, borderRadius: 3 }}>
                <CardContent sx={{ p: 4 }}>
                  <Box
                    aria-hidden="true"
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: '50%',
                      backgroundColor: '#DC2626',
                      color: '#fff',
                      fontFamily: '"Lexend", sans-serif',
                      fontWeight: 700,
                      fontSize: '1.25rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 2.5,
                      flexShrink: 0,
                    }}
                  >
                    {number}
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 700, fontSize: '1.0625rem', color: '#1E293B', mb: 1.5 }}
                  >
                    {title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#64748B', lineHeight: 1.75 }}>
                    {description}
                  </Typography>
                </CardContent>
              </Card>
              </FadeInUp>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
