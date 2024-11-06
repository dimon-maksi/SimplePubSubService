import { Injectable } from '@nestjs/common';
import { IDatasourceService } from './datasource.service.interface';
import { ITopic, IMessage } from './data/data.interface';

@Injectable()
export class MongoDatasourceService implements IDatasourceService {
    getAllTopics(): Promise<ITopic[]> {
        throw new Error('Method not implemented.');
    }
    getTopicByName(topicName: string): Promise<ITopic | null> {
        throw new Error('Method not implemented.');
    }
    createTopic(topicName: string): Promise<ITopic> {
        throw new Error('Method not implemented.');
    }
    deleteTopic(topicName: string): Promise<void> {
        throw new Error('Method not implemented.');
    }
    addSubscriberFromTopic(
        topicName: string,
        subscriberId: string
    ): Promise<void> {
        throw new Error('Method not implemented.');
    }
    removeSubscriberFromTopic(
        topicName: string,
        subscriberId: string
    ): Promise<void> {
        throw new Error('Method not implemented.');
    }
    getLastMessages(topicName: string, count: number): Promise<IMessage[]> {
        throw new Error('Method not implemented.');
    }
    publishMessageToTopic(
        topicName: string,
        messageContent: any
    ): Promise<void> {
        throw new Error('Method not implemented.');
    }
}
