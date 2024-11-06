export interface ITopic {
    topicName: string;
    subscribers: ISubscriber[];
    messages: IMessage[];
}

export interface ISubscriber {
    subscriberId: string;
}

export interface IMessage {
    topic: string;
    content: any;
    timestamp: Date;
}
