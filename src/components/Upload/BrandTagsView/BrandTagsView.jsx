import { Box, Checkbox, Grid } from '@chakra-ui/react';

const BrandTagsView = ({ tags, setTags }) => {
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
            id="bmw"
            color="white"
            isChecked={tags.bmw || false}
            onChange={() => handleCheckboxChange('bmw')}
          >
            bmw
          </Checkbox>
          <Checkbox
            id="audi"
            color="white"
            isChecked={tags.audi || false}
            onChange={() => handleCheckboxChange('audi')}
          >
            audi
          </Checkbox>
          <Checkbox
            id="mercedes"
            color="white"
            isChecked={tags.mercedes || false}
            onChange={() => handleCheckboxChange('mercedes')}
          >
            mercedes
          </Checkbox>
          <Checkbox
            id="toyota"
            color="white"
            isChecked={tags.toyota || false}
            onChange={() => handleCheckboxChange('toyota')}
          >
            toyota
          </Checkbox>
          <Checkbox
            id="honda"
            color="white"
            isChecked={tags.honda || false}
            onChange={() => handleCheckboxChange('honda')}
          >
            honda
          </Checkbox>
          <Checkbox
            id="vw"
            color="white"
            isChecked={tags.vw || false}
            onChange={() => handleCheckboxChange('vw')}
          >
            vw
          </Checkbox>
          <Checkbox
            id="ford"
            color="white"
            isChecked={tags.ford || false}
            onChange={() => handleCheckboxChange('ford')}
          >
            ford
          </Checkbox>
          <Checkbox
            id="tesla"
            color="white"
            isChecked={tags.tesla || false}
            onChange={() => handleCheckboxChange('tesla')}
          >
            tesla
          </Checkbox>
        </Grid>
      </Box>
    </>
  );
};
export default BrandTagsView;
