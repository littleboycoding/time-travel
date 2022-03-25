import {
  Box,
  Center,
  Heading,
  Image,
  Stack,
  Text,
  Button,
  Container,
} from "@chakra-ui/react";

import faker from "@faker-js/faker";
import { useNavigate } from "react-router-dom";

const mockImage = "https://bit.ly/naruto-sage";

function Gallery({ images }) {
  const imgs = images.map((img) => (
    <Image
      key={img}
      bg="imageBg"
      borderRadius={2}
      boxSize="60px"
      objectFit="cover"
      src={img}
    />
  ));

  return (
    <Center>
      <Stack gap={2} direction="row" borderRadius={5} p={2}>
        {imgs}
      </Stack>
    </Center>
  );
}

function Record() {
  const navigate = useNavigate();

  return (
    <Container maxW={550}>
      <Stack gap={2}>
        <Box>
          <Heading fontSize={18}>blogchain</Heading>
          <Text fontSize={12}>Last snapshot on Mar 20 at 23.47</Text>
        </Box>
        <Image
          bg="imageBg"
          borderRadius={5}
          h={300}
          objectFit="contain"
          src={mockImage}
        />
        <Gallery
          images={[
            faker.image.image(),
            faker.image.image(),
            faker.image.image(),
            faker.image.image(),
          ]}
        />
        <Center>
          <Stack gap={5} direction="row">
            <Button variant="solid">Record</Button>
            <Button onClick={() => navigate("/preference")}>Preference</Button>
            <Button onClick={() => navigate("/")}>Return</Button>
          </Stack>
        </Center>
      </Stack>
    </Container>
  );
}

export default Record;
