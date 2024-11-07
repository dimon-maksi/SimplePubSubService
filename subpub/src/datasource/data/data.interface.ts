import { Response } from 'express';

export interface ITopic {
    topicName: string;
    subscribers: ISubscriber[];
    messages: IMessage[];
}

export interface ISubscriber {
    subscriberId: string;
    response?: Response;
}

export interface IMessage {
    topic: string;
    content: any;
    timestamp: Date;
}
