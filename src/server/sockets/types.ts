export const CHANNELS = {
    PROJECT: 'project',
    SOCIAL: 'social',
    FEEDBACK: 'feedback'
} as const;

export type ChannelId = typeof CHANNELS[keyof typeof CHANNELS];
