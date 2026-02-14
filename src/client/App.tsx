import { Container, Grid, Section, Heading, Flex } from "@radix-ui/themes";
import { ChatContainer } from "./components/ChatContainer";
import { MessageCircle } from "lucide-react";

function App() {
  return (
    <Container size="4">
      <Section py="5">
        <Flex direction="column" gap="4">
          <Flex justify="between" align="center">
            <Flex align="center" gap="3">
              <MessageCircle size={32} color="var(--violet-9)" />
              <Heading size="8">Messenger</Heading>
            </Flex>
          </Flex>

          <Grid columns={{ initial: '1', md: '3' }} gap="4">
            <ChatContainer initialChannelId="project" />
            <ChatContainer initialChannelId="social" />
            <ChatContainer initialChannelId="feedback" />
          </Grid>
        </Flex>
      </Section>
    </Container>
  );
}

export default App;
