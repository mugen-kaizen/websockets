import { useState, useEffect, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';

export interface Message {
    id: number;
    text: string;
    sender: 'user' | 'other';
    author: string;
}

export interface Channel {
    id: string;
    name: string;
    messages: Message[];
}

export const useSocket = () => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [channels, setChannels] = useState<Channel[]>([
        {
            id: 'project',
            name: 'Project Group',
            messages: [
                { id: 1, text: "Hey! How's the project going?", sender: 'other', author: 'Alice' },
            ]
        },
        {
            id: 'social',
            name: 'Social',
            messages: [
                { id: 1, text: "Dinner tonight?", sender: 'other', author: 'Bob' },
            ]
        },
        {
            id: 'feedback',
            name: 'Feedback',
            messages: [
                { id: 1, text: "The new UI looks amazing!", sender: 'other', author: 'Charlie' },
            ]
        },
    ]);

    useEffect(() => {
        const s = io();
        setSocket(s);

        s.on("connect", () => setIsConnected(true));
        s.on("disconnect", () => setIsConnected(false));

        const onMessage = (data: { channelId: string } & Message) => {
            setChannels((prev) => prev.map(channel => {
                if (channel.id === data.channelId) {
                    if (channel.messages.find(m => m.id === data.id)) return channel;

                    return {
                        ...channel,
                        messages: [...channel.messages, {
                            ...data,
                            sender: data.author.includes(s.id?.slice(0, 4) || '') ? 'user' : 'other'
                        }]
                    };
                }
                return channel;
            }));
        };

        s.on('message', onMessage);

        return () => {
            s.off('connect');
            s.off('disconnect');
            s.off('message', onMessage);
            s.disconnect();
        };
    }, []);

    const sendMessage = useCallback((channelId: string, text: string) => {
        if (socket && isConnected && text.trim()) {
            socket.emit('message', { channelId, text });
        }
    }, [socket, isConnected]);

    return {
        channels,
        sendMessage,
        isConnected
    };
};
