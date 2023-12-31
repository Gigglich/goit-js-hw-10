import { fetchBreeds, fetchCatByBreed } from './cat-api';
import './styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

const selector = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');

loader.textContent = '';

catInfo.classList.add('is-hidden');
loader.classList.replace('loader', 'is-hidden');
error.classList.add('is-hidden');

let arBreedsId = [];
fetchBreeds()
  .then(data => {
    data.forEach(element => {
      arBreedsId.push({ text: element.name, value: element.id });
    });
    new SlimSelect({
      select: selector,
      data: arBreedsId,
    });
  })
  .catch(onFetchError);

selector.addEventListener('change', onSelectBreed);

function onSelectBreed(event) {
  selector.classList.add('is-hidden');
  catInfo.classList.add('is-hidden');
  loader.classList.replace('is-hidden', 'loader');

  const breedId = event.currentTarget.value;
  fetchCatByBreed(breedId)
    .then(data => {
      selector.classList.remove('is-hidden');
      loader.classList.replace('loader', 'is-hidden');
      const { url, breeds } = data[0];

      catInfo.innerHTML = `<div class="box-img">
      <img src="${url}" alt="${breeds[0].name}" width="400"/>
      </div>
      <div class="box">
      <h1>${breeds[0].name}</h1>
      <p>${breeds[0].description}</p>
      <p>
      <b>Temperament:</b> ${breeds[0].temperament}</p>
      </div>`;
      catInfo.classList.remove('is-hidden');
    })

    .catch(onFetchError);
}

function onFetchError(error) {
  selector.classList.remove('is-hidden');
  loader.classList.replace('loader', 'is-hidden');

  Notify.failure(
    'Oops! Something went wrong! Try reloading the page or select another cat breed!',
    {
      position: 'center-center',
      timeout: 5000,
      width: '400px',
      fontSize: '24px',
    }
  );
}
