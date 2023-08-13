const url = 'https://api.thecatapi.com/v1';

const api_key =
  'live_O7F7DJLBa1xb9JNdoi7AKiMxVsxumSSfhm3C75reQo8i6eQlRHGdC6Nd1w5jfflf';

export function fetchBreeds() {
  return fetch(`${url}/breeds?api_key=${api_key}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

export function fetchCatByBreed(breedId) {
  return fetch(
    `${url}/images/search?api_key=${api_key}&breed_ids=${breedId}`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
