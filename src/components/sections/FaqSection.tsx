'use client';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const FAQS = [
  {
    q: 'How much does CG AutoEdge charge?',
    a: 'We offer a free initial quote. Our service fee is a flat rate agreed upon upfront — and our clients typically save 5–15x our fee on the final deal price.',
  },
  {
    q: 'Do I have to visit the dealership?',
    a: 'You only need to visit once — to sign the paperwork and pick up your car. We handle all the negotiation remotely on your behalf.',
  },
  {
    q: 'What if I already have a car in mind?',
    a: "Great! That's the most common scenario. Just tell us the make, model, trim, and any options you want, and we'll negotiate the best deal on that exact vehicle.",
  },
  {
    q: 'Can you help with out-of-state purchases?',
    a: 'Yes. We work with dealerships nationwide and can negotiate deals across state lines, including handling transport logistics if needed.',
  },
  {
    q: 'How long does the process take?',
    a: 'Most deals are negotiated within 24–72 hours once we have your requirements. Urgent requests can often be handled same-day.',
  },
  {
    q: "What if I'm not happy with the deal you secure?",
    a: "You're never obligated to accept any offer we bring. If we can't beat a price you already have, you owe us nothing.",
  },
];

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
};

export default function FaqSection() {
  return (
    <Box
      id="faq"
      component="section"
      aria-labelledby="faq-heading"
      sx={{ backgroundColor: '#141D2E', py: { xs: 8, md: 10 } }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Container maxWidth="lg">
        <Grid container justifyContent="center">
          <Grid item xs={12} lg={8}>
            <Box textAlign="center" mb={6}>
              <Typography
                variant="overline"
                sx={{ color: '#EF4444', letterSpacing: '0.1em', fontWeight: 600, fontSize: '0.8125rem' }}
              >
                Got Questions?
              </Typography>
              <Typography
                id="faq-heading"
                variant="h2"
                sx={{ fontWeight: 700, fontSize: { xs: '1.875rem', md: '2.25rem' }, color: '#F1F5F9', mt: 0.5, mb: 2 }}
              >
                Frequently Asked Questions
              </Typography>
              <Box sx={{ width: 56, height: 4, backgroundColor: '#EF4444', borderRadius: 1, mx: 'auto' }} />
            </Box>

            {FAQS.map(({ q, a }, i) => (
              <Accordion key={q} disableGutters>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon sx={{ color: '#EF4444' }} />}
                  aria-controls={`faq-${i}-content`}
                  id={`faq-${i}-header`}
                >
                  {q}
                </AccordionSummary>
                <AccordionDetails>{a}</AccordionDetails>
              </Accordion>
            ))}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
