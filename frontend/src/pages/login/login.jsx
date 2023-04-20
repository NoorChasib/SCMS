import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Button,
  Alert,
} from "@mantine/core";
import React, { useContext, useState } from "react";
import { useForm, hasLength } from "@mantine/form";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { IconAlertCircle } from "@tabler/icons-react";

function Login() {
  const { login, currentUser } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  if (currentUser) {
    return <Navigate to="/" replace />;
  }

  const handleLogin = async (e) => {
    try {
      await login(form.values);
      navigate("/");
    } catch (err) {
      setError(true);
    }
  };

  const form = useForm({
    initialValues: {
      username: "",
      password: "",
    },

    validate: {
      username: hasLength({ min: 3 }, "Username must be at least 3 characters"),
      password: hasLength({ min: 6 }, "Password must be at least 6 characters"),
    },
  });

  return (
    <div className="app bg-gray-200">
      <Container size={420} py={80}>
        <Title align="center">SCMS</Title>
        <Title align="center">Welcome back!</Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Do not have an account yet?{" "}
          <Anchor size="sm" component="button">
            <Link to="/register">Create account</Link>
          </Anchor>
        </Text>

        <Paper
          withBorder
          shadow="lg"
          p={30}
          mt={30}
          radius="lg"
          component="form"
          onSubmit={form.onSubmit(async () => {
            handleLogin();
          })}
        >
          <TextInput
            label="Username"
            placeholder="Your username"
            radius="md"
            withAsterisk
            {...form.getInputProps("username")}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            radius="md"
            mt="md"
            withAsterisk
            {...form.getInputProps("password")}
          />
          <Button type="submit" radius="md" fullWidth mt="xl">
            Sign in
          </Button>
        </Paper>
        {error && (
          <Alert
            my={20}
            icon={<IconAlertCircle size="1rem" />}
            title="Whoops!"
            color="red"
            radius="lg"
            withCloseButton
            onClose={() => setError(false)}
          >
            Please check your username and password
          </Alert>
        )}
      </Container>
    </div>
  );
}

export default Login;
