const BASE_URL = "http://localhost:8080/services";

let cards = document.querySelector(".cards");
let sort = document.querySelector(".sort");
let search = document.querySelector(".search");
const loadMoreBtn = document.getElementById("load-more-btn");
let pageCount = 1;

loadMoreBtn.addEventListener("click", loadMoreCards);

axios.get(`${BASE_URL}`).then((response) => {
  const mydata = response.data;
  drawCard(mydata.slice(0, 6));
  if (mydata.length > 6) {
    loadMoreBtn.style.display = "block";
  }
});

function loadMoreCards() {
  axios.get(`${BASE_URL}`).then((response) => {
    const mydata = response.data;
    const startIndex = 6 + (pageCount - 1) * 3;
    const endIndex = startIndex + 3;
    const cardsToLoad = mydata.slice(startIndex, endIndex);
    drawCard(cardsToLoad);

    if (endIndex >= mydata.length) {
      loadMoreBtn.style.display = "none";
    }

    pageCount++;
  });
}

function drawCard(arr) {
  cards.innerHTML = "";
  arr.forEach((element) => {
    cards.innerHTML += `
      <div class="card m-2 align-items-center justify-content-center">
        <div class="image"><img src="${element.photo}" alt="" /></div>
        <div class="card-body">
          <h1>${element.title}</h1>
          <p>${element.desc}</p>
          <div class="button">
            <a href="details.html" class="btn learn-more-btn">LEARN MORE</a>
          </div>
          <div class="buttonss d-flex justify-content-between">
            <a href="edit.html?id=${element.id}" class="edit-btn btn btn-success same">EDIT</a>
            <button class="delete-btn btn same btn-danger" onclick="deleteCard(${element.id},this)">DELETE</button>
            </div>
        </div>
      </div>
    `;
  });
}

function deleteCard(id, btn) {
  axios.delete(`${BASE_URL}/${id}`);
  btn.closest(".card").remove();
}

search.addEventListener("input", function (event) {
  axios(BASE_URL).then((res) => {
    let filteredServices = res.data.filter((item) =>
      item.title
        .toLocaleLowerCase()
        .includes(event.target.value.toLocaleLowerCase())
    );

    console.log(filteredServices);
    drawCard(filteredServices);
  });
});

sort.addEventListener("click", function () {
  if (this.innerHTML == "Ascending") {
    axios(BASE_URL).then((res) => {
      let sortAsc = res.data.sort((a, b) => a.title.localeCompare(b.title));
      drawCard(sortAsc);
    });
    this.innerHTML = "Descending";
  } else if (this.innerHTML == "Descending") {
    axios(BASE_URL).then((res) => {
      let sortDsc = res.data.sort((a, b) => b.title.localeCompare(a.title));
      drawCard(sortDsc);
    });
    this.innerHTML = "Default";
  } else {
    axios(BASE_URL).then((res) => {
      drawCard(res.data);
    });
    this.innerHTML = "Ascending";
  }
});
//////////////////////
window.addEventListener("scroll", function () {
  const header2 = document.querySelector(".header22")});
