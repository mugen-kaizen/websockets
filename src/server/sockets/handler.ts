import { Socket, Server } from 'socket.io';
import { CHANNELS } from './types';

export const registerHandlers = (io: Server, socket: Socket) => {
    console.log(`User connected: ${socket.id}`);

    // Join all default channels on connection
    Object.values(CHANNELS).forEach((channelId) => {
        socket.join(channelId);
        console.log(`Socket ${socket.id} joined channel: ${channelId}`);
    });

    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
    });

    // Handler for sending/receiving messages in specific channels
    socket.on('message', (data: { channelId: string, text: string }) => {
        const newMessage = {
            id: Date.now(),
            text: data.text,
            sender: 'other',
            author: `User ${socket.id.slice(0, 4)}`,
            channelId: data.channelId
        };

        // Broadcast to the room (including the sender)
        io.to(data.channelId).emit('message', newMessage);
    });
};
