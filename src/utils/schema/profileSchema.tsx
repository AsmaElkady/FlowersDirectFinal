import zod from "zod";

export const profileSchema = zod.object({
  username: zod
    .string()
    .min(3, "Please Enter your fullname")
    .max(15, "max length is 15"),
  email: zod.email("Please Enter a correct email"),
});

export type ProfileSchemaType = zod.infer<typeof profileSchema>;

export const ProfileDefaultValues = {
  name: "",
  email: "",
};
