// Import necessary modules and packages
import React, { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useForm, hasLength } from "@mantine/form";
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

function Login() {
  // Retrieve the login function and current user from the DataContext
  const { login, userData } = useContext(DataContext);

  // Set an error state for displaying authentication errors
  const [error, setError] = useState("");

  // Retrieve a navigation object for navigating to other routes
  const navigate = useNavigate();

  // If a current user exists, navigate to the home page
  if (userData) {
    // Use the Navigate component to redirect to the home page
    return <Navigate to="/" replace />;
  }

  // Handle the login form submission
  const handleLogin = async (e) => {
    try {
      // Call the login function from the DataContext with the form values
      await login(form.values);

      // Navigate to the home page upon successful login
      navigate("/");
    } catch (err) {
      // Display an error message if authentication fails
      setError(true);
    }
  };

  // Create a form using the useForm hook from the @mantine/form package
  const form = useForm({
    initialValues: {
      username: "",
      password: "",
    },

    // Define validation rules for the form fields
    validate: {
      username: hasLength({ min: 3 }, "Username must be at least 3 characters"),
      password: hasLength({ min: 6 }, "Password must be at least 6 characters"),
    },
  });

  // Render the login page UI
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
          Welcome back!
        </Title>

        {/* Display a message with a link to the registration page */}
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Do not have an account yet?{" "}
          <Anchor size="sm" component="button">
            <Link to="/register">Create account</Link>
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
            handleLogin();
          })}
        >
          {/* Use the TextInput and PasswordInput components from Mantine to create form inputs */}
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

          {/* Use the Button component from Mantine to create a submit button */}
          <Button type="submit" radius="md" fullWidth mt="xl">
            Sign in
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
            There was an error logging in to your account. Please check the
            username or email.
          </Alert>
        )}
      </Container>
    </div>
  );
}

export default Login;
