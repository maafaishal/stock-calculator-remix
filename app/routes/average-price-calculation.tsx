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

import getMeta from "~/helpers/getMeta";

const BUY_TYPE = "1";
const SELL_TYPE = "2";

export const meta: MetaFunction = () =>
  getMeta({ title: "Average Calculation" });

export default function AverageCalculation() {
  const actionData = useActionData<typeof action>();

  const { averagePrice = 0, stockLot = 0, amount = 0 } = actionData || {};

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
                  <Radio colorScheme="blue" value={BUY_TYPE}>
                    Buy
                  </Radio>
                  <Radio colorScheme="red" value={SELL_TYPE}>
                    Sell
                  </Radio>
                </Stack>
              </RadioGroup>
            </FormControl>
            <Grid templateColumns="repeat(2, 1fr)" gap={6}>
              <FormControl>
                <FormLabel>Current Lot</FormLabel>
                <NumberInput>
                  <NumberInputField
                    placeholder="Put stock lot here"
                    name="currentLot"
                  />
                </NumberInput>
              </FormControl>
              <FormControl>
                <FormLabel>Current Price</FormLabel>
                <NumberInput>
                  <NumberInputField
                    placeholder="Put stock price here"
                    name="currentPrice"
                  />
                </NumberInput>
              </FormControl>
              <FormControl>
                <FormLabel>Target Lot</FormLabel>
                <NumberInput>
                  <NumberInputField
                    placeholder="Put stock lot here"
                    name="targetLot"
                  />
                </NumberInput>
              </FormControl>
              <FormControl>
                <FormLabel>Target Price</FormLabel>
                <NumberInput>
                  <NumberInputField
                    placeholder="Put stock price here"
                    name="targetPrice"
                  />
                </NumberInput>
              </FormControl>
            </Grid>
          </Box>
          <button type="submit" hidden>
            Create Todo
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

  const currentAmount = currentLot * currentPrice;
  const targetAmount = targetLot * targetPrice;

  const averagePrice =
    (currentAmount + targetAmount) / (currentLot + targetLot);

  return json({
    averagePrice,
    stockLot: currentLot + targetLot,
    amount: currentAmount + targetAmount,
  });
};
