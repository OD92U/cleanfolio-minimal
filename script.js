const body = document.body;
const btnTheme = document.querySelector('.fa-moon');
const btnHamburger = document.querySelector('.fa-bars');

// Ajouter ou supprimer des classes en fonction du thème
const addThemeClass = (bodyClass, btnClass) => {
  body.classList.add(bodyClass);
  btnTheme.classList.add(btnClass);
};

// Récupérer les préférences de thème depuis le localStorage
const getBodyTheme = localStorage.getItem('portfolio-theme');
const getBtnTheme = localStorage.getItem('portfolio-btn-theme');

// Appliquer les thèmes au chargement de la page
addThemeClass(getBodyTheme, getBtnTheme);

// Vérifier si le mode sombre est activé
const isDark = () => body.classList.contains('dark');

// Appliquer le thème sélectionné
const setTheme = (bodyClass, btnClass) => {
  body.classList.remove(localStorage.getItem('portfolio-theme'));
  btnTheme.classList.remove(localStorage.getItem('portfolio-btn-theme'));

  addThemeClass(bodyClass, btnClass);

  localStorage.setItem('portfolio-theme', bodyClass);
  localStorage.setItem('portfolio-btn-theme', btnClass);
};

// Basculer entre les thèmes clair et sombre
const toggleTheme = () =>
  isDark() ? setTheme('light', 'fa-moon') : setTheme('dark', 'fa-sun');

btnTheme.addEventListener('click', toggleTheme);

// Fonction d'affichage du menu hamburger
const displayList = () => {
  const navUl = document.querySelector('.nav__list');

  if (btnHamburger.classList.contains('fa-bars')) {
    btnHamburger.classList.remove('fa-bars');
    btnHamburger.classList.add('fa-times');
    navUl.classList.add('display-nav-list');
  } else {
    btnHamburger.classList.remove('fa-times');
    btnHamburger.classList.add('fa-bars');
    navUl.classList.remove('display-nav-list');
  }
};

btnHamburger.addEventListener('click', displayList);

// Afficher ou cacher le bouton de retour en haut selon le scroll
const scrollUp = () => {
  const btnScrollTop = document.querySelector('.scroll-top');

  if (body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
    btnScrollTop.style.display = 'block';
  } else {
    btnScrollTop.style.display = 'none';
  }
};

document.addEventListener('scroll', scrollUp);

// Fonction pour afficher un projet
const displayProject = (project) => {
  // Créer un élément de projet
  const projectDiv = document.createElement('div');
  projectDiv.classList.add('project');

  // Ajouter le titre du projet
  const projectTitle = document.createElement('h3');
  projectTitle.textContent = project.title;
  projectDiv.appendChild(projectTitle);

  // Ajouter la description du projet
  const projectDescription = document.createElement('p');
  projectDescription.classList.add('project__description');
  projectDescription.textContent = project.description;
  projectDiv.appendChild(projectDescription);

  // Ajouter la liste des compétences
  const projectStack = document.createElement('ul');
  projectStack.classList.add('project__stack');
  
  if (project.skills && project.skills.length > 0) {
    project.skills.forEach(skill => {
      const skillItem = document.createElement('li');
      skillItem.classList.add('project__stack-item');
      skillItem.textContent = skill.skill;
      projectStack.appendChild(skillItem);
    });
  }

  projectDiv.appendChild(projectStack);

  // Ajouter les liens GitHub et Démo
  const githubLink = document.createElement('a');
  githubLink.href = project.github;
  githubLink.classList.add('link', 'link--icon');
  githubLink.setAttribute('aria-label', 'source code');
  githubLink.innerHTML = '<i aria-hidden="true" class="fab fa-github"></i>';
  projectDiv.appendChild(githubLink);

  const demoLink = document.createElement('a');
  demoLink.href = project.demo;
  demoLink.classList.add('link', 'link--icon');
  demoLink.setAttribute('aria-label', 'live preview');
  demoLink.innerHTML = '<i aria-hidden="true" class="fas fa-external-link-alt"></i>';
  projectDiv.appendChild(demoLink);

  // Ajouter le projet à la section des projets
  document.querySelector('.projects__grid').appendChild(projectDiv);
};

// Fonction pour récupérer les projets depuis l'API
const getProjects = async () => {
  try {
    const response = await fetch('http://api.olegdubynets.fr/api/projects');
    
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des projets');
    }

    const projects = await response.json();

    // Afficher chaque projet
    projects.forEach(project => {
      displayProject(project);
    });
  } catch (error) {
    console.error('Erreur:', error);
  }
};

// Récupérer et afficher les projets lorsque la page est chargée
document.addEventListener("DOMContentLoaded", getProjects);
