import { useEffect, useState } from "react";
import { Box, Heading, Text, Link, Spinner, Image, VStack } from "@chakra-ui/react";

const apiKey = "pub_71636c02deb4c58d34ee56b87508072245b73"; // Store in .env for security

export default function CarNews() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://newsdata.io/api/1/news?apikey=pub_71636c02deb4c58d34ee56b87508072245b73&q=mercedes&language=en `)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.results) {
          setNews(data.results);
        }
      })
      .catch(error => {
        console.error("Error fetching car news:", error);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <Box bg="gray.900" color="white" minH="100vh" p={5}>
      <Heading as="h1" mb={4} textAlign="center">
        Car News 🚗
      </Heading>

      {loading ? (
        <Box textAlign="center">
          <Spinner size="xl" />
        </Box>
      ) : (
        <VStack spacing={4} align="stretch">
          {news.length > 0 ? (
            news.map((article, index) => (
              <Box
                key={index}
                p={4}
                bg="gray.800"
                borderRadius="lg"
                boxShadow="md"
                transition="0.3s"
                _hover={{ transform: "scale(1.02)", boxShadow: "lg" }}
              >
                {article.image_url && (
                  <Image src={article.image_url} alt={article.title} borderRadius="3xl" mb={2} />
                )}
                <Link href={article.link} isExternal fontSize="xl" fontWeight="bold" color="teal.400">
                  {article.title}
                </Link>
                <Text fontSize="sm" color="gray.400">
                  {new Date(article.pubDate).toDateString()}
                </Text>
                <Text mt={2}>{article.description || "No description available."}</Text>
              </Box>
            ))
          ) : (
            <Text textAlign="center">No news found.</Text>
          )}
        </VStack>
      )}
    </Box>
  );
}
