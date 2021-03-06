var searchOpen = document.querySelector(".sentence-button");
var searchForm = document.querySelector(".sentence-form");
var dateIn = searchForm.querySelector("[name=arrival-date]");
var dateOut = searchForm.querySelector("[name=departure-date]");
var numberAdults = searchForm.querySelector("[name=adults]");
var numberKids = searchForm.querySelector("[name=kids]");
var isStorageSupport = true;
var storageAdults = "";
var storageKids = "";

// Проверяю работу localStorage

try {
  storageAdults = localStorage.getItem("adultsData");
} catch (err) {
  isStorageSupport = false;
}

// При подключении JS форма поиска скрывается (если JS не работает форма видна, инчае возникает проблема доступности)
// Проверяю наличие атрибуда required и если он есть удаляю для применения проверки через JS
// Проверяю наличие атрибуда min и если он есть удаляю для применения проверки через JS, т.к. заселиться меньше 1-го взрослого не может

if (searchForm) {
  searchForm.classList.add("sentence-form-hide");

  if (dateIn.hasAttribute("required")) {
    dateIn.removeAttribute("required");
  }
  if (dateOut.hasAttribute("required")) {
    dateOut.removeAttribute("required");
  }
  if (numberAdults.hasAttribute("required")) {
    numberAdults.removeAttribute("required");
  }
  if (numberKids.hasAttribute("required")) {
    numberKids.removeAttribute("required");
  }
  if (numberKids.hasAttribute("min")) {
    numberKids.removeAttribute("min");
  }
  if (numberAdults.hasAttribute("min")) {
    numberAdults.removeAttribute("min");
  }
};

//Анимация формы поиска на главной странице

if (searchOpen) {
  searchOpen.addEventListener("click", function (event) {
    event.preventDefault();
    searchForm.classList.toggle("sentence-form-show");
    searchForm.classList.toggle("sentence-form-hide");
    searchForm.classList.remove("modal-error");
    if (isStorageSupport) {
      storageAdults = localStorage.getItem("adultsData");
      storageKids = localStorage.getItem("kidsData");
      if (storageAdults) {
        numberAdults.value = storageAdults;
      }
      if (storageKids) {
        numberKids.value = storageKids;
      }
    }
    if (searchForm.classList.contains("sentence-form-show")) {
      dateIn.focus();
    }
  });
};

//Закрытие формы поиска черех Esc

window.addEventListener("keydown", function (event) {
  if (event.keyCode === 27) {
    if (searchForm.classList.contains("sentence-form-show")) {
      event.preventDefault();
      searchForm.classList.toggle("sentence-form-show");
      searchForm.classList.toggle("sentence-form-hide");
      searchForm.classList.remove("modal-error");
    }
  }
});

//Проверка заполнения формы

searchForm.addEventListener("submit", function (event) {
  if (!dateIn.value || !dateOut.value || !numberAdults.value || !numberKids.value || numberAdults.value <= 0 || numberKids.value < 0) {
    event.preventDefault();
    searchForm.classList.remove("modal-error");
    searchForm.offsetWidth = searchForm.offsetWidth;
    searchForm.classList.add("modal-error");
  }
  else {
    if (isStorageSupport) {
      localStorage.setItem("adultsData", numberAdults.value);
      localStorage.setItem("kidsData", numberKids.value);
    }
  }
});

//Ввод данных в форму поиска на главной странице через кнопки +-

var addAdults = document.querySelector(".add-adults");
var minusAdults = document.querySelector(".minus-adults");
var addKids = document.querySelector(".add-kids");
var minusKids = document.querySelector(".minus-kids");

if (addAdults) {
  addAdults.addEventListener("click", function (event) {
    event.preventDefault();
    numberAdults.value = Number(numberAdults.value) + 1;
  });
};

if (minusAdults) {
  minusAdults.addEventListener("click", function (event) {
    event.preventDefault();
    if (Number(numberAdults.value) > 1) {
      numberAdults.value = Number(numberAdults.value) - 1;
    }
  });
};

if (addKids) {
  addKids.addEventListener("click", function (event) {
    event.preventDefault();
    numberKids.value = Number(numberKids.value) + 1;
  });
};

if (minusKids) {
  minusKids.addEventListener("click", function (event) {
    event.preventDefault();
    if (Number(numberKids.value) > 0) {
      numberKids.value = Number(numberKids.value) - 1;
    }
  });
};