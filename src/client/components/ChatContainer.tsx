import React, { useState } from 'react';
import { Card, Box, Text, TextField, Button, Flex, ScrollArea, Avatar, Select, Badge } from '@radix-ui/themes';
import { Send, User } from 'lucide-react';
import { useSocket } from '../hooks/useSocket';

interface ChatContainerProps {
    initialChannelId: string;
}

export const ChatContainer: React.FC<ChatContainerProps> = ({
    initialChannelId
}) => {
    const [selectedChannelId, setSelectedChannelId] = useState(initialChannelId);
    const [messageText, setMessageText] = useState('');

    const { channels, sendMessage, isConnected } = useSocket();

    const currentChannel = channels.find(c => c.id === selectedChannelId) || channels[0];

    const handleSend = () => {
        if (messageText.trim()) {
            sendMessage(selectedChannelId, messageText);
            setMessageText('');
        }
    };

    return (
        <Card size="2" style={{ height: '500px', display: 'flex', flexDirection: 'column', width: '100%' }}>
            <Box mb="3" pb="2" style={{ borderBottom: '1px solid var(--gray-5)' }}>
                <Flex justify="between" align="center">
                    <Flex align="center" gap="2">
                        <Text size="4" weight="bold">{currentChannel.name}</Text>
                        <Badge color={isConnected ? "green" : "red"} variant="surface" size="1">
                            {isConnected ? "Connected" : "Disconnected"}
                        </Badge>
                    </Flex>
                    <Select.Root value={selectedChannelId} onValueChange={setSelectedChannelId}>
                        <Select.Trigger variant="ghost" />
                        <Select.Content>
                            {channels.map(channel => (
                                <Select.Item key={channel.id} value={channel.id}>
                                    {channel.name}
                                </Select.Item>
                            ))}
                        </Select.Content>
                    </Select.Root>
                </Flex>
            </Box>

            <ScrollArea scrollbars="vertical" style={{ flexGrow: 1, paddingRight: '12px' }}>
                <Flex direction="column" gap="3">
                    {currentChannel.messages.map((msg) => (
                        <Flex
                            key={msg.id}
                            gap="2"
                            justify={msg.sender === 'user' ? 'end' : 'start'}
                            align="start"
                        >
                            {msg.sender === 'other' && (
                                <Avatar size="1" fallback={<User size={12} />} radius="full" />
                            )}
                            <Box
                                px="3"
                                py="2"
                                style={{
                                    backgroundColor: msg.sender === 'user' ? 'var(--violet-9)' : 'var(--gray-3)',
                                    color: msg.sender === 'user' ? 'white' : 'inherit',
                                    borderRadius: 'var(--radius-3)',
                                    maxWidth: '80%',
                                }}
                            >
                                <Text as="div" size="2" weight="bold" mb="1" style={{ fontSize: '10px', opacity: 0.8 }}>
                                    {msg.author}
                                </Text>
                                <Text size="2">{msg.text}</Text>
                            </Box>
                            {msg.sender === 'user' && (
                                <Avatar size="1" fallback="ME" radius="full" color="violet" />
                            )}
                        </Flex>
                    ))}
                </Flex>
            </ScrollArea>

            <Box pt="3" mt="auto">
                <Flex gap="2">
                    <TextField.Root
                        placeholder="Type a message..."
                        style={{ flexGrow: 1 }}
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    >
                        <TextField.Slot />
                    </TextField.Root>
                    <Button variant="soft" onClick={handleSend} disabled={!isConnected}>
                        <Send size={16} />
                    </Button>
                </Flex>
            </Box>
        </Card>
    );
};
