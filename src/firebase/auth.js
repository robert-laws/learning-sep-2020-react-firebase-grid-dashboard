import firebase from 'firebase/app';
import 'firebase/auth';

export const signup = async ({ firstName, lastName, email, password }) => {
  const res = await firebase
    .auth()
    .createUserWithEmailAndPassword(email, password);
  await res.user.updateProfile({ displayName: `${firstName} ${lastName}` });
};
