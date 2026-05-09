'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { setSubmitStatus, setErrorMessage, resetContact, setContactData } from '@/lib/features/contact/contactSlice';

// ─── Types ───────────────────────────────────────────────────────────────────

type Condition = 'new' | 'used' | null;
type IdentMethod = 'vin' | 'manual';

interface WizardData {
  condition: Condition;
  identMethod: IdentMethod;
  vin: string;
  year: string;
  make: string;
  model: string;
  trim: string;
  colorPref: string;
  mileage: string;
  budget: string;
  tradeIn: boolean;
  tradeInDetails: string;
  financing: boolean;
  timeline: string;
  notes: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  preferredContact: 'email' | 'phone';
}

const INIT: WizardData = {
  condition: null, identMethod: 'vin', vin: '',
  year: '', make: '', model: '', trim: '', colorPref: '', mileage: '', budget: '',
  tradeIn: false, tradeInDetails: '', financing: false, timeline: '', notes: '',
  firstName: '', lastName: '', email: '', phone: '', preferredContact: 'email',
};

// ─── Constants ────────────────────────────────────────────────────────────────

const BUDGET_RANGES = [
  'Under $20,000', '$20,000 – $35,000', '$35,000 – $50,000',
  '$50,000 – $75,000', '$75,000+', 'Flexible',
];
const TIMELINE_OPTIONS = [
  'As soon as possible', 'Within 1–2 weeks', 'Within 1 month', 'Just exploring options',
];
const MAKES = [
  'Acura','Audi','BMW','Buick','Cadillac','Chevrolet','Chrysler','Dodge','Ford',
  'Genesis','GMC','Honda','Hyundai','Infiniti','Jeep','Kia','Land Rover','Lexus',
  'Lincoln','Mazda','Mercedes-Benz','Mitsubishi','Nissan','Porsche','Ram','Subaru',
  'Tesla','Toyota','Volkswagen','Volvo','Other',
];
const YEARS = Array.from({ length: 27 }, (_, i) => String(2026 - i));

const STEP_LABELS = ['Vehicle Type', 'Vehicle ID', 'Vehicle Info', 'Extra Notes', 'Your Details'];

// ─── Framer Motion Variants ───────────────────────────────────────────────────

const fade = {
  enter: (d: number) => ({ opacity: 0, y: d > 0 ? 14 : -14 }),
  center: { opacity: 1, y: 0, transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
  exit: (d: number) => ({ opacity: 0, y: d > 0 ? -14 : 14, transition: { duration: 0.22 } }),
};

// ─── Shared Input Styles ──────────────────────────────────────────────────────

const darkField = {
  '& .MuiInputBase-root': { backgroundColor: 'rgba(15,23,42,0.7)', color: '#F1F5F9' },
  '& .MuiInputLabel-root': { color: '#64748B' },
  '& .MuiInputLabel-root.Mui-focused': { color: '#DC2626' },
  '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(51,65,85,0.7)' },
  '& .MuiInputBase-root:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#475569' },
  '& .MuiInputBase-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#DC2626' },
  '& .MuiFormHelperText-root': { color: '#475569' },
  '& .MuiSvgIcon-root': { color: '#64748B' },
  '& .MuiSelect-icon': { color: '#64748B' },
  '& .MuiMenuItem-root': { color: '#F1F5F9' },
};

// ─── SVG Icons ────────────────────────────────────────────────────────────────

function NewCarSVG({ active }: { active: boolean }) {
  return (
    <svg width="72" height="54" viewBox="0 0 72 54" fill="none" aria-hidden="true">
      <rect x="4" y="26" width="64" height="20" rx="5" fill={active ? '#7F1D1D' : '#1E293B'} />
      <path d="M12 26 L22 10 H50 L60 26Z" fill={active ? '#991B1B' : '#0F172A'} />
      <path d="M24 12 L22 24 H38 V12Z" fill={active ? 'rgba(255,255,255,0.2)' : 'rgba(148,163,184,0.15)'} />
      <path d="M38 12 H50 L52 24 H38Z" fill={active ? 'rgba(255,255,255,0.2)' : 'rgba(148,163,184,0.15)'} />
      <circle cx="22" cy="46" r="8" fill="#0F172A" />
      <circle cx="22" cy="46" r="4" fill={active ? '#DC2626' : '#334155'} />
      <circle cx="50" cy="46" r="8" fill="#0F172A" />
      <circle cx="50" cy="46" r="4" fill={active ? '#DC2626' : '#334155'} />
      <rect x="2" y="31" width="5" height="5" rx="2" fill={active ? '#DC2626' : '#1E293B'} />
      <rect x="65" y="29" width="5" height="6" rx="2" fill={active ? '#EF4444' : '#1E293B'} />
      {active && (
        <g>
          <circle cx="62" cy="8" r="3" fill="#FCD34D" />
          {[[-5,0],[5,0],[0,-5],[0,5],[-3.5,-3.5],[3.5,3.5],[-3.5,3.5],[3.5,-3.5]].map(([dx,dy], i) => (
            <line key={i} x1={62 + dx * 0.45} y1={8 + dy * 0.45} x2={62 + dx} y2={8 + dy}
              stroke="#FCD34D" strokeWidth="1.5" strokeLinecap="round" />
          ))}
        </g>
      )}
    </svg>
  );
}

function UsedCarSVG({ active }: { active: boolean }) {
  return (
    <svg width="72" height="54" viewBox="0 0 72 54" fill="none" aria-hidden="true">
      <rect x="4" y="26" width="64" height="20" rx="5" fill={active ? '#7F1D1D' : '#1E293B'} />
      <path d="M10 26 L20 10 H52 L62 26Z" fill={active ? '#991B1B' : '#0F172A'} />
      <path d="M22 12 L20 24 H38 V12Z" fill={active ? 'rgba(255,255,255,0.2)' : 'rgba(148,163,184,0.15)'} />
      <path d="M38 12 H52 L54 24 H38Z" fill={active ? 'rgba(255,255,255,0.2)' : 'rgba(148,163,184,0.15)'} />
      <circle cx="22" cy="46" r="8" fill="#0F172A" />
      <circle cx="22" cy="46" r="4" fill={active ? '#DC2626' : '#334155'} />
      <circle cx="50" cy="46" r="8" fill="#0F172A" />
      <circle cx="50" cy="46" r="4" fill={active ? '#DC2626' : '#334155'} />
      <circle cx="60" cy="9" r="9" fill={active ? '#15803D' : '#1E293B'} stroke={active ? '#16A34A' : '#334155'} strokeWidth="1.5" />
      <path d="M55 9 L58.5 12.5 L65 6" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckSVG() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
      <path d="M2 7 L5 10 L11 3.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function InfoSVG() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7 6.5 V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="7" cy="4.5" r="0.75" fill="currentColor" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
      <path d="M5.5 3.5 L9.5 7.5 L5.5 11.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronLeft() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
      <path d="M9.5 3.5 L5.5 7.5 L9.5 11.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
      <path d="M2 7.5 H13 M8.5 3.5 L13 7.5 L8.5 11.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Progress Bar ─────────────────────────────────────────────────────────────

function WizardProgress({ step, vinPath }: { step: number; vinPath: boolean }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 5 }}>
      {STEP_LABELS.map((label, i) => {
        const skipped = vinPath && i === 2;
        const done = i < step || skipped;
        const current = i === step;
        return (
          <Box key={i} sx={{ display: 'flex', alignItems: 'flex-start', flex: i < STEP_LABELS.length - 1 ? 1 : 0 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: { xs: 44, sm: 52 } }}>
              <motion.div
                animate={{
                  backgroundColor: done ? '#16A34A' : current ? '#DC2626' : 'transparent',
                  borderColor: done ? '#16A34A' : current ? '#DC2626' : 'rgba(51,65,85,0.7)',
                  scale: current ? 1.12 : 1,
                }}
                transition={{ duration: 0.28 }}
                style={{
                  width: 30, height: 30, borderRadius: '50%', border: '2px solid',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontSize: 11, fontWeight: 700, fontFamily: 'var(--font-lexend)',
                }}
              >
                {done ? <CheckSVG /> : skipped ? (
                  <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
                    <line x1="2" y1="2" x2="8" y2="8" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="8" y1="2" x2="2" y2="8" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                ) : (
                  <span style={{ color: current ? '#fff' : '#475569' }}>{i + 1}</span>
                )}
              </motion.div>
              <Typography sx={{
                fontSize: '0.575rem', fontWeight: 600, mt: 0.75, whiteSpace: 'nowrap',
                color: done ? '#16A34A' : current ? '#F1F5F9' : skipped ? '#334155' : '#475569',
                fontFamily: 'var(--font-lexend)', letterSpacing: '0.06em', textTransform: 'uppercase',
              }}>
                {skipped ? 'Via VIN' : label}
              </Typography>
            </Box>
            {i < STEP_LABELS.length - 1 && (
              <Box sx={{
                flex: 1, height: 2, mt: '13px', mx: 0.5, borderRadius: 1,
                backgroundColor: done ? '#16A34A' : 'rgba(51,65,85,0.5)',
                transition: 'background-color 0.4s',
              }} />
            )}
          </Box>
        );
      })}
    </Box>
  );
}

// ─── Step 0 — Vehicle Condition ───────────────────────────────────────────────

function StepCondition({ data, onChange }: { data: WizardData; onChange: (v: Condition) => void }) {
  return (
    <Box>
      <Typography variant="overline" sx={{ color: '#DC2626', letterSpacing: '0.12em', fontWeight: 700, fontSize: '0.7rem', display: 'block', mb: 1 }}>
        Step 1 of 5
      </Typography>
      <Typography variant="h5" sx={{ color: '#F1F5F9', fontWeight: 700, mb: 1, fontFamily: 'var(--font-lexend)', lineHeight: 1.25 }}>
        What type of vehicle are you pursuing?
      </Typography>
      <Typography sx={{ color: '#64748B', mb: 4, lineHeight: 1.75, fontSize: '0.9375rem' }}>
        Our negotiators specialise in both — same expert service, same zero-pressure guarantee.
      </Typography>

      <Grid container spacing={2.5}>
        {(['new', 'used'] as const).map((type) => {
          const selected = data.condition === type;
          return (
            <Grid item xs={12} sm={6} key={type}>
              <motion.div
                whileHover={selected ? undefined : { scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.18 }}
                style={{ cursor: 'pointer', height: '100%' }}
                onClick={() => onChange(type)}
              >
                <Box
                  role="radio"
                  aria-checked={selected}
                  tabIndex={0}
                  onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onChange(type)}
                  sx={{
                    p: { xs: 3, sm: 3.5 }, borderRadius: 2.5, textAlign: 'center',
                    border: '2px solid', borderColor: selected ? '#DC2626' : 'rgba(51,65,85,0.6)',
                    backgroundColor: selected ? 'rgba(220,38,38,0.07)' : 'rgba(15,23,42,0.5)',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
                    position: 'relative', height: '100%',
                    transition: 'border-color 0.22s, background-color 0.22s',
                    outline: 'none', '&:focus-visible': { boxShadow: '0 0 0 3px rgba(220,38,38,0.35)' },
                  }}
                >
                  {selected && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                      style={{
                        position: 'absolute', top: 12, right: 12,
                        width: 22, height: 22, borderRadius: '50%', backgroundColor: '#DC2626',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}
                    >
                      <CheckSVG />
                    </motion.div>
                  )}

                  <motion.div animate={{ y: selected ? -4 : 0 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}>
                    {type === 'new' ? <NewCarSVG active={selected} /> : <UsedCarSVG active={selected} />}
                  </motion.div>

                  <Box>
                    <Typography sx={{ color: selected ? '#F1F5F9' : '#CBD5E1', fontWeight: 700, fontSize: '1rem', fontFamily: 'var(--font-lexend)', mb: 0.5 }}>
                      {type === 'new' ? 'Brand New Vehicle' : 'Pre-Owned / Used'}
                    </Typography>
                    <Typography sx={{ color: '#64748B', fontSize: '0.8rem', lineHeight: 1.65 }}>
                      {type === 'new'
                        ? 'Factory fresh — we negotiate MSRP, add-ons & financing.'
                        : 'Certified or standard used — we fight for the best price.'}
                    </Typography>
                  </Box>
                </Box>
              </motion.div>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}

// ─── Step 1 — Vehicle Identification ─────────────────────────────────────────

function StepIdentify({ data, setData, errors }: {
  data: WizardData;
  setData: React.Dispatch<React.SetStateAction<WizardData>>;
  errors: Record<string, string>;
}) {
  return (
    <Box>
      <Typography variant="overline" sx={{ color: '#DC2626', letterSpacing: '0.12em', fontWeight: 700, fontSize: '0.7rem', display: 'block', mb: 1 }}>
        Step 2 of 5
      </Typography>
      <Typography variant="h5" sx={{ color: '#F1F5F9', fontWeight: 700, mb: 1, fontFamily: 'var(--font-lexend)', lineHeight: 1.25 }}>
        How would you like to identify the vehicle?
      </Typography>
      <Typography sx={{ color: '#64748B', mb: 4, lineHeight: 1.75, fontSize: '0.9375rem' }}>
        A VIN gives us the exact factory spec and option packages — the strongest negotiating position.
      </Typography>

      {/* Tab switcher */}
      <Box sx={{ display: 'flex', gap: 1, mb: 4, p: '5px', backgroundColor: 'rgba(15,23,42,0.9)', borderRadius: 2, border: '1px solid rgba(51,65,85,0.5)' }}>
        {([
          { value: 'vin' as const, label: 'VIN Number' },
          { value: 'manual' as const, label: 'Enter Details Manually' },
        ]).map(({ value, label }) => (
          <Box
            key={value}
            role="tab"
            aria-selected={data.identMethod === value}
            tabIndex={0}
            onClick={() => setData(d => ({ ...d, identMethod: value, vin: value === 'manual' ? '' : d.vin }))}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setData(d => ({ ...d, identMethod: value }))}
            sx={{
              flex: 1, py: 1.25, px: 2, borderRadius: '10px', textAlign: 'center',
              cursor: 'pointer', outline: 'none',
              backgroundColor: data.identMethod === value ? '#DC2626' : 'transparent',
              transition: 'background-color 0.22s',
              '&:focus-visible': { boxShadow: '0 0 0 2px rgba(220,38,38,0.5)' },
            }}
          >
            <Typography sx={{ fontWeight: 600, fontFamily: 'var(--font-lexend)', fontSize: '0.875rem', color: data.identMethod === value ? '#fff' : '#64748B' }}>
              {label}
            </Typography>
          </Box>
        ))}
      </Box>

      <AnimatePresence mode="wait">
        {data.identMethod === 'vin' ? (
          <motion.div key="vin" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.22 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <Typography sx={{ color: '#94A3B8', fontWeight: 600, fontSize: '0.875rem' }}>
                Vehicle Identification Number (VIN)
              </Typography>
              <Tooltip
                title="Your 17-character VIN is on your dashboard (driver side), door jamb, insurance card, or vehicle title. It confirms exact factory spec."
                arrow placement="top"
                componentsProps={{ tooltip: { sx: { backgroundColor: '#1E293B', color: '#CBD5E1', fontSize: '0.8rem', maxWidth: 260, lineHeight: 1.6, border: '1px solid rgba(51,65,85,0.7)' } }, arrow: { sx: { color: '#1E293B' } } }}
              >
                <Box sx={{ color: '#475569', display: 'flex', cursor: 'help', '&:hover': { color: '#94A3B8' } }}>
                  <InfoSVG />
                </Box>
              </Tooltip>
            </Box>
            <TextField
              value={data.vin}
              onChange={(e) => setData(d => ({ ...d, vin: e.target.value.toUpperCase().replace(/[^A-HJ-NPR-Z0-9]/g, '').slice(0, 17) }))}
              placeholder="e.g. 1HGBH41JXMN109186"
              error={!!errors.vin}
              helperText={errors.vin || (data.vin.length === 17 ? '✓ Valid length' : `${data.vin.length}/17 characters`)}
              inputProps={{ maxLength: 17, style: { fontFamily: 'monospace', letterSpacing: '0.12em', fontSize: '1rem' } }}
              sx={{
                ...darkField,
                '& .MuiFormHelperText-root': { color: data.vin.length === 17 ? '#16A34A' : '#475569' },
              }}
            />
            <Box sx={{ mt: 2.5, p: 2.5, borderRadius: 2, backgroundColor: 'rgba(220,38,38,0.05)', border: '1px solid rgba(220,38,38,0.15)' }}>
              <Typography sx={{ color: '#94A3B8', fontSize: '0.8125rem', lineHeight: 1.75 }}>
                <Box component="span" sx={{ color: '#DC2626', fontWeight: 600 }}>Pro tip: </Box>
                Providing a VIN lets us pull factory options, recall history, and real-time market data — so we walk into dealer negotiations fully armed.
              </Typography>
            </Box>
          </motion.div>
        ) : (
          <motion.div key="manual" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.22 }}>
            <Box sx={{ p: 3, borderRadius: 2, backgroundColor: 'rgba(15,23,42,0.6)', border: '1px solid rgba(51,65,85,0.5)', display: 'flex', gap: 2.5 }}>
              <Box sx={{ flexShrink: 0, width: 44, height: 44, borderRadius: 2, backgroundColor: 'rgba(220,38,38,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
              </Box>
              <Box>
                <Typography sx={{ color: '#F1F5F9', fontWeight: 600, fontFamily: 'var(--font-lexend)', mb: 0.5 }}>
                  We&apos;ll collect the specifics in the next step
                </Typography>
                <Typography sx={{ color: '#64748B', fontSize: '0.8125rem', lineHeight: 1.75 }}>
                  Year, make, model, trim, colour preference
                  {data.condition === 'used' ? ', and mileage' : ''}. The more specific you are, the stronger your negotiating brief.
                </Typography>
              </Box>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
}

// ─── Step 2 — Vehicle Details ─────────────────────────────────────────────────

function StepVehicleDetails({ data, setData, errors }: {
  data: WizardData;
  setData: React.Dispatch<React.SetStateAction<WizardData>>;
  errors: Record<string, string>;
}) {
  const upd = (field: keyof WizardData) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setData(d => ({ ...d, [field]: e.target.value }));

  return (
    <Box>
      <Typography variant="overline" sx={{ color: '#DC2626', letterSpacing: '0.12em', fontWeight: 700, fontSize: '0.7rem', display: 'block', mb: 1 }}>
        Step 3 of 5
      </Typography>
      <Typography variant="h5" sx={{ color: '#F1F5F9', fontWeight: 700, mb: 1, fontFamily: 'var(--font-lexend)', lineHeight: 1.25 }}>
        Tell us about the vehicle
      </Typography>
      <Typography sx={{ color: '#64748B', mb: 4, lineHeight: 1.75, fontSize: '0.9375rem' }}>
        The more specific you are, the more precisely we can target the right deal.
      </Typography>

      <Grid container spacing={2.5}>
        <Grid item xs={6} sm={4}>
          <TextField select label="Year *" value={data.year} onChange={upd('year')} error={!!errors.year} helperText={errors.year} sx={darkField}>
            {YEARS.map(y => <MenuItem key={y} value={y} sx={{ color: '#F1F5F9', backgroundColor: '#0F172A', '&:hover': { backgroundColor: '#1E293B' } }}>{y}</MenuItem>)}
          </TextField>
        </Grid>
        <Grid item xs={6} sm={8}>
          <TextField select label="Make / Brand *" value={data.make} onChange={upd('make')} error={!!errors.make} helperText={errors.make} sx={darkField}>
            {MAKES.map(m => <MenuItem key={m} value={m} sx={{ color: '#F1F5F9', backgroundColor: '#0F172A', '&:hover': { backgroundColor: '#1E293B' } }}>{m}</MenuItem>)}
          </TextField>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField label="Model *" value={data.model} onChange={upd('model')} error={!!errors.model} helperText={errors.model || 'e.g. RAV4, X5, F-150'} placeholder="RAV4" sx={darkField} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
            <Typography sx={{ color: '#64748B', fontSize: '0.8125rem', fontWeight: 500 }}>Trim Level</Typography>
            <Tooltip title="The trim determines features and base price (e.g. XLE, Limited, Sport). Check the manufacturer site if unsure." arrow placement="top"
              componentsProps={{ tooltip: { sx: { backgroundColor: '#1E293B', color: '#CBD5E1', fontSize: '0.8rem', maxWidth: 240, lineHeight: 1.6, border: '1px solid rgba(51,65,85,0.7)' } }, arrow: { sx: { color: '#1E293B' } } }}>
              <Box sx={{ color: '#475569', display: 'flex', cursor: 'help' }}><InfoSVG /></Box>
            </Tooltip>
          </Box>
          <TextField label="Trim (optional)" value={data.trim} onChange={upd('trim')} helperText="e.g. XLE, Limited, Sport" placeholder="XLE" sx={darkField} />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField label="Colour Preference" value={data.colorPref} onChange={upd('colorPref')} helperText="e.g. Pearl White, flexible" placeholder="Any colour" sx={darkField} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField select label="Budget Range *" value={data.budget} onChange={upd('budget')} error={!!errors.budget} helperText={errors.budget} sx={darkField}>
            {BUDGET_RANGES.map(b => <MenuItem key={b} value={b} sx={{ color: '#F1F5F9', backgroundColor: '#0F172A', '&:hover': { backgroundColor: '#1E293B' } }}>{b}</MenuItem>)}
          </TextField>
        </Grid>

        {data.condition === 'used' && (
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
              <Typography sx={{ color: '#64748B', fontSize: '0.8125rem', fontWeight: 500 }}>Maximum Mileage</Typography>
              <Tooltip title="A mileage cap helps us filter vehicles that meet your criteria and negotiate accordingly." arrow placement="top"
                componentsProps={{ tooltip: { sx: { backgroundColor: '#1E293B', color: '#CBD5E1', fontSize: '0.8rem', maxWidth: 220, lineHeight: 1.6, border: '1px solid rgba(51,65,85,0.7)' } }, arrow: { sx: { color: '#1E293B' } } }}>
                <Box sx={{ color: '#475569', display: 'flex', cursor: 'help' }}><InfoSVG /></Box>
              </Tooltip>
            </Box>
            <TextField label="Max Mileage (optional)" value={data.mileage} onChange={upd('mileage')} placeholder="e.g. 50,000 miles" helperText="Leave blank if flexible" inputProps={{ inputMode: 'numeric' }} sx={darkField} />
          </Grid>
        )}
      </Grid>
    </Box>
  );
}

// ─── Step 3 — Additional Info ─────────────────────────────────────────────────

function Toggle({ checked, onChange, label, sub }: { checked: boolean; onChange: () => void; label: string; sub: string }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 2 }}>
      <Box>
        <Typography sx={{ color: '#F1F5F9', fontWeight: 600, fontFamily: 'var(--font-lexend)', fontSize: '0.9375rem' }}>{label}</Typography>
        <Typography sx={{ color: '#64748B', fontSize: '0.8125rem', mt: 0.25 }}>{sub}</Typography>
      </Box>
      <Box
        role="switch"
        aria-checked={checked}
        tabIndex={0}
        onClick={onChange}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onChange()}
        sx={{
          width: 48, height: 26, borderRadius: 13, cursor: 'pointer', flexShrink: 0,
          backgroundColor: checked ? '#DC2626' : '#1E293B',
          border: '2px solid', borderColor: checked ? '#DC2626' : '#334155',
          position: 'relative', transition: 'background-color 0.22s, border-color 0.22s',
          outline: 'none', '&:focus-visible': { boxShadow: '0 0 0 3px rgba(220,38,38,0.4)' },
        }}
      >
        <motion.div
          animate={{ x: checked ? 22 : 2 }}
          transition={{ type: 'spring', stiffness: 500, damping: 35 }}
          style={{ position: 'absolute', top: 2, width: 18, height: 18, borderRadius: '50%', backgroundColor: '#fff' }}
        />
      </Box>
    </Box>
  );
}

function StepAdditional({ data, setData }: { data: WizardData; setData: React.Dispatch<React.SetStateAction<WizardData>> }) {
  const upd = (field: keyof WizardData) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setData(d => ({ ...d, [field]: e.target.value }));

  return (
    <Box>
      <Typography variant="overline" sx={{ color: '#DC2626', letterSpacing: '0.12em', fontWeight: 700, fontSize: '0.7rem', display: 'block', mb: 1 }}>
        Step 4 of 5
      </Typography>
      <Typography variant="h5" sx={{ color: '#F1F5F9', fontWeight: 700, mb: 1, fontFamily: 'var(--font-lexend)', lineHeight: 1.25 }}>
        Anything else we should know?
      </Typography>
      <Typography sx={{ color: '#64748B', mb: 4, lineHeight: 1.75, fontSize: '0.9375rem' }}>
        These extras help us build the most complete negotiating brief for your deal.
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {/* Trade-in */}
        <Box sx={{ py: 2.5, borderTop: '1px solid rgba(51,65,85,0.4)' }}>
          <Toggle
            checked={data.tradeIn}
            onChange={() => setData(d => ({ ...d, tradeIn: !d.tradeIn }))}
            label="Do you have a trade-in?"
            sub="We can negotiate your trade-in value simultaneously."
          />
          <AnimatePresence>
            {data.tradeIn && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} style={{ overflow: 'hidden' }}>
                <TextField
                  label="Trade-in Details"
                  value={data.tradeInDetails}
                  onChange={upd('tradeInDetails')}
                  multiline rows={2}
                  placeholder="e.g. 2019 Honda Civic EX, 62,000 miles, good condition"
                  helperText="Year, make, model, approx. mileage, and condition"
                  sx={{ ...darkField, mt: 2 }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </Box>

        {/* Financing */}
        <Box sx={{ py: 2.5, borderTop: '1px solid rgba(51,65,85,0.4)' }}>
          <Toggle
            checked={data.financing}
            onChange={() => setData(d => ({ ...d, financing: !d.financing }))}
            label="Will you need financing?"
            sub="We negotiate the loan rate along with the purchase price."
          />
        </Box>

        {/* Timeline + Notes */}
        <Box sx={{ pt: 2.5, borderTop: '1px solid rgba(51,65,85,0.4)' }}>
          <Grid container spacing={2.5}>
            <Grid item xs={12}>
              <TextField select label="Buying Timeline" value={data.timeline} onChange={upd('timeline')} sx={darkField}>
                {TIMELINE_OPTIONS.map(t => <MenuItem key={t} value={t} sx={{ color: '#F1F5F9', backgroundColor: '#0F172A', '&:hover': { backgroundColor: '#1E293B' } }}>{t}</MenuItem>)}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Anything else?"
                value={data.notes}
                onChange={upd('notes')}
                multiline rows={3}
                placeholder="Specific features, geographic area, past dealership experiences, or anything else that could strengthen your negotiating position."
                helperText="Optional — but every detail helps"
                sx={darkField}
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}

// ─── Step 4 — Contact Details ─────────────────────────────────────────────────

function StepContact({ data, setData, errors, wasSubmitted, setErrors }: {
  data: WizardData;
  setData: React.Dispatch<React.SetStateAction<WizardData>>;
  errors: Record<string, string>;
  wasSubmitted: boolean;
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}) {
  const upd = (field: keyof WizardData) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setData(d => ({ ...d, [field]: e.target.value }));

  const blur = (field: 'firstName' | 'lastName' | 'email') => () => {
    if (!wasSubmitted) return;
    const msg: Record<string, string> = {};
    if (field === 'firstName' && !data.firstName.trim()) msg.firstName = 'First name is required.';
    if (field === 'lastName' && !data.lastName.trim()) msg.lastName = 'Last name is required.';
    if (field === 'email') {
      if (!data.email.trim()) msg.email = 'Email is required.';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) msg.email = 'Enter a valid email address.';
    }
    setErrors(prev => ({ ...prev, [field]: msg[field] ?? '' }));
  };

  return (
    <Box>
      <Typography variant="overline" sx={{ color: '#DC2626', letterSpacing: '0.12em', fontWeight: 700, fontSize: '0.7rem', display: 'block', mb: 1 }}>
        Step 5 of 5 — Final Step
      </Typography>
      <Typography variant="h5" sx={{ color: '#F1F5F9', fontWeight: 700, mb: 1, fontFamily: 'var(--font-lexend)', lineHeight: 1.25 }}>
        How do we reach you?
      </Typography>
      <Typography sx={{ color: '#64748B', mb: 4, lineHeight: 1.75, fontSize: '0.9375rem' }}>
        Your negotiator will follow up within 24 hours — confidential and zero-obligation.
      </Typography>

      <Grid container spacing={2.5}>
        <Grid item xs={12} sm={6}>
          <TextField label="First Name *" value={data.firstName} onChange={upd('firstName')} onBlur={blur('firstName')} error={!!errors.firstName} helperText={errors.firstName} autoComplete="given-name" placeholder="Jane" inputProps={{ 'aria-required': 'true' }} sx={darkField} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Last Name *" value={data.lastName} onChange={upd('lastName')} onBlur={blur('lastName')} error={!!errors.lastName} helperText={errors.lastName} autoComplete="family-name" placeholder="Smith" inputProps={{ 'aria-required': 'true' }} sx={darkField} />
        </Grid>

        <Grid item xs={12}>
          <TextField label="Email Address *" type="email" value={data.email} onChange={upd('email')} onBlur={blur('email')} error={!!errors.email} helperText={errors.email} autoComplete="email" placeholder="jane@example.com" inputProps={{ 'aria-required': 'true' }} sx={darkField} />
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
            <Typography sx={{ color: '#64748B', fontSize: '0.8125rem', fontWeight: 500 }}>Phone Number</Typography>
            <Tooltip title="We'll only call or text if phone is your preferred contact method." arrow placement="top"
              componentsProps={{ tooltip: { sx: { backgroundColor: '#1E293B', color: '#CBD5E1', fontSize: '0.8rem', maxWidth: 200, lineHeight: 1.6, border: '1px solid rgba(51,65,85,0.7)' } }, arrow: { sx: { color: '#1E293B' } } }}>
              <Box sx={{ color: '#475569', display: 'flex', cursor: 'help' }}><InfoSVG /></Box>
            </Tooltip>
          </Box>
          <TextField label="Phone (optional)" type="tel" value={data.phone} onChange={upd('phone')} autoComplete="tel" placeholder="+1 (555) 000-0000" sx={darkField} />
        </Grid>

        <Grid item xs={12}>
          <Typography sx={{ color: '#64748B', fontSize: '0.8125rem', fontWeight: 600, mb: 1.5, fontFamily: 'var(--font-lexend)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
            Preferred Contact Method
          </Typography>
          <Box sx={{ display: 'flex', gap: 1.5 }}>
            {(['email', 'phone'] as const).map((method) => (
              <Box
                key={method}
                role="radio"
                aria-checked={data.preferredContact === method}
                tabIndex={0}
                onClick={() => setData(d => ({ ...d, preferredContact: method }))}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setData(d => ({ ...d, preferredContact: method }))}
                sx={{
                  flex: 1, py: 1.5, px: 2, borderRadius: 2, cursor: 'pointer', textAlign: 'center',
                  border: '2px solid', borderColor: data.preferredContact === method ? '#DC2626' : 'rgba(51,65,85,0.5)',
                  backgroundColor: data.preferredContact === method ? 'rgba(220,38,38,0.07)' : 'rgba(15,23,42,0.4)',
                  transition: 'all 0.2s', outline: 'none',
                  '&:focus-visible': { boxShadow: '0 0 0 3px rgba(220,38,38,0.35)' },
                }}
              >
                <Typography sx={{ color: data.preferredContact === method ? '#F1F5F9' : '#64748B', fontWeight: 600, fontFamily: 'var(--font-lexend)', fontSize: '0.875rem' }}>
                  {method === 'email' ? 'Email' : 'Phone / SMS'}
                </Typography>
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

// ─── Success Screen ───────────────────────────────────────────────────────────

const MISSION_TIMELINE = [
  { label: 'Request Received', desc: 'Your brief is locked in our system', done: true },
  { label: 'Negotiator Assigned', desc: 'Within the next few hours', done: false },
  { label: 'Strategy Crafted', desc: 'We research, benchmark & build your playbook', done: false },
  { label: 'Best Deal Secured', desc: 'We go to work — you approve or walk away free', done: false },
];

function SuccessScreen({ onReset }: { onReset: () => void }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45 }}>
      <Box role="status" aria-live="polite" sx={{ textAlign: 'center' }}>

        {/* Animated badge */}
        <Box sx={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
          <motion.div
            animate={{ scale: [1, 1.18, 1], opacity: [0.25, 0.1, 0.25] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
            style={{ position: 'absolute', inset: -20, borderRadius: '50%', backgroundColor: '#DC2626' }}
          />
          <motion.div
            animate={{ scale: [1, 1.08, 1], opacity: [0.15, 0.07, 0.15] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
            style={{ position: 'absolute', inset: -10, borderRadius: '50%', backgroundColor: '#DC2626' }}
          />
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 280, damping: 18, delay: 0.1 }}
            style={{
              width: 80, height: 80, borderRadius: '50%', backgroundColor: '#DC2626',
              display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative',
            }}
          >
            <svg width="38" height="38" viewBox="0 0 38 38" fill="none" aria-hidden="true">
              <path d="M7 19 L15 27 L31 11" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        </Box>

        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
          <Typography variant="overline" sx={{ color: '#DC2626', letterSpacing: '0.18em', fontWeight: 700, fontSize: '0.7rem', display: 'block', mb: 1 }}>
            Mission Accepted
          </Typography>
          <Typography variant="h4" sx={{ color: '#F1F5F9', fontWeight: 800, mb: 2, fontFamily: 'var(--font-lexend)', lineHeight: 1.2, fontSize: { xs: '1.6rem', sm: '2rem' } }}>
            Your deal hunt begins now.
          </Typography>
          <Typography sx={{ color: '#94A3B8', maxWidth: 420, mx: 'auto', lineHeight: 1.85, mb: 5, fontSize: '0.9375rem' }}>
            Our team is reviewing your brief. Within{' '}
            <Box component="span" sx={{ color: '#F1F5F9', fontWeight: 600 }}>24 hours</Box>, a dedicated negotiator will reach out with a personalised strategy — and then the real work begins.
          </Typography>
        </motion.div>

        {/* Mission timeline */}
        <Box sx={{ maxWidth: 380, mx: 'auto', mb: 5, textAlign: 'left' }}>
          {MISSION_TIMELINE.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.42 + i * 0.1, duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            >
              <Box sx={{ display: 'flex', gap: 2.5, pb: i < MISSION_TIMELINE.length - 1 ? 2.5 : 0, position: 'relative' }}>
                {i < MISSION_TIMELINE.length - 1 && (
                  <Box sx={{ position: 'absolute', left: 14, top: 30, bottom: 0, width: 2, backgroundColor: i === 0 ? '#16A34A' : 'rgba(51,65,85,0.4)' }} />
                )}
                <Box sx={{
                  width: 30, height: 30, borderRadius: '50%', flexShrink: 0, zIndex: 1,
                  backgroundColor: i === 0 ? '#16A34A' : '#1E293B',
                  border: '2px solid', borderColor: i === 0 ? '#16A34A' : '#334155',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: i > 0 ? '#475569' : '#fff', fontSize: 11, fontWeight: 700,
                }}>
                  {i === 0 ? <CheckSVG /> : i + 1}
                </Box>
                <Box sx={{ pt: 0.3 }}>
                  <Typography sx={{ color: i === 0 ? '#F1F5F9' : '#64748B', fontWeight: 600, fontSize: '0.875rem', fontFamily: 'var(--font-lexend)' }}>
                    {s.label}
                  </Typography>
                  <Typography sx={{ color: '#475569', fontSize: '0.8125rem', mt: 0.2 }}>{s.desc}</Typography>
                </Box>
              </Box>
            </motion.div>
          ))}
        </Box>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9, duration: 0.4 }}>
          <Box sx={{ p: 2.5, borderRadius: 2, backgroundColor: 'rgba(15,23,42,0.8)', border: '1px solid rgba(51,65,85,0.5)', mb: 4, textAlign: 'left' }}>
            <Typography sx={{ color: '#94A3B8', fontSize: '0.8125rem', lineHeight: 1.8 }}>
              <Box component="span" sx={{ color: '#DC2626', fontWeight: 600 }}>Heads up: </Box>
              Check your inbox for a confirmation email. Need us sooner? Call{' '}
              <Box component="a" href="tel:+18002886334" sx={{ color: '#F1F5F9', fontWeight: 600, textDecoration: 'none', '&:hover': { color: '#DC2626' }, transition: 'color 0.2s' }}>
                +1 (800) AUTO-EDGE
              </Box>.
            </Typography>
          </Box>
          <Button
            variant="outlined"
            onClick={onReset}
            sx={{ borderColor: 'rgba(51,65,85,0.7)', color: '#64748B', '&:hover': { borderColor: '#DC2626', color: '#F1F5F9', backgroundColor: 'rgba(220,38,38,0.04)' }, transition: 'all 0.2s' }}
          >
            Submit another request
          </Button>
        </motion.div>
      </Box>
    </motion.div>
  );
}

// ─── Wizard Orchestrator ──────────────────────────────────────────────────────

export default function ContactForm() {
  const dispatch = useAppDispatch();
  const { submitStatus, errorMessage } = useAppSelector((s) => s.contact);

  const [data, setData] = useState<WizardData>(INIT);
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [wasSubmitted, setWasSubmitted] = useState(false);

  const isVinPath = data.identMethod === 'vin';

  // Canonical steps 0-4. Step 2 is skipped when VIN path.
  const validate = (atStep: number): boolean => {
    const e: Record<string, string> = {};
    if (atStep === 0 && !data.condition) e.condition = 'Please select a vehicle type.';
    if (atStep === 1 && isVinPath && data.vin.length !== 17) e.vin = 'VIN must be exactly 17 characters.';
    if (atStep === 2) {
      if (!data.year) e.year = 'Year is required.';
      if (!data.make) e.make = 'Make is required.';
      if (!data.model.trim()) e.model = 'Model is required.';
      if (!data.budget) e.budget = 'Budget is required.';
    }
    if (atStep === 4) {
      if (!data.firstName.trim()) e.firstName = 'First name is required.';
      if (!data.lastName.trim()) e.lastName = 'Last name is required.';
      if (!data.email.trim()) e.email = 'Email is required.';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = 'Enter a valid email address.';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const goNext = () => {
    if (!validate(step)) return;
    setDirection(1);
    setErrors({});
    // Skip step 2 (vehicle details) when on VIN path
    setStep(s => (s === 1 && isVinPath) ? 3 : s + 1);
  };

  const goBack = () => {
    setDirection(-1);
    setErrors({});
    // When going back from step 3 on VIN path, return to step 1
    setStep(s => (s === 3 && isVinPath) ? 1 : s - 1);
  };

  const handleSubmit = async () => {
    console.log(data)
    setWasSubmitted(true);
    if (!validate(4)) return;
    dispatch(setSubmitStatus('loading'));
    dispatch(setErrorMessage(null));
    try {
      await new Promise(res => setTimeout(res, 1400));
      dispatch(setContactData(data))
      dispatch(setSubmitStatus('success'));
    } catch {
      dispatch(setSubmitStatus('error'));
      dispatch(setErrorMessage('Something went wrong. Please try again or call us directly.'));
    }
  };

  const reset = () => {
    setData(INIT);
    setStep(0);
    setErrors({});
    setWasSubmitted(false);
    dispatch(resetContact());
  };

  if (submitStatus === 'success') return <SuccessScreen onReset={reset} />;

  const renderStep = () => {
    switch (step) {
      case 0: return <StepCondition data={data} onChange={(v) => setData(d => ({ ...d, condition: v }))} />;
      case 1: return <StepIdentify data={data} setData={setData} errors={errors} />;
      case 2: return <StepVehicleDetails data={data} setData={setData} errors={errors} />;
      case 3: return <StepAdditional data={data} setData={setData} />;
      case 4: return <StepContact data={data} setData={setData} errors={errors} wasSubmitted={wasSubmitted} setErrors={setErrors} />;
    }
  };

  return (
    <Box
      sx={{
        borderRadius: 3,
        backgroundColor: 'rgba(13,17,23,0.96)',
        border: '1px solid rgba(51,65,85,0.45)',
        p: { xs: 3, md: 5 },
      }}
    >
      <WizardProgress step={step} vinPath={isVinPath && step > 1} />

      {submitStatus === 'error' && errorMessage && (
        <Alert severity="error" role="alert" aria-live="assertive" sx={{ mb: 3, backgroundColor: 'rgba(239,68,68,0.1)', color: '#FCA5A5', '& .MuiAlert-icon': { color: '#EF4444' } }}>
          {errorMessage}
        </Alert>
      )}

      <AnimatePresence mode="wait" custom={direction}>
        <motion.div key={step} custom={direction} variants={fade} initial="enter" animate="center" exit="exit">
          {renderStep()}
        </motion.div>
      </AnimatePresence>

      {errors.condition && (
        <Typography sx={{ color: '#EF4444', fontSize: '0.8125rem', mt: 2 }} role="alert">
          {errors.condition}
        </Typography>
      )}

      {/* Navigation */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 5, pt: 3.5, borderTop: '1px solid rgba(51,65,85,0.35)' }}>
        <Button
          onClick={goBack}
          sx={{
            color: '#475569', px: 2, fontFamily: 'var(--font-lexend)',
            visibility: step === 0 ? 'hidden' : 'visible',
            '&:hover': { color: '#F1F5F9', backgroundColor: 'rgba(51,65,85,0.2)' },
          }}
          startIcon={<ChevronLeft />}
        >
          Back
        </Button>

        {step < 4 ? (
          <Button
            variant="contained"
            onClick={goNext}
            disabled={step === 0 && !data.condition}
            sx={{
              backgroundColor: '#DC2626', fontFamily: 'var(--font-lexend)', fontWeight: 600, px: 4,
              '&:hover': { backgroundColor: '#B91C1C' },
              '&.Mui-disabled': { backgroundColor: 'rgba(220,38,38,0.25)', color: 'rgba(255,255,255,0.35)' },
            }}
            endIcon={<ChevronRight />}
          >
            {step === 1 && isVinPath ? 'Skip to Notes' : 'Continue'}
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={submitStatus === 'loading'}
            aria-busy={submitStatus === 'loading'}
            sx={{
              backgroundColor: '#DC2626', fontFamily: 'var(--font-lexend)', fontWeight: 600, px: 4,
              '&:hover': { backgroundColor: '#B91C1C' },
            }}
            startIcon={submitStatus === 'loading' ? <CircularProgress size={16} color="inherit" aria-hidden="true" /> : undefined}
            endIcon={submitStatus !== 'loading' ? <ArrowRight /> : undefined}
          >
            {submitStatus === 'loading' ? 'Submitting…' : 'Get My Free Quote'}
          </Button>
        )}
      </Box>
    </Box>
  );
}
