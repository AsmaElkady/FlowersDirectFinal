import { Link } from "react-router";
import MyButton from "./MyButton";
import type { IAuthProps } from "../../types/components/ButtonsProps";
import Stack from "react-bootstrap/Stack";

const AuthBtn = ({ name, title, navTo, isLoading, navName }: IAuthProps) => {
  return (
    <Stack className="mt-3">
      <MyButton
        varient={"primary"}
        title={name}
        type="submit"
        isLoading={isLoading}
      />
      <p className="text-muted fw-normal text-center mt-3 small">
        {title}{" "}
        <Link
          to={navTo}
          replace
          className="text-de text-decoration-none fw-bold"
        >
          {navName}
        </Link>
      </p>
    </Stack>
  );
};

export default AuthBtn;
