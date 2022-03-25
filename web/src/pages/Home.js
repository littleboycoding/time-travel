/*global getConf*/
/*global selectDirectory*/
/*global updateConf*/
/*global getLatestSnapshot*/

import {
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  Box,
  Center,
  Spinner,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import TimeTravel from "../time_travel.svg";

function Home() {
  const navigate = useNavigate();
  const [conf, setConf] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    getConf().then((c) => setConf(c));
  }, []);

  useEffect(() => {
    if (conf && conf.directory !== "NONE") {
      getLatestSnapshot(1).then((p) => {
        setPreview(p[0]);
      });
    }
  }, [conf]);

  const select = async () => {
    const dir = await selectDirectory();

    const newConf = { ...conf };
    newConf.directory = dir;
    await updateConf(newConf);

    setConf(newConf);
  };

  if (!conf || !preview)
    return (
      <Center h={100}>
        <Spinner />
      </Center>
    );

  return (
    <Box>
      <Flex gap={10}>
        <Stack flex={1}>
          <Image
            borderRadius={5}
            src={preview[0]}
            objectFit="contain"
            bg="imageBg"
            w="100%"
            h={170}
          />
          <Flex justifyContent="space-between" direction="row" py={2}>
            {conf.directory === "NONE" ? (
              <Button
                onClick={select}
                leftIcon={<ExternalLinkIcon />}
                fontSize={12}
              >
                Select project directory
              </Button>
            ) : (
              <>
                <Box>
                  <Text fontSize={14} color="dimmed">
                    Current session
                  </Text>
                  <Text maxW={120} isTruncated fontSize={18}>
                    blogchain
                  </Text>
                </Box>
                <Button
                  onClick={select}
                  leftIcon={<ExternalLinkIcon />}
                  fontSize={12}
                >
                  Select project directory
                </Button>
              </>
            )}
          </Flex>
          <Button onClick={() => navigate("/record")} variant="solid">
            Start recording session
          </Button>
          <Button onClick={() => navigate("/render")}>Render timelapse</Button>
        </Stack>
        <Stack gap={2} flex={1} alignItems="center" direction="column">
          <Heading fontSize={36}>Time Travel</Heading>
          <Text fontSize={18}>Create timelapse session easily</Text>
          <Image src={TimeTravel} />
        </Stack>
      </Flex>
    </Box>
  );
}

export default Home;
