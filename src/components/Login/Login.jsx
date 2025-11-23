import { AppContext } from "../store/app.context";
import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loginUser } from "../../services/auth.service";
import { Box, Button, Input, Heading, Stack, Text } from '@chakra-ui/react';
import { Link } from "react-router-dom";

export default function Login() {
  const { setAppState } = useContext(AppContext);
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const location = useLocation();

  const login = () => {
    if (!user.email || !user.password) {
      return alert('Please enter email and password');
    }

    loginUser(user.email, user.password)
      .then((userCredential) => {
        setAppState({
          user: userCredential.user,
          userData: null,
        });

        navigate(location.state?.from.pathname ?? '/');
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  const updateUser = (prop) => (e) => {
    setUser({
      ...user,
      [prop]: e.target.value,
    });
  };

  return (
    <Box maxW="md" mx="auto" p={4}>
      <Heading as="h3" size="lg" mb={6}>Login</Heading>
      <Stack spacing={4}>
        <Input
          value={user.email}
          onChange={updateUser('email')}
          type="email"
          id="email"
          placeholder="Enter your email"
          required
        />
        <Input
          value={user.password}
          onChange={updateUser('password')}
          type="password"
          id="password"
          placeholder="Enter your password"
          required
        />
        <Button onClick={login} colorScheme="blue" width="full" mt={4}>
          Login
        </Button>
      </Stack>
      <Text mt={4} fontSize="sm" color="gray.600" textAlign="center">
        Don't have an account? <Link to="/register" style={{ color: '#1541ff', textDecoration: 'underline' }}>Sign Up</Link>
      </Text>
    </Box>
  );
}
