document.getElementById('projectForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const formData = new FormData(event.target);

    
    const data = {
        title: formData.get('title'),
        githubLink: formData.get('githubLink'),
        demoLink: formData.get('demoLink'),
        description: formData.get('description'),
        skills: [] 
    };

    
    const skillCheckboxes = formData.getAll('options');
    skillCheckboxes.forEach(skill => {
        data.skills.push({ skill: skill }); 
    });

    
    const token = localStorage.getItem('token');

    if (!token) {
        alert('Token d\'authentification manquant. Veuillez vous connecter.');
        return;
    }

    
    console.log('Form data:', data);

    
    fetch('http://api.olegdubynets.fr/api/projects', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(data) 
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erreur lors de l\'envoi du formulaire');
        }
        return response.json(); 
    })
    .then(result => {
        console.log('Réponse de l\'API:', result); 
        alert('Formulaire soumis avec succès!');
    })
    .catch(error => {
        console.error('Erreur lors de l\'envoi du formulaire:', error);
        alert('Une erreur est survenue. Veuillez réessayer.');
    });
});
