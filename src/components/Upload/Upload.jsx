import { useState, useContext, useEffect } from 'react';
import { AppContext } from '../store/app.context';
import { db } from '../../config/firebase-config';
import { ref, set, push } from 'firebase/database';
import { getUserData } from '../../services/users.service';
import {
  Grid,
  Checkbox,
  Box,
  Button,
  Input,
  Textarea,
  Text,
  Stack,
} from '@chakra-ui/react';

import GeneralTagsView from './GeneralTagsView/GeneralTagsView';
import TechnicalTagsView from './TechnicalTagsView/TechnicalTagsView';
import FuelTagsView from './FuelTagsView/FuelTagsView';
import BrandTagsView from './BrandTagsView/BrandTagsView';
import RacingTagsView from './RacingTagsView/RacingTagsView';
import LawTagsView from './LawTagsView/LawTagsView';
import AestheticTagsView from './AestheticTagsView/AestheticTagsView';
import RegionTagsView from './RegionTagsView/RegionTagsView';

const UploadView = () => {
  const { user } = useContext(AppContext);

  const [selectedTag, setSelectedTag] = useState(null); // Single state for tag selection
  const [addedTags, setAddedTags] = useState({});
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userHandle, setUserHandle] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    getUserData(user.uid).then((data) =>
      setUserHandle(data[Object.keys(data)[0]])
    );
  }, [user]);

  const postsDB = async () => {
    try {
      const newPostRef = push(ref(db, 'posts'));
      const postId = newPostRef.key;

      const post = {
        title,
        content,
        author: userHandle.handle,
        createdOn: new Date().toString(),
        uid: postId,
        tags: addedTags,
      };

      await Promise.all([
        set(ref(db, `posts/${postId}`), post),
        set(ref(db, `users/${userHandle.handle}/posts/${postId}`), post),
      ]);

      setAddedTags({});
      setTitle('');
      setContent('');
      alert('Post uploaded successfully');
    } catch (error) {
      console.error('Error uploading post:', error.message);
      setError('Error uploading post');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content) {
      setError('Please enter title and content');
      return;
    }
    if (title.length < 16 || title.length > 64) {
      setError('The title must be between 16 and 64 symbols.');
      return;
    }
    if (content.length < 32 || content.length > 8192) {
      setError('The content must be between 32 symbols and 8192 symbols.');
      return;
    }

    console.log('Post submitted:', { title, content });
    postsDB();
  };

  if (!user) {
    return (
      <Box p={5} bg="red.300" borderRadius="md" boxShadow="xl">
        <Text color="red.800" fontSize="lg">
          You must be logged in to upload a post
        </Text>
      </Box>
    );
  }

  return (
    <Box
      p={5}
      maxWidth="600px"
      mx="auto"
      bg="gray.700"
      borderRadius="md"
      boxShadow="lg"
    >
      <h2 style={{ color: 'white' }}>Upload a Post</h2>
      &nbsp;
      {error && (
        <Box mb={4} p={3} bg="yellow.200" borderRadius="md">
          <Text color="yellow.800" fontSize="sm">
            {error}
          </Text>
        </Box>
      )}
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <Text mb={2} color="white">
            Tags
          </Text>
          {!selectedTag && (
            <Box mb={4} p={4} bgColor="gray.600" borderRadius="lg">
              <Grid templateColumns={'repeat(4, 1fr)'} gap={2}>
                {/* Conditionally render checkboxes */}
                {!selectedTag && (
                  <>
                    <Checkbox
                      id="general"
                      onChange={() => setSelectedTag('general')}
                    >
                      🚗 General Car Topics
                    </Checkbox>
                    <Checkbox
                      id="technical"
                      onChange={() => setSelectedTag('technical')}
                    >
                      🔧 Technical & Repairs
                    </Checkbox>
                    <Checkbox id="fuel" onChange={() => setSelectedTag('fuel')}>
                      ⛽ Fuel & Consumption
                    </Checkbox>
                    <Checkbox
                      id="brand"
                      onChange={() => setSelectedTag('brand')}
                    >
                      📍 Brands & Models
                    </Checkbox>
                    <Checkbox
                      id="racing"
                      onChange={() => setSelectedTag('racing')}
                    >
                      🏎️ Driving & Racing
                    </Checkbox>
                    <Checkbox id="law" onChange={() => setSelectedTag('law')}>
                      📜 Laws & Insurance
                    </Checkbox>
                    <Checkbox
                      id="aesthetic"
                      onChange={() => setSelectedTag('aesthetic')}
                    >
                      🎨 Aesthetics & Comfort
                    </Checkbox>
                    <Checkbox
                      id="region"
                      onChange={() => setSelectedTag('region')}
                    >
                      📍 Regions
                    </Checkbox>
                  </>
                )}
              </Grid>
            </Box>
          )}

          {/* Show selected category view */}
          {selectedTag === 'general' && (
            <GeneralTagsView tags={addedTags} setTags={setAddedTags} />
          )}
          {selectedTag === 'technical' && (
            <TechnicalTagsView tags={addedTags} setTags={setAddedTags} />
          )}
          {selectedTag === 'fuel' && (
            <FuelTagsView tags={addedTags} setTags={setAddedTags} />
          )}
          {selectedTag === 'brand' && (
            <BrandTagsView tags={addedTags} setTags={setAddedTags} />
          )}
          {selectedTag === 'racing' && (
            <RacingTagsView tags={addedTags} setTags={setAddedTags} />
          )}
          {selectedTag === 'law' && (
            <LawTagsView tags={addedTags} setTags={setAddedTags} />
          )}
          {selectedTag === 'aesthetic' && (
            <AestheticTagsView tags={addedTags} setTags={setAddedTags} />
          )}
          {selectedTag === 'region' && (
            <RegionTagsView tags={addedTags} setTags={setAddedTags} />
          )}

          {/* Button to reset selection */}
          {selectedTag && (
            <Button
              colorScheme="red"
              size="sm"
              onClick={() => setSelectedTag(null)}
            >
              Go Back
            </Button>
          )}

          <Box>
            <Text mb={2} color="white">
              Title
            </Text>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={64}
              placeholder="Enter the title"
              required
              color={'black'}
              bg="white"
              borderColor="teal.400"
            />
            <Text fontSize="sm" color="white" textAlign="right">
              {title.length}/64
            </Text>
          </Box>

          <Box>
            <Text mb={2} color="white">
              Content
            </Text>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              minLength={32}
              maxLength={8192}
              placeholder="Enter the content"
              resize="vertical"
              required
              color={'black'}
              bg="white"
              borderColor="teal.400"
            />
            <Text fontSize="sm" color="white" textAlign="right">
              {content.length}/8192
            </Text>
          </Box>

          <Button
            colorScheme="teal"
            type="submit"
            width="full"
            _hover={{ bg: 'teal.400' }}
          >
            Submit
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default UploadView;
