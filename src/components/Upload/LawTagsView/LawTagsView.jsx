import { Box, Checkbox, Grid } from '@chakra-ui/react';

const LawTagsView = ({ tags, setTags }) => {
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
            id="imported_cars"
            color="white"
            isChecked={tags.imported_cars || false}
            onChange={() => handleCheckboxChange('imported_cars')}
          >
            imported cars
          </Checkbox>
          <Checkbox
            id="insurance"
            color="white"
            isChecked={tags.insurance || false}
            onChange={() => handleCheckboxChange('insurance')}
          >
            insurance
          </Checkbox>
          <Checkbox
            id="theft"
            color="white"
            isChecked={tags.theft || false}
            onChange={() => handleCheckboxChange('theft')}
          >
            theft
          </Checkbox>
          <Checkbox
            id="registration"
            color="white"
            isChecked={tags.registration || false}
            onChange={() => handleCheckboxChange('registration')}
          >
            registration
          </Checkbox>
          <Checkbox
            id="toll"
            color="white"
            isChecked={tags.toll || false}
            onChange={() => handleCheckboxChange('toll')}
          >
            toll
          </Checkbox>
        </Grid>
      </Box>
    </>
  );
};
export default LawTagsView;
