import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../services/firebaseConfig';
import { setupAPIClient } from './api';
import axios from 'axios';

export const uploadImage = async (
  imageUri: string,
  id: string,
  type: string
) => {
  if (!imageUri) return;
  const api = setupAPIClient();

  let route = '';

  const payload: { [key: string]: any } = {}; //eslint-disable-line @typescript-eslint/no-explicit-any

  switch (type) {
    case 'upload-image':
      route = 'upload-image/';
      payload.owner_id = id; // Adiciona imovelId ao payload
      break;
    case 'profissional_update':
      route = `image-update/${id}`;
      payload.image_id = id; // Adiciona imovelId ao payload
      break;
    case 'logo':
      route = 'logo';
      payload.officeId = id; // Adiciona officeId ao payload
      break;
    case 'banner':
      route = 'banner';
      payload.officeId = id; // Adiciona officeId ao payload
      break;
    case 'service/image':
      route = 'service/image';
      payload.serviceId = id; // Adiciona officeId ao payload
      payload.showImage = true;
      break;
    default:
      throw new Error('Tipo inválido para upload de imagem');
  }

  try {
    const response = await fetch(imageUri);
    const blob = await response.blob();
    const fileName = imageUri.substring(imageUri.lastIndexOf('/') + 1);
    const storageRef = ref(storage, `images/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, blob);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(progress + '% done');
        },
        (error) => {
          console.error('Upload error: ', error);
          reject(error);
        },
        async () => {
          const url = await getDownloadURL(uploadTask.snapshot.ref);

          // Adiciona o URL ao payload
          payload.imageUrl = url;

          // Faz a requisição para a API com o payload dinâmico
          if (type === 'profissional_update') {
            await api.put(`/${route}`, payload);
          } else {
            await axios.post(`${import.meta.env.VITE_SERVER_URL}/${route}`, {
              url
            });
          }

          resolve(url);
        }
      );
    });
  } catch (error) {
    console.error('Erro no upload');
    throw error;
  }
};
