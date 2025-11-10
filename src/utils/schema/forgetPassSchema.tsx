import zod from "zod";

export const forgetPassSchema = zod.object({
  email: zod.email("Please enter a correct email"),
});

export type ForgetPassSchemaType = zod.infer<typeof forgetPassSchema>;

export const forgetPassDefaultValues = {
  email: "",
};
