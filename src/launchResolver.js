const launches = [
  { id: 1, site: 'test', isBooked: true }
];

const resolver = {
  launches: (_, args) => {
    const { id } = args;
    console.log(id);
    return launches;
  }
};

export default resolver;
