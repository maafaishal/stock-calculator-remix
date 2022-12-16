import { Container, Box, Heading } from "@chakra-ui/react";
import type { MetaFunction } from "@remix-run/node";

import getMeta from "~/helpers/getMeta";

export const meta: MetaFunction = () => getMeta({ title: "IDX Information" });

export default function IDXInformation() {
  return (
    <Container maxW="container.lg" pt={8} pb={16}>
      <Box>
        <Heading as="h2" size="lg" marginBottom={4}>
          IDX Information
        </Heading>
      </Box>
    </Container>
  );
}
