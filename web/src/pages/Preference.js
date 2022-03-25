/*global getConf*/
/*global updateConf*/
/*global monitorInfo*/

import {
  Container,
  Divider,
  Heading,
  Image,
  Input,
  Select,
  Stack,
  Text,
  Button,
  Center,
  Spinner,
} from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

function Preference() {
  const [conf, setConf] = useState(null);
  const [monitor, setMonitor] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getConf().then((c) => setConf(c));
  }, []);

  useEffect(() => {
    if (conf)
      monitorInfo(conf.monitor).then(([total, base64]) =>
        setMonitor({
          total,
          preview: "data:image/png;base64," + base64,
        })
      );
  }, [conf?.monitor]);

  const handleIntervalChange = (event) => {
    const newConf = { ...conf };
    newConf.interval = event.target.value;

    setConf(newConf);
  };

  const handleMonitorSelect = (event) => {
    const newConf = { ...conf };
    newConf.monitor = parseInt(event.target.value);

    setConf(newConf);
  };

  const save = () => {
    const config = {
      ...conf,
    };
    config.interval = parseInt(config.interval);

    updateConf(config).then(() => back());
  };

  const back = () => {
    navigate("/record");
  };

  if (!conf || !monitor)
    return (
      <Center h={100}>
        <Spinner />
      </Center>
    );

  const monitors = [];

  for (let i = 0; i < monitor.total; i++) {
    monitors.push(
      <option key={i} value={i}>
        Monitor {i}
      </option>
    );
  }

  return (
    <Container maxW={550}>
      <Stack gap={1}>
        <Heading fontSize={18}>Preference</Heading>
        <Stack>
          <Text fontSize={14}>Snapshot interval</Text>
          <Text color="dimmed" fontSize={12}>
            delay between screen snapshot in second
          </Text>
          <Input
            onChange={handleIntervalChange}
            value={conf.interval}
            placeholder="Snapshot interval"
          />
        </Stack>
        <Divider variant="dashed" />
        <Stack>
          <Text fontSize={14}>Monitor</Text>
          <Text color="dimmed" fontSize={12}>
            choose monitor to snapshot
          </Text>
          <Select onChange={handleMonitorSelect}>
            <option selected disabled>
              Monitor {conf.monitor}
            </option>
            {monitors}
          </Select>
          <Image
            bg="imageBg"
            borderRadius={5}
            src={monitor.preview}
            alt="preview"
            h={175}
            objectFit="contain"
          />
          <Center>
            <Text color="dimmed" fontStyle="italic" fontSize={12}>
              Preview
            </Text>
          </Center>
        </Stack>
        <Stack justifyContent="center" direction="row">
          <Button onClick={save} variant="solid">
            Save
          </Button>
          <Button onClick={back}>Cancel</Button>
        </Stack>
      </Stack>
    </Container>
  );
}

export default Preference;
