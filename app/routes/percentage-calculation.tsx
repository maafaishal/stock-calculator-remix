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
} from "@chakra-ui/react";
import type { ActionArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";

import getMeta from "~/helpers/getMeta";
import printNumberFormat from "~/helpers/printNumberFormat";

export const meta: MetaFunction = () =>
  getMeta({ title: "Percentage Calculation" });

export default function PercentageCalculation() {
  const actionData = useActionData<typeof action>();

  const {
    percentage = 0,
    amountTotal = 0,
    amountDeviation = 0,
  } = actionData || {};

  const textColor = percentage < 0 ? "red.500" : "green.400";

  return (
    <Container maxW="container.lg" pt={8} pb={16}>
      <Form method="post">
        <Box marginBottom={12}>
          <Heading as="h2" size="xl" marginBottom={4}>
            Percentage Calculation
          </Heading>
          <Box marginBottom={6}>
            <Grid templateColumns="repeat(2, 1fr)" gap={6}>
              <FormControl>
                <FormLabel>Average Price</FormLabel>
                <NumberInput>
                  <NumberInputField
                    placeholder="Put average price here"
                    name="averagePrice"
                  />
                </NumberInput>
              </FormControl>
              <FormControl>
                <FormLabel>Current/Target Price</FormLabel>
                <NumberInput>
                  <NumberInputField
                    placeholder="Put current/target price here"
                    name="targetPrice"
                  />
                </NumberInput>
              </FormControl>
              <FormControl>
                <FormLabel>Amount</FormLabel>
                <NumberInput min={50}>
                  <NumberInputField
                    placeholder="Put amount here"
                    name="amount"
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
          <Grid templateColumns="repeat(2, 1fr)" gap={6} w="100%">
            <Card>
              <CardHeader>
                <Heading size="md">Amount Total</Heading>
              </CardHeader>
              <CardBody>
                <Text fontSize="4xl" fontWeight="bold" color={textColor}>
                  {amountTotal}
                </Text>
              </CardBody>
            </Card>
            <Card>
              <CardHeader>
                <Heading size="md">Percentage</Heading>
              </CardHeader>
              <CardBody>
                <Text fontSize="4xl" fontWeight="bold" color={textColor}>
                  {printNumberFormat(percentage)}% ({amountDeviation})
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
  const averagePrice = Number(body.get("averagePrice"));
  const targetPrice = Number(body.get("targetPrice"));
  const amount = Number(body.get("amount"));

  if (
    typeof averagePrice !== "number" ||
    typeof targetPrice !== "number" ||
    typeof amount !== "number"
  ) {
    throw new Error(`Form not submitted correctly.`);
  }

  const percentage = ((targetPrice - averagePrice) / averagePrice) * 100;
  const amountTotal = amount + (amount * percentage) / 100;
  const amountDeviation = amountTotal - amount;

  return json({
    percentage: percentage,
    amountTotal: printNumberFormat(amountTotal, { withCurrency: true }),
    amountDeviation: printNumberFormat(amountDeviation, { withCurrency: true }),
  });
};
