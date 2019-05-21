const tableBody = document.querySelector('#table-body');
const dogForm = document.querySelector('#dog-form');
const dogNameField = document.querySelector('#name');
const dogBreedField = document.querySelector('#breed');
const dogSexField = document.querySelector('#sex');
let currentDog = null;
let currenttd1 = null;
let currenttd2 = null;
let currenttd3 = null;

document.addEventListener('DOMContentLoaded', () => {
    loadDogs();
    dogForm.addEventListener('submit',editDog);
})

function loadDogs(){
    fetch('http://localhost:3000/dogs')
    .then(resp => resp.json())
    .then(data => {
        console.log(data);
        data.forEach(dog => {
           createElement(dog);
        })
    })
}

function editDog(e){
    e.preventDefault();
    fetch(`http://localhost:3000/dogs/${currentDog.id}`,{
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            name: dogNameField.value,
            breed: dogBreedField.value,
            sex: dogSexField.value,           
          })
    })
    .then(resp => resp.json())
    .then(data =>{
        //loadDogs();
        currenttd1.innerText = data.name;
        currenttd2.innerText = data.breed;
        currenttd3.innerText = data.sex; 
    })
}

function createElement(dog){
    let tr = document.createElement('tr');
    tr.className = 'padding';
    let td1 = document.createElement('td');
    td1.innerText = dog.name;
    tr.appendChild(td1);
    let td2 = document.createElement('td');
    td2.innerText = dog.breed;
    tr.appendChild(td2);
    let td3 = document.createElement('td');
    td3.innerText = dog.sex;
    tr.appendChild(td3);
    let td4 = document.createElement('td');
    let button = document.createElement('button');
    button.innerText = 'Edit';
    button.addEventListener('click',function(){
        dogNameField.value = dog.name;
        dogBreedField.value = dog.breed;
        dogSexField.value = dog.sex;
        currentDog = dog;//instance of dog
        currenttd1 = td1;//element
        currenttd2 = td2;//element
        currenttd3 = td3;//element
    })
    td4.appendChild(button);
    tr.appendChild(td4);
    tableBody.appendChild(tr);
}

