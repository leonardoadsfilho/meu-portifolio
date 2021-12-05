"use strict"

const open_url = function(url){
    window.open(url)
}

const search_clear = function(){
    search_input_data = ''
    search_field.value = ''
    code_field.value = ''
}

const results = document.querySelector('#results')
const creat_cards = {
    code: (data) => {
        data.items.map( item => {
            results.innerHTML += 
            `<div class="result-card" onclick="open_url('${item.html_url}')">
                <i class="fa-solid fa-folder"></i>
                <p>Arquivo: ${item.name}</p>
                <p>Descrição: ${item.repository.name?item.repository.name:'Vazio'}</p>
            </div>`
        })
    },
    commits: (data) => {
        data.items.map( item => {
            results.innerHTML += 
            `<div class="result-card" onclick="open_url('${item.html_url}')">
                <p>${item.commit.author.name}</p>
                <p>${item.commit.message}</p>
            </div>`
        })
    },  
    issues: (data) => {
        data.items.map( item => {
            results.innerHTML += 
            `<div class="result-card" onclick="open_url('${item.html_url}')">
                <p>${item.title}</p>
                <p>${item.user.login}</p>
            </div>`
        })
    },
    labels: (data) => {
        data.items.map( item => {
            results.innerHTML += 
            `<div class="result-card" onclick="open_url('${item.html_url}')">
            <img src="${item.avatar_url}" alt="${item.avatar_url}">
                <p>${item.login}</p>
            </div>`
        })
    },
    repositories: (data) => {
        data.items.map( item => {
            results.innerHTML += 
            `<div class="result-card" onclick="open_url('${item.html_url}')">
                <p>${item.name}</p>
                <p>${item.description?item.description:'Vazio'}</p>
            </div>`
        })
    },
    topics: (data) => {
        data.items.map( item => {
            results.innerHTML += 
            `<div class="result-card" onclick="window.alert('sem link')">
                <p>${item.name}</p>
                <p>Created_at: ${item.created_at}</p>
                <p>Updated_at: ${item.updated_at}</p>
            </div>`
        })
    },
    users: (data) => {
        data.items.map( item => {
            results.innerHTML += 
            `<div class="result-card" onclick="open_url('${item.html_url}')">
            <img src="${item.avatar_url}" alt="${item.avatar_url}">
                <p>${item.login}</p>
            </div>`
        })
    }
}

const succes = function(){

    const data = JSON.parse(this.responseText)
    results.innerHTML = ''
    console.log(data)
    if(!data.total_count)
        results.innerHTML = `<h1>Nada encontrado</p>`
    else creat_cards[select_option.value](data)
}

const error = function(err){
    console.log('Erro: ', err)
}

const search_execute = function(){

    let query_string = `https://api.github.com/search/${select_option.value}?q=${search_field.value}`
    
    if(select_option.value == 'code'){
        query_string += `+${code_options[code_options.selectedIndex].text}:${code_field.value}`
    }
    
    if(select_option.value == 'labels'){
        query_string += `+${code_options[code_options.selectedIndex].text}:${code_field.value}`
    }

    const xhr = new XMLHttpRequest()
    xhr.onload = succes
    xhr.onerror = error
    xhr.open('GET', query_string)
    xhr.send()
}

let code_options = document.querySelector('#code-options')
let search_field = document.querySelector('#search-field')
let code_field = document.querySelector('#code-field')

const select_option = document.querySelector('#search-options')
select_option.addEventListener('change', () => {

    const search_input = document.querySelector('#search-area-input')
    search_input.innerHTML = ''
    results.innerHTML = ''
    switch (select_option.value){
        case 'code':

            search_input.innerHTML = 
            `<div class="code-options-area">
                <i class="fa-solid fa-magnifying-glass search-magnifying-glass search-icon" onclick="search_execute()"></i>
                <select id="code-options" class="code-options">
                    <option value="user" selected>user</option>
                    <option value="org">org</option>
                    <option value="repo">repo</option>
                </select>
                <input id="code-field" class="search-field code-field" type="text" placeholder="Opção">
            </div>
            <input id="search-field" class="search-field" type="text" placeholder="Pesquisar">
            <i class="fa-regular fa-circle-xmark search-close" onclick="search_clear()"></i>`

            code_field = document.querySelector('#code-field')
            code_options = document.querySelector('#code-options')
            break
        case 'labels':
            search_input.innerHTML = 
            `<div class="code-options-area">
                <i class="fa-solid fa-magnifying-glass search-magnifying-glass search-icon" onclick="search_execute()"></i>
                <select id="code-options" class="code-options">
                    <option value="repository_id" selected>ID do repositório</option>
                </select>
                <input id="code-field" class="search-field code-field" type="text" placeholder="Opção">
            </div>
            <input id="search-field" class="search-field" type="text" placeholder="Pesquisar">
            <i class="fa-regular fa-circle-xmark search-close" onclick="search_clear()"></i>`

            code_field = document.querySelector('#code-field')
            code_options = document.querySelector('#code-options')
            break
        default:
            search_input.innerHTML = 
            `<i class="fa-solid fa-magnifying-glass search-magnifying-glass" onclick="search_execute()"></i>
            <input id="search-field" class="search-field" type="text" placeholder="Pesquisar">
            <i class="fa-regular fa-circle-xmark search-close" onclick="search_clear()"></i>`  
            break
    }


    search_field = document.querySelector('#search-field')
})
