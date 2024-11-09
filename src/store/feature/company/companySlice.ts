import { ICompany } from "@/interfaces";
import { IStoreState } from "@/store/interface/state.interface";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CompanyState extends IStoreState {
  value: number;
  companies: ICompany[];
  selectedCompany?: ICompany;

  inmutablesCompanies: ICompany[];
}

const initialState: CompanyState = {
  value: 0,
  companies: [],
  inmutablesCompanies: [],
  selectedCompany: undefined,
  loading: true,
};

export const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    toggleCompanyLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setCompanies: (state, action: PayloadAction<ICompany[]>) => {
      state.companies = action.payload;
      state.inmutablesCompanies = action.payload;
    },
    addCompany: (state, action: PayloadAction<ICompany>) => {
      state.companies.push(action.payload);
      state.inmutablesCompanies.push(action.payload);
    },
    removeCompany: (state, action: PayloadAction<string>) => {
      state.companies = state.companies.filter((c) => c.id !== action.payload);
      state.inmutablesCompanies = state.inmutablesCompanies.filter(
        (c) => c.id !== action.payload
      );
    },
    setSelectedCompany: (state, action: PayloadAction<ICompany>) => {
      state.selectedCompany = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setCompanies,
  addCompany,
  toggleCompanyLoading,
  setSelectedCompany,
  removeCompany,
} = companySlice.actions;

export default companySlice.reducer;
