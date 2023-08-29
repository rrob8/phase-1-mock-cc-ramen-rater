// write your code here
const menu = document.getElementById('ramen-menu')
document.addEventListener('DOMContentLoaded', ()=>
fetch(`http://localhost:3000/ramens`)
.then(response => response.json())
.then(data => {
    const ramenList = data
    renderRamen(data, ramenList)
})
)

function renderRamen (data, ramenList) {
    console.log(data)
    data.forEach( ramen => {
        
    
    const image = document.createElement('img')
    image.src = ramen.image
   

    image.id = ramen.id
    menu.append(image)

        image.addEventListener('click', (e) =>{
            
            for (ramen of ramenList) {
                
                if (ramen.id == e.target.id) {
                    document.querySelector('.detail-image').src = ramen.image
                    document.querySelector('.name').textContent = ramen.name
                    document.querySelector('.restaurant').textContent = `Restaurant: ${ramen.restaurant}`
                    document.getElementById('rating-display').textContent = ramen.rating
                    document.getElementById('comment-display').textContent = ramen.comment

                }
            }
        })
})
}

const form = document.getElementById('new-ramen')
form.addEventListener('submit',(e)=>{
    e.preventDefault()
    const newName = document.getElementById('new-name').value
    const newRestaurant = document.getElementById('new-restaurant').value
    const newImage = document.getElementById('new-image').value
    const newRating = document.getElementById('new-rating').value
    const newComment = document.getElementById('new-comment').value

    const newRamenObj = {
        'name':newName,
        'restaurant': newRestaurant,
        'image':newImage,
        'rating':newRating,
        'comment':newComment
    }

    console.log(newRamenObj)
    fetch(`http://localhost:3000/ramens`, {
        method:"POST",
        headers: {
            "Content-Type": "application/json",
        Accept: "application/json"
        },
        body: JSON.stringify(newRamenObj)
})
    .then(()=> {
        menu.innerHTML =''
        fetch(`http://localhost:3000/ramens`)
.then(response => response.json())
.then(data => {
    const ramenList = data
    renderRamen(data, ramenList)
})

})

})