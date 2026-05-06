import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MuiLink from '@mui/material/Link';

const SERVICES = [
  'New Car Negotiation',
  'Used Car Negotiation',
  'Trade-In Valuation',
  'Lease Optimization',
  'Fleet Purchasing',
];

const COMPANY = [
  { label: 'About Us', href: '/about' },
  { label: 'How It Works', href: '/#how-it-works' },
  { label: 'Testimonials', href: '/#testimonials' },
  { label: 'FAQ', href: '/#faq' },
  { label: 'Contact', href: '/contact' },
];

const footerLinkSx = {
  color: 'rgba(255,255,255,0.7)',
  fontSize: '0.9rem',
  display: 'block',
  mb: 1,
  textDecoration: 'none',
  transition: 'color 150ms ease',
  '&:hover': { color: '#fff' },
};

const footerHeadingSx = {
  color: '#fff',
  fontFamily: '"Lexend", sans-serif',
  fontWeight: 600,
  fontSize: '0.8125rem',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.08em',
  mb: 2,
};

export default function Footer() {
  return (
    <Box
      component="footer"
      aria-label="Site footer"
      sx={{ backgroundColor: '#080C14', color: 'rgba(255,255,255,0.75)', pt: 7, pb: 4 }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} pb={5} sx={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          {/* Brand */}
          <Grid item xs={12} lg={4}>
            <Typography
              sx={{ color: '#fff', fontFamily: '"Lexend", sans-serif', fontWeight: 700, fontSize: '1.25rem', mb: 1.5 }}
            >
              CG{' '}
              <Box component="span" sx={{ color: '#EF4444' }}>
                AutoEdge
              </Box>
            </Typography>
            <Typography sx={{ fontSize: '0.9375rem', lineHeight: 1.75, mb: 2.5, color: 'rgba(255,255,255,0.72)' }}>
              We negotiate car deals on your behalf so you get the best price, every time. No stress, no pressure tactics — just results.
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
              <MuiLink href="tel:+18002886334" sx={footerLinkSx}>+1 (800) AUTO-EDGE</MuiLink>
              <MuiLink href="mailto:hello@cgautoedge.com" sx={footerLinkSx}>hello@cgautoedge.com</MuiLink>
            </Box>
          </Grid>

          {/* Services */}
          <Grid item xs={6} sm={4} lg={2}>
            <Typography sx={footerHeadingSx}>Services</Typography>
            {SERVICES.map((s) => (
              <MuiLink key={s} href="/contact" sx={footerLinkSx}>
                {s}
              </MuiLink>
            ))}
          </Grid>

          {/* Company */}
          <Grid item xs={6} sm={4} lg={2}>
            <Typography sx={footerHeadingSx}>Company</Typography>
            {COMPANY.map(({ label, href }) => (
              <MuiLink key={href} href={href} sx={footerLinkSx}>
                {label}
              </MuiLink>
            ))}
          </Grid>

          {/* CTA */}
          <Grid item xs={12} sm={4} lg={4}>
            <Typography sx={footerHeadingSx}>Start Saving Today</Typography>
            <Typography sx={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.72)', lineHeight: 1.75, mb: 2.5 }}>
              Tell us what car you want and we&apos;ll negotiate the best deal on your behalf — for free.
            </Typography>
            <Button href="/contact" variant="contained" color="secondary" sx={{ px: 3 }}>
              Get a Free Quote
            </Button>
          </Grid>
        </Grid>

        <Box
          sx={{
            pt: 3,
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { md: 'center' },
            justifyContent: 'space-between',
            gap: 1.5,
          }}
        >
          <Typography sx={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.5)' }}>
            &copy; {new Date().getFullYear()} CG AutoEdge. All rights reserved.
          </Typography>
          <Box sx={{ display: 'flex', gap: 3 }}>
            <MuiLink href="/privacy-policy" sx={{ ...footerLinkSx, mb: 0, fontSize: '0.875rem' }}>
              Privacy Policy
            </MuiLink>
            <MuiLink href="/terms" sx={{ ...footerLinkSx, mb: 0, fontSize: '0.875rem' }}>
              Terms of Service
            </MuiLink>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
