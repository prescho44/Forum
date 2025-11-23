import { Box, Checkbox, Grid } from '@chakra-ui/react';

const RegionTagsView = ({ tags, setTags }) => {
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
            id="sofia"
            color="white"
            isChecked={tags.sofia || false}
            onChange={() => handleCheckboxChange('sofia')}
          >
            sofia
          </Checkbox>
          <Checkbox
            id="varna"
            color="white"
            isChecked={tags.varna || false}
            onChange={() => handleCheckboxChange('varna')}
          >
            varna
          </Checkbox>
          <Checkbox
            id="plovdiv"
            color="white"
            isChecked={tags.plovdiv || false}
            onChange={() => handleCheckboxChange('plovdiv')}
          >
            plovdiv
          </Checkbox>
        </Grid>
      </Box>
    </>
  );
};
export default RegionTagsView;
