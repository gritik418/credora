import type { LucideIcon } from "lucide-react";
import {
  AtSign,
  BellRing,
  BriefcaseBusiness,
  CheckCheck,
  MessageCircle,
  UserRoundCheck,
  UserRoundPlus,
  Users,
} from "lucide-react";

export type NotificationType =
  | "connection_request"
  | "connection_accepted"
  | "organization_invite"
  | "task_assigned"
  | "comment"
  | "mention"
  | "message"
  | "organization_update";

export type AppNotification = {
  id: string;
  type: NotificationType;
  actor: {
    name: string;
    avatar?: string;
    initials: string;
  };
  title: string;
  description: string;
  createdAt: string;
  read: boolean;
  actionLabel?: string;
  secondaryActionLabel?: string;
  href?: string;
};

export const notificationMeta: Record<
  NotificationType,
  { icon: LucideIcon; color: string; background: string }
> = {
  connection_request: {
    icon: UserRoundPlus,
    color: "text-indigo-300",
    background: "bg-indigo-500/10",
  },
  connection_accepted: {
    icon: UserRoundCheck,
    color: "text-emerald-300",
    background: "bg-emerald-500/10",
  },
  organization_invite: {
    icon: BriefcaseBusiness,
    color: "text-violet-300",
    background: "bg-violet-500/10",
  },
  task_assigned: {
    icon: CheckCheck,
    color: "text-blue-300",
    background: "bg-blue-500/10",
  },
  comment: {
    icon: MessageCircle,
    color: "text-cyan-300",
    background: "bg-cyan-500/10",
  },
  mention: {
    icon: AtSign,
    color: "text-amber-300",
    background: "bg-amber-500/10",
  },
  message: {
    icon: MessageCircle,
    color: "text-sky-300",
    background: "bg-sky-500/10",
  },
  organization_update: {
    icon: Users,
    color: "text-fuchsia-300",
    background: "bg-fuchsia-500/10",
  },
};

export const initialNotifications: AppNotification[] = [
  {
    id: "n1",
    type: "connection_request",
    actor: {
      name: "Aarav Sharma",
      avatar: "https://i.pravatar.cc/100?img=12",
      initials: "AS",
    },
    title: "Aarav Sharma",
    description: "wants to connect with you.",
    createdAt: "2 min ago",
    read: false,
    actionLabel: "Accept",
    secondaryActionLabel: "Decline",
    href: "/connections",
  },
  {
    id: "n2",
    type: "organization_invite",
    actor: {
      name: "Pixel Labs",
      initials: "PL",
    },
    title: "Organization invitation",
    description: "Pixel Labs invited you to join their organization.",
    createdAt: "18 min ago",
    read: false,
    actionLabel: "View invite",
    href: "/invitations",
  },
  {
    id: "n3",
    type: "task_assigned",
    actor: {
      name: "Priya Verma",
      avatar: "https://i.pravatar.cc/100?img=47",
      initials: "PV",
    },
    title: "Priya Verma assigned you a task",
    description: "Review the new onboarding flow.",
    createdAt: "1 hour ago",
    read: false,
    actionLabel: "View task",
    href: "/workspace",
  },
  {
    id: "n4",
    type: "mention",
    actor: {
      name: "Dev Mehta",
      avatar: "https://i.pravatar.cc/100?img=33",
      initials: "DM",
    },
    title: "Dev Mehta mentioned you",
    description: "“Could you take a look at this before the review?”",
    createdAt: "3 hours ago",
    read: false,
    actionLabel: "View comment",
  },
  {
    id: "n5",
    type: "connection_accepted",
    actor: {
      name: "Ananya Kapoor",
      avatar: "https://i.pravatar.cc/100?img=44",
      initials: "AK",
    },
    title: "Ananya Kapoor",
    description: "accepted your connection request.",
    createdAt: "Yesterday",
    read: true,
  },
  {
    id: "n6",
    type: "comment",
    actor: {
      name: "Rohan Gupta",
      avatar: "https://i.pravatar.cc/100?img=15",
      initials: "RG",
    },
    title: "Rohan Gupta commented",
    description: "Great work on the latest project update!",
    createdAt: "Yesterday",
    read: true,
  },
  {
    id: "n7",
    type: "message",
    actor: {
      name: "Meera Singh",
      avatar: "https://i.pravatar.cc/100?img=49",
      initials: "MS",
    },
    title: "New message from Meera",
    description: "Hey, would love to discuss your project.",
    createdAt: "2 days ago",
    read: true,
    actionLabel: "Reply",
    href: "/messages",
  },
];
