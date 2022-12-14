import {
  Container,
  Box,
  Heading,
  Image,
  Input,
  InputLeftAddon,
  InputGroup,
  Card,
  CardHeader,
  CardBody,
  Text,
  Grid,
} from "@chakra-ui/react";

export default function AraArbCalculatioInputn() {
  return (
    <Container maxW="container.lg" pt={8} pb={16}>
      <Box marginBottom={12}>
        <Heading as="h2" size="xl" marginBottom={4}>
          ARA & ARB Calculation
        </Heading>
        <Box marginBottom={6}>
          <InputGroup>
            <InputLeftAddon children="Rp" />
            <Input placeholder="Put stock price here" type="number" />
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
      <Box>
        <Heading as="h2" size="lg" marginBottom={4}>
          IDX Information
        </Heading>
        <Image src="/imgs/ara-arb.jpg" alt="ARA ARB" maxW="560px" />
      </Box>
    </Container>
  );
}
