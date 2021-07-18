import { db } from "../";
import firebase from 'firebase';

async function create(collectionName, data) {
    try {
        const id = Date.now().toString();
        const createdAt = firebase.firestore.FieldValue.serverTimestamp();
        const payload = { ...data, id, createdAt }

        await db.collection(collectionName).doc(id).set(payload)

        return {
            data: { ...payload, key: id },
            status: 'success'
        };
    } catch (error) {
        return {
            status: 'error'
        }
    }
}

async function update(collectionName, docId, data) {
    try {
        await db
            .collection(collectionName)
            .doc(docId)
            .update({
                ...data,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
            });

        return {
            data: docId,
            status: 'success'
        };
    } catch (error) {
        return {
            status: 'error'
        }
    }
}

async function remove(collectionName, docId) {
    try {
        const res = await db.collection(collectionName).doc(docId).delete();

        return {
            data: res,
            status: 'success'
        };
    } catch (error) {
        return {
            status: 'error'
        }
    }
}

async function getOneById(collectionName, docId) {
    try {
        const query = await db.collection(collectionName).where('id', '==', docId).get();

        if (!query.empty) {
            const snapshot = query.docs[0];
            const data = snapshot.data();
            return {
                data,
                status: 'success'
            };
        }
        return {
            status: 'success',
            data: []
        }
    } catch (error) {
        return {
            status: 'error'
        }
    }
}

async function getAll(collectionName, field, pageNumber, pageSize) {
    try {
        let res;

        if (pageNumber === 1) {
            res = db.collection(collectionName).orderBy(field).limit(pageSize);
        }
        else {
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
                const key = snap.data().id;
                data.push({ ...snap.data(), key });
            });
        }
        return {
            data,
            status: 'success'
        };
    } catch (err) {
        return {
            status: 'error'
        }
    }
}

async function getTotal(collectionName) {
    try {
        const res = db.collection(collectionName);
        const snapshot = await res.get();

        if (snapshot.empty) {
            return 0;
        }
        return {
            total: snapshot.docs.length,
            status: 'success'
        };
    } catch (err) {
        return {
            status: 'error'
        }
    }
}

export const Firestore = { create, update, getAll, getTotal, remove, getOneById };