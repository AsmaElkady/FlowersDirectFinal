import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import MyInput from "../../components/Inputs/MyInput";
import Password from "../../components/Inputs/Password";
import AuthBtn from "../../components/Buttons/AuthBtn";
import AuthText from "../../components/animations/AuthText";
import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import type { ISignup } from "../../types/auth";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import {
  //getSchemaData,
  signUpSchema,
  type SignUpSchemaType,
} from "../../utils/schema";
import { useNavigate } from "react-router";
import "../../style/auth.css";
import { baseUrl } from "../../constants/main";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../../redux/slices/authSlice";
import { Admin, Customer } from "../../classes/users";
import { toast, ToastContainer } from "react-toastify";
import Helmet from "react-helmet";
import { signupDefaultValues } from "../../utils/schema/signupSchema";

const SignUp = () => {
  //const { defaultValues } = getSchemaData("signup");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const form = useForm<ISignup>({
    defaultValues: signupDefaultValues,
    resolver: zodResolver(signUpSchema),
    mode: "all",
  });

  const handleRegister = async (userValue: ISignup) => {
    let userInfo;
    if (Admin.checkAdmin(userValue.email).status) {
      userInfo = new Admin(
        userValue.email,
        userValue.username,
        userValue.password
      );
    } else {
      userInfo = new Customer(
        userValue.email,
        userValue.username,
        userValue.password,
        {
          cartItems: [],
          totalQuantity: 0,
          totalPrice: 0,
        },
        [],
        []
      );
    }
    const res = await axios.post(baseUrl + "users", userInfo);
    return res;
  };

  const { mutate, isPending, isError, error } = useMutation({
    mutationKey: ["register"],
    mutationFn: handleRegister,
    onSuccess: (res) => {
      dispatch(setToken(res.data.accessToken));
      dispatch(setUser(res.data.user));
      if (Admin.checkAdmin(res.data.user.email).status) {
        navigate("/dashboard", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
      // location.key == "default" ? navigate(-1)
      //   : navigate("/", { replace: true });
    },
    onError: (err) => {
      if (axios.isAxiosError(err) && err.response) {
        toast.error(err.response.data);
      }
    },
  });

  const onSubmit: SubmitHandler<SignUpSchemaType> = (userValue, e) => {
    e?.preventDefault();
    mutate(userValue);
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Sing UP</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <Container fluid>
        <Row className="align-items-center justify-content-center bg-linear h-100">
          <Col sm="12" md="6" className="bg-imgVertical">
            <div className="bg-imgVertical"></div>
          </Col>
          <Col
            md="6"
            sm="12"
            className="d-flex justify-content-center align-items-center vh-100"
          >
            <Col lg="8" md="10" sm="12">
              <AuthText title="Let's Bloom!" />
              <FormProvider {...form}>
                <Form onSubmit={form.handleSubmit(onSubmit)}>
                  <MyInput id="username" label="Username" type="text" />
                  <MyInput id="email" label="Email" type="email" />
                  <Password />
                  <Password label="Repassword" id="re_password" />
                  {isError && (
                    <p className="text-center text-secondary">
                      {error.message && error.message}
                    </p>
                  )}
                  <AuthBtn
                    name="Sign up"
                    title="already have an account?"
                    navName="Login"
                    navTo="/Login"
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

export default SignUp;
