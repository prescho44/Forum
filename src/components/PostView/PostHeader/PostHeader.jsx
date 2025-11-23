import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../store/app.context';
import { ref, get, update } from 'firebase/database';
import { db } from '../../../config/firebase-config';
import { useParams } from 'react-router-dom';
import { Box, Button, Input, Textarea, Text } from '@chakra-ui/react';
import { getUserData } from '@/services/users.service';

const PostHeader = ({ user, title, content }) => {
  const navigate = useNavigate();
  const { user: currentUser } = useContext(AppContext);
  const [likesCount, setLikesCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editContent, setEditContent] = useState(content);
  const [userHandle, setUserHandle] = useState();
  const { id } = useParams();
  const { userData } = useContext(AppContext);

  useEffect(() => {
    if (id) {
      const postRef = ref(db, `posts/${id}/likes`);
      get(postRef).then((snapshot) => {
        if (snapshot.exists()) {
          const likes = snapshot.val();
          setLikesCount(Object.keys(likes).length);
          setIsLiked(!!likes[currentUser?.uid]);
        } else {
          setLikesCount(0);
          setIsLiked(false);
        }
      });
    }
  }, [id, currentUser]);

  {currentUser && useEffect(() => {
    getUserData(currentUser.uid)
      .then((data) => data[Object.keys(data)])
      .then((data) => setUserHandle(data.handle));
  }, [currentUser]);}

  const deletePost = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) {
      return;
    }

    try {
      const updates = {};
      updates[`posts/${id}`] = null;
      updates[`users/${user}/posts/${id}`] = null;

      await update(ref(db), updates);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete post');
    }
  };

  const handleLike = async () => {
    if (!currentUser) return;

    const postRef = ref(db, `posts/${id}/likes/${currentUser.uid}`);
    const updates = {};

    if (isLiked) {
      updates[`posts/${id}/likes/${currentUser.uid}`] = null;
      setLikesCount((prev) => prev - 1);
    } else {
      updates[`posts/${id}/likes/${currentUser.uid}`] = true;
      setLikesCount((prev) => prev + 1);
    }

    try {
      await update(ref(db), updates);
      setIsLiked(!isLiked);
    } catch (error) {
      console.error('Error updating likes:', error);
      alert('Failed to update likes');
    }
  };

  const handleSaveEdit = async () => {
    const updates = {};
    const isTitleValid =
      editTitle && editTitle.length >= 16 && editTitle.length <= 32;
    const isContentValid =
      editContent && editContent.length >= 32 && editContent.length <= 8192;

    let hasValidChanges = false;

    if (isTitleValid) {
      updates[`posts/${id}/title`] = editTitle;
      updates[`users/${user}/posts/${id}/title`] = editTitle;
      hasValidChanges = true;
    } else if (editTitle && editTitle.trim().length > 0) {
      alert(`Title must be between 16 and 32 symbols`);
    }

    if (isContentValid) {
      updates[`posts/${id}/content`] = editContent;
      updates[`users/${user}/posts/${id}/content`] = editContent;
      hasValidChanges = true;
    } else if (editContent && editContent.trim().length > 0) {
      alert(`Content must be between 32 and 8192 symbols`);
    }

    if (hasValidChanges) {
      try {
        await update(ref(db), updates);
        setIsEditing(false);
      } catch (error) {
        console.error('Error updating post:', error);
        alert('Failed to update post');
      }
    }
  };

  return (
    <Box className="postHeader" bg="gray.800" color="white" p={6} borderRadius="md">
      <Box className="headerButtons" mb={4}>
        <Button onClick={() => navigate(-1)} colorScheme="teal" variant="outline" mr={2}>
          {'← Back'}
        </Button>
        {currentUser && (
          <Button onClick={handleLike} colorScheme="teal" variant="outline" mr={2}>
            {isLiked ? 'Unlike:' : 'Like:'} {likesCount}
          </Button>
        )}
        {currentUser && user === userHandle && (
          <Button onClick={() => setIsEditing(!isEditing)} colorScheme="blue" variant="outline">
            {isEditing ? 'Cancel' : 'Edit'}
          </Button>
        )}
      </Box>

      {isEditing ? (
        <Box p={4} bg="gray.700" borderRadius="md">
          <Input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            placeholder="Edit title..."
            mb={3}
            bg="gray.600"
            color="white"
            _focus={{ borderColor: 'teal.400' }}
          />
          <Textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            placeholder="Edit content..."
            mb={3}
            bg="gray.600"
            color="white"
            _focus={{ borderColor: 'teal.400' }}
          />
          <Button onClick={handleSaveEdit} colorScheme="teal" size="sm" mr={2}>
            Save
          </Button>
          <Button onClick={() => setIsEditing(false)} colorScheme="gray" size="sm">
            Cancel
          </Button>
        </Box>
      ) : (
        <Box mb={4}>
          <Text fontSize="xl" fontWeight="bold" mb={1}>
            Author: {user}
          </Text>
          <Text fontSize="2xl" fontWeight="bold" mb={1}>
            {title}
          </Text>
        </Box>
      )}

      {(userData?.role === "admin" || user === userHandle) && (
        <Button onClick={deletePost} colorScheme="red" variant="outline">
          Delete Post
        </Button>
      )}
    </Box>
  );
};

export default PostHeader;
