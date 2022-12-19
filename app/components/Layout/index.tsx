import { Box, Text, Heading, Link as LinkComp, Image } from "@chakra-ui/react";
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
          <Box display="flex" alignItems="center">
            <Image
              src="/imgs/idx-logo.png"
              alt="idx logo"
              maxW="40px"
              w="100%"
            />
            <Heading as="h2" size="xl" marginLeft={4} color="idx">
              Stock Tools
            </Heading>
          </Box>
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
        <Text fontWeight="medium">
          Made by{" "}
          <LinkComp href="https://github.com/maafaishal" isExternal>
            Muhammad A Faishal
          </LinkComp>{" "}
          with{" "}
          <Text as="span" color="red.500">
            ♥
          </Text>
        </Text>
      </Box>
    </div>
  );
}
