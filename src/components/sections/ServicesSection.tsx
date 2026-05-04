import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import FadeInUp from '@/components/ui/FadeInUp';

const SERVICES = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M19 17H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h11l3 4v6a2 2 0 0 1-2 2z"/>
        <circle cx="7.5" cy="17.5" r="1.5"/><circle cx="16.5" cy="17.5" r="1.5"/>
      </svg>
    ),
    title: 'New Car Negotiation',
    description:
      'We leverage manufacturer incentives, regional pricing data, and dealer cost information to secure below-MSRP pricing on new vehicles.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ),
    title: 'Used Car Negotiation',
    description:
      'We check market comparables, vehicle history, and true dealer cost to ensure you never pay more than fair market value on a pre-owned car.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/>
        <polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>
      </svg>
    ),
    title: 'Trade-In Valuation',
    description:
      'We independently appraise your trade-in using Kelley Blue Book and auction data so dealers cannot lowball you on your current vehicle.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/>
      </svg>
    ),
    title: 'Lease Optimization',
    description:
      'We negotiate money factors, residual values, and acquisition fees on leases — maximising your monthly value and minimising hidden costs.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: 'Fleet Purchasing',
    description:
      'Buying multiple vehicles for a business? We negotiate fleet discounts and multi-unit deals that dramatically reduce your cost per unit.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 8v4l3 3"/>
      </svg>
    ),
    title: 'Finance Review',
    description:
      'We review dealer financing offers against market rates and flag unnecessary add-ons, saving you thousands over the life of your loan.',
  },
];

export default function ServicesSection() {
  return (
    <Box
      id="services"
      component="section"
      aria-labelledby="services-heading"
      sx={{ backgroundColor: '#E9EDF1', py: { xs: 8, md: 10 } }}
    >
      <Container maxWidth="lg">
        <Box textAlign="center" mb={7}>
          <Typography
            variant="overline"
            sx={{ color: '#DC2626', letterSpacing: '0.1em', fontWeight: 600, fontSize: '0.8125rem' }}
          >
            What We Do
          </Typography>
          <Typography
            id="services-heading"
            variant="h2"
            sx={{ fontWeight: 700, fontSize: { xs: '1.875rem', md: '2.25rem' }, color: '#1E293B', mt: 0.5, mb: 2 }}
          >
            Our Services
          </Typography>
          <Box sx={{ width: 56, height: 4, backgroundColor: '#DC2626', borderRadius: 1, mx: 'auto', mb: 2.5 }} />
          <Typography
            variant="body1"
            sx={{ color: '#64748B', maxWidth: 560, mx: 'auto', lineHeight: 1.75 }}
          >
            Every service is built around one goal — putting more money back in your pocket.
          </Typography>
        </Box>

        <Grid container spacing={3} alignItems="stretch">
          {SERVICES.map(({ icon, title, description }, i) => (
            <Grid item key={title} xs={12} sm={6} lg={4} sx={{ display: 'flex', flexDirection: 'column' }}>
              <FadeInUp delay={i * 0.06} style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <Card sx={{ flex: 1, borderRadius: 3 }}>
                <CardContent sx={{ p: 4 }}>
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: 2,
                      background: 'rgba(220,38,38,0.08)',
                      color: '#DC2626',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 2.5,
                    }}
                  >
                    {icon}
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
