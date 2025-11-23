import React, { useState, useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { FaUsers } from "react-icons/fa";
import { FaComments } from "react-icons/fa";
import { Flex, Text } from '@chakra-ui/react';



export default function PostsAndUsers() {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const db = getDatabase();

    // Fetch posts
    const postsRef = ref(db, "posts");
    onValue(postsRef, (snapshot) => {
      const postsData = snapshot.val();
      if (postsData) {
        const postList = Object.entries(postsData).map(([id, post]) => ({
          id,
          ...post,
        }));
        setPosts(postList);
      } else {
        setPosts([]);
      }
    });

    // Fetch users
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

  return (
    <Flex justify="center" align="center" gap={4}>
      <Text display="flex" alignItems="center">
        <FaComments style={{ marginRight: '8px' }} />
        {posts.length}
      </Text>
      <Text display="flex" alignItems="center">
        <FaUsers style={{ marginRight: '8px' }} />
        {users.length}
      </Text>
    </Flex>
  );
}
