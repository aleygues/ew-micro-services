import amqplib, { Channel } from 'amqplib';
const amqpUrl = process.env.AMQP_URL || 'amqp://rabbitmq:5672';

let channel: Channel;

export async function initRabbitMQ() {
    const connection = await amqplib.connect(amqpUrl, 'heartbeat=60');
    channel = await connection.createChannel();
}

export async function publish(key: string, data: any) {
    try {
        console.log('Publishing');
        await channel.assertQueue(key, { durable: true });
        await channel.sendToQueue(key, Buffer.from(JSON.stringify(data)), {
            contentType: 'application/json',
            persistent: true
        });
        console.log('Message published');
    } catch (e) {
        console.error('Error in publishing message', e);
    }
}

export function onMessage(key: string, handler: ((data: any) => Promise<void> | void)) {
    const listen = async () => {
        await channel.assertQueue(key, { durable: true });
        //await channel.prefetch(1);
        channel.consume(key, async (message) => {
            if (message?.content) {
                const content = message.content.toString();
                const data = JSON.parse(content);

                const result = handler(data);

                if (result instanceof Promise) {
                    await result;
                }
                channel.ack(message);
            }
        });
    }

    listen();
}