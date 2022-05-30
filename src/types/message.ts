import { Ref } from 'vue';

export interface Message {
  title: string,
  uid?: string,
  type?: string,
  delay?: number,
}

export interface MessagesComposable {
  messages: Ref<Array<Message>>,
  onMessage: (message: Message) => void
}
