import { Activity } from "./activity";

/**
 * Wrapper around fetch to return a Promise that resolves to the desired
 * type. This function does not validate whether the response actually
 * conforms to that type.
 *
 * @param url      url to fetch from
 * @param options  fetch options
 * @returns        a Promise that resolves to the unmarshaled JSON response
 * @throws         an error if the fetch fails, there is no response body,
 *                 or the response is not valid JSON
 */
async function typedFetch<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  // Return decoded JSON if there is a response body or throw an exception
  // otherwise
  const contentLength = response.headers.get("Content-Length");
  if (contentLength && contentLength !== "0") {
    // Type of unmarshaled response needs to be validated
    return response.json() as Promise<T>;
  } else {
    // No content
    throw new Error(`unexpected empty response`);
  }
}

/**
 * Model class that interfaces with the bored API.
 */
export class Model {
  private url: string;

  constructor(boredUrl: string) {
    this.url = boredUrl;
  }

  /**
   * Get a random activity.
   *
   * @returns a promise that resolves to an Activity.
   */
  getActivity(types: Array<string>): Promise<Activity> {
    if (types.length === 0) {
      return typedFetch<Activity>(`${this.url}`);
    }
    const type = types[Math.floor(Math.random() * types.length)];
    return typedFetch<Activity>(`${this.url}?type=${type}`);
  }
}
