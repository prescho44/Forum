import { AppContext } from '../store/app.context';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../services/auth.service';
import { createUserHandle, getUserByHandle } from '../../services/users.service';
import { Box, Button, Input, Heading, Stack, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function Register() {
  const { setAppState } = useContext(AppContext);
  const [user, setUser] = useState({
    handle: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'user',
  });

  const navigate = useNavigate();

  const register = async () => {

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 
 
  if (!emailRegex.test(user.email)) {
      return alert("Please enter a valid email address");
    }
 

    if (
      !user.handle ||
      !user.email ||
      !user.password ||
      !user.firstName ||
      !user.lastName
    ) {
      return alert('Please enter username, email, and password');
    }

    if (
      user.firstName.length < 4 ||
      user.firstName.length > 32 ||
      user.lastName.length < 4 ||
      user.lastName.length > 32
    ) {
      return alert('First and last name must be around 4 to 32 symbols');
    }

    try {
      const userFromDB = await getUserByHandle(user.handle);
      if (userFromDB) {
        throw new Error(`User with handle ${user.handle} already exists`);
      }

      const userCredential = await registerUser(user.email, user.password);
      await createUserHandle(
        user.handle,
        userCredential.user.uid,
        user.email,
        user.firstName,
        user.lastName,
        user.role
      );

      setAppState({
        user: userCredential.user,
        userData: null,
      });
      navigate('/');
    } catch (error) {
      alert(error.message);
    }
  };

  const updateUser = (prop) => (e) => {
    setUser({
      ...user,
      [prop]: e.target.value,
    });
  };

  return (
    <Box maxW="md" mx="auto" p={4}>
      <Heading as="h3" size="lg" mb={6}>Register</Heading>
      <Stack spacing={4}>
        <Input
          value={user.handle}
          onChange={updateUser('handle')}
          type="text"
          id="handle"
          placeholder="Username"
          required
        />
        <Input
          value={user.firstName}
          onChange={updateUser('firstName')}
          type="text"
          id="firstName"
          placeholder="First Name"
          maxLength={32}
          required
        />
        <Input
          value={user.lastName}
          onChange={updateUser('lastName')}
          type="text"
          id="lastName"
          placeholder="Last Name"
          maxLength={32}
          required
        />
        <Input
          value={user.email}
          onChange={updateUser('email')}
          type="email"
          id="email"
          placeholder="Email"
          required
        />
        <Input
          value={user.password}
          onChange={updateUser('password')}
          type="password"
          id="password"
          placeholder="Password"
          required
        />
        <Button onClick={register} colorScheme="blue" width="full" mt={4}>
          Register
        </Button>
      </Stack>
      <Text mt={4} fontSize="sm" color="gray.600" textAlign="center">
        Already have an account?  <Link to="/login" style={{ color: 'blue', textDecoration: 'underline' }}>Login</Link>
      </Text>
    </Box>
  );
}
