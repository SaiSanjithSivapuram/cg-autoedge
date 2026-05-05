import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UiState {
  mobileMenuOpen: boolean;
  activeSection: string;
  navScrolled: boolean;
}

const initialState: UiState = {
  mobileMenuOpen: false,
  activeSection: 'home',
  navScrolled: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setMobileMenuOpen(state, action: PayloadAction<boolean>) {
      state.mobileMenuOpen = action.payload;
    },
    toggleMobileMenu(state) {
      state.mobileMenuOpen = !state.mobileMenuOpen;
    },
    setActiveSection(state, action: PayloadAction<string>) {
      state.activeSection = action.payload;
    },
    setNavScrolled(state, action: PayloadAction<boolean>) {
      state.navScrolled = action.payload;
    },
  },
});

export const {
  setMobileMenuOpen,
  toggleMobileMenu,
  setActiveSection,
  setNavScrolled,
} = uiSlice.actions;

export default uiSlice.reducer;
