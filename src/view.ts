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

  connected
}

/* A web component to display activities */
class ResultDisplay extends HTMLElement {
  /* TODO: Write the ResultDisplay component. Note that you will need a clear
   * and a displayActivity method for the View class to use.
   */
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
