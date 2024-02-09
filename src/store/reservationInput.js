import { create } from "zustand";

export const useReservationInput = create((set) => ({
  mailPago: "",
  telefonoPago: "",
  tipoServicio: "",
  fechaInicio: null,
  fechaFin: null,
  habitaciones: [],
  huespedes: [],
  statusPartialComplete: false,
  setMailPago: ({ mailPago }) => set({ mailPago }),
  setTelefonoPago: ({ telefonoPago }) => set({ telefonoPago }),
  setTipoServicio: ({ tipoServicio }) => set({ tipoServicio }),
  setFechaInicio: ({ fechaInicio }) => set({ fechaInicio }),
  setFechaFin: ({ fechaFin }) => set({ fechaFin }),
  setHabitaciones: ({ habitaciones }) => set({ habitaciones }),
  setListHuespedes: ({ huespedes }) => set({ huespedes }),
  setStatusPartialComplete: ({ statusPartialComplete }) =>
    set({ statusPartialComplete }),
}));
