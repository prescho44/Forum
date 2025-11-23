import { Box, Checkbox, Grid } from '@chakra-ui/react';

const TechnicalTagsView = ({ tags, setTags }) => {
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
            id="engine"
            color="white"
            isChecked={tags.engine || false}
            onChange={() => handleCheckboxChange('engine')}
          >
            engine
          </Checkbox>
          <Checkbox
            id="brakes"
            color="white"
            isChecked={tags.brakes || false}
            onChange={() => handleCheckboxChange('brakes')}
          >
            brakes
          </Checkbox>
          <Checkbox
            id="tires"
            color="white"
            isChecked={tags.tires || false}
            onChange={() => handleCheckboxChange('tires')}
          >
            tires
          </Checkbox>
          <Checkbox
            id="transmission"
            color="white"
            isChecked={tags.transmission || false}
            onChange={() => handleCheckboxChange('transmission')}
          >
            transmission
          </Checkbox>
          <Checkbox
            id="suspension"
            color="white"
            isChecked={tags.suspension || false}
            onChange={() => handleCheckboxChange('suspension')}
          >
            suspension
          </Checkbox>
          <Checkbox
            id="oils"
            color="white"
            isChecked={tags.oils || false}
            onChange={() => handleCheckboxChange('oils')}
          >
            oils
          </Checkbox>
          <Checkbox
            id="repair"
            color="white"
            isChecked={tags.repair || false}
            onChange={() => handleCheckboxChange('repair')}
          >
            repair
          </Checkbox>
          <Checkbox
            id="autoparts"
            color="white"
            isChecked={tags.autoparts || false}
            onChange={() => handleCheckboxChange('autoparts')}
          >
            autoparts
          </Checkbox>
          <Checkbox
            id="electronics"
            color="white"
            isChecked={tags.electronics || false}
            onChange={() => handleCheckboxChange('electronics')}
          >
            electronics
          </Checkbox>
        </Grid>
      </Box>
    </>
  );
};
export default TechnicalTagsView;
