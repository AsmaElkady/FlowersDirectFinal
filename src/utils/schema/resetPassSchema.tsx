import zod from "zod";
import { PassRegex } from "../../constants/main";

export const resetPassSchema = zod
  .object({
    password: zod.string().regex(PassRegex, "Please enter a strong password"),
    re_password: zod.string(),
  })
  .refine((data) => data.password === data.re_password, {
    message: "Passwords do not match",
    path: ["re_password"],
  });

export type ResetPassSchemaType = zod.infer<typeof resetPassSchema>;

export const ResetPassDefaultValues = {
  password: "",
  re_password: "",
};
