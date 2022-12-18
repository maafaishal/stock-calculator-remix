import { Box, Text, Heading } from "@chakra-ui/react";
import { Link } from "@remix-run/react";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div>
      <Box
        as="header"
        w="100%"
        h="112"
        p={4}
        borderBottom="1px"
        borderBottomColor="blackAlpha.300"
        display="flex"
        alignItems="flex-end"
        justifyContent="center"
      >
        <Link to="/">
          <Heading as="h2" size="2xl">
            IDX Stock Tools
          </Heading>
        </Link>
      </Box>
      <Box w="100%" minH="calc(100vh - (112px + 56px))" display="flex">
        {children}
      </Box>
      <Box
        as="footer"
        w="100%"
        p={4}
        bg="#30D5C8"
        color="white"
        textAlign="center"
      >
        <Text>
          Made by Muhammad A Faishal with{" "}
          <Text as="span" color="red.500">
            ♥
          </Text>
        </Text>
      </Box>
    </div>
  );
}
