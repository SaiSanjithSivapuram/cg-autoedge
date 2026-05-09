import type { Metadata } from 'next';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import MuiLink from '@mui/material/Link';
import ContactForm from '@/components/forms/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us — Get a Free Car Deal Quote',
  description:
    'Tell us what car you want and our negotiators will secure the best deal. Free quotes, no commitment. Serving buyers nationwide.',
  alternates: { canonical: '/contact' },
};

const CONTACT_DETAILS = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.65 3.27 2 2 0 0 1 3.62 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.64a16 16 0 0 0 5.55 5.55l1.78-1.78a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 14.92z"/>
      </svg>
    ),
    label: 'Phone',
    value: '+1 (800) AUTO-EDGE',
    href: 'tel:+18002886334',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect width="20" height="16" x="2" y="4" rx="2"/>
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
      </svg>
    ),
    label: 'Email',
    value: 'hello@cgautoedge.com',
    href: 'mailto:hello@cgautoedge.com',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    label: 'Hours',
    value: 'Mon–Fri, 9 AM–6 PM EST',
    href: null,
  },
];

export default function ContactPage() {
  return (
    <>
      {/* Page header */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #080C14 0%, #1A2440 100%)',
          pt: { xs: '96px', md: '104px' },
          pb: { xs: 6, md: 7 },
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="overline"
            sx={{ color: '#EF4444', letterSpacing: '0.1em', fontWeight: 600, fontSize: '0.8125rem', display: 'block', mb: 1 }}
          >
            Free Quote
          </Typography>
          <Typography
            variant="h1"
            sx={{
              color: '#fff',
              fontWeight: 700,
              fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.75rem' },
              mb: 1.5,
            }}
          >
            Let&apos;s Find Your Best Deal
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.8)', maxWidth: 520, lineHeight: 1.75 }}>
            Fill in the form and a negotiator will reach out within 24 hours with a personalised strategy — at no cost to you.
          </Typography>
        </Container>
      </Box>

      <Box
        component="section"
        aria-label="Contact form and details"
        sx={{ backgroundColor: '#0D1117', py: { xs: 6, md: 8 } }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={5}>
            {/* Form */}
            <Grid item xs={12} lg={12}>
              <ContactForm />
            </Grid>

            {/* Contact info */}
            <Grid item xs={12} lg={12}>
              <Card sx={{ borderRadius: 3, mb: 3 }}>
                <CardContent sx={{ p: 4 }}>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 700, color: '#F1F5F9', mb: 3, fontSize: '1.125rem' }}
                  >
                    Get in Touch
                  </Typography>

                  {CONTACT_DETAILS.map(({ icon, label, value, href }) => (
                    <Box key={label} sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 3 }}>
                      <Box
                        sx={{
                          width: 44,
                          height: 44,
                          borderRadius: 2,
                          background: 'rgba(239,68,68,0.12)',
                          color: '#EF4444',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        {icon}
                      </Box>
                      <Box>
                        <Typography sx={{ fontSize: '0.8125rem', color: '#94A3B8', fontWeight: 600, mb: 0.25 }}>
                          {label}
                        </Typography>
                        {href ? (
                          <MuiLink
                            href={href}
                            sx={{ color: '#F1F5F9', fontWeight: 500, textDecoration: 'none', '&:hover': { color: '#EF4444' } }}
                          >
                            {value}
                          </MuiLink>
                        ) : (
                          <Typography sx={{ color: '#F1F5F9', fontWeight: 500 }}>{value}</Typography>
                        )}
                      </Box>
                    </Box>
                  ))}
                </CardContent>
              </Card>

              {/* Pricing signal */}
              <Card sx={{ borderRadius: 3, borderLeft: '4px solid #EF4444' }}>
                <CardContent sx={{ p: 3.5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.25 }}>
                    <Box
                      sx={{
                        width: 36,
                        height: 36,
                        borderRadius: 1.5,
                        backgroundColor: 'rgba(239,68,68,0.12)',
                        color: '#EF4444',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <line x1="12" y1="1" x2="12" y2="23" />
                        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                      </svg>
                    </Box>
                    <Typography sx={{ fontFamily: 'var(--font-lexend)', fontWeight: 700, color: '#F1F5F9', fontSize: '1rem' }}>
                      Simple, performance-based pricing.
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ color: '#94A3B8', lineHeight: 1.8, mb: 2 }}>
                    You only pay when we deliver a deal you&apos;re happy with. No upfront fees, no hidden charges — ever.
                  </Typography>
                  <MuiLink
                    href="/pricing"
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 0.75,
                      color: '#EF4444',
                      fontWeight: 600,
                      fontSize: '0.875rem',
                      textDecoration: 'none',
                      fontFamily: 'var(--font-lexend)',
                      '&:hover': { color: '#F87171' },
                      transition: 'color 0.2s',
                    }}
                  >
                    View full pricing details
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M3 7 H11 M7.5 3.5 L11 7 L7.5 10.5" />
                    </svg>
                  </MuiLink>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
