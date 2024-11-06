import { IMessage, ITopic } from './data/data.interface';

export interface IDatasourceService {
    getAllTopics(): Promise<ITopic[]>;
    getTopicByName(topicName: string): Promise<ITopic | null>;
    createTopic(topicName: string): Promise<ITopic>;
    deleteTopic(topicName: string): Promise<void>;
    addSubscriberFromTopic(
        topicName: string,
        subscriberId: string
    ): Promise<void>;
    removeSubscriberFromTopic(
        topicName: string,
        subscriberId: string
    ): Promise<void>;
    getLastMessages(topicName: string, count: number): Promise<IMessage[]>;
    publishMessageToTopic(
        topicName: string,
        messageContent: any
    ): Promise<void>;
}
