import { create } from "zustand";

export const internalUser = create((set) => ({
  rol: null,
  nombres: null,
  apellidos: null,
  dni: null,
  url_imagen: null,
  telefono: null,
  mail: null,
  password: null,
  setRol: ({ rol }) => set({ rol }),
  setNombres: ({ nombres }) => set({ nombres }),
  setApellidos: ({ apellidos }) => set({ apellidos }),
  setDni: ({ dni }) => set({ dni }),
  setUrl_imagen: ({ url_imagen }) => set({ url_imagen }),
  setTelefono: ({ telefono }) => set({ telefono }),
  setMail: ({ mail }) => set({ mail }),
  setPassword: ({ password }) => set({ password })
}));
