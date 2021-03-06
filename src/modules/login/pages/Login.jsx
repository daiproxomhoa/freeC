import { Container, Paper, Typography } from "@material-ui/core";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Row } from "../../../common/element";
import FormControlTextField from "../../../common/FormControlTextField";
import LoadingButton from "../../../common/LoadingButton";
import { loginAction } from "../../../redux/auth/authReducer";

const Login = (props) => {
  const loading = useSelector((state) => state.auth.authenticating);
  const dispatch = useDispatch();
  const { register, errors, handleSubmit } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {},
  });

  const onSubmit = (data) => dispatch(loginAction(data));

  return (
    <Container>
      <div className="d-flex-center flex-1" style={{ height: "100vh" }}>
        <Paper variant="outlined">
          <Typography variant="h6">Login</Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControlTextField
              name="user_name"
              inputRef={register({
                required: true,
                maxLength: 50,
              })}
              errorMessage={
                errors.user_name?.type === "required" &&
                "Your input is required"
              }
            />
            <FormControlTextField
              name="pass_word"
              type="password"
              inputRef={register({
                required: true,
                maxLength: 50,
              })}
              errorMessage={
                errors.pass_word?.type === "required" &&
                "Your input is required"
              }
            />
            <Row className="d-flex-center" >
              <LoadingButton
                style={{ minWidth: 160, marginRight: 32 }}
                size="large"
                type="submit"
                variant="contained"
                color="secondary"
                disableElevation
                loading={loading}
              >
                Login
              </LoadingButton>
            </Row>
          </form>
        </Paper>
      </div>
    </Container>
  );
};

export default Login;
