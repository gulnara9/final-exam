const BASE_URL = "http://localhost:8080/services";
const id = new URLSearchParams(window.location.search).get("id");
console.log(id);
const form = document.querySelector("#editform");
const title = document.querySelector("#title");
const desc = document.querySelector("#desc");
const photo = document.querySelector("#photo");
const submitBtn = document.querySelector("#submitBtn");

axios.get(`${BASE_URL}/${id}`).then((res) => {
  data = res.data;

  title.value = data.title;
  desc.value = data.desc;
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let obj = {
    photo: `./images/${photo.value.split("\\")[2]}`,
    title: title.value,
    desc: desc.value,
  };
  if (obj.title && obj.desc) {
    if (id) {
      axios.patch(`${BASE_URL}/${id}`, obj);
    } else {
      axios.post(BASE_URL, obj);
    }
    window.location = "./index.html";
  } else {
    alert("Fill in all fields!");
  }
});
