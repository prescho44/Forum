import { Suspense, useContext, useEffect, useMemo, useState } from 'react';
import Loading from '../Loading/Loading';
import { AppContext } from '../../store/app.context';
import { get, onValue, ref, update } from 'firebase/database';
import { db } from '../../../config/firebase-config';
import { useParams } from 'react-router-dom';
import './Comments.css';
import { getUserData } from '@/services/users.service';
import {
  Box,
  Button,
  Textarea,
  Checkbox,
  Text,
  VStack,
} from '@chakra-ui/react';

/**
 * @module Comments
 * @description A component that displays and manages comments for a post
 *
 * @component
 * @param {object} props
 * @param {string} props.id - Post ID from URL parameters
 * @param {object} props.user - Current user object from context
 *
 * @example
 * return (
 *   <Comments />
 * )
 *
 * @returns {JSX.Element} Comments section with like functionality and sorting
 */

const Comments = () => {
  const { id } = useParams();
  const { user } = useContext(AppContext);
  const [comments, setComments] = useState([]);
  const [sortByLikes, setSortByLikes] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editText, setEditText] = useState('');
  const [userHandle, setUserHandle] = useState();

  useEffect(() => {
    const commentsRef = ref(db, `posts/${id}/comments`);
    onValue(commentsRef, (snapshot) => {
      const commentsData = snapshot.val();
      if (commentsData) {
        const commentList = Object.entries(commentsData).map(
          ([id, comment]) => ({
            id,
            ...comment,
            likes: comment.likes || {},
          })
        );
        setComments(commentList);
      } else {
        setComments([]);
      }
    });
  }, [id]);

  useEffect(() => {
    if (user?.uid) {
      getUserData(user.uid)
        .then((data) => data[Object.keys(data)])
        .then((data) => setUserHandle(data.handle))
        .catch((error) => console.error('Error fetching user data:', error));
    }
  }, [user?.uid]);

  const handleEditClick = (comment) => {
    setEditingCommentId(comment.id);
    setEditText(comment.text);
  };

  const handleSaveEdit = async (commentId) => {
    const updates = {};
    updates[`posts/${id}/comments/${commentId}/text`] = editText;

    try {
      await update(ref(db), updates);
      setEditingCommentId(null);
      setEditText('');
    } catch (error) {
      console.error('Error updating comment:', error);
      alert('Failed to update comment');
    }
  };

  const handleLikeClick = async (commentId) => {
    if (!user) return;

    try {
      const commentRef = ref(
        db,
        `posts/${id}/comments/${commentId}/likes/${user.uid}`
      );
      const snapshot = await get(commentRef);

      const updates = {};
      if (snapshot.exists()) {
        updates[`posts/${id}/comments/${commentId}/likes/${user.uid}`] = null;
      } else {
        updates[`posts/${id}/comments/${commentId}/likes/${user.uid}`] = true;
      }

      await update(ref(db), updates);
    } catch (error) {
      console.error('Error updating like:', error);
      alert('Failed to update like');
    }
  };

  const isLikedByUser = (comment) => {
    return comment.likes && comment.likes[user?.uid];
  };

  const getLikesCount = (comment) => {
    return comment.likes ? Object.keys(comment.likes).length : 0;
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm('Are you sure you want to delete this comment?')) {
      return;
    }

    try {
      const updates = {};
      updates[`posts/${id}/comments/${commentId}`] = null;
      await update(ref(db), updates);
    } catch (error) {
      console.error('Error deleting comment:', error);
      alert('Failed to delete comment');
    }
  };

  const sortedComments = useMemo(() => {
    return sortByLikes
      ? [...comments].sort((a, b) => getLikesCount(b) - getLikesCount(a))
      : comments;
  }, [comments, sortByLikes]);

  return (
    <Suspense fallback={<Loading />}>
      <Box bg="gray.800" color="white" p={6} borderRadius="md">
        <VStack spacing={6} align="start">
          <Text fontSize="2xl" fontWeight="bold">
            Comments
          </Text>
          <Box w="full" display="flex" alignItems="center" mb={4}>
            <Checkbox
              isChecked={sortByLikes}
              onChange={(e) => setSortByLikes(e.target.checked)}
              colorScheme="teal"
            >
              Sort by most liked
            </Checkbox>
          </Box>
          <hr />
          {sortedComments.map((comment) => (
            <Box
              key={comment.id}
              p={4}
              borderWidth={1}
              borderRadius="md"
              bg="gray.700"
              mb={4}
              width="100%"
              justifyContent="center"
            >
              <Box display="flex" alignItems="center" mb={2}>
                <img
                  className="avatar-icon"
                  src={comment.avatar}
                  alt="avatar"
                  width="40"
                  height="40"
                />
                <Text ml={2} color="gray.400">
                  {comment.author}
                </Text>
                <Text ml={2} fontSize="sm" color="gray.500">
                  Likes: {getLikesCount(comment)}
                </Text>
              </Box>
              <Box mb={2}>
                {user && (
                  <Box display="flex" mb={2}>
                    <Button
                      onClick={() => handleLikeClick(comment.id)}
                      colorScheme="teal"
                      size="sm"
                      variant="outline"
                      mr={2}
                    >
                      {isLikedByUser(comment) ? 'Unlike' : 'Like'}
                    </Button>
                    {user && userHandle === comment.author && (
                      <>
                        <Button
                          onClick={() => handleEditClick(comment)}
                          colorScheme="blue"
                          size="sm"
                          variant="outline"
                          mr={2}
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() => handleDeleteComment(comment.id)}
                          colorScheme="red"
                          size="sm"
                          variant="outline"
                        >
                          Delete
                        </Button>
                      </>
                    )}
                  </Box>
                )}
                {editingCommentId === comment.id ? (
                  <Box>
                    <Textarea
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      placeholder="Edit your comment..."
                      bg="gray.600"
                      color="white"
                      borderColor="gray.500"
                      _hover={{ borderColor: 'gray.400' }}
                      _focus={{ borderColor: 'teal.400' }}
                    />
                    <Button
                      onClick={() => handleSaveEdit(comment.id)}
                      colorScheme="teal"
                      size="sm"
                      mt={2}
                    >
                      Save
                    </Button>
                    <Button
                      onClick={() => setEditingCommentId(null)}
                      colorScheme="gray"
                      size="sm"
                      mt={2}
                      ml={2}
                    >
                      Cancel
                    </Button>
                  </Box>
                ) : (
                  <Text fontSize="md">{comment.text}</Text>
                )}
              </Box>
            </Box>
          ))}
        </VStack>
      </Box>
    </Suspense>
  );
};

export default Comments;
