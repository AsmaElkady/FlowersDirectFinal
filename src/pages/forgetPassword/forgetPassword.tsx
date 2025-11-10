import { useState } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import MyInput from "../../components/Inputs/MyInput";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";
import AuthText from "../../components/animations/AuthText";
import axios from "axios";
import {
  forgetPassSchema,
  forgetPassDefaultValues,
} from "../../utils/schema/forgetPassSchema";
import { useNavigate } from "react-router";
import { adminEmail, baseUrl } from "../../constants/main";
import { useDispatch } from "react-redux";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { IForgetPass } from "../../types/auth";
import { setUser } from "../../redux/slices/authSlice";
import AuthBtn from "../../components/Buttons/AuthBtn";
import { motion } from "motion/react";
import { toast, ToastContainer } from "react-toastify";
import { Helmet } from "react-helmet";

const ForgetPassword = () => {
  const [userData, setUserData] = useState<IForgetPass>({ email: "" });
  const [fetch, setFetch] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const form = useForm<IForgetPass>({
    defaultValues: forgetPassDefaultValues,
    resolver: zodResolver(forgetPassSchema),
    mode: "all",
  });

  const { isLoading, isError, error } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const users = await axios
        .get(baseUrl + "users?email=" + userData.email)
        .then((res) => {
          if (res) {
            if (res.data.length > 0) {
              dispatch(setUser(res.data[0]));
              navigate("/ResetPassword", { replace: true });
              return res;
            } else {
              toast.error("There is no user with this email");
              return [];
            }
          } else {
            toast.error("Please make sure from your data and conection");
          }
          return res;
        });
      return users || [];
    },
    enabled: fetch,
    retry: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const onSubmit: SubmitHandler<IForgetPass> = (userValue: IForgetPass, e) => {
    if (userValue.email == adminEmail) {
      toast.error("Can't change password for this user");
    } else {
      e?.preventDefault();
      setUserData(userValue);
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setFetch(true);
    }
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Forget Password</title>
        <link rel="canonical" href="http://mysite.com/forgetPassword" />
      </Helmet>
      <Container fluid>
        <Row className="align-items-center justify-content-center bg-linear h-100">
          <Col sm="12" md="6" className="bg-imgVertical" />
          <Col
            md="6"
            sm="12"
            className="d-flex justify-content-center align-items-center vh-100"
          >
            <Col lg="8" md="10" sm="12">
              <motion.img
                src="/img/auth/passs.png"
                width={"40%"}
                initial={{ x: 0 }}
                animate={{ x: 220 }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  repeatType: "reverse",
                }}
                className="passImg align-items-center justify-content-center align-self-center"
              />
              <AuthText title="Forget Password" />
              <p className="text-center">Did you forget your password ?</p>
              <FormProvider {...form}>
                <Form onSubmit={form.handleSubmit(onSubmit)}>
                  <MyInput id="email" label="Email" type="email" />
                  {isError && (
                    <p className="text-center text-secondary">
                      {error.message}
                    </p>
                  )}
                  <AuthBtn
                    name="Confirm"
                    title="Don't have an account?"
                    navName="Sign Up"
                    navTo="/Signup"
                    isLoading={isLoading}
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

export default ForgetPassword;
