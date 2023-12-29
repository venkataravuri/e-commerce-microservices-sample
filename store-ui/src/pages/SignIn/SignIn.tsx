import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import user_signin from "../../api/user_signin";
import { CssTextField } from "../../components/CssTextField/CssTextField";
import { useBearStore } from "../../store/store";
// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const { setLoginData } = useBearStore();

  const navigate = useNavigate();

  const handleSignIn = async () => {
    const res = await user_signin(email, password);
    if (!res) {
      setLoginError(true);
      alert("로그인에 실패하였습니다.");
    } else {
      console.log(res);
      setLoginData(
        res.accessToken,
        true,
        res.loggedInUserEmail,
        res.loggedInUserName
      );
      alert("로그인에 성공했습니다.");
      navigate("/");
    }
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    setEmailError(!emailRegex.test(event.target.value));
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSignUp = () => {
    navigate("/sign-up");
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#4CDA66" }}>
            <LockOutlinedIcon
              sx={{
                backgroundColor: "#4CDA66",
              }}
            />
          </Avatar>
          <Typography component="h1" variant="h5">
            이메일 로그인
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <CssTextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="이메일 주소"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={handleEmailChange}
              error={emailError}
              helperText={emailError ? "이메일 형식이 아닙니다." : ""}
            />
            <CssTextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="비밀번호"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handlePasswordChange}
            />
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: "#222222",
                ":hover": { backgroundColor: "#111111" },
              }}
              onClick={handleSignIn}
            >
              로그인
            </Button>

            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{
                backgroundColor: "white",
                borderColor: "#222222",
                color: "#222222",
                borderStyle: "solid",
                borderWidth: "1px",
                ":hover": { backgroundColor: "#111111", color: "white" },
                mb: 1,
              }}
              onClick={handleSignUp}
            >
              회원가입
            </Button>

            {loginError && (
              <Typography color="error" fontSize={15}>
                이메일 또는 비밀번호가 올바르지 않습니다. 다시 확인해주세요.
              </Typography>
            )}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
