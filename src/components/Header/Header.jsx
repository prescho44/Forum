import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AppContext } from '../store/app.context';
import { Box, Button, Container, Flex, Heading, Stack, IconButton } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import Profile from './ProfileMenu/Profile';
import Search from '../Search/Search';
import { useDisclosure } from '@chakra-ui/react';
import './Header.css';

export default function Header() {
  const { user, userData } = useContext(AppContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box as="header" bg="teal.500" color="white" py={4}>
      <Container maxW="container.xl">
        <Flex align="center" justify="space-between">
          <Heading as="h1" size="lg">
            <NavLink to="/">Forum</NavLink>
          </Heading>
          <Flex display={{ base: 'none', xl: 'flex' }} flex="1" justify="center" mx={4}>
            <Search />
          </Flex>
          <IconButton
            display={{ base: 'flex', xl: 'none' }}
            onClick={isOpen ? onClose : onOpen}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            variant="outline"
            aria-label="Toggle Navigation"
          />
          <Stack
            direction={{ base: 'column', xl: 'row' }}
            spacing={6}
            align="center"
            display={{ base: isOpen ? 'flex' : 'none', xl: 'flex' }}
            position={{ base: 'absolute', xl: 'relative' }}
            top={{ base: '60px', xl: '0' }}
            left={{ base: '0', xl: 'auto' }}
            right={{ base: '0', xl: 'auto' }}
            bg={{ base: 'teal.500', xl: 'transparent' }}
            p={{ base: 4, xl: 0 }}
            zIndex={{ base: 1, xl: 'auto' }}
          >
            <NavLink to="/dashboard">
              <Button variant="link" color="white">
                Dashboard
              </Button>
            </NavLink>
            {!user && (
              <>
                <NavLink to="/login">
                  <Button variant="link" color="white">
                    Login
                  </Button>
                </NavLink>
                <NavLink to="/register">
                  <Button variant="link" color="white">
                    Register
                  </Button>
                </NavLink>
              </>
            )}
            {user && (
              <>
                {userData?.role !== 'blocked' && (
                  <NavLink to="/upload">
                    <Button variant="link" color="white">
                      Upload
                    </Button>
                  </NavLink>
                )}
                {userData?.role === 'admin' && (
                  <NavLink to="/users">
                    <Button variant="link" color="white">
                      Users
                    </Button>
                  </NavLink>
                )}
                <NavLink to="/car-news">
                  <Button variant="link" color="white">
                    Random Car News
                  </Button>
                </NavLink>
                <Profile />
              </>
            )}
          </Stack>
        </Flex>
        <Flex display={{ base: 'flex', xl: 'none' }} justify="center" mt={4}>
          <Search />
        </Flex>
      </Container>
    </Box>
  );
}