import {
  KEEP_FORM,
} from "./types";

export const setKeepForm = (boolean) => ({type: KEEP_FORM, payload: boolean})