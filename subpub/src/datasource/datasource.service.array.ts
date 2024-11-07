import { Injectable, Logger } from '@nestjs/common';
import { IDatasourceService } from './datasource.service.interface';
import { ITopic, IMessage, ISubscriber } from './data/data.interface';

@Injectable()
export class ArrayDatasourceService implements IDatasourceService {
    private topics: ITopic[] = [];

    async getAllTopics(): Promise<ITopic[]> {
        return Promise.resolve(this.topics);
    }

    async getTopicByName(topicName: string): Promise<ITopic | null> {
        Logger.log(`Array is working`);
        const topic = this.topics.find(topic => topic.topicName === topicName);
        return Promise.resolve(topic || null);
    }

    async createTopic(topicName: string): Promise<ITopic> {
        const existingTopic = await this.getTopicByName(topicName);
        if (existingTopic) {
            throw new Error('Topic already exists');
        }

        const newTopic: ITopic = {
            topicName: topicName,
            subscribers: [],
            messages: [],
        };

        this.topics.push(newTopic);
        return Promise.resolve(newTopic);
    }

    async deleteTopic(topicName: string): Promise<void> {
        const index = this.topics.findIndex(
            topic => topic.topicName === topicName
        );
        if (index === -1) {
            throw new Error('Topic not found');
        }
        this.topics.splice(index, 1);
        return Promise.resolve();
    }

    async addSubscriberFromTopic(
        topicName: string,
        subscriber: ISubscriber
    ): Promise<void> {
        const topic = await this.getTopicByName(topicName);
        if (!topic) {
            throw new Error('Topic not found');
        }

        const existingSubscriber = topic.subscribers.find(
            subscriber => subscriber.subscriberId === subscriber.subscriberId
        );
        if (existingSubscriber) {
            throw new Error('Subscriber already exists for this topic');
        }

        topic.subscribers.push(subscriber);
        return Promise.resolve();
    }

    async removeSubscriberFromTopic(
        topicName: string,
        subscriberId: string
    ): Promise<void> {
        const topic = await this.getTopicByName(topicName);
        if (!topic) {
            throw new Error('Topic not found');
        }

        const subscriberIndex = topic.subscribers.findIndex(
            subscriber => subscriber.subscriberId === subscriberId
        );
        if (subscriberIndex === -1) {
            throw new Error('Subscriber not found');
        }

        topic.subscribers.splice(subscriberIndex, 1);
        return Promise.resolve();
    }

    async getLastMessages(
        topicName: string,
        count: number
    ): Promise<IMessage[]> {
        const topic = await this.getTopicByName(topicName);
        if (!topic) {
            throw new Error('Topic not found');
        }

        return Promise.resolve(topic.messages.slice(-count));
    }

    async publishMessageToTopic(
        topicName: string,
        messageContent: any
    ): Promise<void> {
        const topic = await this.getTopicByName(topicName);
        if (!topic) {
            throw new Error('Topic not found');
        }

        const newMessage: IMessage = {
            topic: topicName,
            content: messageContent,
            timestamp: new Date(),
        };

        topic.messages.push(newMessage);

        return Promise.resolve();
    }
}
