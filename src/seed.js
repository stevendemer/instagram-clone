/* eslint-disable no-plusplus */
// NOTE: replace 'dctIdIosqEZXBayhQb0Rq18Ittt1' with your Firebase auth user id (can be taken from Firebase)
export function seedDatabase(doc, setDoc, db) {
  const users = [
    {
      userId: "dctIdIosqEZXBayhQb0Rq18Ittt1",
      username: "Steven",
      fullName: "Steven Savov",
      emailAddress: "stev.jaws@gmail.com",
      following: ["2"],
      followers: ["2", "3", "4"],
      dateCreated: Date.now(),
    },
    {
      userId: "2",
      username: "raphael",
      fullName: "Raffaello Sanzio da Urbino",
      emailAddress: "raphael@sanzio.com",
      following: [],
      followers: ["dctIdIosqEZXBayhQb0Rq18Ittt1"],
      dateCreated: Date.now(),
    },
    {
      userId: "3",
      username: "dali",
      fullName: "Salvador Dalí",
      emailAddress: "salvador@dali.com",
      following: [],
      followers: ["dctIdIosqEZXBayhQb0Rq18Ittt1"],
      dateCreated: Date.now(),
    },
    {
      userId: "4",
      username: "orwell",
      fullName: "George Orwell",
      emailAddress: "george@orwell.com",
      following: [],
      followers: ["dctIdIosqEZXBayhQb0Rq18Ittt1"],
      dateCreated: Date.now(),
    },
  ];

  // eslint-disable-next-line prefer-const
  users.forEach(async function (user) {
    await setDoc(doc(db, "users").add(user));
  });
  // for (let k = 0; k < users.length; k++) {
  //   await setDoc(doc(db, "users").add(users[k]));
  // }

  // eslint-disable-next-line prefer-const
  for (let i = 1; i <= 5; ++i) {
    setDoc(
      doc(db, "photos").add({
        photoId: i,
        userId: "2",
        imageSrc: `/images/users/raphael/${i}.jpg`,
        caption: "Saint George and the Dragon",
        likes: [],
        comments: [
          {
            displayName: "dali",
            comment: "Love this place, looks like my animal farm!",
          },
          {
            displayName: "orwell",
            comment: "Would you mind if I used this picture?",
          },
        ],
        userLatitude: "40.7128°",
        userLongitude: "74.0060°",
        dateCreated: Date.now(),
      })
    );
  }
}
