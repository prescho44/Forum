import PropTypes from "prop-types";
import { useContext } from "react";
import { AppContext } from "../../store/app.context";
import Comments from "../Comments/Comments";
import Reply from "../Reply/Reply";
import { Button, Box, Text } from "@chakra-ui/react"; // Chakra UI components

const PostActions = ({
  viewComments,
  toggleViewComments,
  isLogged,
  viewReply,
  toggleViewReply,
  reply,
}) => {
  const { user } = useContext(AppContext);
  return (
    <Box
      
      p={4}
      bg="gray.800"
      borderRadius="md"
      boxShadow="md"
      color="white"
      width="100%"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Box 
      display="flex"
      justifyContent="center"
      alignItems="space-between"
      >
      <Button
        mr="2"
        colorScheme="teal"
        variant="outline"
        mb={3}
        mt='3'
        onClick={toggleViewComments}
        width="auto"
      >
        {!viewComments ? (
          <Text fontSize="lg">Comments ( 。_ 。)</Text>
        ) : (
          <Text fontSize="lg">Hide Comments ( ﾉ ﾟｰﾟ)ﾉ</Text>
        )}
      </Button>

      {isLogged && (
        <Button
          colorScheme="teal"
          variant="outline"
          onClick={toggleViewReply}
          width="auto"
          mt='3'

        >
          {!viewReply ? (
            <Text fontSize="lg">Reply</Text>
          ) : (
            <Text fontSize="lg">Hide Reply</Text>
          )}
        </Button>
      )}</Box>

      {viewReply && <Reply />}
      {viewComments && <Comments onAddReply={reply} />}
    </Box>
  );
};

PostActions.propTypes = {
  viewComments: PropTypes.bool,
  toggleViewComments: PropTypes.func,
  isLogged: PropTypes.bool,
  viewReply: PropTypes.bool,
  toggleViewReply: PropTypes.func,
  handleAddReply: PropTypes.func,
  reply: PropTypes.array,
};

export default PostActions;
