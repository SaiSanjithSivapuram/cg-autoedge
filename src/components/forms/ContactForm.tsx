'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { setSubmitStatus, setErrorMessage, resetContact } from '@/lib/features/contact/contactSlice';

const VEHICLE_TYPES = [
  'New Car',
  'Used Car',
  'Certified Pre-Owned',
  'Lease',
  'Fleet (Multiple Vehicles)',
];

const BUDGET_RANGES = [
  'Under $20,000',
  '$20,000 – $35,000',
  '$35,000 – $50,000',
  '$50,000 – $75,000',
  '$75,000+',
  'Flexible',
];

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  vehicleType: string;
  budget: string;
  carDetails: string;
  message: string;
};

const EMPTY: FormValues = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  vehicleType: '',
  budget: '',
  carDetails: '',
  message: '',
};

export default function ContactForm() {
  const dispatch = useAppDispatch();
  const { submitStatus, errorMessage } = useAppSelector((s) => s.contact);

  const [values, setValues] = useState<FormValues>(EMPTY);
  const [errors, setErrors] = useState<Partial<FormValues>>({});
  const [wasSubmitted, setWasSubmitted] = useState(false);

  const validate = (): boolean => {
    const e: Partial<FormValues> = {};
    if (!values.firstName.trim()) e.firstName = 'First name is required.';
    if (!values.lastName.trim()) e.lastName = 'Last name is required.';
    if (!values.email.trim()) {
      e.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      e.email = 'Please enter a valid email address.';
    }
    if (!values.vehicleType) e.vehicleType = 'Please select a vehicle type.';
    if (!values.carDetails.trim()) e.carDetails = 'Please describe the car you want.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (field: keyof FormValues) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleBlur = (field: keyof FormValues) => () => {
    if (wasSubmitted) {
      const e: Partial<FormValues> = {};
      if (field === 'firstName' && !values.firstName.trim()) e.firstName = 'First name is required.';
      if (field === 'lastName' && !values.lastName.trim()) e.lastName = 'Last name is required.';
      if (field === 'email') {
        if (!values.email.trim()) e.email = 'Email is required.';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) e.email = 'Please enter a valid email address.';
      }
      if (field === 'vehicleType' && !values.vehicleType) e.vehicleType = 'Please select a vehicle type.';
      if (field === 'carDetails' && !values.carDetails.trim()) e.carDetails = 'Please describe the car you want.';
      setErrors((prev) => ({ ...prev, [field]: e[field] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setWasSubmitted(true);
    if (!validate()) return;

    dispatch(setSubmitStatus('loading'));
    dispatch(setErrorMessage(null));

    try {
      await new Promise((res) => setTimeout(res, 1200));
      dispatch(setSubmitStatus('success'));
    } catch {
      dispatch(setSubmitStatus('error'));
      dispatch(setErrorMessage('Something went wrong. Please try again or call us directly.'));
    }
  };

  if (submitStatus === 'success') {
    return (
      <Card sx={{ borderRadius: 3 }} role="status" aria-live="polite">
        <CardContent sx={{ p: { xs: 4, md: 6 }, textAlign: 'center' }}>
          <CheckCircleOutlineIcon sx={{ fontSize: 64, color: '#16A34A', mb: 2 }} />
          <Typography variant="h5" sx={{ fontWeight: 700, color: '#1E293B', mb: 1.5 }}>
            Request Received!
          </Typography>
          <Typography variant="body1" sx={{ color: '#64748B', lineHeight: 1.75, mb: 4 }}>
            A negotiator will reach out within 24 hours with a personalised strategy for your deal.
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              dispatch(resetContact());
              setValues(EMPTY);
            }}
          >
            Submit another request
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardContent sx={{ p: { xs: 3, md: 5 } }}>
        <Typography variant="h5" sx={{ fontWeight: 700, color: '#1E293B', mb: 0.75 }}>
          Request a Free Quote
        </Typography>
        <Typography variant="body2" sx={{ color: '#64748B', mb: 3.5 }}>
          All fields marked{' '}
          <Box component="span" aria-hidden="true" sx={{ color: '#DC2626' }}>*</Box>{' '}
          are required.
        </Typography>

        {submitStatus === 'error' && errorMessage && (
          <Alert severity="error" role="alert" aria-live="assertive" sx={{ mb: 3 }}>
            {errorMessage}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} noValidate aria-label="Free quote request form">
          <Grid container spacing={2.5}>
            {/* Name */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="First Name *"
                name="firstName"
                value={values.firstName}
                onChange={handleChange('firstName')}
                onBlur={handleBlur('firstName')}
                error={!!errors.firstName}
                helperText={errors.firstName}
                autoComplete="given-name"
                inputProps={{ 'aria-required': 'true' }}
                placeholder="Jane"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Last Name *"
                name="lastName"
                value={values.lastName}
                onChange={handleChange('lastName')}
                onBlur={handleBlur('lastName')}
                error={!!errors.lastName}
                helperText={errors.lastName}
                autoComplete="family-name"
                inputProps={{ 'aria-required': 'true' }}
                placeholder="Smith"
              />
            </Grid>

            {/* Contact */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Email *"
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange('email')}
                onBlur={handleBlur('email')}
                error={!!errors.email}
                helperText={errors.email}
                autoComplete="email"
                inputProps={{ 'aria-required': 'true' }}
                placeholder="jane@example.com"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Phone (optional)"
                type="tel"
                name="phone"
                value={values.phone}
                onChange={handleChange('phone')}
                autoComplete="tel"
                placeholder="+1 (555) 000-0000"
              />
            </Grid>

            {/* Vehicle */}
            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Vehicle Type *"
                name="vehicleType"
                value={values.vehicleType}
                onChange={handleChange('vehicleType')}
                onBlur={handleBlur('vehicleType')}
                error={!!errors.vehicleType}
                helperText={errors.vehicleType}
                inputProps={{ 'aria-required': 'true' }}
              >
                {VEHICLE_TYPES.map((t) => (
                  <MenuItem key={t} value={t}>{t}</MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Budget Range"
                name="budget"
                value={values.budget}
                onChange={handleChange('budget')}
              >
                {BUDGET_RANGES.map((b) => (
                  <MenuItem key={b} value={b}>{b}</MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* Car details */}
            <Grid item xs={12}>
              <TextField
                label="Car Details *"
                name="carDetails"
                value={values.carDetails}
                onChange={handleChange('carDetails')}
                onBlur={handleBlur('carDetails')}
                error={!!errors.carDetails}
                helperText={errors.carDetails || 'Make, model, trim, colour, and any must-have options.'}
                multiline
                rows={3}
                inputProps={{ 'aria-required': 'true' }}
                placeholder="e.g. 2025 Toyota RAV4 XLE, white or silver, with navigation package"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Anything else we should know?"
                name="message"
                value={values.message}
                onChange={handleChange('message')}
                multiline
                rows={3}
                placeholder="Trade-in details, financing preferences, timeline, etc."
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                size="large"
                fullWidth
                disabled={submitStatus === 'loading'}
                aria-busy={submitStatus === 'loading'}
                startIcon={
                  submitStatus === 'loading'
                    ? <CircularProgress size={18} color="inherit" aria-hidden="true" />
                    : undefined
                }
              >
                {submitStatus === 'loading' ? 'Submitting…' : 'Get My Free Quote'}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
}
