import characterModel from '../api/character/characterModel';

const characters = [{
    '_id': '1952558349',
    'name': 'Jogan Gage',
    'alts': 'Ashalyn, Mingel Gage',
    'last_seen_location': 'Jita IV - IV',
    'bounty': 1000000,
    'ship_types': 'Raven, Kestrel'
  },
  {
    '_id': '1376548045',
    'name': 'keacte',
    'alts': 'None',
    'last_seen_location': 'Poinen',
    'bounty': 0,
    'ship_types': 'Moa, Blackbird'
  },
];

export default async function loadContacts() {
  try {
    await characterModel.deleteMany();
    await characterModel.collection.insertMany(characters);
    console.info(`${characters.length} characters were successfully stored.`);
  } catch (err) {
    console.error(`failed to Load Character Data: ${err}`);
  }
}