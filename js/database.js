const DB_NAME = "digital-grand-library";
const DB_VERSION = 1;
const STORE_NAME = "books";

const demoBooks = [
    {
        id: "demo-1",
        title: "Atomic Habits",
        author: "James Clear",
        isbn: "9780735211292",
        genre: "Self Development",
        publisher: "Avery",
        year: "2018",
        pages: 320,
        cover: "assets/atomic-habits.jpg",
        status: "reading",
        progress: 64,
        rating: 4.5,
        room: "Study",
        bookcase: "Bookcase II",
        shelf: "Shelf I",
        position: "14",
        condition: "like-new",
        acquisition: "purchased",
        acquiredAt: "2026-08-12",
        startedAt: "2026-08-20",
        finishedAt: "2026-08-25",
        notes: "Small changes, remarkable results."
    },
    {
        id: "demo-2",
        title: "Dune",
        author: "Frank Herbert",
        isbn: "9780441172719",
        genre: "Science Fiction",
        publisher: "Ace",
        year: "1965",
        pages: 688,
        cover: "assets/dune.jpg",
        status: "unread",
        progress: 0,
        rating: 0,
        room: "Study",
        bookcase: "Bookcase I",
        shelf: "Shelf II",
        position: "04",
        condition: "very-good",
        acquisition: "purchased",
        acquiredAt: "2026-08-21",
        startedAt: "",
        finishedAt: "",
        notes: ""
    },
    {
        id: "demo-3",
        title: "Sapiens",
        author: "Yuval Noah Harari",
        isbn: "9780062316097",
        genre: "History",
        publisher: "Harper",
        year: "2011",
        pages: 443,
        cover: "assets/sapiens.jpg",
        status: "completed",
        progress: 100,
        rating: 5,
        room: "Study",
        bookcase: "Bookcase II",
        shelf: "Shelf II",
        position: "08",
        condition: "very-good",
        acquisition: "purchased",
        acquiredAt: "2026-08-28",
        startedAt: "2026-08-01",
        finishedAt: "2026-08-27",
        notes: ""
    },
    {
        id: "demo-4",
        title: "The Alchemist",
        author: "Paulo Coelho",
        isbn: "9780062315007",
        genre: "Fiction",
        publisher: "HarperOne",
        year: "1988",
        pages: 208,
        cover: "assets/the-alchemist.jpg",
        status: "unread",
        progress: 0,
        rating: 0,
        room: "Bedroom",
        bookcase: "Bookcase I",
        shelf: "Shelf I",
        position: "03",
        condition: "good",
        acquisition: "purchased",
        acquiredAt: "2026-08-25",
        startedAt: "",
        finishedAt: "",
        notes: ""
    },
    {
        id: "demo-5",
        title: "Project Hail Mary",
        author: "Andy Weir",
        isbn: "9780593135204",
        genre: "Science Fiction",
        publisher: "Ballantine",
        year: "2021",
        pages: 496,
        cover: "assets/project-hail-mary.jpg",
        status: "unread",
        progress: 0,
        rating: 0,
        room: "Study",
        bookcase: "Bookcase I",
        shelf: "Shelf III",
        position: "12",
        condition: "new",
        acquisition: "gift",
        acquiredAt: "2026-08-30",
        startedAt: "",
        finishedAt: "",
        notes: ""
    }
];

const dbPromise = new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
        const db = request.result;

        if (!db.objectStoreNames.contains(STORE_NAME)) {
            db.createObjectStore(STORE_NAME, {
                keyPath: "id"
            });
        }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
});

async function getBooks() {
    const db = await dbPromise;

    return new Promise((resolve, reject) => {
        const request = db
            .transaction(STORE_NAME, "readonly")
            .objectStore(STORE_NAME)
            .getAll();

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

async function saveBook(book) {
    const db = await dbPromise;

    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, "readwrite");
        const store = tx.objectStore(STORE_NAME);
        store.put(book);

        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
    });
}

async function removeBook(id) {
    const db = await dbPromise;

    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, "readwrite");
        const store = tx.objectStore(STORE_NAME);
        store.delete(id);

        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
    });
}

async function resetDemoBooks() {
    const db = await dbPromise;

    await new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, "readwrite");
        const store = tx.objectStore(STORE_NAME);
        store.clear();

        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
    });

    for (const book of demoBooks) {
        await saveBook(book);
    }
    localStorage.setItem("digital-grand-library-initialized", "true");
}

async function initializeDatabase() {
    const isInitialized = localStorage.getItem("digital-grand-library-initialized");
    if (!isInitialized) {
        const books = await getBooks();
        if (books.length === 0) {
            await resetDemoBooks();
        } else {
            localStorage.setItem("digital-grand-library-initialized", "true");
        }
    }
}
