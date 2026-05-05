'use client';

import { useEffect, useState } from 'react';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';

const LEFT_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/#how-it-works', label: 'How It Works' },
  { href: '/#services', label: 'Services' },
];

const RIGHT_LINKS = [
  { href: '/#testimonials', label: 'Testimonials' },
  { href: '/#faq', label: 'FAQ' },
];

const ALL_LINKS = [...LEFT_LINKS, ...RIGHT_LINKS, { href: '/contact', label: 'Contact' }];

const navLinkSx = (active: boolean) => ({
  color: active ? '#fff' : 'rgba(255,255,255,0.82)',
  fontFamily: '"Lexend", sans-serif',
  fontWeight: 500,
  fontSize: '0.9375rem',
  px: 1.5,
  py: 1,
  whiteSpace: 'nowrap' as const,
  '&:hover': { color: '#fff', backgroundColor: 'rgba(255,255,255,0.07)' },
});

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <AppBar
        position="fixed"
        aria-label="Main navigation"
        sx={{
          backgroundColor: scrolled ? '#0F172A' : '#1E293B',
          boxShadow: scrolled
            ? '0 2px 12px rgba(15,23,42,0.3)'
            : '0 1px 8px rgba(15,23,42,0.2)',
          transition: 'background-color 300ms ease, box-shadow 300ms ease',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{
              minHeight: { xs: 64, md: 68 },
              justifyContent: 'space-between',
            }}
          >
            {/* ── Left links (desktop) ── */}
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                alignItems: 'center',
                gap: 0.5,
                flex: 1,
                justifyContent: 'flex-end',
                pr: 2,
              }}
            >
              {LEFT_LINKS.map(({ href, label }) => (
                <Button
                  key={href}
                  component={NextLink}
                  href={href}
                  sx={navLinkSx(pathname === href)}
                >
                  {label}
                </Button>
              ))}
            </Box>

            {/* ── Center brand ── */}
            <Typography
              component={NextLink}
              href="/"
              sx={{
                fontFamily: '"Lexend", sans-serif',
                fontWeight: 700,
                fontSize: { xs: '1.2rem', md: '1.35rem' },
                color: '#fff',
                textDecoration: 'none',
                whiteSpace: 'nowrap',
                flexShrink: 0,
                letterSpacing: '-0.01em',
              }}
            >
              CG{' '}
              <Box component="span" sx={{ color: '#DC2626' }}>
                AutoEdge
              </Box>
            </Typography>

            {/* ── Right links + CTA (desktop) ── */}
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                alignItems: 'center',
                gap: 0.5,
                flex: 1,
                justifyContent: 'flex-start',
                pl: 2,
              }}
            >
              {RIGHT_LINKS.map(({ href, label }) => (
                <Button
                  key={href}
                  component={NextLink}
                  href={href}
                  sx={navLinkSx(pathname === href)}
                >
                  {label}
                </Button>
              ))}
              <Button
                component={NextLink}
                href="/contact"
                variant="contained"
                color="secondary"
                size="small"
                sx={{ ml: 1.5, px: 2.5, fontFamily: '"Lexend", sans-serif', fontWeight: 600 }}
              >
                Get Free Quote
              </Button>
            </Box>

            {/* ── Mobile hamburger ── */}
            <IconButton
              aria-label="Open navigation menu"
              onClick={() => setDrawerOpen(true)}
              sx={{ display: { md: 'none' }, color: '#fff', ml: 'auto' }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      {/* ── Mobile Drawer ── */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{ sx: { width: 280, backgroundColor: '#1E293B' } }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 2.5,
            py: 2,
          }}
        >
          <Typography
            component={NextLink}
            href="/"
            onClick={() => setDrawerOpen(false)}
            sx={{
              fontFamily: '"Lexend", sans-serif',
              fontWeight: 700,
              fontSize: '1.125rem',
              color: '#fff',
              textDecoration: 'none',
            }}
          >
            CG{' '}
            <Box component="span" sx={{ color: '#DC2626' }}>
              AutoEdge
            </Box>
          </Typography>
          <IconButton
            aria-label="Close navigation menu"
            onClick={() => setDrawerOpen(false)}
            sx={{ color: 'rgba(255,255,255,0.7)' }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.12)' }} />

        <List sx={{ pt: 1 }}>
          {ALL_LINKS.map(({ href, label }) => (
            <ListItem key={href} disablePadding>
              <ListItemButton
                component={NextLink}
                href={href}
                onClick={() => setDrawerOpen(false)}
                sx={{
                  px: 2.5,
                  py: 1.25,
                  color: pathname === href ? '#fff' : 'rgba(255,255,255,0.8)',
                  '&:hover': { backgroundColor: 'rgba(255,255,255,0.07)' },
                }}
              >
                <ListItemText
                  primary={label}
                  primaryTypographyProps={{
                    fontFamily: '"Lexend", sans-serif',
                    fontWeight: 500,
                    fontSize: '0.9375rem',
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Box sx={{ px: 2.5, pt: 2, pb: 3 }}>
          <Button
            component={NextLink}
            href="/contact"
            variant="contained"
            color="secondary"
            fullWidth
            size="large"
            onClick={() => setDrawerOpen(false)}
          >
            Get Free Quote
          </Button>
        </Box>
      </Drawer>
    </>
  );
}
