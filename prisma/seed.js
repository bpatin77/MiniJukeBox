const prisma = require("../prisma");
const { faker } = require("@faker-js/faker");

const seed = async (numUsers = 3, numPlaylists = 5) => {
  // TODO: Create 3 users with 5 playlist each
  // A loop must be used because `prisma.user.createMany` fails here because its One to Many
  for (let i = 0; i < numUsers; i++) {
    const playlists = Array.from({ length: numPlaylists }, (_, j) => {
      const name = faker.internet.displayName();
      return {
        name,
        description: `${name}@foo.bar`,
       
      };
    });

    // Create a single user with nested playlists
    await prisma.user.create({
      //creating the playlist with the name and the playlists we defined
      data: {
        username: faker.person.fullName() + " ",
        playlists: {
          //playlists from skema
          create: playlists, //playlists array we created on line 8
        },
      },
    });
  }
};

seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
