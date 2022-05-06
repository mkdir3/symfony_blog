// any CSS you import will output into a single css file (app.css in this case)
import "../css/app.scss";
import { Dropdown } from "bootstrap";

const enableDropdowns = () => {
  var dropdownElementList = [].slice.call(
    document.querySelectorAll(".dropdown-toggle")
  );
  var dropdownList = dropdownElementList.map(function (dropdownToggleEl) {
    return new Dropdown(dropdownToggleEl);
  });
};

document.addEventListener("DOMContentLoaded", () => {
  enableDropdowns();
});
