import { menuItems } from "./menu-data.js";

function buildMenu() {
    let appetizerEl = document.getElementById("appetizers")

    let appetizerData = menuItems.filter((item) => item.category == "appetizer")

    appetizerData.map( item => {
        attachMenuCard(buildMenuCard(item), appetizerEl)
    })

}

function attachMenuCard(item, el) {
    el.appendChild(item)
}

function buildMenuCard(item) {

    let itemCard = document.createElement('div')
    itemCard.setAttribute('class', 'food-card')

    let innerContainer = document.createElement('div')
    innerContainer.setAttribute('class', 'food-card-generic-container')

    let hiddenBox = document.createElement('div')
    hiddenBox.setAttribute('class', 'hid-box')

    let hiddenBoxDescription = document.createElement('div')
    hiddenBoxDescription.setAttribute('class', 'hid-box--description')

    let topParagraph = document.createElement('p')
    topParagraph.innerText = item.descriptionTop

    let bottomParagraph = document.createElement('p')
    bottomParagraph.innerText = item.descriptionBottom

    // Attach paragraphs to the hidden box description
    hiddenBoxDescription.appendChild(topParagraph)
    hiddenBoxDescription.appendChild(bottomParagraph)
    // Attach hidden box description to parent hidden box container
    hiddenBox.appendChild(hiddenBoxDescription)

    let caloriesContainer = document.createElement('div')
    caloriesContainer.setAttribute('class', 'hid-box--calories')

    let caloriesValue = document.createElement('h3')
    caloriesValue.setAttribute('id', 'food-calories')
    caloriesValue.innerText = item.calories + 'kcal'

    // Attach calories to calories container
    caloriesContainer.appendChild(caloriesValue)
    // Attach calories container to parent hidden box container
    hiddenBox.appendChild(caloriesContainer)

    let foodControls = document.createElement('div')
    foodControls.setAttribute('class', 'food-controls')

    let orderButton = document.createElement('button')
    orderButton.setAttribute('class', 'order-btn')
    orderButton.setAttribute('data-order', item.uuid)
    orderButton.innerText = 'Order Now'

    let likeButton = document.createElement('button')
    likeButton.setAttribute('class', 'order-btn')
    likeButton.setAttribute('data-like', item.uuid)
    likeButton.innerHTML = '<i class="fa-solid fa-heart">'

    // Attach order button to food controls
    foodControls.appendChild(orderButton)
    // Attach like button to food controls
    foodControls.appendChild(likeButton)
    // Attach food controls to parent hidden box container
    hiddenBox.appendChild(foodControls)

    // Attach hidden box container to parent generic container
    innerContainer.appendChild(hiddenBox)

    let informationContainer = document.createElement('div')
    informationContainer.setAttribute('class', 'food-card--information--container')
    informationContainer.setAttribute('style', `background-image: url("${item.image}")`)

    // Attach information container to parent information container
    innerContainer.appendChild(informationContainer)

    // Attach the information container to the parent food card
    itemCard.appendChild(innerContainer)

    let basicInformationContainer = document.createElement('div')
    basicInformationContainer.setAttribute('class', 'food-card-basic-information-container')

    let foodInfoContainer = document.createElement('div')
    foodInfoContainer.setAttribute('class', 'food-card-info-box')

    let foodName = document.createElement('h3')
    foodName.setAttribute('id', 'food-name')
    foodName.innerText = item.name

    // Attach food name to the food information container
    foodInfoContainer.appendChild(foodName)
    // Attach food info container to the basic information container
    basicInformationContainer.appendChild(foodInfoContainer)

    let foodInfoContainerPrice = document.createElement('div')
    foodInfoContainerPrice.setAttribute('class', 'food-card-info-box align-right')

    let foodPrice = document.createElement('h4')
    foodPrice.setAttribute('id', 'food-price')
    foodPrice.innerText = item.price

    // Attach food price to the food information container
    foodInfoContainerPrice.appendChild(foodPrice)
    // Attach food price info container to the basic information container
    basicInformationContainer.appendChild(foodInfoContainerPrice)

    // Attach basic information container to the parent food cartd
    itemCard.appendChild(basicInformationContainer)

    let spicyContainer = document.createElement('div')
    spicyContainer.setAttribute('class', 'badge food-card--spicy-indicator')

    let spicyIndicator = document.createElement('i')
    spicyIndicator.innerHTML = '<i class="fa-solid fa-pepper-hot"></i>'

    // Attach spicy indicator to the spicy container
    if (isSpicy(item.ingredients)) {
        spicyContainer.appendChild(spicyIndicator)
        // Attach spicy container to the parent food card
        itemCard.appendChild(spicyContainer)
    }

    let starRatingContainer = document.createElement('div')
    starRatingContainer.setAttribute('class', 'badge food-card--star-rating')

    let starRatingIcon = document.createElement('i')
    starRatingIcon.innerHTML = '<i class="fa-solid fa-star"></i> '

    // Attach star rating icon to star rating container
    starRatingContainer.appendChild(starRatingIcon)

    let starSpan = document.createElement('span')
    starSpan.innerText = calculateLikes(item.likes, item.dislikes)

    // Attach star span to star rating container
    starRatingContainer.appendChild(starSpan)
    // Attach star span container to parent food card
    itemCard.appendChild(starRatingContainer)

    let proteinContainer = document.createElement('div')
    proteinContainer.setAttribute('class', 'badge food-card--protein-indicator')

    let proteinItems = proteinBuilder(item.proteins)

    let proteinIcon = document.createElement('i')
    proteinIcon.innerHTML = proteinItems

    // Attach protein icon to protein container
    proteinContainer.appendChild(proteinIcon)
    // Attach protein container to the parent food card
    
    itemCard.appendChild(proteinContainer)

    return itemCard
}

function calculateLikes(likes, dislikes) {
    let userLikes = likes
    let userDislikes = dislikes

    let zeroTotal = userDislikes * 0
    let fiveTotal = userLikes * 5

    let totalVotes = (userLikes + userDislikes)
    let totalStars = (zeroTotal + fiveTotal)

    let averageStars = (totalStars/totalVotes)
    averageStars = averageStars.toPrecision(3)

    return averageStars
}

function proteinBuilder(proteins) {
    let proteinString = ''

    if (proteins.includes('poultry')) {
        proteinString += '<i class="fa-solid fa-egg"></i> '
    }
    if (proteins.includes('seafood')) {
        proteinString += '<i class="fa-solid fa-fish-fins"></i> '
    }
    if (proteins.includes('beef')) {
        proteinString += '<i class="fa-solid fa-cow"></i> '
    }
    if (proteins.includes('pork')) {
        proteinString += '<i class="fa-solid fa-bacon"></i> '
    }

    return proteinString
}

function isSpicy(ingredients) {
    let spicyFoods = ["chili", "ajax"]
    return spicyFoods.some(i => ingredients.includes(i))
}

function containsDairy(ingredients) {
    let dairyFoods = ["milk"]
    return dairyFoods.some(i => ingredients.includes(i))
}

function containsGluten(ingredients) {
    let glutenFoods = ["wheat"]
    return glutenFoods.some(i => ingredients.includes(i))
}

function containsSoy(ingredients) {
    let soyFoods = ["soy"]
    return soyFoods.some(i => ingredients.includes(i))
}

function containsNuts(ingredients) {
    let nutFoods = ["walnuts", "almonds"]
    return nutFoods.some(i => ingredients.includes(i))
}

buildMenu()