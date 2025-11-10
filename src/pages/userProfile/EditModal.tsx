import Form from "react-bootstrap/Form";
import MyInput from "../../components/Inputs/MyInput";
import { useMutation } from "@tanstack/react-query";
import type { IEditProfileProps, IProfile } from "../../types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import axios from "axios";
import { baseUrl } from "../../constants/main";
import type { AppDispatch } from "../../redux/store";
import MyButton from "../../components/Buttons/MyButton";
import {
  profileSchema,
  type ProfileSchemaType,
} from "../../utils/schema/profileSchema";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/authSlice";

const EditModal = ({ checkEditStatus, user }: IEditProfileProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const form = useForm<IProfile>({
    defaultValues: {
      email: user.email,
      username: user.username,
    },
    resolver: zodResolver(profileSchema),
    mode: "all",
  });

  const handleResubmit = async (userValue: IProfile) => {
    const obj = {
      username: userValue.username,
      email: userValue.email,
    };
    const res = await axios.patch(baseUrl + "users/" + user.id, obj);
    return res;
  };

  const { mutate, isPending } = useMutation({
    mutationKey: ["editProfile"],
    mutationFn: handleResubmit,
    onSuccess: (res) => {
      dispatch(setUser(res.data));
      checkEditStatus({ status: true, msg: "" });
    },
    onError: (err) => {
      const message =
        err instanceof Error
          ? err.message
          : typeof err === "string"
          ? err
          : "Something went wrong";
      checkEditStatus({ status: false, msg: message });
    },
  });

  const onSubmit: SubmitHandler<ProfileSchemaType> = (userValue, e) => {
    // const obj = {
    //   username: userValue.username,
    //   email: userValue.email,
    // };
    e?.preventDefault();
    // console.log(dispatch(Customer.editProfile({id,obj})));
    //checkEditStatus();
    mutate(userValue);
  };

  return (
    <>
      <FormProvider {...form}>
        <Form onSubmit={form.handleSubmit(onSubmit)}>
          <MyInput
            id="username"
            label="Username"
            type="text"
            value={user.username}
          />
          <MyInput id="email" label="Email" type="email" value={user.email} />
          <MyButton
            varient={"primary"}
            title={"Edit Info"}
            isLoading={isPending}
          />
        </Form>
      </FormProvider>
    </>
  );
};

export default EditModal;
