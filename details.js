let id = new URLSearchParams(window.location.search).get("id");
console.log(id);
const BASE_URL = "http://localhost:8080/services";
let detail = document.querySelector(".detail-card");

axios(`${BASE_URL}/${id}`).then((response) => {
  const data = response.data; // Access the data property of the response

  detail.innerHTML = `
    <div class="card m-2 align-items-center justify-content-center">
        <div class="image"><img src="${data.photo}" alt="" /></div>
        <div class="card-body">
          <h1>${data.title}</h1>
          <p>${data.desc}</p>
        </div>
      </div>`;
});
