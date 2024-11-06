export interface ISubpubController {
    subscribe(topic: string, subscriberData: any): Promise<any>;
    unsubscribe(topic: string, subscriberData: any): Promise<any>;
    publish(topic: string, messageData: any): Promise<any>;
    getAllTopics(): Promise<any>;
    getLastMessages(topic: string): Promise<any>;
  }