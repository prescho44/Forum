import { Box, Checkbox, Grid } from '@chakra-ui/react';

const FuelTagsView = ({ tags, setTags }) => {
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
            id="gasoline"
            color="white"
            isChecked={tags.gasoline || false}
            onChange={() => handleCheckboxChange('gasoline')}
          >
            gasoline
          </Checkbox>
          <Checkbox
            id="diesel"
            color="white"
            isChecked={tags.diesel || false}
            onChange={() => handleCheckboxChange('diesel')}
          >
            diesel
          </Checkbox>
          <Checkbox
            id="lpg"
            color="white"
            isChecked={tags.lpg || false}
            onChange={() => handleCheckboxChange('lpg')}
          >
            lpg
          </Checkbox>
          <Checkbox
            id="electric"
            color="white"
            isChecked={tags.electric || false}
            onChange={() => handleCheckboxChange('electric')}
          >
            electric
          </Checkbox>
          <Checkbox
            id="hybrid"
            color="white"
            isChecked={tags.hybrid || false}
            onChange={() => handleCheckboxChange('hybrid')}
          >
            hybrid
          </Checkbox>
          <Checkbox
            id="fuel_consumption"
            color="white"
            isChecked={tags.fuel_consumption || false}
            onChange={() => handleCheckboxChange('fuel_consumption')}
          >
            fuel consumption
          </Checkbox>
        </Grid>
      </Box>
    </>
  );
};
export default FuelTagsView;
