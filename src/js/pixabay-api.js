import axios from 'axios';
export async function searchImages(userRequest, page, perPage) {
  const personalKey = '42394158-5c4cd21eee44163ae27aefe31';
  const url = `https://pixabay.com/api/?key=${personalKey}&q=${userRequest}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'An error occurred.');
  }
}
