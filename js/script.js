var searchOpen = document.querySelector(".sentence-button");
var searchForm =  document.querySelector(".sentence-form");

if (searchOpen) {
  if (searchForm) {
    searchForm.classList.add("sentence-form-hide");
  };

  searchOpen.addEventListener("click", function (event) {
    event.preventDefault();
    searchForm.classList.toggle("sentence-form-hide");
    searchForm.classList.toggle("sentence-form-show");
  });
};