import zod from "zod";
import { PassRegex } from "../../constants/main";

export const signUpSchema = zod
  .object({
    username: zod
      .string()
      .min(3, "Please Enter your fullname")
      .max(15, "max length is 15"),
    email: zod.email("Please Enter a correct email"),
    password: zod
      .string()
      .min(8, "Your password should be 8 characters")
      .regex(
        PassRegex,
        "Password must contain lower, upper chartecter and symbol"
      ),
    re_password: zod.string(),
  })
  .refine((data) => data.password === data.re_password, {
    message: "Passwords do not match",
    path: ["re_password"],
  });

export type SignUpSchemaType = zod.infer<typeof signUpSchema>;

export const signupDefaultValues = {
  name: "",
  email: "",
  password: "",
  re_password: "",
};
