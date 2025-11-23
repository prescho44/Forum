import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useContext, useMemo } from 'react';
import { ref, onValue, get, update } from 'firebase/database';
import {
  Box,
  Text,
  Button,
  Stack,
  Heading,
  Flex,
  Checkbox,
} from '@chakra-ui/react';
import { AppContext } from '../store/app.context';
import { db } from '../../config/firebase-config';

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [sortByLikes, setSortByLikes] = useState(false);
  const [sortByComments, setSortByComments] = useState(false);
  const { user } = useContext(AppContext);
  const navigate = useNavigate();

  // Fetch posts from Firebase
  useEffect(() => {
    const postsRef = ref(db, 'posts');
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
  }, []);

  // Navigate to the post detail page
  const handleClick = (postId) => {
    navigate(`/post/${postId}`);
  };

  // Handle like/unlike action
  const handleLike = async (postId) => {
    if (!user) return;

    const postRef = ref(db, `posts/${postId}/likes/${user.uid}`);
    try {
      const snapshot = await get(postRef);

      const updates = {};
      if (snapshot.exists()) {
        updates[`posts/${postId}/likes/${user.uid}`] = null;
      } else {
        updates[`posts/${postId}/likes/${user.uid}`] = true;
      }

      await update(ref(db), updates);
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };

  // Check if the user has liked the post
  const isLikedByUser = (post) => {
    return post.likes && post.likes[user?.uid];
  };

  // Get the number of likes
  const getLikesCount = (post) => {
    return post.likes ? Object.keys(post.likes).length : 0;
  };

  const getCommentsCount = (post) => {
    return post.comments ? Object.keys(post.comments).length : 0;
  };

  // Format the date to a readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date) ? 'Invalid date' : date.toISOString().split('T')[0];
  };

  const sortedPosts = useMemo(() => {
    let sorted = [...posts];

    sorted.sort((a, b) => {
      if (sortByLikes && sortByComments) {
        return (
          getLikesCount(b) - getLikesCount(a) ||
          getCommentsCount(b) - getCommentsCount(a)
        );
      }
      if (sortByLikes) return getLikesCount(b) - getLikesCount(a);
      if (sortByComments) return getCommentsCount(b) - getCommentsCount(a);
      return new Date(b.createdOn) - new Date(a.createdOn); // Default sorting
    });

    return sorted;
  }, [posts, sortByLikes, sortByComments]);

  return (
    <Box
      p={5}
      w="100%"
      display="flex"
      justifyContent="center"
      minHeight="100vh"
    >
      <Stack spacing={8} w="80%" mt={4}>
        <Box mb={4}>
          <Checkbox
            isChecked={sortByLikes}
            onChange={(e) => setSortByLikes(e.target.checked)}
            colorScheme="teal"
          >
            <Text color="white">Sort by most liked</Text>
          </Checkbox>
          <Checkbox
            marginLeft={4}
            isChecked={sortByComments}
            onChange={(e) => setSortByComments(e.target.checked)}
            colorScheme="teal"
          >
            <Text color="white">Sort by Most Commented</Text>
          </Checkbox>
        </Box>

        {sortedPosts.map((post) => (
          <Box
            key={post.id}
            p={6}
            bg="gray.700"
            borderRadius="lg"
            boxShadow="lg"
            transition="transform 0.2s"
            _hover={{ transform: 'scale(1.05)', bg: 'gray.600' }}
          >
            <Heading
              as="h2"
              size="xl"
              mb={4}
              onClick={() => handleClick(post.id)}
              _hover={{ cursor: 'pointer', color: 'blue.400' }}
            >
              {post.title}
            </Heading>
            <Text noOfLines={3} mb={5} fontSize="lg">
              {post.content}
            </Text>
            <Flex align="center" justify="space-between">
              <Flex>
                <Button
                  onClick={() => handleClick(post.id)}
                  colorScheme="teal"
                  variant="solid"
                  size="md"
                  mr={2}
                >
                  View Details
                </Button>
                {user && (
                  <Button
                    onClick={() => handleLike(post.id)}
                    colorScheme={isLikedByUser(post) ? 'red' : 'teal'}
                    variant="solid"
                    size="md"
                  >
                    {isLikedByUser(post) ? 'Unlike' : 'Like'}
                  </Button>
                )}
              </Flex>
            </Flex>
            <Text mt={4} fontSize="md" color="gray.400">
              Likes: {getLikesCount(post)} | Comments: {getCommentsCount(post)}{' '}
              | Posted on {formatDate(post.createdOn)}
            </Text>
            <Text mt={2} fontSize="md" color="teal.300">
              Tags: {post.tags ? Object.keys(post.tags).join(' | ') : 'No Tags'}
            </Text>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default Dashboard;
