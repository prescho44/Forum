import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../store/app.context';
import { getUserData } from '../../../services/users.service';
import { push, ref, set } from 'firebase/database';
import { useParams } from 'react-router-dom';
import { db } from '../../../config/firebase-config';
import './Reply.css';
import { Box, Button, Textarea, FormControl, FormLabel } from '@chakra-ui/react';

/**
 * @module Reply
 * @description Component for adding replies to posts
 *
 * @component
 *
 * @example
 * return (
 *   <Reply />
 * )
 *
 * @returns {JSX.Element} Reply form with text input and submit button
 */

const Reply = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [reply, setReply] = useState('');
  const [userData, setUserData] = useState({});
  const { user } = useContext(AppContext);

  useEffect(() => {
    if (!user?.uid) return;

    setIsLoading(true);
    getUserData(user.uid)
      .then((data) => setUserData(data[Object.keys(data)]))
      .catch((error) => {
        console.error('Error fetching user data:', error);
        alert('Error loading user data');
      })
      .finally(() => setIsLoading(false));
  }, [user?.uid]);

  const replySubmit = async () => {
    try {
      const newReplyRef = push(ref(db, `posts/${id}/comments`));
      const commentId = newReplyRef.key;

      const newReply = {
        avatar: userData.avatarUrl,
        text: reply,
        author: userData.handle,
        timestamp: Date.now(),
        postRef: id,
      };

      await Promise.all([
        set(newReplyRef, newReply),
        set(ref(db, `users/${userData.handle}/comments/${commentId}`), newReply),
      ]);

      setReply('');
      alert('Successfully posted reply!');
    } catch (error) {
      console.error('Error posting reply:', error.message);
      alert('Error posting reply!');
    }
  };

  const handleReplayChange = (e) => {
    setReply(e.target.value);
  };

  const handleReplySubmit = (e) => {
    e.preventDefault();
    if (!reply.trim()) {
      alert('Please enter a reply');
      return;
    }
    replySubmit();
  };

  if (isLoading) {
    return <>Loading...</>;
  }

  return (
    <Box bg="gray.800" color="white" p={6} borderRadius="md" w="full">
      <form onSubmit={handleReplySubmit}>
        <FormControl id="postComment">
          <FormLabel color="gray.400">Enter text:</FormLabel>
          <Textarea
            onChange={handleReplayChange}
            value={reply}
            placeholder="Write your reply here..."
            rows={4}
            bg="gray.700"
            color="white"
            borderColor="gray.600"
            _hover={{ borderColor: 'gray.500' }}
            _focus={{ borderColor: 'teal.400' }}
          />
        </FormControl>
        <Button
          type="submit"
          mt={4}
          colorScheme="teal"
          variant="solid"
          w="full"
        >
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default Reply;