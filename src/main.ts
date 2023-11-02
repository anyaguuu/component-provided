import { Model } from "./model";
import { View, RequestActivityEvent } from "./view";

const ACTIVITY_URL = "https://www.boredapi.com/api/activity/";

function main() {
  const model = new Model(ACTIVITY_URL);
  const view = new View();

  document.addEventListener(
    "requestActivityEvent",
    (event: CustomEvent<RequestActivityEvent>) => {
      model.getActivity(event.detail.types).then((activity) => {
        view.displayActivity(activity);
      });
    },
  );
}

document.addEventListener("DOMContentLoaded", () => {
  main();
});
