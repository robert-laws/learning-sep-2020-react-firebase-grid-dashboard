var admin = require('firebase-admin');

var serviceAccount = require('./learning-sep-2020-react-grid-firebase-adminsdk-v978a-ba910124ff.json');

var uid = process.argv[2];

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://learning-sep-2020-react-grid.firebaseio.com',
});

admin
  .auth()
  .setCustomUserClaims(uid, { admin: true })
  .then(() => {
    console.log('custom claim set for user', uid);
    process.exit();
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
