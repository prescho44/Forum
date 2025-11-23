import './PostView.css';
import { useState, useEffect, useContext } from 'react';
import { AppContext } from '../store/app.context';
import PostHeader from './PostHeader/PostHeader';
import PostContent from './PostContent/PostContent';
import PostActions from './PostActions/PostActions';
import { useParams } from 'react-router-dom';
import { onValue, ref } from 'firebase/database';
import { db } from '../../config/firebase-config';
import {
  Box,
  Spinner,
  Text,
  VStack,
  Container,
  Button,
  Center,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react';

/**
 * @module PostView
 * @description Main container component for viewing a complete post
 *
 * @component
 *
 * @example
 * return (
 *   <PostView />
 * )
 *
 * @returns {JSX.Element} Complete post view with header, content, and actions
 */

const PostView = () => {
  const { user } = useContext(AppContext);
  
  const [viewComments, setViewComments] = useState(false);
  const [viewReply, setViewReply] = useState(false);
  const [reply, setReply] = useState([]);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  // Dark mode background color for components
  const bgColor = useColorModeValue('gray.800', 'gray.900');
  const boxBgColor = useColorModeValue('gray.700', 'gray.800');
  const textColor = useColorModeValue('white', 'gray.200');
  const borderColor = useColorModeValue('gray.600', 'gray.700');

  // Fetch post data from Firebase
  useEffect(() => {
    const postRef = ref(db, `posts/${id}`);

    const unsubscribe = onValue(postRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setPost(data);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [id]);

  // Toggle functions for comments and replies
  const toggleViewComments = () => {
    setViewComments(!viewComments);
  };

  const toggleViewReply = () => {
    setViewReply(!viewReply);
  };

  // Loading spinner while fetching data
  if (loading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" color="teal.500" />
      </Center>
    );
  }

  // If no post found, display error message
  if (!post) {
    return (
      <Center h="100vh">
        <Text fontSize="lg" color="red.500">
          Post not found
        </Text>
      </Center>
    );
  }

  return (
    <Container maxW="3xl" p={6} bg={bgColor} color={textColor}>
      <VStack spacing={6} align="start">
        {/* Post Header */}
        <Box
          w="full"
          p={6}
          borderWidth={1}
          borderRadius="md"
          boxShadow="lg"
          bg={boxBgColor}
          borderColor={borderColor}
        >
          <PostHeader user={post.author} title={post.title} isAdmin={true} />
        </Box>

        <Box
          w="full"
          p={6}
          borderWidth={1}
          borderRadius="md"
          boxShadow="lg"
          bg={boxBgColor}
          borderColor={borderColor}
        >
          {/* Post Content */}
          <PostContent content={post.content} />
        </Box>

        {/* Post Actions */}
        <Box
          w="full"
          p={6}
          borderWidth={1}
          borderRadius="md"
          boxShadow="lg"
          bg={boxBgColor}
          borderColor={borderColor}
        >
          <PostActions
            likes={post.likes || 0}
            viewComments={viewComments}
            toggleViewComments={toggleViewComments}
            isLogged={!!user}
            viewReply={viewReply}
            toggleViewReply={toggleViewReply}
            reply={reply}
          />
        </Box>

        {/* Responsive button for mobile */}
        <Box w="full" display={{ base: 'block', md: 'none' }}>
          <Button
            onClick={toggleViewComments}
            colorScheme="teal"
            width="full"
            variant="outline"
            mb={4}
          >
            {viewComments ? 'Hide Comments' : 'Show Comments'}
          </Button>
        </Box>
      </VStack>
    </Container>
  );
};

export default PostView;
