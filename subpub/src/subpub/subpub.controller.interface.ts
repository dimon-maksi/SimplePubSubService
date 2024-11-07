import { IMessage, ITopic } from 'src/datasource/data/data.interface';

export interface ISubpubController {
    subscribe(topic: string, subscriberData: any): Promise<void>;
    publish(topic: string, messageData: any): Promise<void>;
    getAllTopics(): Promise<ITopic[]>;
    getLastMessages(topic: string, count: number): Promise<IMessage[]>;
}
