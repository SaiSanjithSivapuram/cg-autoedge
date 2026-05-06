import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import StarIcon from '@mui/icons-material/Star';

const TESTIMONIALS = [
  {
    quote:
      'I was dreading the dealership. CG AutoEdge handled everything and saved me $3,800 off MSRP on my new SUV. I just showed up to sign and drive.',
    name: 'Marcus T.',
    role: 'Business Owner, Austin TX',
    savings: '$3,800 saved',
  },
  {
    quote:
      'They negotiated my lease down $87/month AND got the dealer to throw in free maintenance for 3 years. The service paid for itself 10x over.',
    name: 'Priya K.',
    role: 'Software Engineer, San Jose CA',
    savings: '$87/mo saved',
  },
  {
    quote:
      'As a first-time buyer I had no idea what I was doing. The team walked me through every step and I ended up $4,500 under sticker price.',
    name: 'James L.',
    role: 'Teacher, Chicago IL',
    savings: '$4,500 saved',
  },
  {
    quote:
      'They reviewed my financing offer and found $2,200 in junk fees I would have never caught. Worth every penny.',
    name: 'Sandra M.',
    role: 'Nurse, Dallas TX',
    savings: '$2,200 saved',
  },
  {
    quote:
      "Fleet of 6 trucks for my construction company — CG AutoEdge got me 11% below invoice across the board. That's thousands per truck.",
    name: 'Dave R.',
    role: 'Contractor, Phoenix AZ',
    savings: '11% below invoice',
  },
  {
    quote:
      'I used three other services before. None came close to the deal AutoEdge delivered. They actually negotiate — not just consult.',
    name: 'Rachel W.',
    role: 'Marketing Director, NYC',
    savings: '$5,100 saved',
  },
];

function StarRating() {
  return (
    <Box sx={{ display: 'flex', gap: 0.25, mb: 2 }} aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon key={i} sx={{ color: '#EF4444', fontSize: '1.125rem' }} aria-hidden="true" />
      ))}
    </Box>
  );
}

export default function TestimonialsSection() {
  return (
    <Box
      id="testimonials"
      component="section"
      aria-labelledby="testimonials-heading"
      sx={{ backgroundColor: '#0D1117', py: { xs: 8, md: 10 } }}
    >
      <Container maxWidth="lg">
        <Box textAlign="center" mb={7}>
          <Typography
            variant="overline"
            sx={{ color: '#EF4444', letterSpacing: '0.1em', fontWeight: 600, fontSize: '0.8125rem' }}
          >
            Real Results
          </Typography>
          <Typography
            id="testimonials-heading"
            variant="h2"
            sx={{ fontWeight: 700, fontSize: { xs: '1.875rem', md: '2.25rem' }, color: '#F1F5F9', mt: 0.5, mb: 2 }}
          >
            What Our Clients Say
          </Typography>
          <Box sx={{ width: 56, height: 4, backgroundColor: '#EF4444', borderRadius: 1, mx: 'auto', mb: 2.5 }} />
          <Typography
            variant="body1"
            sx={{ color: '#94A3B8', maxWidth: 520, mx: 'auto', lineHeight: 1.75 }}
          >
            Over 3,500 happy clients and counting. Here&apos;s what they have to say.
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {TESTIMONIALS.map(({ quote, name, role, savings }) => (
            <Grid item key={name} xs={12} md={6} lg={4}>
              <Card
                component="figure"
                sx={{
                  height: '100%',
                  m: 0,
                  borderRadius: 3,
                  borderLeft: '4px solid #EF4444',
                }}
              >
                <CardContent sx={{ p: 3.5, display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <StarRating />
                  <Typography
                    component="blockquote"
                    variant="body2"
                    sx={{ color: '#CBD5E1', lineHeight: 1.75, flexGrow: 1, mb: 2.5, m: 0 }}
                  >
                    &ldquo;{quote}&rdquo;
                  </Typography>
                  <Box
                    component="figcaption"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      pt: 2,
                      borderTop: '1px solid rgba(255,255,255,0.1)',
                      mt: 'auto',
                    }}
                  >
                    <Box>
                      <Typography
                        sx={{ fontFamily: '"Lexend", sans-serif', fontWeight: 700, fontSize: '0.9375rem', color: '#F1F5F9' }}
                      >
                        {name}
                      </Typography>
                      <Typography sx={{ color: '#94A3B8', fontSize: '0.8125rem' }}>
                        {role}
                      </Typography>
                    </Box>
                    <Chip
                      label={savings}
                      size="small"
                      sx={{
                        backgroundColor: 'rgba(239,68,68,0.15)',
                        color: '#EF4444',
                        fontWeight: 600,
                        fontSize: '0.8rem',
                        height: 26,
                      }}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
