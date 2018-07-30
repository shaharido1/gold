import { Message } from 'amqplib/properties';

interface Nack {
  message: Message
  allUpTo?: boolean;
  requeue?: boolean
}

type Ack = (message: Message, allUpTo?: boolean) => void
