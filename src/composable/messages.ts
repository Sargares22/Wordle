import { ref } from 'vue';

import Utils from '../services/utils';

import { Message, MessagesComposable } from '../types/message';

export default function useMessages(): MessagesComposable {
  const messages = ref<Array<Message>>([]);
  const defaultMessageDelay = 5000;

  const newMessage = (message: Message): void => {
    const uid = Utils.uuidv4();
    const delay = (message.delay || defaultMessageDelay);

    messages.value = [{
      uid,
      title: message.title,
    }];

    setTimeout(() => closeMessage(uid), delay);
  };

  const closeMessage = (uid: string): void => {
    messages.value = messages.value
      .filter((message) => (message.uid !== uid));
  };

  const onMessage = (message: Message): void => {
    (message?.title && newMessage(message));
  };

  return {
    messages,
    onMessage,
  };
}
