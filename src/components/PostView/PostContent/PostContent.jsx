import './PostContent.css';

/**
 * @module PostContent
 * @description Displays the main content of a post with proper formatting
 *
 * @component
 * @param {object} props
 * @param {string} props.content - The main text content of the post
 *
 * @example
 * return (
 *   <PostContent content="This is the post content" />
 * )
 *
 * @returns {JSX.Element} Formatted post content with line breaks
 */

const PostContent = ({ content }) => {
  /**
   * @function renderContentWithBreaks
   * @description Splits the content string by newline characters and returns an array of <p> elements.
   * @param {string} contents - The post content to be split.
   * @returns {JSX.Element[]} An array of <p> elements with the split content.
   */

  const renderContentWithBreaks = (content) => {
    return content.split('\n').map((line, index) => <p key={index}>{line}</p>);
  };

  return <article className="postContent">{renderContentWithBreaks(content)}</article>;
};
export default PostContent;
