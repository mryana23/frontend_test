/* ===== ROW INTERACTION ===== */
document.querySelectorAll(".row, .row-page").forEach((row) => {
  const checkbox = row.querySelector(".checkbox");
  let readyForFlash = false;

  row.addEventListener("mouseenter", () => {
    checkbox.dispatchEvent(new Event("mouseenter"));
    readyForFlash = false;
    row.style.cursor = "pointer";
  });

  row.addEventListener("mouseleave", () => {
    checkbox.dispatchEvent(new Event("mouseleave"));
  });

  row.addEventListener("click", (e) => {
    if (e.target.closest(".checkbox")) return;

    if (!readyForFlash) {
      checkbox.click();
      readyForFlash = true;
      row.style.cursor = "default";
      return;
    }

    row.classList.add("row-flash");
    setTimeout(() => row.classList.remove("row-flash"), 650);
  });
});

/* ===== CHECKBOX LOGIC ===== */
const allCheckbox = document.querySelector(".row .checkbox");
const pageCheckboxes = document.querySelectorAll(".row-page .checkbox");

function setupCheckbox(cb, isAll = false) {
  let checked = false;
  let hovered = false;
  let pressed = false;

  cb._getChecked = () => checked;

  cb._setChecked = (val) => {
    checked = val;
    cb.className = checked ? "checkbox state-5" : "checkbox state-9";
  };

  /* HOVER */
  cb.addEventListener("mouseenter", () => {
    hovered = true;

    if (pressed) return;

    if (checked) {
      cb.className = "checkbox state-6";
    } else {
      cb.className = "checkbox state-2";
    }
  });

  cb.addEventListener("mouseleave", () => {
    hovered = false;
    pressed = false;

    if (checked) {
      cb.className = "checkbox state-5";
    } else {
      cb.className = "checkbox state-9";
    }
  });

  /* PRESS */
  cb.addEventListener("mousedown", () => {
    pressed = true;

    if (checked) {
      cb.className = "checkbox state-7";
    } else {
      cb.className = "checkbox state-3";
    }
  });

  /* RELEASE */
  cb.addEventListener("mouseup", () => {
    pressed = false;

    if (checked) {
      cb.className = hovered ? "checkbox state-6" : "checkbox state-5";
    } else {
      cb.className = hovered ? "checkbox state-2" : "checkbox state-9";
    }
  });

  /* CLICK TO TOGGLE */
  cb.addEventListener("click", () => {
    if (isAll) return;

    checked = !checked;

    if (checked) {
      cb.className = hovered ? "checkbox state-4" : "checkbox state-5";
    } else {
      cb.className = hovered ? "checkbox state-8" : "checkbox state-9";
    }

    syncAllCheckbox();
  });
}

/* INIT */
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
