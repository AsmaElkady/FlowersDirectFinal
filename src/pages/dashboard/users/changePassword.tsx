import Form from "react-bootstrap/Form";
import Password from "../../../components/Inputs/Password";
import { useMutation } from "@tanstack/react-query";
import type { IChangePasswordProps, IResetPass } from "../../../types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import {
  resetPassSchema,
  ResetPassDefaultValues,
  type ResetPassSchemaType,
} from "../../../utils/schema/resetPassSchema";
import axios from "axios";
import { baseUrl } from "../../../constants/main";
import MyButton from "../../../components/Buttons/MyButton";

const ChangePassword = ({ checkResetStatus, id }: IChangePasswordProps) => {
  const form = useForm<IResetPass>({
    defaultValues: ResetPassDefaultValues,
    resolver: zodResolver(resetPassSchema),
    mode: "all",
  });

  const handleResubmit = async (userValue: IResetPass) => {
    const obj = {
      password: userValue.password,
    };
    const res = await axios.patch(baseUrl + "users/" + id, obj);
    return res;
  };

  const { mutate, isPending, isError, error } = useMutation({
    mutationKey: ["resetPass"],
    mutationFn: handleResubmit,
    onSuccess: () => {
      checkResetStatus({ status: true, msg: "" });
    },
    onError: (err) => {
      const message =
        err instanceof Error
          ? err.message
          : typeof err === "string"
          ? err
          : "Something went wrong";
      checkResetStatus({ status: false, msg: message });
    },
  });

  const onSubmit: SubmitHandler<ResetPassSchemaType> = (userValue, e) => {
    e?.preventDefault();
    mutate(userValue);
  };

  return (
    <>
      <FormProvider {...form}>
        <Form onSubmit={form.handleSubmit(onSubmit)}>
          <Password id="password" />
          <Password label="Repassword" id="re_password" />
          {isError && (
            <p className="text-center text-secondary">
              {error.message && error.message}
            </p>
          )}
          <MyButton
            varient={"primary"}
            title={"Reset Password"}
            isLoading={isPending}
          />
        </Form>
      </FormProvider>
    </>
  );
};

export default ChangePassword;
