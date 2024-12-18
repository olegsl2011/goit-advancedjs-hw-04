import axios from 'axios';

const pixabayApi = axios.create({
  baseURL: 'https://pixabay.com/api',
});

const PER_PAGE = 15;

export const fetchImages = async ({ query, page = 1 }) => {
  try {
    const response = await pixabayApi.get('/', {
      params: {
        key: '18172942-eab38dca32c93699ea5d62826',
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: PER_PAGE,
        page,
      },
    });

    const { hits, totalHits } = response.data;
    return {
      images: hits.map(
        ({
          comments,
          downloads,
          likes,
          views,
          largeImageURL,
          webformatURL,
          tags,
        }) => ({
          comments,
          downloads,
          likes,
          views,
          largeImageURL,
          webformatURL,
          tags,
        })
      ),
      pages: Math.round(totalHits / PER_PAGE),
    };
  } catch (e) {
    console.log(e);
  }
};
