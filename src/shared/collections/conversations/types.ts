import {WithFirestoreTypes} from "../../modules";

type MessageType = "text" | "image" | "audio";
export type Conversation<Ctx extends WithFirestoreTypes = WithFirestoreTypes> =
  {
    createdAt: Date;
    receiverId: string; // receiver id
    type: "washer" | "funeralCompany" | "regular";

    unreadMessages?: number;

    lastMessage?: {
      isMine: boolean;
      isRead: boolean;
      messageId: string;
      sentAt: Ctx["_time"];
      content?: string;
      type: MessageType;
    };
  };

export type Message<Ctx extends WithFirestoreTypes = WithFirestoreTypes> = {
  sentAt: Ctx["_time"];
  senderId: string;
  content?: string;
  images?: string[];
  audio?: string;
  type: MessageType;
  seen?: boolean;
  seenAt?: Ctx["_time"];
  isReceived?: boolean;
};

export type Chat<Ctx extends WithFirestoreTypes = WithFirestoreTypes> = {
  userId: string;
  targetId: string; // washer id or funeral company id
  conversationType: "washer" | "funeralCompany";
  createdAt: Ctx["_time"];
  lastUpdated?: Ctx["_time"];
  messages?: string[];
};
