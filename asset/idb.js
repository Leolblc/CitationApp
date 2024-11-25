window.addEventListener("load", async (event) => {
    async function initDB() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open("Citations", 1);

            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                if (!db.objectStoreNames.contains("citation")) {
                    const store = db.createObjectStore("citation", { keyPath: "id", autoIncrement: true });
                    store.createIndex("auteur", "auteur", { unique: false });
                    store.createIndex("texte", "texte", { unique: false });
                }
            };

            request.onsuccess = (event) => {
                resolve(event.target.result);
            };

            request.onerror = (error) => {
                reject("Error opening IndexedDB: " + error.target.error);
            };
        });
    }

    const db = await initDB();


async function addCitation(citation) {
        const transaction = db.transaction("citation", "readwrite");
        const store = transaction.objectStore("citation");
        await store.add(citation);
}

async function getCitations() {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction("citation", "readonly");
        const store = transaction.objectStore("citation");
        const request = store.getAll();

        request.onsuccess = (event) => {
            console.log("Citations récupérées :", request.result);
            resolve(request.result);
        };

        request.onerror = (event) => {
            reject("Erreur lors de la récupération des citations.");
        };
    });
}

async function modelFetchCitation(){
    try{
        citation = await getCitations();

        if(citation.length === 0){
            citation = await fetch('api1/index.php')
            .then(response => response.json())
            .then(data =>{
                data.forEach(async(citation)=>{
                    await addCitation(citation);
                });
                return data
            })
            .catch(error => console.error('Error fetching citation', error))
        }
    } catch(error){
        console.error(error);
    }
}

modelFetchCitation();
});