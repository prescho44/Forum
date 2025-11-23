import PostsAndUsers from '@/Posts&Users/Posts&Users';
import './Footer.css';
import {
  Box,
  Container,
  Stack,
  Text,
  IconButton,
  Divider,
} from '@chakra-ui/react';
import { SiGithub } from 'react-icons/si';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../store/app.context';

const socialLinks = [
  { href: 'https://github.com/Plamen536/Forum2', icon: <SiGithub /> },
];

const Footer = () => {
  const { user } = useContext(AppContext);

  return (
    <Box bg="gray.900" color="gray.300" py={8}>
      <Container maxW="container.lg">
        <Stack spacing={6}>
          {/* Navigation Links */}
          <Stack
            direction={{ base: 'column', md: 'row' }}
            spacing={6}
            justify="center"
            align="center"
          >
            <Link to="/" _hover={{ color: 'white' }}>
              Home
            </Link>

            <Link to="/dashboard" _hover={{ color: 'white' }}>
              Dashboard
            </Link>

            {user ? (
              <>
                <Link to="/upload" _hover={{ color: 'white' }}>
                  Upload
                </Link>

                <Link to="/your-profile" _hover={{ color: 'white' }}>
                  Your profile
                </Link>
              </>
            ) : (
              <>
                <Link to="/login" _hover={{ color: 'white' }}>
                  Login
                </Link>

                <Link to="/register" _hover={{ color: 'white' }}>
                  Register
                </Link>
              </>
            )}
          </Stack>

          {/* Social Media Icons */}
          <Stack direction="row" spacing={4} justify="center">
            {socialLinks.map(({ href, icon }, index) => (
              <IconButton
                key={index}
                target="_blank"
                rel="noopener noreferrer"
                as="a"
                href={href}
                aria-label="GitHub"
                variant="ghost"
                color="gray.300"
                boxSize={10}
                fontSize={30}
                _hover={{ color: 'white', bg: 'gray.700' }}
                icon={icon}
              />
            ))}
          </Stack>

          <Divider borderColor="gray.600" />
          <PostsAndUsers />
          {/* Copyright */}
          <Text textAlign="center" fontSize="sm">
            &copy; {new Date().getFullYear()} Forum. All rights reserved.
          </Text>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
