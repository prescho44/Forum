import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Button, Box } from '@chakra-ui/react';
import { FaSearch } from "react-icons/fa";

const Search = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/search?query=${query}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Box display="flex" alignItems="center" bg="gray.50" p={2} borderRadius="md" boxShadow="sm" w={{ base: '100%', md: 'auto' }}>
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={handleKeyPress}
        w={{ base: '100%', md: '450px' }}
        placeholder="Search..."
        bg="white"
        color="black"
        borderColor="gray.300"
        _hover={{ borderColor: 'gray.400' }}
        _focus={{ borderColor: 'teal.400', boxShadow: '0 0 0 2px teal.200' }}
      />
      <Button onClick={handleSearch} colorScheme="teal" ml={2} leftIcon={<FaSearch />} w={{ base: '100%', md: 'auto' }}>
        Search
      </Button>
    </Box>
  );
};

export default Search;