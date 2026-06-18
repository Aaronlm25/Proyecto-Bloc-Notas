/**
* inicializacion
*
*/

import { renderBoard, openModal } from "./ui.js";
import {
  loadData,
  addList,
  addCard,
  updateCard,
  deleteList,
  deleteCard
} from "./storage.js";

renderBoard(loadData());

document.getElementById("add-list").onclick = () => {
  openModal({
    title: "Nueva lista",
    placeholder: "Nombre de la lista",
    onConfirm: title => {
      addList(title);
      renderBoard(loadData());
    }
  });
};

document.addEventListener("add-card", e => {
  addCard(e.detail.listId, e.detail.text, e.detail.color);
  renderBoard(loadData());
});

document.addEventListener("update-card", e => {
  updateCard(
    e.detail.listId,
    e.detail.cardId,
    e.detail.text,
    e.detail.description
  );
  renderBoard(loadData());
});

document.addEventListener("delete-list", e => {
  deleteList(e.detail.listId);
  renderBoard(loadData());
});

document.addEventListener("delete-card", e => {
  deleteCard(e.detail.listId, e.detail.cardId);
  renderBoard(loadData());
});
