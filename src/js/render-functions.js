const getStatisticsItemMarkup = (name, count) => `
        <li class="image-statistics-list-item">
            <h3>${name}</h3>
            <p>${count}</p>
          </li>
        `;

export const createGalleryMarkup = images => {
  return images
    .map(
      ({
        comments,
        downloads,
        likes,
        views,
        largeImageURL,
        webformatURL,
        tags,
      }) => `
     <li class="gallery-item">
        <a class="gallery-link" href="${largeImageURL}">
          <img class="gallery-image" src="${webformatURL}" alt="${tags}" />
        </a>
        <ul class="image-statistics-list">
            ${getStatisticsItemMarkup('Likes', likes)}
            ${getStatisticsItemMarkup('Views', views)}
            ${getStatisticsItemMarkup('Comments', comments)}
            ${getStatisticsItemMarkup('Downloads', downloads)}
        </ul>
      </li>
    `
    )
    .join('');
};

export const renderMarkup = ({ ref, position = 'beforeEnd', markup }) => {
  ref.insertAdjacentHTML(position, markup);
};
