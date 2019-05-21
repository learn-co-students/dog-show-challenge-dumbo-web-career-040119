const dogForm = document.querySelector('#dog-form');
const formName = document.querySelector('#name');
const formBreed = document.querySelector('#breed');
const formSex = document.querySelector('#sex');
let currentDogId = null;

document.addEventListener('DOMContentLoaded', () => {
  getDogs()
})

function getDogs() {
  const dogTable = document.getElementById("table-body")
  fetch("http://localhost:3000/dogs")
  .then(res => res.json())
  .then(dogs => {
    dogs.forEach(dog => {
      dogTable.innerHTML +=
        `<tr id="dog-${dog.id}">
          <td class="name">${dog.name}</td>
          <td class="breed">${dog.breed}</td>
          <td class="sex">${dog.sex}</td>
          <td><button class="edit-button padding" data-id="${dog.id}">Edit</button></td>
        </tr>`
        dogTable.addEventListener("click", editDog)
      });
    })
}

function editDog(event) {
  if (event.target.dataset.id) {
    const dogId = event.target.dataset.id
    const dogTr = document.getElementById(`dog-${dogId}`)
    const dogName = dogTr.querySelector(".name").innerText
    const dogBreed = dogTr.querySelector(".breed").innerText
    const dogSex = dogTr.querySelector(".sex").innerText
    formName.value = dogName
    formBreed.value = dogBreed
    formSex.value = dogSex
    currentDogId = dogId
  }
}

dogForm.addEventListener('submit', event => {
  event.preventDefault();
  fetch(`http://localhost:3000/dogs/${currentDogId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: formName.value,
      breed: formBreed.value,
      sex: formSex.value
    })
  })
  .then(res => res.json())
  .then(dog => {
    const dogTr = document.getElementById(`dog-${currentDogId}`)
    const dogName = dogTr.querySelector(".name")
    const dogBreed = dogTr.querySelector(".breed")
    const dogSex = dogTr.querySelector(".sex")
    dogName.innerText = dog.name
    dogBreed.innerText = dog.breed
    dogSex.innerText = dog.sex
  })
});
