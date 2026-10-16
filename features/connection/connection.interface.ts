export interface Connection {
  id: string;
  user: {
    name: string;
    username: string;
    headline: string;
    location: string;
    initials: string;
    avatar: string;

    skills: string[];
  };
  mutualConnections: number;
  verified: boolean;
}
