import {
  Grid,
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
        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
          <Card>
            <Link to="/average-price-calculation">
              <CardBody>
                <Heading as="h2" size="xl">
                  Average Price
                </Heading>
                <Text fontSize="lg" fontWeight="semibold" marginTop="2">
                  Calculation
                </Text>
              </CardBody>
            </Link>
          </Card>
          <Card>
            <Link to="/percentage-calculation">
              <CardBody>
                <Heading as="h2" size="xl">
                  Percentage
                </Heading>
                <Text fontSize="lg" fontWeight="semibold" marginTop="2">
                  Calculation
                </Text>
              </CardBody>
            </Link>
          </Card>
          <Card>
            <Link to="/ara-arb-calculation">
              <CardBody>
                <Heading as="h2" size="xl">
                  ARA / ARB
                </Heading>
                <Text fontSize="lg" fontWeight="semibold" marginTop="2">
                  Calculation
                </Text>
              </CardBody>
            </Link>
          </Card>
        </Grid>
      </Box>
    </Container>
  );
}
