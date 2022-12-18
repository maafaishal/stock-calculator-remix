import {
  SimpleGrid,
  Container,
  Box,
  Card,
  CardBody,
  Text,
  Heading,
} from "@chakra-ui/react";
import { Link } from "@remix-run/react";

export default function Index() {
  return (
    <Container
      maxW="container.lg"
      display="flex"
      alignItems="center"
      textAlign="center"
    >
      <Box w="100%">
        <SimpleGrid columns={[1, 1, 3]} spacing={6}>
          <Card>
            <CardBody display="flex" alignItems="center">
              <Link to="/average-price-calculation">
                <Heading as="h2" size="xl">
                  Average Price
                </Heading>
                <Text fontSize="lg" fontWeight="semibold" marginTop="2">
                  Calculation
                </Text>
              </Link>
            </CardBody>
          </Card>
          <Card>
            <CardBody display="flex" alignItems="center">
              <Link to="/percentage-calculation">
                <Heading as="h2" size="xl">
                  Percentage
                </Heading>
                <Text fontSize="lg" fontWeight="semibold" marginTop="2">
                  Calculation
                </Text>
              </Link>
            </CardBody>
          </Card>
          <Card>
            <CardBody display="flex" alignItems="center">
              <Link to="/ara-arb-calculation">
                <Heading as="h2" size="xl">
                  ARA / ARB
                </Heading>
                <Text fontSize="lg" fontWeight="semibold" marginTop="2">
                  Calculation
                </Text>
              </Link>
            </CardBody>
          </Card>
        </SimpleGrid>
      </Box>
    </Container>
  );
}
