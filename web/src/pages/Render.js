import {
  Center,
  Container,
  Heading,
  Stack,
  Text,
  Image,
  Box,
  Input,
  Button,
} from "@chakra-ui/react";
import faker from "@faker-js/faker";
import { useNavigate } from "react-router";

const mockImage = faker.image.image();

function Render() {
  const navigate = useNavigate();

  const back = () => {
    navigate("/");
  };

  return (
    <Container maxW={550}>
      <Stack gap={2}>
        <Box>
          <Heading fontSize={18}>blogchain</Heading>
          <Text fontSize={12} color="dimmed">
            Rendering
          </Text>
        </Box>
        <Image
          h={300}
          bg="#e6e6e6"
          borderRadius={5}
          src={mockImage}
          objectFit="contain"
        />
        <Center>
          <Text color="dimmed" fontSize={12}>
            126 / 412
          </Text>
        </Center>
        <Stack gap={5} justifyContent="center" direction="row">
          <Stack>
            <Text fontSize={12} color="dimmed">
              Total snapshot
            </Text>
            <Text>412</Text>
          </Stack>
          <Stack>
            <Text fontSize={12} color="dimmed">
              Frame per second
            </Text>
            <Input h={25} w="10ch" />
          </Stack>
          <Stack>
            <Text fontSize={12} color="dimmed">
              Video length
            </Text>
            <Text>10 second</Text>
          </Stack>
        </Stack>
        <Stack justifyContent="center" direction="row">
          <Button variant="solid">Render</Button>
          <Button onClick={back}>Cancel</Button>
        </Stack>
      </Stack>
    </Container>
  );
}

export default Render;
