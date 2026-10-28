const form = document.querySelector("#test-form");
const formMessage = document.querySelector("#form-message");
const nameInput = document.querySelector("#name-input");
const moodSelect = document.querySelector("#mood-select");
const clickCount = document.querySelector("#click-count");
const testDialog = document.querySelector("#test-dialog");
const toast = document.querySelector("#toast");

let count = 0;
let toastTimeout;

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;

  const name = nameInput.value.trim();
  const mood = moodSelect.options[moodSelect.selectedIndex].text.toLowerCase();
  formMessage.textContent = `Thanks, ${name}! “${mood}” sounds like a good place to start.`;
});

nameInput.addEventListener("input", () => {
  formMessage.textContent = "";
});

document.querySelector("#count-button").addEventListener("click", () => {
  count += 1;
  clickCount.textContent = count;
});

document.querySelector("#reset-count").addEventListener("click", () => {
  count = 0;
  clickCount.textContent = count;
});

function showToast(message) {
  window.clearTimeout(toastTimeout);
  toast.textContent = message;
  toast.classList.add("is-visible");
  toastTimeout = window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 2800);
}

document.querySelector("#toast-button").addEventListener("click", () => {
  showToast("A tiny toast, fresh from the oven. 🍞");
});

const tabContent = {
  one: {
    title: "A fresh start",
    copy: "You’re on the first tab. Go ahead and try another.",
  },
  two: {
    title: "A different view",
    copy: "Nice switch! Tabs are handy for keeping things tidy.",
  },
  three: {
    title: "One more thing",
    copy: "You made it to the last tab. Feel free to go back.",
  },
};

const tabs = [...document.querySelectorAll('[role="tab"]')];

function activateTab(tab, moveFocus = false) {
  tabs.forEach((item) => {
    const isActive = item === tab;
    item.classList.toggle("is-active", isActive);
    item.setAttribute("aria-selected", String(isActive));
    item.tabIndex = isActive ? 0 : -1;
  });

  const content = tabContent[tab.dataset.tab];
  document.querySelector("#tab-title").textContent = content.title;
  document.querySelector("#tab-copy").textContent = content.copy;
  document.querySelector("#tab-panel").setAttribute("aria-labelledby", tab.id);
  if (moveFocus) tab.focus();
}

tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => activateTab(tab));
  tab.addEventListener("keydown", (event) => {
    let nextIndex;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % tabs.length;
    if (event.key === "ArrowLeft") nextIndex = (index - 1 + tabs.length) % tabs.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = tabs.length - 1;

    if (nextIndex !== undefined) {
      event.preventDefault();
      activateTab(tabs[nextIndex], true);
    }
  });
});

const openDialogButton = document.querySelector("#open-dialog");
const closeDialogButton = document.querySelector("#close-dialog");
const doneDialogButton = document.querySelector("#dialog-done");

openDialogButton.addEventListener("click", () => testDialog.showModal());
closeDialogButton.addEventListener("click", () => testDialog.close());
doneDialogButton.addEventListener("click", () => testDialog.close());
testDialog.addEventListener("click", (event) => {
  if (event.target === testDialog) testDialog.close();
});
testDialog.addEventListener("close", () => openDialogButton.focus());

const themeToggle = document.querySelector("#theme-toggle");

themeToggle.addEventListener("click", () => {
  const isLight = document.body.classList.toggle("light-theme");
  themeToggle.setAttribute("aria-label", isLight ? "Switch to dark theme" : "Switch to light theme");
  document.querySelector('meta[name="theme-color"]').content = isLight ? "#f5f6f1" : "#111827";
  showToast(`${isLight ? "Light" : "Dark"} theme switched on.`);
});
