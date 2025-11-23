import { Box, Checkbox, Grid } from '@chakra-ui/react';

const GeneralTagsView = ({ tags, setTags }) => {
  const handleCheckboxChange = (tag) => {
    setTags((prevTags) => ({
      ...prevTags,
      [tag]: !prevTags[tag],
    }));
  };

  return (
    <Box bgColor={'gray.600'} p={4} borderRadius={'lg'}>
      <Grid templateColumns={'repeat(3, 1fr)'} gap={2}>
        <Checkbox
          id="cars"
          color="white"
          isChecked={tags.cars || false} // Check if 'cars' is in the addedTags state
          onChange={() => handleCheckboxChange('cars')}
        >
          cars
        </Checkbox>
        <Checkbox
          id="motorcycles"
          color="white"
          isChecked={tags.motorcycles || false}
          onChange={() => handleCheckboxChange('motorcycles')}
        >
          motorcycles
        </Checkbox>
        <Checkbox
          id="suvs"
          color="white"
          isChecked={tags.suvs || false}
          onChange={() => handleCheckboxChange('suvs')}
        >
          suvs
        </Checkbox>
        <Checkbox
          id="evs"
          color="white"
          isChecked={tags.evs || false}
          onChange={() => handleCheckboxChange('evs')}
        >
          evs
        </Checkbox>
        <Checkbox
          id="classic"
          color="white"
          isChecked={tags.classic || false}
          onChange={() => handleCheckboxChange('classic')}
        >
          classic
        </Checkbox>
        <Checkbox
          id="sports"
          color="white"
          isChecked={tags.sports || false}
          onChange={() => handleCheckboxChange('sports')}
        >
          sports
        </Checkbox>
        <Checkbox
          id="tuning"
          color="white"
          isChecked={tags.tuning || false}
          onChange={() => handleCheckboxChange('tuning')}
        >
          tuning
        </Checkbox>
        <Checkbox
          id="roadside_assistance"
          color="white"
          isChecked={tags.roadside_assistance || false}
          onChange={() => handleCheckboxChange('roadside_assistance')}
        >
          roadside assistance
        </Checkbox>
      </Grid>
    </Box>
  );
};

export default GeneralTagsView;
