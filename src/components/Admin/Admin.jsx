import { ref, onValue, getDatabase, update } from "firebase/database";
import React, { useEffect, useState } from "react";
import { Box, Button, Heading, Input, Stack, Text } from "@chakra-ui/react";
import { MdOutlineBlock, MdAdminPanelSettings } from "react-icons/md";
import { CgUnblock } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const db = getDatabase();
    const usersRef = ref(db, "users");

    onValue(usersRef, (snapshot) => {
      const usersData = snapshot.val();
      if (usersData) {
        const userList = Object.entries(usersData).map(([id, user]) => ({
          id,
          ...user,
        }));
        setUsers(userList);
      } else {
        setUsers([]);
      }
    });
  }, []);

  const updateUserRole = async (userId, role) => {
    const db = getDatabase();
    const userRef = ref(db, `users/${userId}`);

    await update(userRef, { role })
      .then(() => {
        console.log(`User role updated to ${role}:`, userId);
      })
      .catch((error) => {
        console.error(`Error updating user role to ${role}:`, error);
      });
  };

  const handleDoneClick = () => {
    navigate("/");
    window.location.reload();
  };

  const filteredUsers = users.filter((user) =>
    user.handle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box className="admin-dashboard" p={4} color="white">
      <Heading as="h1" size="xl" mb={6}>
        Admin Dashboard
      </Heading>
      <Input
        placeholder="Search by username"
        mb={4}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Stack spacing={4}>
        {filteredUsers.map((user) => (
          <Box
            key={user.id}
            p={4}
            borderWidth={1}
            borderRadius="md"
            shadow="md"
            bg="#f4f4f4"
            color="black"
          >
            <Text>
              <strong>Username:</strong> {user.handle}
            </Text>
            <Text>
              <strong>Name:</strong> {user.firstName} {user.lastName}
            </Text>
            <Text>
              <strong>Email:</strong> {user.email}
            </Text>
            {user?.phoneNumber && <Text>
              <strong>Phone number:</strong> {user.phoneNumber}
            </Text>}
            <Stack direction="row" spacing={4} mt={4}>
              {user.role === "admin" ? (
                <Button
                  onClick={() => updateUserRole(user.id, "user")}
                  bg="red.500"
                  colorScheme="red"
                  size="sm"
                >
                  Remove Admin Status
                </Button>
              ) : user.role === "user" ? (
                <>
                  <Button
                    onClick={() => updateUserRole(user.id, "admin")}
                    bg="blue.500"
                    colorScheme="blue"
                    size="sm"
                    leftIcon={<MdAdminPanelSettings />}
                    variant="solid"
                  >
                    Make Admin
                  </Button>
                  <Button
                    onClick={() => updateUserRole(user.id, "blocked")}
                    bg="red.500"
                    colorScheme="red"
                    size="sm"
                    leftIcon={<MdOutlineBlock />}
                    variant="solid"
                  >
                    Block User
                  </Button>
                </>
              ) : user.role === "blocked" ? (
                <Button
                  onClick={() => updateUserRole(user.id, "user")}
                  bg="green.500"
                  colorScheme="green"
                  size="sm"
                  leftIcon={<CgUnblock />}
                  variant="solid"
                >
                  Unblock User
                </Button>
              ) : null}
            </Stack>
          </Box>
        ))}
      </Stack>
      <Button
        onClick={handleDoneClick}
        bg="green.500"
        colorScheme="green"
        size="md"
        mt={6}
      >
        Done
      </Button>
    </Box>
  );
}
