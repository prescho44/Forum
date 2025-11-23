import { Box, Checkbox, Grid } from '@chakra-ui/react';

const RacingTagsView = ({ tags, setTags }) => {
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
            id="drag"
            color="white"
            isChecked={tags.drag || false}
            onChange={() => handleCheckboxChange('drag')}
          >
            drag
          </Checkbox>
          <Checkbox
            id="drift"
            color="white"
            isChecked={tags.drift || false}
            onChange={() => handleCheckboxChange('drift')}
          >
            drift
          </Checkbox>
          <Checkbox
            id="rally"
            color="white"
            isChecked={tags.rally || false}
            onChange={() => handleCheckboxChange('rally')}
          >
            rally
          </Checkbox>
          <Checkbox
            id="offroad"
            color="white"
            isChecked={tags.offroad || false}
            onChange={() => handleCheckboxChange('offroad')}
          >
            offroad
          </Checkbox>
          <Checkbox
            id="track"
            color="white"
            isChecked={tags.track || false}
            onChange={() => handleCheckboxChange('track')}
          >
            track
          </Checkbox>
        </Grid>
      </Box>
    </>
  );
};
export default RacingTagsView;
