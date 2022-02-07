export const mapStepToCard = (obj) => {
  let cardsObj = {};

  obj?.step?.map((step) => {
    cardsObj[step.id] = {
      id: step.id,
      name: step.name,
      cards: obj.card.filter((card) => card.stepId === step.id),
    };
  });

  sortCards(cardsObj);

  return cardsObj;
};

export const sortCards = (cardsObj) => {
  for (let step in cardsObj) {
    cardsObj[step].cards.sort((a, b) => a.order - b.order);
  }
};
