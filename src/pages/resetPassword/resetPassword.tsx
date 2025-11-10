import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Password from "../../components/Inputs/Password";
import { useMutation } from "@tanstack/react-query";
import type { IResetPass } from "../../types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import {
  resetPassSchema,
  ResetPassDefaultValues,
  type ResetPassSchemaType,
} from "../../utils/schema/resetPassSchema";
import axios from "axios";
import AuthText from "../../components/animations/AuthText";
import { useNavigate } from "react-router";
import { baseUrl } from "../../constants/main";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { toast, ToastContainer } from "react-toastify";
import MyButton from "../../components/Buttons/MyButton";
import { Helmet } from "react-helmet";

const ResetPassword = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();

  const form = useForm<IResetPass>({
    defaultValues: ResetPassDefaultValues,
    resolver: zodResolver(resetPassSchema),
    mode: "all",
  });

  const handleResubmit = async (userValue: IResetPass) => {
    if (user) {
      const obj = {
        password: userValue.password,
      };
      const res = await axios.patch(baseUrl + "users/" + user.id, obj);
      return res;
    }
  };

  const { mutate, isPending, isError, error } = useMutation({
    mutationKey: ["resetPass"],
    mutationFn: handleResubmit,
    onSuccess: () => {
      toast("Your password changed successfully");
      navigate("/Login", { replace: true });
    },
    onError: (err) => {
      if (axios.isAxiosError(err) && err.response) {
        toast.error(err.response.data);
      }
    },
  });

  const onSubmit: SubmitHandler<ResetPassSchemaType> = (userValue, e) => {
    e?.preventDefault();
    mutate(userValue);
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Reset Password</title>
        <link rel="canonical" href="http://mysite.com/resetPassword" />
      </Helmet>
      <Container fluid>
        <Row className="align-items-center bg-linear">
          <Col sm="12" md="6" className="bg-imgVertical" />
          <Col
            md="6"
            sm="12"
            className="d-flex justify-content-center align-items-center vh-100"
          >
            <Col lg="8" md="10" sm="12">
              <AuthText title="Reset Password" />
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
                    varient="primary"
                    title="Reset"
                    isLoading={isPending}
                  />
                </Form>
              </FormProvider>
            </Col>
          </Col>
        </Row>
        <ToastContainer />
      </Container>
    </>
  );
};

export default ResetPassword;
