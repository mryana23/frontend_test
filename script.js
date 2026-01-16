/* === ROW INTERACTION (TAMBAHAN SAJA) === */
document.querySelectorAll(".row, .row-page").forEach((row) => {
  const checkbox = row.querySelector(".checkbox");
  let readyForFlash = false;

  row.addEventListener("mouseenter", () => {
    checkbox.dispatchEvent(new Event("mouseenter"));
  });

  row.addEventListener("mouseleave", () => {
    checkbox.dispatchEvent(new Event("mouseleave"));
  });

  row.addEventListener("click", (e) => {
    if (e.target.closest(".checkbox")) return;

    if (!readyForFlash) {
      checkbox.click();
      row.style.cursor = "default";
      readyForFlash = true;
      return;
    }

    row.classList.add("row-flash");
    setTimeout(() => row.classList.remove("row-flash"), 650);
  });

  row.addEventListener("mouseenter", () => {
    row.style.cursor = "pointer";
    readyForFlash = false;
  });
});

/* === CHECKBOX LOGIC === */
const allCheckbox = document.querySelector(".row .checkbox");
const pageCheckboxes = document.querySelectorAll(".row-page .checkbox");

function setupCheckbox(cb, isAll = false) {
  let checked = false;
  let hovered = false;

  cb._getChecked = () => checked;

  cb._setChecked = (val) => {
    checked = val;
    cb.className = checked
      ? hovered ? "checkbox state-4" : "checkbox state-5"
      : hovered ? "checkbox state-8" : "checkbox state-1";
  };

  cb.addEventListener("mouseenter", () => {
    hovered = true;
    cb.className = checked ? "checkbox state-6" : "checkbox state-2";
  });

  cb.addEventListener("mouseleave", () => {
    hovered = false;
    cb.className = checked ? "checkbox state-5" : "checkbox state-1";
  });

  cb.addEventListener("mousedown", () => {
    cb.className = checked ? "checkbox state-7" : "checkbox state-3";
  });

  cb.addEventListener("click", () => {
    if (isAll) return;

    checked = !checked;
    cb.className = checked
      ? hovered ? "checkbox state-4" : "checkbox state-5"
      : hovered ? "checkbox state-8" : "checkbox state-1";

    syncAllCheckbox();
  });
}

setupCheckbox(allCheckbox, true);
pageCheckboxes.forEach((cb) => setupCheckbox(cb));

function syncAllCheckbox() {
  const allChecked = [...pageCheckboxes].every((cb) => cb._getChecked());
  allCheckbox._setChecked(allChecked);
}

allCheckbox.addEventListener("click", () => {
  const target = !allCheckbox._getChecked();
  pageCheckboxes.forEach((cb) => cb._setChecked(target));
  allCheckbox._setChecked(target);
});