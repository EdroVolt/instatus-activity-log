export interface Event {
  id: string;
  actorName: string;
  actorId: string;
  targetName: string;
  targetId: string;
  occurredAt: string;
  action: {
    id: string;
    object: string;
    name: string;
  };
  metadata: Record<string, string | undefined>;
}
