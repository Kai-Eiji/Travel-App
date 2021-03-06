import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import List from './components/List/List';
import store from './utils/store';
import StoreApi from './utils/storeApi';
import InputContainer from './components/Input/InputContainer';
import { makeStyles } from '@material-ui/core/styles';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import TopBar from './components/TopBar';

const useStyle = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    background: 'lightBlue',
    width: '100%',
    overflowY: 'auto',
  },
  listContainer: {
    display: 'flex',
    flexWrap: 'wrap',
  },
}));

export default function App() {
  const [data, setData] = useState(store);
  const [open, setOpen] = useState(false);

  const [backgroundUrl, setBackgroundUrl] = useState('');
  const classes = useStyle();

  const addHotelCard = (title, listId, hotel, offers) => {
    console.log(title, listId);

    const newCardId = uuid();
    const newCard = {
      id: newCardId,
      title: title,
      type: "hotel",
      hotel_data: hotel,
      offers: offers
    };

    const list = data.lists[listId];
    list.cards = [...list.cards, newCard];

    const newState = {
      ...data,
      lists: {
        ...data.lists,
        [listId]: list,
      },
    };
    setData(newState);
  };

  const deleteHotelCard = (listId, hotelId) => {
    const list = data.lists[listId];
    const hotels = Array.from(list.cards);
    let deleteIdx = -1;

    deleteIdx = hotels.findIndex(hotel => hotel.id == hotelId)
    if (deleteIdx > -1){
      hotels.splice(deleteIdx, 1)
    }
    list.cards = hotels;
    
    const newState = {
      ...data,
      lists: {
        ...data.lists,
        [listId]: list,
      },
    };
    setData(newState);
  };

  const addActivityCard = (title, listId, activity) => {
    console.log(title, listId);

    const newCardId = uuid();
    const newCard = {
      id: newCardId,
      title: title,
      type: "activity",
      activity_data: activity,
    };

    const list = data.lists[listId];
    list.cards = [...list.cards, newCard];

    const newState = {
      ...data,
      lists: {
        ...data.lists,
        [listId]: list,
      },
    };
    setData(newState);
  };

  const deleteActivityCard = (listId, activityId) => {
    
    const list = data.lists[listId];
    const activity = Array.from(list.cards);
    let deleteIdx = -1;

    deleteIdx = activity.findIndex(activity => activity.id == activityId)
    if (deleteIdx > -1){
      activity.splice(deleteIdx, 1)
    }
    list.cards = activity;

    const newState = {
      ...data,
      lists: {
        ...data.lists,
        [listId]: list,
      },
    };
    setData(newState);
  };

  const deletePlanCard = (listId, planId) => {
    
    const list = data.lists[listId];
    const plan = Array.from(list.cards);
    let deleteIdx = -1;

    deleteIdx = plan.findIndex(plan => plan.id == planId)
    if (deleteIdx > -1){
      plan.splice(deleteIdx, 1)
    }
    list.cards = plan;

    const newState = {
      ...data,
      lists: {
        ...data.lists,
        [listId]: list,
      },
    };
    setData(newState);
  };

  const addPlanCard = (listId, planText) => {
    const newCardId = uuid();
    const newCard = {
      id: newCardId,
      title: planText,
    };

    const list = data.lists[listId];
    list.cards = [...list.cards, newCard];

    const newState = {
      ...data,
      lists: {
        ...data.lists,
        [listId]: list,
      },
    };
    setData(newState);
  };

  const addMoreList = (title) => {
    const newListId = uuid();
    const newList = {
      id: newListId,
      title,
      cards: [],
    };
    const newState = {
      listIds: [...data.listIds, newListId],
      lists: {
        ...data.lists,
        [newListId]: newList,
      },
    };
    setData(newState);
  };

  const updateListTitle = (title, listId) => {
    const list = data.lists[listId];
    list.title = title;

    const newState = {
      ...data,
      lists: {
        ...data.lists,
        [listId]: list,
      },
    };
    setData(newState);
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;
    console.log('destination', destination, 'source', source, draggableId);

    if (!destination) {
      return;
    }
    if (type === 'list') {
      const newListIds = data.listIds;
      newListIds.splice(source.index, 1);
      newListIds.splice(destination.index, 0, draggableId);
      return;
    }

    const sourceList = data.lists[source.droppableId];
    const destinationList = data.lists[destination.droppableId];
    const draggingCard = sourceList.cards.filter(
      (card) => card.id === draggableId
    )[0];

    if (source.droppableId === destination.droppableId) {
      sourceList.cards.splice(source.index, 1);
      destinationList.cards.splice(destination.index, 0, draggingCard);
      const newSate = {
        ...data,
        lists: {
          ...data.lists,
          [sourceList.id]: destinationList,
        },
      };
      setData(newSate);
    } else {
      sourceList.cards.splice(source.index, 1);
      destinationList.cards.splice(destination.index, 0, draggingCard);

      const newState = {
        ...data,
        lists: {
          ...data.lists,
          [sourceList.id]: sourceList,
          [destinationList.id]: destinationList,
        },
      };
      setData(newState);
    }
  };

  return (
    <StoreApi.Provider value={{ addHotelCard, deleteHotelCard, addActivityCard, deleteActivityCard, deletePlanCard, addPlanCard, addMoreList, updateListTitle }}>
      <div
        className={classes.root}
        style={{
          backgroundImage: `url(${backgroundUrl})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <TopBar setOpen={setOpen} />

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="app" type="list" direction="horizontal">
            {(provided) => (
              <div
                className={classes.listContainer}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {data.listIds.map((listId, index) => {
                  const list = data.lists[listId];
                  return <List list={list} key={listId} index={index} />;
                })}
                <InputContainer type="list" />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </StoreApi.Provider>
  );
}
