const input=document.querySelector('input')
const root=document.querySelector('#root')
const btns=document.querySelectorAll('button')
const random=document.querySelector('#random')

const url='https://www.themealdb.com/api/json/v1/1/search.php?s='
const letterUrl='https://www.themealdb.com/api/json/v1/1/search.php?f='
const randomUrl='https://www.themealdb.com/api/json/v1/1/random.php'

function getMeal(name){
    fetch(url+name)
       .then(res=>res.json())
       .then(data=>{
          console.log(data.meals);
          showMeal(data.meals)
       })
}

input.onchange=()=>{
    getMeal(input.value)
}


function showMeal(arr){
    root.innerHTML=''
    for (const obj of arr) {
        root.innerHTML+=`
        <li>
        <h5>${obj.strMeal}</h5>
        <img onclick='getMeal(${obj.idMeal})' width='20%' src='${obj.strMealThumb}'/>
        </li>
        `
    }
}



btns.forEach(btn=>{
    btn.onclick=()=>{
        console.log(letterUrl+btn.innerText);

        fetch(letterUrl+btn.innerText)
            .then(res=>res.json())
            .then(data=>{
                console.log(data.meals);
                showMeal(data.meals)
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }
})

function getMeal(id){
    console.log(id);
    fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i='+id)
      .then(res=>res.json())
      .then(data=>{
        console.log(data.meals);
        showOneMeal(data.meals[0])
      })
}

function showOneMeal(obj){
    root.innerHTML=`
    <img src='${obj.strMealThumb}'/>
    <h2>${obj.strMeal}</h2>
    <p>${obj.strInstructions}</p>
    `
}

function getRandomMeal(){
    fetch(randomUrl)
       .then(res=>res.json())
       .then(data=>{
          console.log(data.meals);
          showMeal(data.meals)
       })
}

random.onclick=()=>{
    root.innerHTML=''
    getRandomMeal()
}

