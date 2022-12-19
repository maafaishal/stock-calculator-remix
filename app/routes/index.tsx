import {
  SimpleGrid,
  Container,
  Box,
  Card,
  CardBody,
  Text,
  Heading,
  Icon,
} from "@chakra-ui/react";
import { Link } from "@remix-run/react";

import { FaPercentage, FaChartBar, FaMoneyBillWave } from "react-icons/fa";

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
            <CardBody
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Link to="/average-price-calculation">
                <Icon as={FaMoneyBillWave} fontSize="64" marginBottom="6" />
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
            <CardBody
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Link to="/percentage-calculation">
                <Icon as={FaPercentage} fontSize="64" marginBottom="6" />
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
            <CardBody
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Link to="/ara-arb-calculation">
                <Icon as={FaChartBar} fontSize="64" marginBottom="6" />
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
