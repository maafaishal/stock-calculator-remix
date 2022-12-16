import {
  Container,
  Box,
  Heading,
  Input,
  InputLeftAddon,
  InputGroup,
  Card,
  CardHeader,
  CardBody,
  Text,
  Grid,
} from "@chakra-ui/react";
import type { MetaFunction } from "@remix-run/node";

import getMeta from "~/helpers/getMeta";

export const meta: MetaFunction = () =>
  getMeta({ title: "Percentage Calculation" });

const NUMBER = 10000;

export default function PercentageCalculation() {
  return (
    <Container maxW="container.lg" pt={8} pb={16}>
      <Box marginBottom={12}>
        <Heading as="h2" size="xl" marginBottom={4}>
          Percentage Calculation
        </Heading>
        <Box marginBottom={6}>
          <InputGroup>
            <InputLeftAddon children="Rp" />
            <Input placeholder="Put previous price here" type="number" />
          </InputGroup>
          <InputGroup>
            <InputLeftAddon children="Rp" />
            <Input placeholder="Put current price here" type="number" />
          </InputGroup>
        </Box>
        <Box display="flex">
          <Grid templateColumns="repeat(2, 1fr)" gap={6}>
            <Card>
              <CardHeader>
                <Heading size="md">Auto Rejection Bawah (ARB)</Heading>
              </CardHeader>
              <CardBody>
                <Text fontSize="6xl" fontWeight="bold" color="red.500">
                  10000 (7%)
                </Text>
              </CardBody>
            </Card>
            <Card>
              <CardHeader>
                <Heading size="md">Auto Rejection Atas (ARA)</Heading>
              </CardHeader>
              <CardBody>
                <Text fontSize="6xl" fontWeight="bold" color="green.400">
                  10000 (35%)
                </Text>
              </CardBody>
            </Card>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
