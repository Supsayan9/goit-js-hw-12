import axios from 'axios';
import iziToast from 'izitoast';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '45539852-e7385dbf9677b23660ec365b6';

export const getPhotos = async (searchValue, page) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: searchValue,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: page,
        per_page: 15,
      },
    });

    if (response.status !== 200) {
      throw new Error(`Error: ${response.status}`);
    }

    return response.data;
  } catch (error) {
    iziToast.show({
      message: `Error: ${error.message}`,
      position: 'topRight',
      backgroundColor: '#ef4040',
      titleColor: '#fff',
      titleSize: '16px',
      messageColor: '#fff',
      messageSize: '16px',
      maxWidth: '385px',
      timeout: 5000,
    });

    throw error;
  }
};
