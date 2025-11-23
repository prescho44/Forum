import { useState, useContext } from 'react';
import { Box, Button, Text, Center, Flex } from '@chakra-ui/react';
import Avatar from '../Avatar/Avatar';
import { NavLink } from 'react-router-dom';
import Logout from '../../Logout/Logout';
import { AppContext } from '../../store/app.context';
import { TbArrowBarToUp, TbArrowBarDown } from "react-icons/tb"; // Import the icons
import { TbLogout2 } from "react-icons/tb";
import { FaUser, FaUsers } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md"; // Admin icon

const Profile = () => {
  const [menuView, setMenuView] = useState(false);
  const { userData } = useContext(AppContext);

  return (
    <Box position="relative">
      <Button
        variant="link"
        onClick={() => setMenuView(!menuView)}
        display="flex"
        alignItems="center"
        color="black"
        rightIcon={menuView ? <TbArrowBarToUp /> : <TbArrowBarDown />} // Conditionally render the icon
        aria-expanded={menuView} // For accessibility
      >
        <Avatar />
        <Text ml={2} color="white">Profile</Text>
      </Button>

      {menuView && (
        <Center position="absolute" top="100%" left="0" zIndex="dropdown">
          <Box
            bg="white"
            boxShadow="md"
            borderRadius="md"
            p={3}
            width="auto"
          >
            <NavLink to="/your-profile">
              <Button variant="link" color="black" w="100%" textAlign="left">
                <FaUser style={{ marginRight: '8px' }} />
                Your profile
              </Button>
            </NavLink>

            <Flex align="center" justify="space-between" color="black" mb={2}>
              <Text mr={2}>Status:</Text>
              {userData?.role === 'admin' 
                ? <><MdAdminPanelSettings style={{ marginRight: '8px' }} /> Admin</> 
                : <><FaUsers style={{ marginRight: '8px' }} /> User</>}
            </Flex>

            {/* Logout button */}
            <Button variant="link" color="black" w="100%" textAlign="left" rightIcon={<TbLogout2 />}>
              <Logout />
            </Button>
          </Box>
        </Center>
      )}
    </Box>
  );
};

export default Profile;
