import {
  Container,
  Box,
  Heading,
  NumberInput,
  NumberInputField,
  Grid,
  FormControl,
  FormLabel,
  Card,
  CardHeader,
  CardBody,
  Text,
  RadioGroup,
  Radio,
  Stack,
} from "@chakra-ui/react";
import type { ActionArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { useLocalStorage } from "usehooks-ts";
import { useRef, useEffect } from "react";

import getMeta from "~/helpers/getMeta";
import printNumberFormat from "~/helpers/printNumberFormat";

const BUY_TYPE = "1";
const SELL_TYPE = "2";

export const meta: MetaFunction = () =>
  getMeta({ title: "Average Calculation" });

export default function AverageCalculation() {
  const actionData = useActionData<typeof action>();
  const [lastAvgData, setLastAvgData] = useLocalStorage("AVG_PRICE_LAST_DATA", {
    currentLot: 0,
    currentPrice: 0,
  });

  const {
    averagePrice = 0,
    stockLot = 0,
    amount = 0,
    currentLot = 0,
    currentPrice = 0,
  } = actionData || {};
  const prevAveragePrice = useRef(averagePrice);

  useEffect(() => {
    if (prevAveragePrice.current !== averagePrice) {
      prevAveragePrice.current = averagePrice;
      setLastAvgData({ currentLot, currentPrice });
    }
  }, [averagePrice, currentLot, currentPrice, setLastAvgData]);

  return (
    <Container maxW="container.lg" pt={8} pb={16}>
      <Form method="post">
        <Box marginBottom={12}>
          <Heading as="h2" size="xl" marginBottom={4}>
            Average Calculation
          </Heading>
          <Box marginBottom={6}>
            <FormControl marginBottom={6}>
              <FormLabel>Transaction Type</FormLabel>
              <RadioGroup defaultValue={BUY_TYPE}>
                <Stack spacing={5} direction="row">
                  <Radio
                    colorScheme="blue"
                    name="transactionType"
                    value={BUY_TYPE}
                  >
                    Buy
                  </Radio>
                  <Radio
                    colorScheme="red"
                    name="transactionType"
                    value={SELL_TYPE}
                  >
                    Sell
                  </Radio>
                </Stack>
              </RadioGroup>
            </FormControl>
            <Grid templateColumns="repeat(2, 1fr)" gap={6}>
              <FormControl>
                <FormLabel>Current Lot</FormLabel>
                <NumberInput defaultValue={lastAvgData.currentLot}>
                  <NumberInputField
                    placeholder="Put stock lot here"
                    name="currentLot"
                  />
                </NumberInput>
              </FormControl>
              <FormControl>
                <FormLabel>Current Price</FormLabel>
                <NumberInput defaultValue={lastAvgData.currentPrice}>
                  <NumberInputField
                    placeholder="Put stock price here"
                    name="currentPrice"
                  />
                </NumberInput>
              </FormControl>
              <FormControl>
                <FormLabel>Target Lot</FormLabel>
                <NumberInput defaultValue={0}>
                  <NumberInputField
                    placeholder="Put stock lot here"
                    name="targetLot"
                  />
                </NumberInput>
              </FormControl>
              <FormControl>
                <FormLabel>Target Price</FormLabel>
                <NumberInput defaultValue={0}>
                  <NumberInputField
                    placeholder="Put stock price here"
                    name="targetPrice"
                  />
                </NumberInput>
              </FormControl>
            </Grid>
          </Box>
          <button type="submit" hidden>
            Submit
          </button>
        </Box>
      </Form>
      <Box>
        <Heading as="h3" size="lg" marginBottom={4}>
          Result
        </Heading>
        <Box display="flex">
          <Grid templateColumns="repeat(3, 1fr)" gap={6} w="100%">
            <Card>
              <CardHeader>
                <Heading size="md">Average Price</Heading>
              </CardHeader>
              <CardBody>
                <Text fontSize="4xl" fontWeight="bold" color="green.500">
                  {averagePrice}
                </Text>
              </CardBody>
            </Card>
            <Card>
              <CardHeader>
                <Heading size="md">Lot</Heading>
              </CardHeader>
              <CardBody>
                <Text fontSize="4xl" fontWeight="bold" color="green.500">
                  {stockLot}
                </Text>
              </CardBody>
            </Card>
            <Card>
              <CardHeader>
                <Heading size="md">Amount</Heading>
              </CardHeader>
              <CardBody>
                <Text fontSize="4xl" fontWeight="bold" color="green.500">
                  {amount}
                </Text>
              </CardBody>
            </Card>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export const action = async ({ request }: ActionArgs) => {
  const body = await request.formData();
  const transactionType = body.get("transactionType");
  const currentLot = Number(body.get("currentLot"));
  const currentPrice = Number(body.get("currentPrice"));
  const targetLot = Number(body.get("targetLot"));
  const targetPrice = Number(body.get("targetPrice"));

  if (
    typeof currentLot !== "number" ||
    typeof currentPrice !== "number" ||
    typeof targetLot !== "number" ||
    typeof targetPrice !== "number"
  ) {
    throw new Error(`Form not submitted correctly.`);
  }

  const isBuy = transactionType === BUY_TYPE;

  const currentAmount = currentLot * currentPrice;
  const targetAmount = targetLot * targetPrice;

  const amountTotal = isBuy
    ? currentAmount + targetAmount
    : currentAmount - targetAmount;
  const lotTotal = isBuy ? currentLot + targetLot : currentLot - targetLot;
  const averagePrice = printNumberFormat(amountTotal / lotTotal, {
    withCurrency: true,
  });

  return json({
    averagePrice,
    stockLot: printNumberFormat(lotTotal),
    amount: printNumberFormat(amountTotal * 100, { withCurrency: true }),
    currentLot,
    currentPrice,
  });
};
