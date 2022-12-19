import {
  Box,
  Text,
  Heading,
  Image,
  IconButton,
  Container,
  useColorMode,
} from "@chakra-ui/react";
import { Link } from "@remix-run/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { ImGithub } from "react-icons/im";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  const { colorMode, toggleColorMode } = useColorMode();

  const isLight = colorMode === "light";

  return (
    <div>
      <Box
        as="header"
        w="100%"
        h="112"
        p={4}
        borderBottom="1px"
        borderBottomColor={isLight ? "blackAlpha.300" : "gray.600"}
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
              <Heading as="h2" size="xl" marginLeft={4}>
                Stock Tools
              </Heading>
            </Box>
          </Link>
          <Box position="absolute" right={0}>
            <a
              href="https://github.com/maafaishal/stock-calculator-remix"
              target="_blank"
              rel="noreferrer"
            >
              <IconButton
                aria-label="Go to Github"
                icon={<ImGithub fontSize="20px" />}
                marginRight="6px"
              />
            </a>
            <IconButton
              aria-label="Switch Color"
              onClick={toggleColorMode}
              icon={
                isLight ? (
                  <MoonIcon fontSize="20px" />
                ) : (
                  <SunIcon fontSize="20px" />
                )
              }
            />
          </Box>
        </Container>
      </Box>
      <Box w="100%" minH="calc(100vh - (112px + 56px))" display="flex">
        {children}
      </Box>
      <Box
        as="footer"
        w="100%"
        p={4}
        bg={isLight ? "gray.100" : undefined}
        borderTop="1px"
        borderTopColor={isLight ? "gray.100" : "gray.600"}
      >
        <Container
          maxW="container.lg"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          w="100%"
        >
          <Text fontWeight="medium">Ⓒ IDX Tools</Text>
          <Text fontWeight="medium">
            Made with{" "}
            <Text as="span" color="red.500">
              ♥
            </Text>
          </Text>
        </Container>
      </Box>
    </div>
  );
}
