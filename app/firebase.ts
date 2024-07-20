
import { applicationDefault, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const apps = getApps();
if (!apps.length) {
  apps.push(initializeApp({
    credential: applicationDefault()
  }));
}

export const db = getFirestore(apps[0]);
