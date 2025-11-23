import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Flex,
  Button,
} from '@chakra-ui/react';
import { ref, query, orderByChild, limitToLast, get } from 'firebase/database';
import { db } from '../../config/firebase-config';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [recentPosts, setRecentPosts] = useState([]);
  const [topCommented, setTopCommented] = useState([]);
  const navigate = useNavigate();

  // Fetch posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
      const recentPostsQuery = query(
        ref(db, 'posts'),
        orderByChild('createdOn'),
        limitToLast(10)
      );

      const snapshot = await get(recentPostsQuery);
      if (snapshot.exists()) {
        const posts = Object.entries(snapshot.val()).map(([id, post]) => ({
        id,
        ...post,
        }));

        setRecentPosts(posts.reverse());

        // Sort by comments count
        const sortedByComments = [...posts]
        .sort(
          (a, b) =>
          Object.keys(b.comments || {}).length -
          Object.keys(a.comments || {}).length
        )
        .slice(0, 10);
        setTopCommented(sortedByComments);
      }
      } catch (error) {
      console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const handleClick = (postId) => {
    navigate(`/post/${postId}`);
  };

  return (
    <Container maxW="container.xl" py={10}>
      {/* Core Features Section */}
      <Box mb={10}>
        <Heading mb={5} color="teal.400" textAlign="center">
          Welcome to Our Forum
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
          <Box p={5} shadow="lg" borderRadius="lg" bg="gray.700">
            <Heading size="md">Create Posts</Heading>
            <Text mt={2}>Share your thoughts and connect with others</Text>
          </Box>
          <Box p={5} shadow="lg" borderRadius="lg" bg="gray.700">
            <Heading size="md">Engage in Discussions</Heading>
            <Text mt={2}>Comment and like posts from the community</Text>
          </Box>
          <Box p={5} shadow="lg" borderRadius="lg" bg="gray.700">
            <Heading size="md">Stay Connected</Heading>
            <Text mt={2}>Follow topics that interest you</Text>
          </Box>
        </SimpleGrid>
      </Box>


      {/* Recent & Most Commented Posts */}
      <Flex direction={{ base: 'column', lg: 'row' }} gap={8} mt={10}>
        <Box flex={1}>
          <Heading size="lg" mb={5} color="teal.400" textAlign='center'>
            Recent Posts
          </Heading>
          {recentPosts.map((post) => (
            <Box
              key={post.id}
              p={4}
              mb={4}
              bg="gray.700"
              borderRadius="lg"
              cursor="pointer"
              onClick={() => handleClick(post.id)}
              _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }}
              transition="all 0.2s"
            >
              <Heading size="md" mb={2}>
                {post.title}
              </Heading>
              <Text noOfLines={2}>{post.content}</Text>
              <Text fontSize="sm" color="gray.400" mt={2}>
                Posted by {post.author} on{' '}
                {new Date(post.createdOn).toLocaleDateString()}
              </Text>
            </Box>
          ))}
        </Box>

        <Box flex={1}>
          <Heading size="lg" mb={5} color="teal.400" textAlign='center'>
            Most Recent & Discussed
          </Heading>
          {topCommented.map((post) => (
            <Box
              key={post.id}
              p={8}
              mb={4}
              bg="gray.700"
              borderRadius="lg"
              cursor="pointer"
              onClick={() => handleClick(post.id)}
              _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }}
              transition="all 0.2s"
            >
              <Heading size="md" mb={2}>
                {post.title}
              </Heading>
              <Text fontSize="sm" color="gray.400">
                {Object.keys(post.comments || {}).length} comments
              </Text>
            </Box>
          ))}
        </Box>
      </Flex>
    </Container>
  );
};

export default Home;
