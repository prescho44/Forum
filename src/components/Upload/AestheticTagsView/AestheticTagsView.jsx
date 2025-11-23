import { Box, Checkbox, Grid } from '@chakra-ui/react';

const AestheticTagsView = ({ tags, setTags }) => {
  const handleCheckboxChange = (tag) => {
    setTags((prevTags) => ({
      ...prevTags,
      [tag]: !prevTags[tag],
    }));
  };
  return (
    <>
      <Box bgColor={'gray.600'} p={4} borderRadius={'lg'}>
        <Grid templateColumns={'repeat(3, 1fr)'} gap={2}>
          <Checkbox
            id="wrapping"
            color="white"
            isChecked={tags.wrapping || false}
            onChange={() => handleCheckboxChange('wrapping')}
          >
            wrapping
          </Checkbox>
          <Checkbox
            id="interior"
            color="white"
            isChecked={tags.interior || false}
            onChange={() => handleCheckboxChange('interior')}
          >
            interior
          </Checkbox>
          <Checkbox
            id="wheels"
            color="white"
            isChecked={tags.wheels || false}
            onChange={() => handleCheckboxChange('wheels')}
          >
            wheels
          </Checkbox>
          <Checkbox
            id="headlights"
            color="white"
            isChecked={tags.headlights || false}
            onChange={() => handleCheckboxChange('headlights')}
          >
            headlights
          </Checkbox>
          <Checkbox
            id="audio"
            color="white"
            isChecked={tags.audio || false}
            onChange={() => handleCheckboxChange('audio')}
          >
            audio
          </Checkbox>
        </Grid>
      </Box>
    </>
  );
};
export default AestheticTagsView;
