// any CSS you import will output into a single css file (app.css in this case)
import "../css/app.scss";
import { Dropdown } from "bootstrap";

document.addEventListener("DOMContentLoaded", () => {
  new App();
});

class App {
  constructor() {
    this.enableDropdowns();
    this.handleCommentForm();
  }

  enableDropdowns() {
    const dropdownElementList = [].slice.call(
      document.querySelectorAll(".dropdown-toggle")
    );
    const dropdownList = dropdownElementList.map(function (dropdownToggleEl) {
      return new Dropdown(dropdownToggleEl);
    });
  }

  handleCommentForm() {
    const commentForm = document.querySelector("form.comment_form");

    if (null === commentForm) {
      return;
    }

    commentForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const response = await fetch("/ajax/comment", {
        method: "POST",
        body: new FormData(e.target),
      });

      if (!response.ok) {
        return;
      }

      const json = await response.json();

      if (json.code === "COMMENT_ADDED_SUCCESSFULLY") {
        const commentList = document.querySelector(".comment-list");
        const commentCount = document.querySelector(".comment-count");
        const commentContent = document.querySelector("#comment_content");

        commentList.insertAdjacentHTML("beforeend", json.message);
        commentList.lastElementChild.scrollIntoView();
        commentCount.innerText = json.numberOfComments;
        commentContent.value = "";
      }
    });
  }
}
