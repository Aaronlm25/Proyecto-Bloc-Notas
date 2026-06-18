/**
* manejo del DOM y renderizado
*
*/

const board = document.getElementById("board");
const addListBtn = document.getElementById("add-list");

const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const modalInput = document.getElementById("modal-input");
const modalDescription = document.getElementById("modal-description");
const modalConfirm = document.getElementById("modal-confirm");
const modalCancel = document.getElementById("modal-cancel");

const COLORS = ["blue", "green", "red", "yellow", "purple"];
let modalAction = null;

export function renderBoard(lists) {
  board.innerHTML = "";
  lists.forEach(list => board.appendChild(createList(list)));
  board.appendChild(addListBtn);
}

export function openModal({ title, placeholder, value = "", description = "", onConfirm }) {
  modalTitle.textContent = title;
  modalInput.placeholder = placeholder;
  modalInput.value = value;
  modalDescription.value = description;

  modalAction = () =>
    onConfirm(modalInput.value.trim(), modalDescription.value.trim());

  modal.classList.remove("hidden");
}

modalConfirm.onclick = () => {
  modalAction();
  modal.classList.add("hidden");
};

modalCancel.onclick = () => modal.classList.add("hidden");

function createList(list) {
  const el = document.createElement("div");
  el.className = "list";

  el.innerHTML = `
    <div class="list-header">
      <h2>${list.title}</h2>
      <button class="delete-list">✕</button>
    </div>
    <div class="cards"></div>
    <button class="add-card">+ Añadir tarjeta</button>
  `;

  const cards = el.querySelector(".cards");

  list.cards.forEach(card => cards.appendChild(createCard(card, list.id)));

  el.querySelector(".add-card").onclick = () => {
    openModal({
      title: "Nueva tarjeta",
      placeholder: "Título",
      onConfirm: text => {
        const color = COLORS[Math.floor(Math.random() * COLORS.length)];
        document.dispatchEvent(
          new CustomEvent("add-card", {
            detail: { listId: list.id, text, color }
          })
        );
      }
    });
  };

  el.querySelector(".delete-list").onclick = () => {
    el.classList.add("removing");
    setTimeout(() => {
      document.dispatchEvent(
        new CustomEvent("delete-list", { detail: { listId: list.id } })
      );
    }, 300);
  };

  return el;
}

function createCard(card, listId) {
  const el = document.createElement("div");
  el.className = `card ${card.color}`;
  if (card.description) el.classList.add("has-description");

  el.innerHTML = `
    <div class="card-content">
      <span class="card-title">${card.text}</span>
      <p class="card-description">${card.description || "Añadir descripción"}</p>
    </div>
    <button class="delete-card">✕</button>
  `;

  const titleEl = el.querySelector(".card-title");
  const descEl = el.querySelector(".card-description");

  // ✏️ CLICK → editar título
  titleEl.onclick = e => {
    e.stopPropagation();
    inlineEdit({
      element: titleEl,
      value: card.text,
      multiline: false,
      onSave: newText => {
        document.dispatchEvent(
          new CustomEvent("update-card", {
            detail: {
              listId,
              cardId: card.id,
              text: newText,
              description: card.description
            }
          })
        );
      }
    });
  };

  // ✏️ CLICK → editar descripción
  descEl.onclick = e => {
    e.stopPropagation();
    inlineEdit({
      element: descEl,
      value: card.description || "",
      multiline: true,
      onSave: newDesc => {
        document.dispatchEvent(
          new CustomEvent("update-card", {
            detail: {
              listId,
              cardId: card.id,
              text: card.text,
              description: newDesc
            }
          })
        );
      }
    });
  };

  // 🗑️ eliminar tarjeta
  el.querySelector(".delete-card").onclick = e => {
    e.stopPropagation();
    el.classList.add("removing");
    setTimeout(() => {
      document.dispatchEvent(
        new CustomEvent("delete-card", {
          detail: { listId, cardId: card.id }
        })
      );
    }, 300);
  };

  return el;
}
function startEdit(element, value, multiline, onSave) {
  const input = document.createElement(multiline ? "textarea" : "input");
  input.className = "card-edit-input";
  input.value = value;

  element.replaceWith(input);
  input.focus();

  let cancelled = false;

  input.addEventListener("keydown", e => {
    if (e.key === "Escape") {
      cancelled = true;
      input.replaceWith(element);
    }
    if (e.key === "Enter" && !multiline) {
      input.blur();
    }
  });

  input.addEventListener("blur", () => {
    if (cancelled) return;

    const newValue = input.value.trim();
    input.replaceWith(element);

    if (newValue) onSave(newValue);
  });
}


function inlineEdit({ element, value, multiline, onSave }) {
  const input = document.createElement(multiline ? "textarea" : "input");
  input.className = "card-edit-input";
  input.value = value;

  const parent = element.parentNode;
  parent.replaceChild(input, element);

  input.focus();
  if (!multiline) input.select();

  input.onkeydown = e => {
    if (e.key === "Escape") {
      parent.replaceChild(element, input);
    }
    if (e.key === "Enter" && !multiline) {
      input.blur();
    }
  };

  input.onblur = () => {
    const newValue = input.value.trim();
    parent.replaceChild(element, input);

    if (!newValue) return;
    onSave(newValue);
  };
}





