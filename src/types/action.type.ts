import { Event } from "./event.type";

export interface EventResponse {
  events: Event[];
  totalCount: number;
  page: number;
  limit: number;
}
