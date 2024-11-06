import {
    Controller,
    Get,
    Post,
    Param,
    Body,
    Res,
    HttpCode,
} from '@nestjs/common';
import { Response } from 'express';
import { SubpubService } from './subpub.service';
import { ISubpubController } from './subpub.controller.interface';
import { IMessage, ITopic } from 'src/datasource/data/data.interface';

@Controller('topics')
export class SubpubController implements ISubpubController {
    constructor(private readonly subpubService: SubpubService) {}

    // Subscribe with SSE
    @Get(':topic/subscribe')
    async subscribe(
        @Param('topic') topic: string,
        @Res() res: Response
    ): Promise<void> {
        // Set headers to keep connection open for SSE
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');

        // Call the service method to handle SSE subscriptions
        this.subpubService.subscribe(topic, res);

        // Return to keep the SSE connection open
        return;
    }

    @Post(':topic/unsubscribe')
    @HttpCode(200)
    async unsubscribe(
        @Param('topic') topic: string,
        @Body() subscriberData: any
    ): Promise<void> {
        this.subpubService.unsubscribe(topic, subscriberData);
        return;
    }

    @Post(':topic/publish')
    @HttpCode(201)
    async publish(
        @Param('topic') topic: string,
        @Body() messageData: any
    ): Promise<void> {
        this.subpubService.publish(topic, messageData);
        return;
    }

    @Get()
    async getAllTopics(): Promise<ITopic[]> {
        return this.subpubService.getAllTopics();
    }

    @Get(':topic/messages')
    async getLastMessages(
        @Param('topic') topic: string,
        @Param('count') count: number
    ): Promise<IMessage[]> {
        return this.subpubService.getLastMessages(topic, count);
    }
}
