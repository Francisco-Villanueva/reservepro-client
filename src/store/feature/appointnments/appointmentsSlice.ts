import {} from "@/interfaces";
import { IAppointment } from "@/interfaces/appointments.interface";
import { IStoreState } from "@/store/interface/state.interface";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AppointmentState extends IStoreState {
  total: number;
  limit: number;
  offset: number;
  page: number;
  appointments: IAppointment[];
  selectedAppointment?: IAppointment;
  inmutablesAppointments: IAppointment[];
}

const initialState: AppointmentState = {
  total: 0,
  limit: 0,
  offset: 0,
  page: 0,
  appointments: [],
  inmutablesAppointments: [],
  selectedAppointment: undefined,
  loading: true,
  fetched: false,
};

export const appointmentSlice = createSlice({
  name: "appointments",
  initialState,
  reducers: {
    toggleAppointmentsLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setAppointments: (state, action: PayloadAction<IAppointment[]>) => {
      state.fetched = true;
      state.appointments = action.payload;
      state.inmutablesAppointments = action.payload;
    },
    setAppointmentsTableData: (
      state,
      action: PayloadAction<{
        total: number;
        limit: number;
        offset: number;
        page: number;
      }>
    ) => {
      state.total = action.payload.total;
      state.limit = action.payload.limit;
      state.offset = action.payload.offset;
      state.page = action.payload.page;
    },
    addAppointment: (state, action: PayloadAction<IAppointment>) => {
      state.appointments.push(action.payload);
      state.inmutablesAppointments.push(action.payload);
    },
    setSelectedAppointment: (state, action: PayloadAction<IAppointment>) => {
      state.selectedAppointment = action.payload;
    },
    cancleAppointment: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if (!state.appointments.find((e) => e.id === id)) return;
      const appointmnetCanceled = state.appointments.filter(
        (e) => e.id === id
      )[0];

      const newlist = [
        ...state.appointments.filter((e) => e.id !== id),
        { ...appointmnetCanceled, canceled: true },
      ].sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB.getTime() - dateA.getTime();
      });

      state.appointments = newlist;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addAppointment,
  setAppointments,
  toggleAppointmentsLoading,
  setAppointmentsTableData,
  setSelectedAppointment,
  cancleAppointment,
} = appointmentSlice.actions;

export default appointmentSlice.reducer;
