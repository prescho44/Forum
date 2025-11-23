import { useContext, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Text,
  Spinner,
  Stack,
  Checkbox,
  Heading,
  Flex,
  Button,
} from '@chakra-ui/react';
import { ref, onValue, update, get } from 'firebase/database';
import { db } from '../../config/firebase-config';
import { AppContext } from '../store/app.context';

const SearchResults = () => {
  const { user } = useContext(AppContext);
  const [results, setResults] = useState([]);
  const [sortByLikes, setSortByLikes] = useState(false);
  const [sortByComments, setSortByComments] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const queryParam = new URLSearchParams(location.search).get('query');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResults = () => {
      if (!queryParam) return;

      const postsRef = ref(db, 'posts');
      onValue(postsRef, (snapshot) => {
        if (snapshot.exists()) {
          const posts = Object.values(snapshot.val());

          const filteredPosts = posts.filter((post) =>
            post.title.toLowerCase().includes(queryParam.toLowerCase())
          );

          setResults(filteredPosts);
        } else {
          setResults([]);
        }

        setLoading(false);
      });
    };

    fetchResults();
  }, [queryParam]);

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
      console.error('Error updating likes:', error);
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date) ? 'Invalid date' : date.toISOString().split('T')[0];
  };

  const sortedPosts = useMemo(() => {
    let sorted = [...results];

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
  }, [results, sortByLikes, sortByComments]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Spinner size="xl" color="teal.500" />
      </Box>
    );
  }

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
        <Box p={5}>
          <Text fontSize="2xl" mb={4}>
            Search Results for "{queryParam}"
          </Text>
          {results.length > 0 ? (
            <>
              {sortedPosts.map((post) => (
                <Box
                  key={post.uid}
                  p={6}
                  mt={8}
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
                    onClick={() => handleClick(post.uid)}
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
                        onClick={() => handleClick(post.uid)}
                        colorScheme="teal"
                        variant="solid"
                        size="md"
                        mr={2}
                      >
                        View Details
                      </Button>
                      {user && (
                        <Button
                          onClick={() => handleLike(post.uid)}
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
                    Likes: {getLikesCount(post)} | Comments:{' '}
                    {getCommentsCount(post)} | Posted on{' '}
                    {formatDate(post.createdOn)}
                  </Text>
                  <Text mt={2} fontSize="md" color="teal.300">
                    Tags:{' '}
                    {post.tags ? Object.keys(post.tags).join(' | ') : 'No Tags'}
                  </Text>
                </Box>
              ))}
            </>
          ) : (
            <Text>No results found.</Text>
          )}
        </Box>
      </Stack>
    </Box>
  );
};

export default SearchResults;