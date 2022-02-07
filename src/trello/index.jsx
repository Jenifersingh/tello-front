import React, { useContext, useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import { v4 as uuidv4 } from "uuid";

import { Card } from "../components/card";
import { CardDropArea } from "../components/cardDropArea";
import { Modal } from "../components/modal";

import { Step } from "../components/step";
import { StepDropArea } from "../components/stepDropArea";
import { TextBox } from "../components/textBox";
import { Form } from "../form";
import {
  createCard,
  getProject,
  updateCard,
  updateProject,
} from "../service/api";
import { INIT_DATA } from "../store/action.types";
import { Context } from "../store/context";
// import { INITIAL_API } from "../test/monk";
import { mapStepToCard } from "../utils/cardUtilts";

import styles from "./trello.module.css";

let stepName = ["Jenifer", "Jenish", "Malar"];

let cards = [{ name: "Card 1" }, { name: "Card 2" }, { name: "Card 3" }];

export const Trello = () => {
  const { state, dispatch } = useContext(Context);

  const [activeForm, setActiveForm] = useState(null);
  const [openAddList, setOpenAddList] = useState(false);
  const [stepName, setStepName] = useState("");

  const [addableState, setAddableState] = useState({});

  const [cardNameObj, setCardNameObj] = useState({});

  useEffect(() => {
    // let initialData = {};
    let a = getProject();
    a.then((INITIAL_API) => {
      // initialData = data;
      let stepCards = mapStepToCard(INITIAL_API) || {};
      let stepOrder = INITIAL_API.step || [];

      let projectName = INITIAL_API.projectName;
      let projectId = INITIAL_API.id || uuidv4();

      dispatch({
        type: INIT_DATA,
        payload: {
          stepCards: stepCards,
          stepOrder: stepOrder,
          project: {
            id: projectId,
            name: projectName || "Project Name",
          },
        },
      });
    });
  }, []);

  const onStepDrop = (item, monitor, stepIndex) => {
    let steps = state.stepOrder;

    steps = steps.filter((step) => step.id !== item.stepData.id);

    console.log(steps);

    steps.splice(stepIndex, 0, {
      id: item.stepData.id,
      name: item.stepData.name,
    });

    updateProject({ step: steps });

    dispatch({
      type: INIT_DATA,
      payload: {
        stepOrder: steps,
      },
    });
  };

  const onCardDrop = (item, monitor, cardIndex, card) => {
    console.log(item, cardIndex, card);

    let draggedStep = state.stepCards[item.stepId].cards.filter(
      (card) => card.id !== item.id
    );

    draggedStep = draggedStep.map((card, index) => ({
      ...card,
      order: index,
    }));

    let droppedStep = [];

    if (card.stepId === item.stepId) {
      droppedStep = [...draggedStep];
    } else {
      droppedStep = [...state.stepCards[card.stepId].cards];
    }

    droppedStep.splice(cardIndex, 0, {
      ...item,
      order: cardIndex,
      stepId: card.stepId,
    });

    droppedStep = droppedStep.map((card, index) => ({
      ...card,
      order: index,
    }));

    updateCard({ id: item.id, ...draggedStep });

    updateCard({ id: card.id, ...droppedStep });

    let stepCards = {
      ...state.stepCards,
      [item.stepId]: {
        ...state.stepCards[item.stepId],
        cards: draggedStep,
      },
      [card.stepId]: {
        ...state.stepCards[card.stepId],
        cards: droppedStep,
      },
    };

    console.log(stepCards);

    // let droppedIndex = card.index;

    // let items = state.stepCards[card.stepId];
    // console.log(items);

    // for (let i = droppedIndex; i < items.cards.length; i++) {
    //   console.log(items.cards);
    //   console.log("GGGGGGGGGGG");
    //   items.cards[i].index = items[i].cards.index + 1;
    // }

    // let updatedStep = [...items];

    dispatch({
      type: INIT_DATA,
      payload: {
        stepCards,
      },
    });
  };

  console.log(state);

  return (
    <>
      <div style={{ backgroundColor: "#89609E" }} className={styles.trelloCont}>
        <div className={styles.topNavCont}>
          <TopNavCont />
        </div>
        {/* <div className={styles.secondaryNavCont}></div> */}
        <div className={styles.dataCont}>
          {state.stepOrder?.map((step, index) => {
            return (
              <StepDropArea key={step.id} stepIndex={index} onDrop={onStepDrop}>
                <Step stepData={state.stepCards[step.id]} index={index}>
                  <div className={styles.cardCont}>
                    {state?.stepCards[step.id]?.cards?.map(
                      (card, cardIndex) => {
                        return (
                          <CardDropArea
                            cardIndex={cardIndex}
                            key={card.id}
                            onDrop={onCardDrop}
                            card={card}
                          >
                            <Card
                              onClick={() => {
                                setActiveForm(card);
                              }}
                              card={card}
                              index={index}
                            />
                          </CardDropArea>
                        );
                      }
                    )}
                  </div>
                  {addableState[step.id] ? (
                    <TextBox
                      onAdd={() => {
                        let cardId = uuidv4();
                        createCard({
                          id: cardId,
                          stepId: step.id,
                          name: cardNameObj[step.id],
                        });
                        dispatch({
                          type: INIT_DATA,
                          payload: {
                            stepCards: {
                              ...state.stepCards,
                              [step.id]: {
                                ...state?.stepCards[step.id],
                                cards: [
                                  ...(state?.stepCards[step.id]?.cards || []),
                                  {
                                    id: cardId,
                                    name: cardNameObj[step.id],
                                    field: [],
                                    order:
                                      state?.stepCards[step.id]?.cards.length ||
                                      1,
                                  },
                                ],
                              },
                            },
                          },
                        });

                        setAddableState({ ...addableState, [step.id]: false });
                        setCardNameObj({
                          ...cardNameObj,
                          [step.id]: "",
                        });
                      }}
                      onClose={() => {
                        setAddableState({ ...addableState, [step.id]: false });
                        setCardNameObj({
                          ...cardNameObj,
                          [step.id]: "",
                        });
                      }}
                      onChange={(e) => {
                        setCardNameObj({
                          ...cardNameObj,
                          [step.id]: e.target.value,
                        });
                      }}
                    />
                  ) : (
                    <div
                      onClick={() => {
                        setAddableState({ ...addableState, [step.id]: true });
                      }}
                      className={styles.addCardButton}
                    >
                      + Add a card
                    </div>
                  )}
                </Step>
              </StepDropArea>
            );
          })}
          {openAddList ? (
            <>
              <TextBox
                onChange={(e) => {
                  setStepName(e.target.value);
                }}
                onAdd={() => {
                  let stepId = uuidv4();
                  updateProject({
                    step: [
                      ...state.stepOrder,
                      { id: stepId, name: cardNameObj[stepName] },
                    ],
                  });
                  dispatch({
                    type: INIT_DATA,
                    payload: {
                      stepOrder: [
                        ...state.stepOrder,
                        { id: stepId, name: stepName },
                      ],
                      stepCards: {
                        ...state.stepCards,
                        [stepId]: {
                          name: stepName,
                        },
                      },
                    },
                  });

                  setOpenAddList(false);
                }}
                onClose={() => {
                  setOpenAddList(false);
                }}
              />
            </>
          ) : (
            <div
              onClick={() => {
                setOpenAddList(true);
              }}
              className={styles.addListButton}
            >
              + Add another list
            </div>
          )}
        </div>
      </div>
      {activeForm && (
        <Modal
          onClose={() => {
            setActiveForm(null);
          }}
        >
          <Form card={activeForm || {}} />
        </Modal>
      )}
    </>
  );
};

const TopNavCont = () => {
  return (
    <div className={styles.topNav}>
      <span className={styles.topNavTitle}>Trello</span>
      <SecondaryNav />
    </div>
  );
};

const SecondaryNav = () => {
  const [isProjectEditable, setProjectEditable] = useState(false);

  const { state, dispatch } = useContext(Context);

  const [projectName, setProjectName] = useState(state.project.name);

  useEffect(() => {
    setProjectName(state.project.name);
  }, [state.project]);

  return (
    <div className={styles.secondaryNav}>
      {isProjectEditable ? (
        <>
          <TextBox
            isFooter={false}
            autoFocus={true}
            value={projectName}
            onBlur={() => {
              updateProject({
                name: projectName,
              });
              dispatch({
                type: INIT_DATA,
                payload: {
                  project: {
                    ...state.project,
                    name: projectName,
                  },
                },
              });
              setProjectEditable(false);
            }}
            onChange={(e) => {
              setProjectName(e.target.value);
            }}
          />
        </>
      ) : (
        <div
          onClick={() => {
            setProjectEditable(true);
          }}
          className={styles.projectTitle}
        >
          {state.project.name}
        </div>
      )}
    </div>
  );
};
