// Import necessary modules and packages
import React, { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useForm, isNotEmpty, isEmail, hasLength } from "@mantine/form";
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
  Group,
} from "@mantine/core";
import { DataContext } from "../../contexts/dataContext";
import { IconAlertCircle, IconFingerprint } from "@tabler/icons-react";
import { makeRequest } from "../../utils/axiosHelper";

// The Register component
function Register() {
  // Get the current user from the DataContext
  const { userData } = useContext(DataContext);
  // Initialize state to keep track of any errors
  const [error, setError] = useState("");
  // Get the navigate function from the react-router-dom
  const navigate = useNavigate();

  // If there is a current user, redirect to home page
  if (userData) {
    return <Navigate to="/" replace />;
  }

  // Submit registration form and handle errors
  const handleRegister = async (e) => {
    try {
      await makeRequest.post("/register", form.values);
      navigate("/login");
    } catch (err) {
      setError(true);
    }
  };

  // Set up form validation
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

  // Render the Register component
  return (
    <div className="app bg-blue-700 text-white">
      {/* Use the Container component from Mantine to center the login form */}
      <Container size={420} py={80}>
        {/* Display the page title and a welcome message */}
        <Group position="center" align="center">
          <IconFingerprint size={40} />
          <Title>SCMS</Title>
        </Group>
        <Title align="center" mt={5}>
          Create an account!
        </Title>

        {/* Display a message with a link to the registration page */}
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Already have an account?{" "}
          <Anchor size="sm" component="button">
            <Link to="/login">Login</Link>
          </Anchor>
        </Text>

        {/* Use the Paper component from Mantine to create a login form */}
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
          {/* Use the TextInput and PasswordInput components from Mantine to create form inputs */}
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

          {/* Use the Button component from Mantine to create a submit button */}
          <Button type="submit" radius="md" fullWidth mt="xl">
            Sign up
          </Button>
        </Paper>

        {/* Display an error message if authentication fails */}
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
            There was an error creating your account. This username or email may already be taken.
          </Alert>
        )}
      </Container>
    </div>
  );
}

export default Register;
