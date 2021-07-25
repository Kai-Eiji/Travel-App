const plans = [
  {
    id: 'card-1',
    title: 'Arrive at Airport',
  },
  {
    id: 'card-3',
    title: 'Leave from Airport',
  },
];

const stays = [
  {
    id: 'card-4',
    title: 'HOTEL 1',
    type: 'hotel',
    hotel_data: {hotelId: 123 },
    offers: null,
  },
  {
    id: 'card-5',
    title: 'HOTEL 2',
    type: 'hotel',
    hotel_data: {hotelId: 123 },
    offers: null,
  },
  {
    id: 'card-6',
    title: 'HOTEL 3',
    type: 'hotel',
    hotel_data: {hotelId: 123 },
    offers: null,
  },
];

const activities = [
  {
    id: 'card-7',
    title: 'ACTIVITY 1',
    type: 'activity',
    activity_data: {},
  },
  {
    id: 'card-8',
    title: 'ACTIVITY 2',
    type: 'activity',
    activity_data: {},
  },
  {
    id: 'card-9',
    title: 'ACTIVITY 3',
    type: 'activity',
    activity_data: {},
  },
];



const data = {
  lists: {
    'list-1': {
      id: 'list-1',
      title: 'Plan',
      cards: plans,
    },
    'list-2': {
      id: 'list-2',
      title: 'Accomodation',
      cards: stays,
    },
    'list-3': {
      id: 'list-3',
      title: 'Activity',
      cards: activities,
    },
    
  },
  listIds: ['list-1', 'list-2', 'list-3']
};

export default data;
