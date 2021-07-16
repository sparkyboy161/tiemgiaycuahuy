import { db } from "../";
import firebase from 'firebase';

async function create(collectionName, data) {
    try {
        const res = await db.collection(collectionName).add({
            ...data,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        });
        return res;
    } catch (error) {
        return {
            status: 'error'
        }
    }
}

async function update(collectionName, docId, data) {
    try {
        const res = await db
            .collection(collectionName)
            .doc(docId)
            .update({
                ...data,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
            });
        return res;
    } catch (error) {
        return {
            status: 'error'
        }
    }
}

async function getData(collectionName, field, pageNumber, pageSize) {
    let res;
    if (pageNumber === 1) {
        res = db.collection(collectionName).orderBy(field).limit(pageSize);
    }
    else {
        console.log(1111)
        const first = db.collection(collectionName)
            .orderBy(field)
            .limit((pageNumber - 1) * pageSize);
        const snapshotByFirst = await first.get();
        const last = snapshotByFirst.docs[snapshotByFirst.docs.length - 1];

        res = db.collection(collectionName)
            .orderBy(field)
            .startAfter(last.data()[field])
            .limit(pageSize);
    }
    const snapshot = await res.get();
    const data = [];
    if (!snapshot.empty) {
        snapshot.forEach((snap) => {
            data.push(snap.data());
        });
    }
    return data;
}

async function getTotalItems(collectionName) {
    const res = db.collection(collectionName);
    const snapshot = await res.get();
    if (snapshot.empty) {
        return 0;
    }
    return snapshot.docs.length;
}

export const Firestore = { create, update, getData, getTotalItems };