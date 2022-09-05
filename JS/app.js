const loadPhone = async(searchText, datalimit) => {
    const url =`https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhone(data.data , datalimit);
}

const displayPhone = (phones , datalimit) =>{
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';
    //display 10 phones only
    
    const showAll= document.getElementById('show-all');
    if(datalimit && phones.length > 10){
        phones = phones.slice(0,10);
        showAll.classList.remove('d-none');
    }else{
        showAll.classList.add('d-none');
    }

    //display No phones Found
    const noPhone = document.getElementById('no-found-massage');
    if (phones.length === 0){
        noPhone.classList.remove('d-none');
    }
    else{
        noPhone.classList.add('d-none');
    }
    //display All Phones
    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <h5 class="card-title">${phone.brand}</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                <button onclick="loadPhoneDetails('${phone.slug}')"  href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailsModal">Show Details</button>
                
                
            </div>
        </div>
      `;
      phoneContainer.appendChild(phoneDiv);
    });
    //Stop loader
    toggleSpinner(false);
}

const processSearch = (datalimit) => {
    //start Loader
    toggleSpinner(true);
    //END Loader
    const searchFiled =  document.getElementById('search-field');
    const searchText =  searchFiled.value;
    loadPhone(searchText, datalimit);
}

//Hnadle search Button field
document.getElementById('btn-search').addEventListener('click', function(){
    //start loader
    processSearch(10);
})

//search input field enter key handler
document.getElementById('search-field').addEventListener('keypress', function (e){
    console.log(e.key);
    if(e.key === 'Enter'){
        processSearch(10);
    }
})


const toggleSpinner = isLoading => {
    const loaderSSection = document.getElementById('loader');
    if(isLoading === true){
        loaderSSection.classList.remove('d-none')
    }else{
        loaderSSection.classList.add('d-none');
    }
}


//Not the best way to load show all

document.getElementById('btn-show-all').addEventListener('click', function(){
    //start Loader
    processSearch();
})

const loadPhoneDetails = async id =>{
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data);
}

const displayPhoneDetails = phone =>{
    console.log(phone);
    const modalTitle = document.getElementById('phoneDetailsModalLabel');
    modalTitle.innerText = phone.name;
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.innerHTML = `
    <p>Release Date: ${phone.releaseDate ? phone.releaseDate : 'No Release Date Found'}</p>
    <p>Storage: ${phone.mainFeatures ? phone.mainFeatures.storage : 'No Storage Found'}</p>
    <p>Others: ${phone.others ? phone.others.Bluetooth : 'No Bluetooth Information'}</p>`
} 
 

loadPhone('apple');