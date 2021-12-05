"use strict"

const set_avatar_image = (avatar_url) => {

    const element_avatar_image = document.getElementById('profile-image')
    element_avatar_image.src = avatar_url
}

const add_github_icon = (html_url) => {

    const element_social_icons = document.getElementById('social-icons')
    const github_icon = document.createElement('i')
    
    github_icon.className = 'fa-brands fa-github'
    github_icon.onclick = () => {
        window.open(html_url)
    }
    element_social_icons.appendChild(github_icon)
}

const set_profile_bio = (bio) => {

    const element_profile_objecties = document.getElementById('profile-objectives')
    element_profile_objecties.innerText = bio
}

const open_url = function(url){
    window.open(url)
}

const succes_repositories = function(){
    const data = JSON.parse(this.responseText)
    
    let elemet_repositories = document.getElementById('repositories_cards')
    
    while (elemet_repositories.firstChild) {
        elemet_repositories.removeChild(elemet_repositories.firstChild);
    }

    let repository_card = ''

    data.map((content) => {
        
        repository_card += 
            `<div class="repository-card" onclick="open_url('${content.html_url}')">
                <div class="repository-logo">
                    <i class="fa-solid fa-folder"></i>
                </div>
                <div class="repository-content">
                    <div class="repository-title">
                        ${content.name}
                    </div>
                    <div class="repository-description">
                        ${content.description?content.description:'sem descrição'} 
                    </div>
                    <div class="repository-period">
                        ${new Date(content.created_at).toLocaleString()} - ${new Date(content.updated_at).toLocaleString()}
                    </div>
                </div>
            </div>`

        elemet_repositories.innerHTML = repository_card
    })
}

const set_repositories = (repos_url) => {

    const xhr_repos = new XMLHttpRequest()

    xhr_repos.onload = succes_repositories
    xhr_repos.onerror = error
    xhr_repos.open('GET', repos_url)
    xhr_repos.send()
}

const succes = function(){

    const data = JSON.parse(this.responseText)
    
    
    document.querySelector('#profile').innerHTML = data.name
    set_avatar_image(data.avatar_url)
    set_profile_bio(data.bio)
    set_repositories(data.repos_url)
    add_github_icon(data.html_url)
}

const error = function(err){
    console.log('Erro: ', err)
}

const xhr = new XMLHttpRequest()
xhr.onload = succes
xhr.onerror = error
xhr.open('GET', 'https://api.github.com/users/leonardoadsfilho')
xhr.send()