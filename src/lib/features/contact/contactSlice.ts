import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

interface ContactState {
  data: any
  submitStatus: SubmitStatus;
  errorMessage: string | null;
}

const initialState: ContactState = {
  data: null,
  submitStatus: 'idle',
  errorMessage: null,
};

const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    setContactData(state, action: PayloadAction<any>) {
      state.data = action.payload;
    },
    setSubmitStatus(state, action: PayloadAction<SubmitStatus>) {
      state.submitStatus = action.payload;
    },
    setErrorMessage(state, action: PayloadAction<string | null>) {
      state.errorMessage = action.payload;
    },
    resetContact(state) {
      state.submitStatus = 'idle';
      state.errorMessage = null;
    },
  },
});

export const { setContactData , setSubmitStatus, setErrorMessage, resetContact } =
  contactSlice.actions;

export default contactSlice.reducer;
