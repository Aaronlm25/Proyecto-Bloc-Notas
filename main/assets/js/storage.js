/**
*  persistencia
*
*/

const KEY = "trello-data";

export function loadData() {
  return JSON.parse(localStorage.getItem(KEY)) || [];
}

function saveData(data) {
  localStorage.setItem(KEY, JSON.stringify(data));
}

export function addList(title) {
  const data = loadData();
  data.push({
    id: crypto.randomUUID(),
    title,
    cards: []
  });
  saveData(data);
}

export function addCard(listId, text, color) {
  const data = loadData();
  const list = data.find(l => l.id === listId);

  list.cards.push({
    id: crypto.randomUUID(),
    text,
    description: "",
    color
  });

  saveData(data);
}

export function updateCard(listId, cardId, text, description) {
  const data = loadData();
  const list = data.find(l => l.id === listId);
  const card = list.cards.find(c => c.id === cardId);

  card.text = text;
  card.description = description;

  saveData(data);
}

export function deleteList(listId) {
  const data = loadData().filter(l => l.id !== listId);
  saveData(data);
}

export function deleteCard(listId, cardId) {
  const data = loadData();
  const list = data.find(l => l.id === listId);
  list.cards = list.cards.filter(c => c.id !== cardId);
  saveData(data);
}


