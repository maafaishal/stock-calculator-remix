import {
  Box,
  Text,
  Heading,
  Link as LinkComp,
  Image,
  IconButton,
  Container,
  useColorMode,
} from "@chakra-ui/react";
import { Link } from "@remix-run/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  const { colorMode, toggleColorMode } = useColorMode();

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
        <Container
          maxW="container.lg"
          display="flex"
          justifyContent="center"
          alignItems="center"
          position="relative"
          w="100%"
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
          <IconButton
            position="absolute"
            right={0}
            aria-label="Switch Color"
            onClick={toggleColorMode}
            icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          />
        </Container>
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
