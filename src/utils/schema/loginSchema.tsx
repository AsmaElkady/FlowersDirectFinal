import zod from "zod";
import { PassRegex } from "../../constants/main";

export const loginSchema = zod.object({
  email: zod.email("Please enter a correct email"),
  password: zod.string().regex(PassRegex, "Please enter a strong passwrod"),
});

export type LoginSchemaType = zod.infer<typeof loginSchema>;

export const loginDefaultValues = {
  email: "",
  password: "",
};
