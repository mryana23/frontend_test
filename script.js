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
  let hasInteracted = false;
  let fromState8 = false;

  cb._getChecked = () => checked;

  cb._setChecked = (val) => {
    checked = val;
    hasInteracted = true;

    if (checked) {
      cb.className = "checkbox state-5";
    } else {
      cb.className = "checkbox state-1"; 
    }
  };

  /* ===== INIT STATE ===== */
  cb.className = "checkbox state-1";

  /* ===== HOVER ===== */
  cb.addEventListener("mouseenter", () => {
    hovered = true;
    hasInteracted = true;

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
      return;
    }

    if (fromState8) {
      cb.className = "checkbox state-9";
      fromState8 = false;
      return;
    }

    cb.className = "checkbox state-1";   
  });



  /* ===== PRESS ===== */
  cb.addEventListener("mousedown", () => {
    pressed = true;
    hasInteracted = true;

    if (checked) {
      cb.className = "checkbox state-7";
    } else {
      cb.className = "checkbox state-3";
    }
  });

  /* ===== RELEASE ===== */
  cb.addEventListener("mouseup", () => {
    pressed = false;

    if (checked) {
      cb.className = hovered ? "checkbox state-6" : "checkbox state-5";
    } else {
      cb.className = hovered
        ? "checkbox state-2"
        : hasInteracted
          ? "checkbox state-9"
          : "checkbox state-1";
    }
  });

  /* ===== CLICK ===== */
  cb.addEventListener("click", () => {
    if (isAll) return;

    hasInteracted = true;
    checked = !checked;

    if (checked) {
      fromState8 = false;
      cb.className = hovered ? "checkbox state-4" : "checkbox state-5";
    } else {
      if (hovered) {
        fromState8 = true;              
        cb.className = "checkbox state-8";
      } else {
        fromState8 = false;
        cb.className = "checkbox state-9";
      }
    }

    syncAllCheckbox();
  });

}

/* ===== INIT ===== */
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
