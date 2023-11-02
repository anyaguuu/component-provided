import { Activity } from "./activity";

/* Define custom events */
export type RequestActivityEvent = {
  types: Array<string>;
};

declare global {
  interface DocumentEventMap {
    requestActivityEvent: CustomEvent<RequestActivityEvent>;
  }
}

/* A web component to gather user input */
class InputForm extends HTMLElement { // SO COMPONENT = INPUTFORM!!
  private controller: AbortController | null = null;

  constructor() {
    super();
    this.attachShadow({mode: "open"})

    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = `
        <style>
          form {
            display: flex;
            justify-content: center;
            align-items: flex-start;
          }
          fieldset {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
          }
        </style>
        <h2>Request an Activity</h2>
        <form>
          <fieldset>
            <label><input type="checkbox" value="education">Education</label>
            <label><input type="checkbox" value="recreational">Recreational</label>
            <label><input type="checkbox" value="social">Social</label>
            <label><input type="checkbox" value="diy">DIY</label>
            <label><input type="checkbox" value="charity">Charity</label>
            <label><input type="checkbox" value="cooking">Cooking</label>
            <label><input type="checkbox" value="relaxation">Relaxation</label>
            <label><input type="checkbox" value="music">Music</label>
            <label><input type="checkbox" value="busywork">Busywork</label>
          </fieldset>
          <button type="submit">Submit</button>
        </form>
      `;
    } else {
      throw new Error("shadoRoot does not exist");
    }
  }

  // every time rendered
  connectedCallback(): void {
    const form = this.shadowRoot?.querySelector("form");
    if (!(form instanceof HTMLFormElement)) {
      throw new Error("form not found");
    }

    this.controller = new AbortController(); // starts this up
    const options = { signal: this.controller.signal }; // starts this up

    form.addEventListener("submit", this.handleSubmit.bind(this), options); // binds
  }

  // every time removed
  disconnectedCallBack(): void {
    this.controller?.abort();
    this.controller = null;
  }

  handleSubmit(eveent: SubmitEvent) {
    event?.preventDefault();
    const checkboxes = this.shadowRoot?.querySelectorAll(
      "input[type='checkbox']:checked",
    );
    if (checkboxes === undefined) {
      throw new Error("checkboxes not found");
      return;
    }

    const values: Array<string> = [];
    for (let idx = 0; idx < checkboxes.length; idx++) {
      const checkbox = checkboxes[idx];
      if (checkbox instanceof HTMLInputElement) {
        values.push(checkbox.value); // add all values of checkboxes to array
      }
    }

    // Create and dispatch custom request activity event
    const requestActivityEvent = new CustomEvent("requestActivityEvent", {
      detail: {types: values},
    });
    document.dispatchEvent(requestActivityEvent);
  }
}

/* A web component to display activities */
class ResultDisplay extends HTMLElement {
  /* TODO: Write the ResultDisplay component. Note that you will need a clear
   * and a displayActivity method for the View class to use.
   */

  constructor() {
    super();
    this.attachShadow({mode: "open"});
  }

  connectedCallback(): void {
    this.clear(); // start off blank
  }

  clear(): void {
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = `
        <style>
          section {
            border: 1px solid lightgray;
            border-radius: 10px;
            padding: 10px;
            margin: 10px auto;
            max-width: 40%;
          }
        </style>
        <h2>Results</h2>
      `;
    } else {
      throw new Error("shadowRoot does not exist");
    }
  }
}

customElements.define("input-form", InputForm);
customElements.define("result-display", ResultDisplay);

export class View {
  private results: ResultDisplay | null = null;
  private clearButton: HTMLButtonElement | null = null;

  constructor() {
    this.results = document.querySelector("result-display");
    if (!(this.results instanceof ResultDisplay)) {
      console.log("No result-display element");
    }

    this.clearButton = document.querySelector("#clear-button");
    if (!(this.clearButton instanceof HTMLButtonElement)) {
      console.log("No clear button");
    }

    this.clearButton?.addEventListener("click", () => {
      this.results?.clear();
    });
  }

  displayActivity(activity: Activity) {
    this.results?.displayActivity(activity);
  }
}
