let popUp = document.querySelectorAll('.loginPopupContainer');
popUp.forEach(node => node.remove());

document.addEventListener('keydown', focusInput);
document.addEventListener('keydown', selectHoveredItem);
document.addEventListener('keyup', moveAutocompleteItems);

const languageButton = document.querySelector('button[title="Choose a dictionary"]');
const currentLanguage = languageButton.firstElementChild.firstElementChild.innerText;

if (currentLanguage !== 'English–Chinese (Traditional)') {
  const ampScript = document.createElement("script");
  ampScript.innerHTML = `window.AMP.setState(
    {
      stateSearch: {
        dataset: 'english-chinese-traditional',
        dataset_text: 'English–Chinese (Traditional)',
        dataset_search: 'Search English–Chinese (Traditional)',
        isbilang: false
      }
    }
  )`
  document.head.appendChild(ampScript);
}

function focusInput(e) {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    document.getElementById('searchword').focus();
  }
}

function moveAutocompleteItems(e) {
  let autocomplete = document.getElementById('searchAutoComplete');
  if(autocomplete.offsetParent == null) return;

  const list = autocomplete.querySelector('div[role="list"]');
  let itemsCount = list.childElementCount;
  let currentIndex = autocomplete.dataset.hoverIndex || -1;
  let oldIndex = currentIndex;

  if (e.keyCode === 40) {
    currentIndex = (parseInt(currentIndex) + 1) % itemsCount;
  } else if (e.keyCode === 38) {
    currentIndex = (parseInt(currentIndex) - 1 + itemsCount) % itemsCount;
  }

  autocomplete.dataset.hoverIndex = currentIndex;

  removeHoveredItem(list.childNodes[oldIndex]);
  addHoveredItem(list.childNodes[currentIndex]);
}

function removeHoveredItem(item) {
  if (item != null) item.classList.remove('hovered-item');
}

function addHoveredItem(item) {
  if (item != null) item.classList.add('hovered-item');
}

function selectHoveredItem(e) {
  let autocomplete = document.getElementById('searchAutoComplete');
  if (autocomplete.offsetParent == null) return;

  const list = autocomplete.querySelector('div[role="list"]');
  let itemsCount = list.childElementCount;
  let currentIndex = autocomplete.dataset.hoverIndex || -1;
  
  if (e.keyCode === 13 && currentIndex >= 0 && currentIndex < itemsCount) {
    const link = list.childNodes[currentIndex].firstElementChild
    if (link != null) link.click();
    return e.preventDefault();
  }
}