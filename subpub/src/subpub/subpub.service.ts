import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { IMessage, ITopic } from '../datasource/data/data.interface';
import { IDatasourceService } from 'src/datasource/datasource.service.interface';

export class SubpubService {
    constructor(private readonly datasourceService: IDatasourceService) {}

    async subscribe(topic: string, res: Response<any, Record<string, any>>) {
        try {
            const topicData =
                await this.datasourceService.getTopicByName(topic);

            if (!topicData) {
                return res.status(404).send('Topic not found');
            }

            // Here, we would manage SSE connection logic
            // Assuming you have logic to manage subscribers in topicData

            // For SSE (Server-Sent Events), subscribe the user
            // You can store the response stream (`res`) and send updates later
            // Implement your SSE logic here (like sending events on new message publish)

            res.status(200).send({ message: `Subscribed to ${topic}` });
        } catch (error) {
            res.status(500).send('Failed to subscribe');
        }
    }

    async unsubscribe(topic: string, subscriberData: any) {
        try {
            await this.datasourceService.removeSubscriberFromTopic(
                topic,
                subscriberData.subscriberId
            );
            return { message: `Unsubscribed from ${topic}` };
        } catch (error) {
            throw new Error(`Failed to unsubscribe from ${topic}`);
        }
    }

    async publish(topic: string, messageData: any) {
        try {
            const topicData =
                await this.datasourceService.getTopicByName(topic);

            if (!topicData) {
                throw new Error('Topic not found');
            }
            // Add message send logic
            await this.datasourceService.publishMessageToTopic(
                topic,
                messageData
            );
            return { message: 'Message published successfully' };
        } catch (error) {
            throw new Error(`Failed to publish message to ${topic}`);
        }
    }

    async getAllTopics(): Promise<ITopic[]> {
        try {
            return await this.datasourceService.getAllTopics();
        } catch (error) {
            throw new Error('Failed to fetch topics');
        }
    }

    async getLastMessages(
        topic: string,
        cound: number = 1
    ): Promise<IMessage[]> {
        try {
            return await this.datasourceService.getLastMessages(topic, cound);
        } catch (error) {
            throw new Error(`Failed to fetch messages for topic: ${topic}`);
        }
    }
}
