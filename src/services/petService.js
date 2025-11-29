import { db } from "../services/firebase";
import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  doc,
  updateDoc,
  getDoc,
  getDocs,
} from "firebase/firestore";

/**
 * Adiciona pet no Firestore incluindo ownerId (id do usuário logado)
 * data: { nome, descricao, foto, ... }
 * userId: auth.currentUser.uid
 */
export async function addPet(data, userId) {
  const payload = {
    ...data,
    ownerId: userId,
    status: data.status ?? "disponivel", // disponivel | adotado | faleceu
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };

  const ref = await addDoc(collection(db, "pets"), payload);
  return { id: ref.id, ...payload };
}

/**
 * Observador (realtime) - carrega apenas os pets do usuário logado
 * callback recebe array de pets
 * retorna função unsubscribe()
 */
export function onMyPets(userId, callback) {
  const q = query(collection(db, "pets"), where("ownerId", "==", userId));
  return onSnapshot(q, (snapshot) => {
    const lista = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
    callback(lista);
  });
}

/**
 * Carregar pets públicos (para MeAdote)
 * Ex.: status != 'faleceu'
 */
export function onPublicPets(callback) {
  const q = query(collection(db, "pets"), where("status", "!=", "faleceu"));
  return onSnapshot(q, (snapshot) => {
    const lista = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
    callback(lista);
  });
}

/** Pegar pet por id (uma vez) */
export async function getPetById(id) {
  const ref = doc(db, "pets", id);
  const snap = await getDoc(ref);
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

/** Atualizar dados do pet (usado na edição) */
export async function updatePet(id, data) {
  const ref = doc(db, "pets", id);
  await updateDoc(ref, {
    ...data,
    updatedAt: Date.now(),
  });
}

/** Atualizar somente status */
export async function updatePetStatus(id, status) {
  const ref = doc(db, "pets", id);
  await updateDoc(ref, {
    status,
    updatedAt: Date.now(),
  });
}
