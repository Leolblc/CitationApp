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
});
