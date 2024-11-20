// Fonction pour récupérer et afficher les citations
async function afficherCitations() {
    try {
        const response = await fetch('http://localhost:8000/api1/index.php');
        if (!response.ok) {
            throw new Error(`Erreur HTTP ! Statut : ${response.status}`);
        }
        const data = await response.json();

        // Sélectionner la balise <ul> avec l'ID citation-list
        const citationList = document.getElementById('citation-list');
        // Réinitialiser le contenu du <ul> avant d'ajouter de nouvelles citations
        citationList.innerHTML = '';

        // Parcourir les citations et les afficher dans la liste
        data.forEach(citation => {
            const listItem = document.createElement('li');
            listItem.textContent = `"${citation.texte}" - ${citation.auteur}`;
            citationList.appendChild(listItem);
        });
    } catch (error) {
        console.error(`Erreur lors de l'affichage des citations :`, error);
        alert("Impossible de charger les citations. Vérifiez le serveur.");
    }
}

// Charger les citations au chargement de la page
document.addEventListener('DOMContentLoaded', afficherCitations);

// Sélectionner le formulaire et écouter l'événement de soumission
const form = document.getElementById('citation-form');

form.addEventListener('submit', async (event) => {
    event.preventDefault(); // Empêche le rechargement de la page

    // Récupérer les valeurs des champs du formulaire
    const auteur = document.getElementById('author').value.trim();
    const texte = document.getElementById('quote').value.trim();

    if (!auteur || !texte) {
        alert("Veuillez remplir tous les champs !");
        return;
    }

    try {
        // Envoyer les données à l'API via POST
        const response = await fetch('http://localhost:8000/api1/index.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                auteur: auteur,
                texte: texte,
            }),
        });

        if (!response.ok) {
            throw new Error(`Erreur HTTP ! Statut : ${response.status}`);
        }

        const result = await response.json();
        alert(result.message || "Citation ajoutée avec succès !");

        // Réinitialiser le formulaire après succès
        form.reset();

        // Recharger la liste des citations
        afficherCitations();
    } catch (error) {
        console.error(`Erreur lors de l'ajout de la citation :`, error);
        alert("Impossible d'ajouter la citation. Vérifiez le serveur.");
    }
});
