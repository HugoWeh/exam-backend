import * as yup from "yup";

export const validationSchema = yup.object({
  name: yup.string().required(),
  description: yup.string().required(),
  owner: yup.string().required(),
  coAuthors: yup.string().required(),
});