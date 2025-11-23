import { get, set, ref, query, equalTo, orderByChild } from 'firebase/database';
import { db } from '../config/firebase-config';

export const getUserByHandle = async (handle) => {
  const snapshot = await get(ref(db, `users/${handle}`));
  if (snapshot.exists()) {
    return snapshot.val();
  }
};

export const createUserHandle = async (
  handle,
  uid,
  email,
  firstName,
  lastName,
  role,
) => {
  const user = {
    handle,
    firstName,
    lastName,
    uid,
    role,
    email,
    avatarUrl: `https://api.dicebear.com/9.x/thumbs/svg?seed=${handle}`,
    createdOn: new Date().toString(),
  };

  await set(ref(db, `users/${handle}`), user);
};

export const getUserData = async (uid) => {
  const snapshot = await get(
    query(ref(db, 'users'), orderByChild('uid'), equalTo(uid))
  );
  if (snapshot.exists()) {
    return snapshot.val();
  }
};
