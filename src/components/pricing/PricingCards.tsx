'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import NextLink from 'next/link';

// ─── Icons ────────────────────────────────────────────────────────────────────

function PhoneIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.65 3.27 2 2 0 0 1 3.62 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.64a16 16 0 0 0 5.55 5.55l1.78-1.78a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 14.92z" />
    </svg>
  );
}

function SearchCarIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="10" cy="10" r="7" />
      <path d="m21 21-4.35-4.35" />
      <path d="M7 10h6" />
      <path d="M10 7v6" />
    </svg>
  );
}

function TrophyIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2z" />
    </svg>
  );
}

function CheckIcon({ color }: { color: string }) {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true" style={{ flexShrink: 0, marginTop: 2 }}>
      <path d="M2.5 7.5 L6 11 L12.5 4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const TIERS = [
  {
    id: 'consultation',
    badge: 'Always Free',
    accent: '#4ADE80',
    accentBg: 'rgba(22,163,74,0.10)',
    accentBadgeBg: 'rgba(22,163,74,0.12)',
    accentBadgeBorder: 'rgba(22,163,74,0.28)',
    Icon: PhoneIcon,
    title: 'Consultation Call',
    priceMain: '$0',
    priceSub: 'First 10 minutes',
    priceNote: '$50 / additional 30 min',
    highlight: false,
    description: 'Start here. Get complete clarity on how we work before committing a single dollar.',
    features: [
      'Understand your vehicle goals & budget',
      'Walk through our negotiation process',
      'Market conditions overview',
      'Honest answers to all your questions',
    ],
    ctaLabel: 'Book Free Call',
  },
  {
    id: 'analysis',
    badge: 'Most Popular',
    accent: '#DC2626',
    accentBg: 'rgba(220,38,38,0.08)',
    accentBadgeBg: 'rgba(220,38,38,0.14)',
    accentBadgeBorder: 'rgba(220,38,38,0.32)',
    Icon: SearchCarIcon,
    title: 'Vehicle Deep-Dive',
    priceMain: '$100',
    priceSub: 'One-time flat fee',
    priceNote: null,
    highlight: true,
    description: 'Full market intelligence so we walk into every negotiation fully armed.',
    features: [
      'Live market price comparison report',
      'Dealer invoice & factory incentives',
      'Trim, option & spec verification',
      'VIN history check (pre-owned)',
      'Comparable recent sales analysis',
    ],
    ctaLabel: 'Get Started',
  },
  {
    id: 'success',
    badge: 'Performance-Based',
    accent: '#94A3B8',
    accentBg: 'rgba(148,163,184,0.06)',
    accentBadgeBg: 'rgba(148,163,184,0.08)',
    accentBadgeBorder: 'rgba(148,163,184,0.2)',
    Icon: TrophyIcon,
    title: 'Deal Success Fee',
    priceMain: '1%',
    priceSub: 'of final negotiated price',
    priceNote: 'Only charged when you accept',
    highlight: false,
    description: 'We win when you win. No deal accepted — no fee charged, ever.',
    features: [
      'Applied only on accepted deals',
      'Zero fee if we can\'t beat your offer',
      'Covers every round of negotiation',
      'Avg. client savings: 3–7% off MSRP',
      'Post-deal paperwork review included',
    ],
    ctaLabel: 'See How It Works',
  },
] as const;

// ─── Component ────────────────────────────────────────────────────────────────

export default function PricingCards() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px 0px' });

  return (
    <Box sx={{ backgroundColor: '#0D1117', py: { xs: 8, md: 10 } }}>
      <Container maxWidth="lg">

        {/* Section label */}
        <Box ref={ref} sx={{ textAlign: 'center', mb: 7 }}>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <Typography variant="overline" sx={{ color: '#DC2626', letterSpacing: '0.12em', fontWeight: 700, fontSize: '0.7rem', display: 'block', mb: 1.5 }}>
              What You Pay
            </Typography>
            <Typography variant="h2" sx={{ color: '#F1F5F9', fontWeight: 800, fontFamily: 'var(--font-lexend)', fontSize: { xs: '1.75rem', md: '2.25rem' }, mb: 2 }}>
              Three clear charges. Zero surprises.
            </Typography>
            <Typography sx={{ color: '#64748B', maxWidth: 480, mx: 'auto', lineHeight: 1.8, fontSize: '0.9375rem' }}>
              Most clients pay only a success fee. Every other charge is optional and always disclosed upfront.
            </Typography>
          </motion.div>
        </Box>

        {/* Cards */}
        <Grid container spacing={3} alignItems="stretch">
          {TIERS.map((tier, i) => (
            <Grid item xs={12} md={4} key={tier.id} sx={{ display: 'flex' }}>
              <motion.div
                initial={{ opacity: 0, y: 36 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.52, delay: 0.1 + i * 0.13, ease: [0.22, 1, 0.36, 1] }}
                style={{ width: '100%', display: 'flex' }}
              >
                <motion.div
                  whileHover={{ y: -8, transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] } }}
                  style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 18,
                    border: tier.highlight ? `2px solid ${tier.accent}` : '1px solid rgba(51,65,85,0.55)',
                    backgroundColor: tier.highlight ? tier.accentBg : 'rgba(15,23,42,0.55)',
                    padding: 32,
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {/* Glow for highlighted card */}
                  {tier.highlight && (
                    <Box sx={{
                      position: 'absolute', inset: 0,
                      background: `radial-gradient(ellipse at 50% 0%, ${tier.accentBg} 0%, transparent 65%)`,
                      pointerEvents: 'none', borderRadius: 'inherit',
                    }} />
                  )}

                  {/* Badge */}
                  <Box sx={{
                    display: 'inline-flex', alignItems: 'center', width: 'fit-content',
                    px: 1.5, py: '4px', mb: 3.5, borderRadius: '20px',
                    backgroundColor: tier.accentBadgeBg,
                    border: `1px solid ${tier.accentBadgeBorder}`,
                  }}>
                    <Typography sx={{ fontSize: '0.65rem', fontWeight: 700, color: tier.accent, fontFamily: 'var(--font-lexend)', letterSpacing: '0.09em', textTransform: 'uppercase' }}>
                      {tier.badge}
                    </Typography>
                  </Box>

                  {/* Icon */}
                  <Box sx={{
                    width: 54, height: 54, borderRadius: 2.5, mb: 3,
                    backgroundColor: `${tier.accentBg}`,
                    border: `1px solid ${tier.accentBadgeBorder}`,
                    color: tier.accent,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <tier.Icon />
                  </Box>

                  {/* Title */}
                  <Typography sx={{ color: '#F1F5F9', fontWeight: 700, fontSize: '1.0625rem', fontFamily: 'var(--font-lexend)', mb: 2.5 }}>
                    {tier.title}
                  </Typography>

                  {/* Price block */}
                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.5 }}>
                      <Typography sx={{ color: '#F1F5F9', fontWeight: 800, fontSize: '2.75rem', fontFamily: 'var(--font-lexend)', lineHeight: 1, letterSpacing: '-0.02em' }}>
                        {tier.priceMain}
                      </Typography>
                    </Box>
                    <Typography sx={{ color: '#64748B', fontSize: '0.875rem', mt: 0.75 }}>
                      {tier.priceSub}
                    </Typography>
                    {tier.priceNote && (
                      <Typography sx={{ color: '#475569', fontSize: '0.8rem', mt: 0.5 }}>
                        {tier.priceNote}
                      </Typography>
                    )}
                  </Box>

                  {/* Divider */}
                  <Box sx={{ height: '1px', backgroundColor: 'rgba(51,65,85,0.4)', mb: 2.5 }} />

                  {/* Description */}
                  <Typography sx={{ color: '#64748B', fontSize: '0.875rem', lineHeight: 1.75, mb: 3 }}>
                    {tier.description}
                  </Typography>

                  {/* Features */}
                  <Box sx={{ flex: 1, mb: 4 }}>
                    {tier.features.map((f, fi) => (
                      <Box key={fi} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.25, mb: 1.25 }}>
                        <CheckIcon color={tier.accent} />
                        <Typography sx={{ color: '#94A3B8', fontSize: '0.875rem', lineHeight: 1.65 }}>
                          {f}
                        </Typography>
                      </Box>
                    ))}
                  </Box>

                  {/* CTA */}
                  <Button
                    component={NextLink}
                    href="/contact"
                    variant={tier.highlight ? 'contained' : 'outlined'}
                    fullWidth
                    sx={{
                      ...(tier.highlight
                        ? { backgroundColor: '#DC2626', '&:hover': { backgroundColor: '#B91C1C' } }
                        : { borderColor: 'rgba(51,65,85,0.65)', color: '#64748B', '&:hover': { borderColor: tier.accent, color: '#F1F5F9', backgroundColor: `${tier.accentBg}` } }
                      ),
                      fontFamily: 'var(--font-lexend)', fontWeight: 600, py: 1.3,
                      transition: 'all 0.22s',
                    }}
                  >
                    {tier.ctaLabel}
                  </Button>
                </motion.div>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
