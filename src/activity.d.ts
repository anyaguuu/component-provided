/**
 * Activity type accessible by the bored API.
 */
export type Activity = {
  activity: string;
  type: string;
  participants: number;
  price: number;
  link: string;
  key: string;
  accessibility: number;
};
