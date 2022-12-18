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
import type { ActionArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";

import printNumberFormat from "~/helpers/printNumberFormat";
import getMeta from "~/helpers/getMeta";

export const meta: MetaFunction = () =>
  getMeta({ title: "ARB & ARA Calculation" });

const getStockMultiple = (price: number, isARA = false) => {
  const roundingFormula = isARA ? Math.floor : Math.ceil;

  if (price >= 5000) {
    return roundingFormula(price / 25) * 25;
  } else if (price >= 2000) {
    return roundingFormula(price / 10) * 10;
  } else if (price >= 500) {
    return roundingFormula(price / 5) * 5;
  } else if (price >= 200) {
    return roundingFormula(price / 2) * 2;
  }

  return price;
};

const updateARA = (price: number) => {
  // Check IDX policy about ARA & ARB
  let araPercentage = 35;

  if (price > 5000) {
    araPercentage = 20;
  } else if (price > 200) {
    araPercentage = 25;
  }

  const araPrice = price + (price * araPercentage) / 100;
  const araPriceMultiple = Math.floor(getStockMultiple(araPrice, true));
  const percentage = ((araPriceMultiple - price) / price) * 100;

  return {
    araPrice: araPriceMultiple,
    araPercentage: percentage,
  };
};

const updateARB = (price: number) => {
  const tempPrice = price - (price * 7) / 100;
  const arbPrice = tempPrice >= 50 ? tempPrice : 50;
  const arbPriceMultiple = Math.ceil(getStockMultiple(arbPrice));
  const percentage = ((arbPriceMultiple - price) / price) * 100;

  return {
    arbPrice: arbPriceMultiple,
    arbPercentage: percentage,
  };
};

export default function AraArbCalculation() {
  const actionData = useActionData<typeof action>();

  const { arbData, araData } = actionData || {};
  const { arbPrice = 0, arbPercentage = 0 } = arbData || {};
  const { araPrice = 0, araPercentage = 0 } = araData || {};

  return (
    <Container maxW="container.lg" pt={8} pb={16}>
      <Form method="post">
        <Box marginBottom={12}>
          <Heading as="h2" size="xl" marginBottom={4}>
            ARA & ARB Calculation
          </Heading>
          <Box marginBottom={6}>
            <NumberInput defaultValue={100} min={50}>
              <NumberInputField
                placeholder="Put stock price here"
                name="stockPrice"
              />
            </NumberInput>
          </Box>
          <button type="submit" hidden>
            Submit
          </button>
          <Box display="flex">
            <Grid templateColumns="repeat(2, 1fr)" gap={6} w="100%">
              <Card>
                <CardHeader>
                  <Heading size="md">Auto Rejection Bawah (ARB)</Heading>
                </CardHeader>
                <CardBody>
                  <Text fontSize="5xl" fontWeight="bold" color="red.500">
                    {printNumberFormat(arbPrice)} (
                    {printNumberFormat(arbPercentage)}%)
                  </Text>
                </CardBody>
              </Card>
              <Card>
                <CardHeader>
                  <Heading size="md">Auto Rejection Atas (ARA)</Heading>
                </CardHeader>
                <CardBody>
                  <Text fontSize="5xl" fontWeight="bold" color="green.400">
                    {printNumberFormat(araPrice)} (
                    {printNumberFormat(araPercentage)}%)
                  </Text>
                </CardBody>
              </Card>
            </Grid>
          </Box>
        </Box>
      </Form>
      <Box>
        <Heading as="h2" size="lg" marginBottom={4}>
          IDX Information
        </Heading>
        <Heading as="h3" size="md" marginBottom={4}>
          Auto Rejection Policy
        </Heading>
        <Image
          src="/imgs/auto-rejection.jpg"
          alt="ARA ARB"
          maxW="720px"
          w="100%"
        />
        <Heading as="h3" size="md" marginBottom={4} marginTop={6}>
          Trading Unit Policy
        </Heading>
        <Image
          src="/imgs/trading-unit.png"
          alt="Trading Unit"
          maxW="800px"
          w="100%"
        />
      </Box>
    </Container>
  );
}

export const action = async ({ request }: ActionArgs) => {
  const body = await request.formData();
  const value = body.get("stockPrice");

  if (typeof value !== "string") {
    throw new Error(`Form not submitted correctly.`);
  }

  const araData = updateARA(Number(value));
  const arbData = updateARB(Number(value));

  return json({ araData, arbData });
};
