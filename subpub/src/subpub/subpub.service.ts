import { Injectable } from '@nestjs/common';
import { response, Response } from 'express';
import {
    IMessage,
    ITopic,
    ISubscriber,
} from '../datasource/data/data.interface';
import { IDatasourceService } from 'src/datasource/datasource.service.interface';
import { Logger } from '@nestjs/common';
import { ArrayDatasourceService } from 'src/datasource/datasource.service.array';

export class SubpubService {
    datasourceService: IDatasourceService = new ArrayDatasourceService();
    // constructor(private readonly datasourceService: IDatasourceService) {}

    async subscribe(topic: string, res: Response) {
        try {
            Logger.log(`Say something`);
            let topicData = await this.datasourceService.getTopicByName(topic);

            Logger.log(`Are you alive?`);
            if (!topicData) {
                topicData = await this.datasourceService.createTopic(topic);
                Logger.log(`Topic ${topic} was creater`);
            }

            Logger.log(`Topic ${topic} is here`);
            const subscriberId = Date.now().toString();
            const subscriber: ISubscriber = {
                subscriberId: subscriberId,
                response: res,
            };
            await this.datasourceService.addSubscriberFromTopic(
                topic,
                subscriber
            );

            res.write(
                `data: ${JSON.stringify({ message: `Subscribed to ${topic}` })}\n\n`
            );

            res.on('close', async () => {
                console.log('Client disconnected from SSE');
                await this.datasourceService.removeSubscriberFromTopic(
                    topic,
                    subscriberId
                );
                res.end();
            });
        } catch (error) {
            res.status(500).send('Failed to subscribe');
        }
    }

    async publish(topic: string, messageData: any) {
        try {
            const topicData =
                await this.datasourceService.getTopicByName(topic);

            if (!topicData) {
                throw new Error('Topic not found');
            }

            const newMessage: IMessage = {
                topic: topic,
                content: messageData,
                timestamp: new Date(),
            };
            await this.datasourceService.publishMessageToTopic(
                topic,
                newMessage
            );

            for (const subscriber of topicData.subscribers) {
                if (subscriber.response) {
                    subscriber.response.write(
                        `data: ${JSON.stringify(newMessage)}\n\n`
                    );
                }
            }
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
