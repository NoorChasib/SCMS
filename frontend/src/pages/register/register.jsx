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
import { useForm, isNotEmpty, isEmail, hasLength } from "@mantine/form";
import React, { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { IconAlertCircle } from "@tabler/icons-react";
import { makeRequest } from "../../utilities/axiosHelper";

function Register() {
  const { currentUser } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  if (currentUser) {
    return <Navigate to="/" replace />;
  }

  const handleRegister = async (e) => {
    try {
      await makeRequest.post("/register", form.values);
      navigate("/login");
    } catch (err) {
      setError(true);
    }
  };

  const form = useForm({
    initialValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },

    validate: {
      name: isNotEmpty("Please enter your name"),
      username: hasLength({ min: 3 }, "Username must be at least 3 characters"),
      email: isEmail("Please enter a valid email"),
      password: hasLength({ min: 6 }, "Password must be at least 6 characters"),
    },
  });

  return (
    <div className="app bg-gray-200">
      <Container size={420} py={80}>
        <Title align="center">SCMS</Title>
        <Title align="center">Create an account!</Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Already have an account?{" "}
          <Anchor size="sm" component="button">
            <Link to="/login">Login</Link>
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
            handleRegister();
          })}
        >
          <TextInput
            label="Name"
            placeholder="Your full name"
            radius="md"
            withAsterisk
            {...form.getInputProps("name")}
          />
          <TextInput
            label="Username"
            placeholder="Your username"
            radius="md"
            mt="md"
            withAsterisk
            {...form.getInputProps("username")}
          />
          <TextInput
            label="Email"
            placeholder="you@email.com"
            radius="md"
            mt="md"
            withAsterisk
            {...form.getInputProps("email")}
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
            Sign up
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
            Please check the form for errors
          </Alert>
        )}
      </Container>
    </div>
  );
}

export default Register;
