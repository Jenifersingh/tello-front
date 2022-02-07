const cardData = (id, name, stepId, order) => ({
  id: id,
  name: name,
  order: order,
  stepId: stepId,
  description: "Description",
  field: [
    {
      fieldId: "field 1",
      name: "Checkbox",
      type: "CHECKBOX",
      data: [
        { name: "Test", checked: true },
        { name: "Name", checked: false },
        { name: "Best", checked: true },
      ],
    },
    {
      fieldId: "field 2",
      name: "Text",
      type: "TEXTBOX",
      data: "Data",
    },
  ],
});

export const INITIAL_API = {
  id: "Project Id",
  projectName: "Project Name",
  bgColor: "Bg Color",
  step: [
    {
      id: "Step 1",
      name: "Step 1",
    },
    {
      id: "Step 2",
      name: "Step 2",
    },
    {
      id: "Step 3",
      name: "Step 3",
    },
    {
      id: "Step 4",
      name: "Step 4",
    },
  ],
  card: [
    cardData("Card 1", "Card 1", "Step 1", 0),
    cardData("Card 2", "Card 2", "Step 2", 0),
    cardData("Card 3", "Card 3", "Step 1", 2),
    cardData("Card 4", "Card 4", "Step 3", 0),
    cardData("Card 5", "Card 5", "Step 1", 3),
    cardData("Card 6", "Card 6", "Step 1", 1),
    cardData("Card 7", "Card 7", "Step 2", 2),
    cardData("Card 8", "Card 8", "Step 1", 4),
    cardData("Card 9", "Card 9", "Step 4", 0),
    cardData("Card 10", "Card 10", "Step 3", 1),
    cardData("Card 11", "Card 11", "Step 1", 5),
    cardData("Card 12", "Card 12", "Step 3", 2),
    cardData("Card 13", "Card 13", "Step 2", 1),
  ],
};
