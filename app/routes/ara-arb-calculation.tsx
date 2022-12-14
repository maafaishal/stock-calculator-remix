import {
  Container,
  Box,
  Heading,
  Image,
  NumberInput,
  NumberInputField,
  Card,
  CardHeader,
  CardBody,
  Text,
  Grid,
} from "@chakra-ui/react";
import { useState } from "react";

import printNumberFormat from "~/helpers/printNumberFormat";

export default function AraArbCalculatioInputn() {
  const [araData, setARAData] = useState({ price: 0, percentage: 0 });
  const [arbData, setARBData] = useState({ price: 0, percentage: 0 });

  const updateARA = (price: number) => {
    // Check IDX policy about ARA & ARB
    let araPercentage = 35;

    if (price > 5000) {
      araPercentage = 20;
    } else if (price > 200) {
      araPercentage = 25;
    }

    const araPrice = Math.floor(price + (price * araPercentage) / 100);
    const percentage = ((araPrice - price) / price) * 100;

    setARAData({
      price: araPrice,
      percentage,
    });
  };

  const updateARB = (price: number) => {
    const tempPrice = Math.ceil(price - (price * 7) / 100);
    const arbPrice = tempPrice >= 50 ? tempPrice : 50;
    const percentage = ((arbPrice - price) / price) * 100;

    setARBData({
      price: arbPrice,
      percentage,
    });
  };

  const handleChangePrice: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = Number(e.target.value || "0");

    updateARA(value);
    updateARB(value);
  };

  return (
    <Container maxW="container.lg" pt={8} pb={16}>
      <Box marginBottom={12}>
        <Heading as="h2" size="xl" marginBottom={4}>
          ARA & ARB Calculation
        </Heading>
        <Box marginBottom={6}>
          <NumberInput defaultValue={0} min={0}>
            <NumberInputField
              placeholder="Put stock price here"
              onChange={handleChangePrice}
            />
          </NumberInput>
        </Box>
        <Box display="flex">
          <Grid templateColumns="repeat(2, 1fr)" gap={6} w="100%">
            <Card>
              <CardHeader>
                <Heading size="md">Auto Rejection Bawah (ARB)</Heading>
              </CardHeader>
              <CardBody>
                <Text fontSize="5xl" fontWeight="bold" color="red.500">
                  {printNumberFormat(arbData.price)} (
                  {printNumberFormat(arbData.percentage)}%)
                </Text>
              </CardBody>
            </Card>
            <Card>
              <CardHeader>
                <Heading size="md">Auto Rejection Atas (ARA)</Heading>
              </CardHeader>
              <CardBody>
                <Text fontSize="5xl" fontWeight="bold" color="green.400">
                  {printNumberFormat(araData.price)} (
                  {printNumberFormat(araData.percentage)}%)
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
        <Heading as="h3" size="md" marginBottom={4}>
          Auto Rejection Policy
        </Heading>
        <Image src="/imgs/auto-rejection.jpg" alt="ARA ARB" maxW="720px" />
        <Heading as="h3" size="md" marginBottom={4} marginTop={6}>
          Trading Unit Policy
        </Heading>
        <Image src="/imgs/trading-unit.png" alt="Trading Unit" maxW="800px" />
      </Box>
    </Container>
  );
}
