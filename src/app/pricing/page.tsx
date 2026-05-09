import type { Metadata } from 'next';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import FadeInUp from '@/components/ui/FadeInUp';
import PricingCards from '@/components/pricing/PricingCards';

export const metadata: Metadata = {
  title: 'Pricing — CG AutoEdge',
  description:
    'Transparent, performance-based pricing. Free 10-minute consultation, optional $100 vehicle analysis, and a 1% success fee only when you accept a deal.',
  alternates: { canonical: '/pricing' },
};

// ─── Cost Example data ────────────────────────────────────────────────────────

const EXAMPLE_VEHICLE = {
  label: '2025 Toyota RAV4 XLE',
  msrp: 36_500,
  negotiatedPrice: 34_200,
};

const exampleFee = Math.round(EXAMPLE_VEHICLE.negotiatedPrice * 0.01);
const exampleTotal = 100 + exampleFee;
const exampleSavingsLow = Math.round(EXAMPLE_VEHICLE.msrp * 0.03);
const exampleSavingsHigh = Math.round(EXAMPLE_VEHICLE.msrp * 0.07);
const exampleNetLow = exampleSavingsLow - exampleTotal;
const exampleNetHigh = exampleSavingsHigh - exampleTotal;

function fmt(n: number) {
  return '$' + n.toLocaleString('en-US');
}

// ─── FAQ data ─────────────────────────────────────────────────────────────────

const FAQ = [
  {
    q: 'Is the consultation really free?',
    a: 'Yes — the first 10 minutes of your call are completely free, no card required. If you need more time to go deeper on your situation, we charge $50 per additional 30-minute block, agreed in advance.',
  },
  {
    q: 'Do I have to buy the Vehicle Deep-Dive?',
    a: 'No. It\'s entirely optional. That said, we strongly recommend it for any vehicle over $25,000 or any pre-owned purchase, where price variance is highest and the $100 investment pays back many times over.',
  },
  {
    q: 'When exactly is the 1% success fee charged?',
    a: 'Only after you\'ve reviewed and accepted the final deal we secured. If you decline the offer — or if we can\'t beat your current offer — no success fee is charged. You\'ll never be surprised by a bill.',
  },
  {
    q: 'What does "final negotiated price" mean?',
    a: 'It\'s the total pre-tax purchase price of the vehicle as agreed with the dealer. Taxes, registration, and any dealer add-ons you independently choose are not included in the base we calculate the fee from.',
  },
  {
    q: 'Are there any other fees?',
    a: 'No. Consultation overage ($50 / 30 min), Vehicle Analysis ($100 flat), and the 1% success fee are the only three charges that can ever apply. We confirm the expected fee with you before any work begins.',
  },
];

// ─── How it Works steps ───────────────────────────────────────────────────────

const HOW_STEPS = [
  {
    num: '01',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.65 3.27 2 2 0 0 1 3.62 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.64a16 16 0 0 0 5.55 5.55l1.78-1.78a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 14.92z" />
      </svg>
    ),
    title: 'Free Call',
    desc: 'Book a no-obligation consultation. First 10 min on us.',
    cost: '$0',
    costColor: '#4ADE80',
  },
  {
    num: '02',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="10" cy="10" r="7" /><path d="m21 21-4.35-4.35" /><path d="M10 7v6" /><path d="M7 10h6" />
      </svg>
    ),
    title: 'Vehicle Analysis',
    desc: 'We research the market, the dealer, and the deal.',
    cost: '$100',
    costColor: '#DC2626',
  },
  {
    num: '03',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M9 12l2 2 4-4" /><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
      </svg>
    ),
    title: 'We Negotiate',
    desc: 'Our team goes to work. Multiple rounds if needed.',
    cost: 'Included',
    costColor: '#94A3B8',
  },
  {
    num: '04',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
        <path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
        <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" /><path d="M18 2H6v7a6 6 0 0 0 12 0V2z" />
      </svg>
    ),
    title: 'You Accept',
    desc: '1% success fee only when you say yes to the deal.',
    cost: '1% only on yes',
    costColor: '#DC2626',
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PricingPage() {
  return (
    <>
      {/* ── Hero ── */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #080C14 0%, #1A2440 100%)',
          pt: { xs: '96px', md: '108px' },
          pb: { xs: 7, md: 9 },
        }}
      >
        <Container maxWidth="lg">
          <FadeInUp>
            <Typography
              variant="overline"
              sx={{ color: '#EF4444', letterSpacing: '0.12em', fontWeight: 700, fontSize: '0.75rem', display: 'block', mb: 1.5 }}
            >
              Transparent Pricing
            </Typography>
          </FadeInUp>
          <FadeInUp delay={0.08}>
            <Typography
              variant="h1"
              sx={{ color: '#fff', fontWeight: 800, fontFamily: 'var(--font-lexend)', fontSize: { xs: '2rem', sm: '2.5rem', md: '3.25rem' }, lineHeight: 1.1, mb: 2, maxWidth: 620 }}
            >
              You only pay<br />for results.
            </Typography>
          </FadeInUp>
          <FadeInUp delay={0.14}>
            <Typography sx={{ color: 'rgba(255,255,255,0.65)', maxWidth: 500, lineHeight: 1.8, fontSize: { xs: '1rem', md: '1.0625rem' } }}>
              Every charge is disclosed upfront. Most clients pay a single 1% fee — only after they accept a deal they&apos;re happy with.
            </Typography>
          </FadeInUp>
        </Container>
      </Box>

      {/* ── Pricing Cards ── */}
      <PricingCards />

      {/* ── How the Charges Flow ── */}
      <Box component="section" aria-labelledby="how-charges-heading" sx={{ backgroundColor: '#080C14', py: { xs: 8, md: 10 } }}>
        <Container maxWidth="lg">
          <FadeInUp>
            <Typography id="how-charges-heading" variant="overline" sx={{ color: '#DC2626', letterSpacing: '0.12em', fontWeight: 700, fontSize: '0.7rem', display: 'block', mb: 1.5, textAlign: 'center' }}>
              The Flow
            </Typography>
            <Typography variant="h2" sx={{ color: '#F1F5F9', fontWeight: 800, fontFamily: 'var(--font-lexend)', fontSize: { xs: '1.6rem', md: '2rem' }, textAlign: 'center', mb: 2 }}>
              How the charges work
            </Typography>
            <Typography sx={{ color: '#64748B', textAlign: 'center', maxWidth: 440, mx: 'auto', lineHeight: 1.8, mb: 7 }}>
              Each step only applies if you choose to proceed. You&apos;re in control at every stage.
            </Typography>
          </FadeInUp>

          <Grid container spacing={{ xs: 2, md: 0 }} alignItems="stretch">
            {HOW_STEPS.map((s, i) => (
              <Grid item xs={12} sm={6} md={3} key={s.num}>
                <FadeInUp delay={i * 0.1}>
                  <Box sx={{
                    height: '100%',
                    p: 3.5,
                    borderRadius: { xs: 2.5, md: 0 },
                    borderTop: { xs: 'none', md: `2px solid ${i === 0 ? '#4ADE80' : i === 1 ? '#DC2626' : i === 2 ? '#334155' : '#DC2626'}` },
                    borderLeft: i > 0 ? { xs: 'none', md: '1px solid rgba(51,65,85,0.3)' } : 'none',
                    backgroundColor: { xs: 'rgba(15,23,42,0.5)', md: 'transparent' },
                    border: { xs: '1px solid rgba(51,65,85,0.4)', md: 'none' },
                    borderTopColor: { md: i === 0 ? '#4ADE80' : i === 1 ? '#DC2626' : i === 2 ? '#334155' : '#DC2626' },
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                      <Typography sx={{ color: '#1E293B', fontWeight: 800, fontSize: '1.5rem', fontFamily: 'var(--font-lexend)', lineHeight: 1, WebkitTextStroke: '1px rgba(51,65,85,0.6)' }}>
                        {s.num}
                      </Typography>
                      <Box sx={{ color: '#475569' }}>{s.icon}</Box>
                    </Box>
                    <Typography sx={{ color: '#F1F5F9', fontWeight: 700, fontFamily: 'var(--font-lexend)', fontSize: '1rem', mb: 0.75 }}>
                      {s.title}
                    </Typography>
                    <Typography sx={{ color: '#64748B', fontSize: '0.875rem', lineHeight: 1.7, mb: 2 }}>
                      {s.desc}
                    </Typography>
                    <Typography sx={{ color: s.costColor, fontWeight: 700, fontFamily: 'var(--font-lexend)', fontSize: '0.875rem' }}>
                      {s.cost}
                    </Typography>
                  </Box>
                </FadeInUp>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ── Cost Example ── */}
      <Box component="section" aria-labelledby="example-heading" sx={{ backgroundColor: '#0D1117', py: { xs: 8, md: 10 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={5}>
              <FadeInUp>
                <Typography id="example-heading" variant="overline" sx={{ color: '#DC2626', letterSpacing: '0.12em', fontWeight: 700, fontSize: '0.7rem', display: 'block', mb: 1.5 }}>
                  Real-World Example
                </Typography>
                <Typography variant="h2" sx={{ color: '#F1F5F9', fontWeight: 800, fontFamily: 'var(--font-lexend)', fontSize: { xs: '1.6rem', md: '2rem' }, mb: 2, lineHeight: 1.2 }}>
                  What does it actually cost?
                </Typography>
                <Typography sx={{ color: '#64748B', lineHeight: 1.8, mb: 3, fontSize: '0.9375rem' }}>
                  Here&apos;s a realistic breakdown for a{' '}
                  <Box component="span" sx={{ color: '#94A3B8', fontWeight: 600 }}>{EXAMPLE_VEHICLE.label}</Box>{' '}
                  at {fmt(EXAMPLE_VEHICLE.msrp)} MSRP — one of our most common requests.
                </Typography>
                <Box sx={{ p: 2.5, borderRadius: 2, backgroundColor: 'rgba(22,163,74,0.07)', border: '1px solid rgba(22,163,74,0.2)' }}>
                  <Typography sx={{ color: '#4ADE80', fontSize: '0.8125rem', lineHeight: 1.75 }}>
                    <Box component="span" sx={{ fontWeight: 700 }}>Net benefit: </Box>
                    {fmt(exampleNetLow)}–{fmt(exampleNetHigh)} back in your pocket after all fees.
                  </Typography>
                </Box>
              </FadeInUp>
            </Grid>

            <Grid item xs={12} md={7}>
              <FadeInUp delay={0.1}>
                <Box sx={{
                  borderRadius: 3, overflow: 'hidden',
                  border: '1px solid rgba(51,65,85,0.5)',
                  backgroundColor: 'rgba(15,23,42,0.6)',
                }}>
                  {/* Header */}
                  <Box sx={{ px: 4, py: 3, borderBottom: '1px solid rgba(51,65,85,0.4)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography sx={{ color: '#F1F5F9', fontWeight: 700, fontFamily: 'var(--font-lexend)', fontSize: '0.9375rem' }}>
                      {EXAMPLE_VEHICLE.label}
                    </Typography>
                    <Box sx={{ px: 1.5, py: 0.5, borderRadius: 6, backgroundColor: 'rgba(220,38,38,0.12)', border: '1px solid rgba(220,38,38,0.25)' }}>
                      <Typography sx={{ color: '#F87171', fontSize: '0.7rem', fontWeight: 700, fontFamily: 'var(--font-lexend)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                        Sample
                      </Typography>
                    </Box>
                  </Box>

                  {/* Line items */}
                  {[
                    { label: 'Consultation Call', sub: 'First 10 min free', value: '$0', valueColor: '#4ADE80' },
                    { label: 'Vehicle Deep-Dive', sub: 'One-time flat fee', value: '$100', valueColor: '#F1F5F9' },
                    { label: 'Success Fee (1%)', sub: `1% × ${fmt(EXAMPLE_VEHICLE.negotiatedPrice)} negotiated price`, value: fmt(exampleFee), valueColor: '#F1F5F9' },
                  ].map((row) => (
                    <Box key={row.label} sx={{ px: 4, py: 2.5, borderBottom: '1px solid rgba(51,65,85,0.3)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 3 }}>
                      <Box>
                        <Typography sx={{ color: '#CBD5E1', fontWeight: 600, fontSize: '0.9375rem' }}>{row.label}</Typography>
                        <Typography sx={{ color: '#475569', fontSize: '0.8125rem', mt: 0.25 }}>{row.sub}</Typography>
                      </Box>
                      <Typography sx={{ color: row.valueColor, fontWeight: 700, fontFamily: 'var(--font-lexend)', fontSize: '1rem', flexShrink: 0 }}>
                        {row.value}
                      </Typography>
                    </Box>
                  ))}

                  {/* Total */}
                  <Box sx={{ px: 4, py: 3, borderBottom: '1px solid rgba(51,65,85,0.4)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(15,23,42,0.5)' }}>
                    <Typography sx={{ color: '#94A3B8', fontWeight: 600, fontSize: '0.875rem', fontFamily: 'var(--font-lexend)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      Your Total Cost
                    </Typography>
                    <Typography sx={{ color: '#F1F5F9', fontWeight: 800, fontFamily: 'var(--font-lexend)', fontSize: '1.375rem' }}>
                      {fmt(exampleTotal)}
                    </Typography>
                  </Box>

                  {/* Savings */}
                  <Box sx={{ px: 4, py: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                      <Typography sx={{ color: '#64748B', fontWeight: 600, fontSize: '0.875rem', fontFamily: 'var(--font-lexend)', textTransform: 'uppercase', letterSpacing: '0.06em', mb: 0.25 }}>
                        Estimated Savings
                      </Typography>
                      <Typography sx={{ color: '#475569', fontSize: '0.8rem' }}>3–7% off MSRP, our typical range</Typography>
                    </Box>
                    <Typography sx={{ color: '#4ADE80', fontWeight: 800, fontFamily: 'var(--font-lexend)', fontSize: '1.375rem', flexShrink: 0 }}>
                      {fmt(exampleSavingsLow)}–{fmt(exampleSavingsHigh)}
                    </Typography>
                  </Box>
                </Box>
              </FadeInUp>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ── FAQ ── */}
      <Box component="section" aria-labelledby="faq-heading" sx={{ backgroundColor: '#080C14', py: { xs: 8, md: 10 } }}>
        <Container maxWidth="md">
          <FadeInUp>
            <Typography id="faq-heading" variant="overline" sx={{ color: '#DC2626', letterSpacing: '0.12em', fontWeight: 700, fontSize: '0.7rem', display: 'block', mb: 1.5, textAlign: 'center' }}>
              Common Questions
            </Typography>
            <Typography variant="h2" sx={{ color: '#F1F5F9', fontWeight: 800, fontFamily: 'var(--font-lexend)', fontSize: { xs: '1.6rem', md: '2rem' }, textAlign: 'center', mb: 7 }}>
              Pricing FAQ
            </Typography>
          </FadeInUp>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {FAQ.map((item, i) => (
              <FadeInUp key={i} delay={i * 0.07}>
                <Box
                  sx={{
                    p: { xs: 3, md: 4 },
                    borderRadius: 2.5,
                    backgroundColor: 'rgba(15,23,42,0.55)',
                    border: '1px solid rgba(51,65,85,0.45)',
                  }}
                >
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start', mb: 1.5 }}>
                    <Box sx={{
                      width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                      backgroundColor: 'rgba(220,38,38,0.12)', border: '1px solid rgba(220,38,38,0.22)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                        <path d="M5.5 4.5C5.5 3.95 5.95 3.5 6.5 3.5C7.05 3.5 7.5 3.95 7.5 4.5C7.5 4.9 7.25 5.25 6.9 5.42L6 5.9V6.75" stroke="#EF4444" strokeWidth="1.25" strokeLinecap="round" />
                        <circle cx="6" cy="8.5" r="0.6" fill="#EF4444" />
                      </svg>
                    </Box>
                    <Typography sx={{ color: '#F1F5F9', fontWeight: 700, fontFamily: 'var(--font-lexend)', fontSize: '0.9375rem', lineHeight: 1.4 }}>
                      {item.q}
                    </Typography>
                  </Box>
                  <Typography sx={{ color: '#64748B', lineHeight: 1.8, fontSize: '0.9rem', pl: '44px' }}>
                    {item.a}
                  </Typography>
                </Box>
              </FadeInUp>
            ))}
          </Box>
        </Container>
      </Box>

      {/* ── CTA ── */}
      <Box
        component="section"
        aria-labelledby="cta-pricing-heading"
        sx={{ background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)', py: { xs: 10, md: 14 }, textAlign: 'center' }}
      >
        <Container maxWidth="sm">
          <FadeInUp>
            <Box sx={{ width: 64, height: 64, borderRadius: '50%', backgroundColor: 'rgba(220,38,38,0.12)', border: '1px solid rgba(220,38,38,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 3 }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.65 3.27 2 2 0 0 1 3.62 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.64a16 16 0 0 0 5.55 5.55l1.78-1.78a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 14.92z" />
              </svg>
            </Box>
          </FadeInUp>
          <FadeInUp delay={0.08}>
            <Typography id="cta-pricing-heading" variant="h2" sx={{ color: '#F1F5F9', fontWeight: 800, fontFamily: 'var(--font-lexend)', fontSize: { xs: '1.75rem', md: '2.25rem' }, mb: 2, lineHeight: 1.2 }}>
              Start free. Pay only<br />when you win.
            </Typography>
          </FadeInUp>
          <FadeInUp delay={0.14}>
            <Typography sx={{ color: '#64748B', lineHeight: 1.8, mb: 5, fontSize: '0.9375rem' }}>
              Book a 10-minute consultation — no card, no commitment. We&apos;ll explain exactly what we can do for your specific vehicle.
            </Typography>
          </FadeInUp>
          <FadeInUp delay={0.2}>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                href="/contact"
                variant="contained"
                size="large"
                sx={{
                  backgroundColor: '#DC2626', '&:hover': { backgroundColor: '#B91C1C' },
                  fontFamily: 'var(--font-lexend)', fontWeight: 700, px: 4, py: 1.5,
                }}
              >
                Book Free Consultation
              </Button>
              <Button
                href="/#how-it-works"
                variant="outlined"
                size="large"
                sx={{
                  borderColor: 'rgba(51,65,85,0.7)', color: '#64748B',
                  '&:hover': { borderColor: '#DC2626', color: '#F1F5F9' },
                  fontFamily: 'var(--font-lexend)', fontWeight: 600, px: 4, py: 1.5,
                  transition: 'all 0.2s',
                }}
              >
                How It Works
              </Button>
            </Box>
          </FadeInUp>
        </Container>
      </Box>
    </>
  );
}
