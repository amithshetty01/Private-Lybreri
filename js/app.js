let books = [];
let currentView = "home";
let selectedBook = null;
let query = "";
let wishlist = [];
let favorites = [];
let statusFilter = "all";
let genreFilter = "all";
let roomFilter = "all";
let isDarkMode = localStorage.getItem("digital-grand-library-theme") === "dark";
if (isDarkMode) document.body.classList.add("dark-theme");

const sampleCovers = {
    "Atomic Habits": "assets/atomic-habits.jpg",
    "Dune": "assets/dune.jpg",
    "Sapiens": "assets/sapiens.jpg",
    "The Alchemist": "assets/the-alchemist.jpg",
    "Project Hail Mary": "assets/project-hail-mary.jpg",
    "The Midnight Library": "assets/the-midnight-library.jpg"
};

const ICONS = {
    "ArrowRight": `<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>`,
    "BookOpen": `<path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V5a2 2 0 0 1 2-2h5a3 3 0 0 1 3 3v15a3 3 0 0 0-3-3Z"/><path d="M21 18a1 1 0 0 0 1-1V5a2 2 0 0 0-2-2h-5a3 3 0 0 0-3 3v15a3 3 0 0 1 3-3Z"/>`,
    "SpiderBook": `<path d="M12 4v16"/><path d="M3 18a1 1 0 0 1-1-1V5a2 2 0 0 1 2-2h5a3 3 0 0 1 3 3v14a3 3 0 0 0-3-3H3Z"/><path d="M21 18a1 1 0 0 0 1-1V5a2 2 0 0 0-2-2h-5a3 3 0 0 0-3 3v14a3 3 0 0 1 3-3h5Z"/><path d="M5.5 8c2.2 0 3.8 1.5 4.5 3.5C8.5 12.2 6.5 11.5 4.5 10c0-1 .5-2 1-2Z" fill="currentColor"/><path d="M18.5 8c-2.2 0-3.8 1.5-4.5 3.5C15.5 12.2 17.5 11.5 19.5 10c0-1-.5-2-1-2Z" fill="currentColor"/><path d="M12 9l-3-2M12 9l3-2"/><path d="M12 13l-3.5 2M12 13l3.5 2"/>`,
    "BookMarked": `<path d="M10 2h8a2 2 0 0 1 2 2v15a2 2 0 0 1-2 2h-8"/><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H10v18H6.5A2.5 2.5 0 0 0 4 23.5Z"/><path d="m14 7 2 1 2-1v6l-2-1-2 1Z"/>`,
    "Camera": `<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3z"/><circle cx="12" cy="13" r="3"/>`,
    "ChevronRight": `<path d="m9 18 6-6-6-6"/>`,
    "ChevronDown": `<path d="m6 9 6 6 6-6"/>`,
    "CircleUserRound": `<path d="M18 20a6 6 0 0 0-12 0"/><circle cx="12" cy="10" r="4"/><circle cx="12" cy="12" r="10"/>`,
    "Grid2X2": `<rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/>`,
    "Heart": `<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z"/>`,
    "Home": `<path d="m3 9 9-7 9 7v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Z"/><polyline points="9 22 9 12 15 12 15 22"/>`,
    "LibraryBig": `<rect width="8" height="18" x="3" y="3" rx="1"/><path d="M7 7h1M7 11h1M7 15h1"/><path d="M15 3h4a1 1 0 0 1 1 1v16h-5z"/>`,
    "Menu": `<line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="18" y2="18"/>`,
    "Moon": `<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>`,
    "Plus": `<path d="M5 12h14"/><path d="M12 5v14"/>`,
    "Search": `<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>`,
    "Settings": `<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.09a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>`,
    "Sparkles": `<path d="m12 3-1.5 5.5L5 10l5.5 1.5L12 17l1.5-5.5L19 10l-5.5-1.5Z"/><path d="m19 16-.75 2.75L15.5 19.5l2.75.75L19 23l.75-2.75 2.75-.75-2.75-.75Z"/><path d="m5 3-.5 1.5L3 5l1.5.5L5 7l.5-1.5L7 5l-1.5-.5Z"/>`,
    "Sun": `<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.42 1.42"/><path d="m17.65 17.65 1.42 1.42"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.35 17.65-1.42 1.42"/><path d="m19.07 4.93-1.42 1.42"/>`,
    "X": `<path d="M18 6 6 18"/><path d="m6 6 12 12"/>`,
    "BarChart3": `<path d="M3 3v18h18"/><path d="M7 16v-5"/><path d="M12 16V7"/><path d="M17 16v-8"/>`,
    "MapPin": `<path d="M20 10c0 4.99-8 12-8 12S4 14.99 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="3"/>`,
    "Clock3": `<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>`,
    "Bookmark": `<path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z"/>`,
    "Trash2": `<path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="M19 6v14H5V6"/><path d="M10 11v5"/><path d="M14 11v5"/>`,
    "RotateCcw": `<path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v5h5"/>`,
    "Star": `<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>`,
    "Download": `<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/>`,
    "Upload": `<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/>`,
    "Filter": `<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>`,
    "Loader": `<path d="M12 2v4"/><path d="M12 18v4"/><path d="M4.93 4.93l2.83 2.83"/><path d="M16.24 16.24l2.83 2.83"/><path d="M2 12h4"/><path d="M18 12h4"/><path d="M4.93 19.07l2.83-2.83"/><path d="M16.24 7.76l2.83-2.83"/>`
};

function icon(name, size = 20, stroke = 1.8, fill = "none") {
    return `<svg class="icon icon-${name.toLowerCase()}"
        width="${size}"
        height="${size}"
        viewBox="0 0 24 24"
        fill="${fill}"
        stroke="currentColor"
        stroke-width="${stroke}"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true">${ICONS[name]}</svg>`;
}

function formatShelf(shelfStr) {
    if (!shelfStr) return "Shelf 01";
    let cleaned = String(shelfStr)
        .replace(/undefined/gi, "")
        .replace(/study/gi, "")
        .replace(/bedroom/gi, "")
        .replace(/[·\-\|]/g, " ")
        .replace(/\s+/g, " ")
        .trim();
    if (!cleaned) return "Shelf 01";
    if (cleaned.toLowerCase().startsWith("shelf")) return cleaned;
    return `Shelf ${cleaned}`;
}

function escapeHtml(value) {
    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function cover(book, large = false) {
    const source = book.cover || sampleCovers[book.title];

    return `
        <div class="book-cover ${large ? "large" : ""}">
            ${
                source
                    ? `<img src="${escapeHtml(source)}" alt="">`
                    : `
                        <div class="generated-cover">
                            ${icon("BookOpen", 26)}
                            <b>${escapeHtml(book.title)}</b>
                            <small>${escapeHtml(book.author)}</small>
                        </div>
                    `
            }
        </div>
    `;
}

function renderCustomSelect(id, currentVal, options) {
    const selectedOption = options.find(o => o.value === currentVal) || options[0];
    return `
        <div class="custom-dropdown glass-select" id="${id}" data-value="${escapeHtml(selectedOption.value)}">
            <button type="button" class="custom-dropdown-btn custom-select-btn" id="${id}-btn">
                <span>${escapeHtml(selectedOption.label)}</span>
                ${icon("ChevronDown", 14)}
            </button>
            <div class="custom-dropdown-menu glass-panel" id="${id}-menu">
                ${options.map(opt => `
                    <div class="dropdown-item ${opt.value === selectedOption.value ? "active" : ""}" data-select-val="${escapeHtml(opt.value)}">
                        ${escapeHtml(opt.label)}
                    </div>
                `).join("")}
            </div>
        </div>
    `;
}

function bindCustomSelects(container = document) {
    // Dropdown toggle, item selection, and click-outside closing are handled globally via document event delegation.
}

if (typeof window !== "undefined" && !window.__dropdownOutsideBound) {
    window.__dropdownOutsideBound = true;
    document.addEventListener("click", (e) => {
        // 1. Click on dropdown toggle button
        const btn = e.target.closest(".custom-dropdown-btn");
        if (btn) {
            e.preventDefault();
            const dropdown = btn.closest(".custom-dropdown");
            if (dropdown) {
                const isOpen = dropdown.classList.contains("open");
                document.querySelectorAll(".custom-dropdown.open").forEach(d => {
                    if (d !== dropdown) d.classList.remove("open");
                });
                dropdown.classList.toggle("open", !isOpen);
            }
            return;
        }

        // 2. Click on dropdown item (Reading, Completed, Unread, DNF, Genre, etc.)
        const item = e.target.closest(".dropdown-item");
        if (item) {
            e.preventDefault();
            const dropdown = item.closest(".custom-dropdown");

            // Handle glass-select items (status, condition, acquisition)
            const val = item.dataset.selectVal;
            if (val && dropdown) {
                dropdown.dataset.value = val;
                const span = dropdown.querySelector(".custom-dropdown-btn span");
                if (span) span.textContent = item.textContent.trim();
                dropdown.querySelectorAll(".dropdown-item").forEach(i => i.classList.remove("active"));
                item.classList.add("active");
                dropdown.dispatchEvent(new Event("change", { bubbles: true }));
            }

            // Handle genre filter items
            const gVal = item.dataset.genreVal;
            if (gVal) {
                genreFilter = gVal;
            }

            // IMMEDIATELY CLOSE ALL DROPDOWNS AND RETURN ARROW TO ORIGINAL POSITION
            document.querySelectorAll(".custom-dropdown.open").forEach(d => d.classList.remove("open"));

            if (gVal) {
                renderContent();
            }
            return;
        }

        // 3. Click anywhere else outside any custom dropdown: CLOSE ALL DROPDOWNS
        document.querySelectorAll(".custom-dropdown.open").forEach(d => d.classList.remove("open"));
    });
}

function miniStat(iconName, value, label, filterVal = null) {
    return `
        <div class="mini-stat" ${filterVal ? `data-stat-filter="${filterVal}" style="cursor: pointer;"` : ""}>
            <span>${icon(iconName, 17)}</span>
            <div>
                <strong>${value}</strong>
                <small>${label}</small>
            </div>
        </div>
    `;
}

function meta(iconName, label, value) {
    return `
        <div class="meta-item">
            <span class="meta-icon">${icon(iconName, 17)}</span>
            <div>
                <small>${label}</small>
                <strong>${escapeHtml(value)}</strong>
            </div>
        </div>
    `;
}

function showToast(message, type = "info") {
    let container = document.querySelector(".toast-container");
    if (!container) {
        container = document.createElement("div");
        container.className = "toast-container";
        document.body.appendChild(container);
    }
    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `${icon("Sparkles", 14)} <span>${escapeHtml(message)}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateY(10px)";
        toast.style.transition = "all 0.3s ease";
        setTimeout(() => toast.remove(), 300);
    }, 2800);
}

function renderStars(rating = 0, size = 13) {
    const r = Math.round(Number(rating) || 0);
    let html = '<span class="stars-display">';
    for (let i = 1; i <= 5; i++) {
        html += icon("Star", size, 1.5, i <= r ? "currentColor" : "none");
    }
    html += '</span>';
    return html;
}

async function fetchOpenLibraryMetadata(isbn) {
    const cleanIsbn = isbn.replace(/[^0-9X]/gi, '');
    if (!cleanIsbn) return null;
    
    try {
        const res = await fetch(`https://openlibrary.org/api/books?bibkeys=ISBN:${cleanIsbn}&format=json&jscmd=data`);
        if (!res.ok) return null;
        const data = await res.json();
        const key = `ISBN:${cleanIsbn}`;
        if (data && data[key]) {
            const b = data[key];
            return {
                title: b.title || "",
                author: b.authors ? b.authors.map(a => a.name).join(", ") : "",
                publisher: b.publishers ? b.publishers.map(p => p.name).join(", ") : "",
                year: b.publish_date || "",
                pages: b.number_of_pages || 0,
                cover: b.cover ? (b.cover.medium || b.cover.large || b.cover.small) : `https://covers.openlibrary.org/b/isbn/${cleanIsbn}-M.jpg`,
                genre: b.subjects ? b.subjects[0]?.name || "General" : "General"
            };
        }
    } catch (err) {
        console.warn("Open Library fetch error:", err);
    }
    return null;
}

function exportLibraryJSON() {
    const data = {
        exportedAt: new Date().toISOString(),
        version: 1,
        books: books,
        wishlist: wishlist
    };
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `library-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast("Library backup downloaded!");
}

async function importLibraryJSON(file) {
    try {
        const text = await file.text();
        const data = JSON.parse(text);
        if (Array.isArray(data.books)) {
            for (const book of data.books) {
                if (book.id && book.title) {
                    await saveBook(book);
                }
            }
            if (Array.isArray(data.wishlist)) {
                wishlist = data.wishlist;
                localStorage.setItem("digital-grand-library-wishlist", JSON.stringify(wishlist));
            }
            await loadBooks();
            render();
            showToast(`Imported ${data.books.length} books successfully!`);
        } else {
            showToast("Invalid backup file format.", "error");
        }
    } catch (e) {
        showToast("Failed to parse JSON file.", "error");
    }
}


function page(content) {
    return `<div class="page">${content}</div>`;
}

function pageHeading(eyebrow, title, count) {
    return `
        <div class="page-heading">
            <div>
                <div class="eyebrow">${eyebrow}</div>
                <h1>${title}</h1>
            </div>
            <span>${count}</span>
        </div>
    `;
}

function renderSidebar() {
    const nav = [
        ["home", "Home", "Home"],
        ["collection", "My Books", "LibraryBig"],
        ["reading", "Reading", "BookOpen"],
        ["wishlist", "Wishlist", "Heart"],
        ["statistics", "Statistics", "BarChart3"]
    ];

    document.querySelector(".sidebar").innerHTML = `
        <div class="sidebar-brand">
            <div class="sidebar-brand-head">
                <div class="brand-mark">
                    <img src="assets/site-logo.png" alt="Private Lybreri Logo" class="brand-logo-img">
                </div>
                <div class="brand-name">
                    Private<br>
                    Lybreri
                </div>
            </div>

            <div class="brand-caption">
                A collection of stories, ideas and worlds.
            </div>
        </div>

        <nav class="nav-list">
            ${nav.map(([id, label, iconName]) => `
                <button
                    class="nav-item ${currentView === id ? "active" : ""}"
                    data-view="${id}"
                >
                    ${icon(iconName, 20, 1.8)}
                    <span>${label}</span>
                </button>
            `).join("")}
        </nav>

        <div class="sidebar-quote">
            <span class="quote-line"></span>
            <em>
                “Good books<br>
                build great days.”
            </em>
            <span class="quote-line short"></span>
        </div>

        <button
            class="sidebar-footer ${currentView === "settings" ? "active" : ""}"
            data-view="settings"
        >
            ${icon("Settings", 19)}
            <span>Settings</span>
        </button>
    `;

    document.querySelectorAll("[data-view]").forEach(button => {
        button.addEventListener("click", () => {
            currentView = button.dataset.view;
            render();
        });
    });
}

function renderTopbar() {
    const now = new Date();

    const dateText = now.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric"
    });

    const hour = now.getHours();
    let greeting = "Good evening";

    if (hour >= 5 && hour < 12) {
        greeting = "Good morning";
    } else if (hour >= 12 && hour < 17) {
        greeting = "Good afternoon";
    } else if (hour >= 17 && hour < 22) {
        greeting = "Good evening";
    } else {
        greeting = "Good night";
    }

    document.querySelector(".topbar").innerHTML = `
        <button class="mobile-menu">
            ${icon("Menu", 21)}
        </button>

        <div class="search-box">
            ${icon("Search", 17)}
            <input
                id="searchInput"
                value="${escapeHtml(query)}"
                placeholder="Search books, authors, genres..."
            >
        </div>



        <div class="topbar-spacer"></div>

        <button class="icon-circle" id="themeToggleBtn" title="Toggle Light/Dark Theme">
            ${icon(isDarkMode ? "Moon" : "Sun", 18)}
        </button>

        <div class="greeting">
            <span>${dateText}</span>
            <strong>${greeting}, Amith</strong>
        </div>

        <button class="avatar" id="userAvatarBtn" title="View Profile" style="border:0; cursor:pointer;">A</button>
    `;

    document.querySelector(".mobile-menu")?.addEventListener("click", openMobileDrawer);

    document.querySelector("#themeToggleBtn")?.addEventListener("click", () => {
        isDarkMode = !isDarkMode;
        if (isDarkMode) {
            document.body.classList.add("dark-theme");
            localStorage.setItem("digital-grand-library-theme", "dark");
        } else {
            document.body.classList.remove("dark-theme");
            localStorage.setItem("digital-grand-library-theme", "light");
        }
        renderTopbar();
    });

    document.querySelector("#userAvatarBtn")?.addEventListener("click", () => {
        const stats = getStats();
        showModal(`
            <div style="text-align: center; padding: 20px 10px;">
                <div class="avatar" style="width: 56px; height: 56px; font-size: 22px; margin: 0 auto 14px; display: grid; place-items: center;">A</div>
                <h2 style="font: 500 24px Georgia, serif; margin: 0 0 4px;">Amith's Library</h2>
                <p style="margin: 0 0 20px; font-size: 13px; color: var(--muted);">Collector & Avid Reader</p>

                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 24px;">
                    <div class="glass-card" style="padding: 14px; text-align: center;">
                        <strong style="font-size: 20px; display: block;">${stats.total}</strong>
                        <small style="font-size: 10px; color: var(--muted);">Total Books</small>
                    </div>
                    <div class="glass-card" style="padding: 14px; text-align: center;">
                        <strong style="font-size: 20px; display: block;">${stats.read}</strong>
                        <small style="font-size: 10px; color: var(--muted);">Completed</small>
                    </div>
                    <div class="glass-card" style="padding: 14px; text-align: center;">
                        <strong style="font-size: 20px; display: block;">${stats.favorites}</strong>
                        <small style="font-size: 10px; color: var(--muted);">Favorites</small>
                    </div>
                </div>

                <button class="primary-btn" id="closeProfileBtn" style="margin: 0 auto;">
                    Close Profile
                </button>
            </div>
        `, "User Profile");
        document.querySelector("#closeProfileBtn")?.addEventListener("click", closeModal);
    });

    document.querySelector("#searchInput").addEventListener("input", event => {
        query = event.target.value;

        if (currentView !== "collection" && query.trim().length > 0) {
            currentView = "collection";
            render();
        } else {
            renderContent();
        }
    });

    document.querySelector("#searchInput").addEventListener("keydown", event => {
        if (event.key === "Enter") {
            currentView = "collection";
            render();
        }
    });
}

function openMobileDrawer() {
    let backdrop = document.querySelector(".drawer-backdrop");
    let drawer = document.querySelector(".sidebar-drawer");
    if (!backdrop) {
        backdrop = document.createElement("div");
        backdrop.className = "drawer-backdrop";
        document.body.appendChild(backdrop);
    }
    if (!drawer) {
        drawer = document.createElement("div");
        drawer.className = "sidebar-drawer";
        document.body.appendChild(drawer);
    }
    const nav = [
        ["home", "Home", "Home"],
        ["collection", "My Books", "LibraryBig"],
        ["reading", "Reading", "BookOpen"],
        ["wishlist", "Wishlist", "Heart"],
        ["statistics", "Statistics", "BarChart3"],
        ["settings", "Settings", "Settings"]
    ];

    drawer.innerHTML = `
        <div class="drawer-header">
            <div class="sidebar-brand-head">
                <div class="brand-mark">
                    <img src="${transparentLogoDataUrl || 'assets/site-logo.png'}" alt="Private Lybreri Logo" class="brand-logo-img">
                </div>
                <div class="brand-name">
                    Private<br>Lybreri
                </div>
            </div>
            <button class="close drawer-close-btn" id="closeDrawerBtn" title="Close Menu" aria-label="Close menu">
                ${icon("X", 20)}
            </button>
        </div>

        <nav class="nav-list" style="margin-top: 20px;">
            ${nav.map(([id, label, iconName]) => `
                <button class="nav-item ${currentView === id ? "active" : ""}" data-drawer-view="${id}">
                    ${icon(iconName, 19)}
                    <span>${label}</span>
                </button>
            `).join("")}
        </nav>

        <div class="drawer-footer-quote">
            <span class="quote-line"></span>
            <em>“Good books build great days.”</em>
        </div>
    `;

    loadTransparentLogo();

    setTimeout(() => {
        backdrop.classList.add("open");
        drawer.classList.add("open");
    }, 10);

    const close = () => {
        backdrop.classList.remove("open");
        drawer.classList.remove("open");
    };

    backdrop.onclick = close;
    document.querySelector("#closeDrawerBtn")?.addEventListener("click", close);
    drawer.querySelectorAll("[data-drawer-view]").forEach(btn => {
        btn.onclick = () => {
            currentView = btn.dataset.drawerView;
            close();
            render();
        };
    });
}

if (typeof window !== "undefined" && !window.__shortcutBound) {
    window.__shortcutBound = true;
    document.addEventListener("keydown", (event) => {
        if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
            event.preventDefault();
            const input = document.querySelector("#searchInput");
            if (input) {
                input.focus();
                input.select();
            }
        }
    });
}

let transparentLogoDataUrl = null;

function loadTransparentLogo() {
    if (transparentLogoDataUrl) {
        document.querySelectorAll(".brand-logo-img").forEach((el) => {
            el.src = transparentLogoDataUrl;
        });
        return;
    }

    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = "assets/site-logo.png";
    img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;

        for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];

            if (r > 240 && g > 240 && b > 240) {
                data[i + 3] = 0;
            } else if (r > 225 && g > 225 && b > 225) {
                data[i + 3] = Math.floor(((240 - r) / 15) * 255);
            }
        }

        ctx.putImageData(imgData, 0, 0);
        transparentLogoDataUrl = canvas.toDataURL("image/png");

        document.querySelectorAll(".brand-logo-img").forEach((el) => {
            el.src = transparentLogoDataUrl;
        });
    };
}

function render() {
    renderAppShell();
    renderSidebar();
    renderTopbar();
    renderContent();
    loadTransparentLogo();
}

function renderAppShell() {
    document.querySelector("#app").innerHTML = `
        <div class="app-shell">
            <div class="ambient ambient-one"></div>
            <div class="ambient ambient-two"></div>

            <aside class="sidebar glass-panel"></aside>

            <main class="main glass-panel">
                <header class="topbar"></header>
                <div id="content"></div>
            </main>
        </div>
    `;
}

function renderContent() {
    const content = document.querySelector("#content");

    if (currentView === "home") {
        content.innerHTML = renderHome();
        return;
    }

    if (currentView === "collection") {
        content.innerHTML = renderCollection();
        return;
    }

    if (currentView === "reading") {
        content.innerHTML = renderReading();
        return;
    }

    if (currentView === "wishlist") {
        content.innerHTML = renderWishlist();
        return;
    }

    if (currentView === "statistics") {
        content.innerHTML = renderStatistics();
        return;
    }

    content.innerHTML = renderSettings();
}

function getStats() {
    const ownedBooks = books.filter(b => b.status !== "wishlist");
    return {
        total: ownedBooks.length,
        read: ownedBooks.filter(book => book.status === "completed").length,
        unread: ownedBooks.filter(book => book.status === "unread").length,
        shelves: Math.ceil(ownedBooks.length / 5),
        reading: ownedBooks.filter(book => book.status === "reading").length,
        wishlist: books.filter(book => book.status === "wishlist").length,
        favorites: favorites.length
    };
}

function renderHome() {
    const stats = getStats();
    const ownedBooks = books.filter(b => b.status !== "wishlist");
    const reading = ownedBooks.find(book => book.status === "reading");
    const recent = ownedBooks.slice(0, 5);

    const readingHtml = reading
        ? `
            <div class="reading-content" id="readingContent">
                ${cover(reading, true)}

                <div class="reading-main">
                    <h3>${escapeHtml(reading.title)}</h3>
                    <p class="author">${escapeHtml(reading.author)}</p>
                    <p class="blurb">
                        “Between life and death<br>
                        there is a library...”
                    </p>
                    <div class="progress">
                        <span style="width:${reading.progress}%"></span>
                    </div>
                    <div class="progress-label">
                        <span>${reading.progress}% complete</span>
                        <button id="continueReadingBtn">
                            Continue Reading
                            ${icon("ArrowRight", 14)}
                        </button>
                    </div>
                </div>

                <div class="reading-meta">
                    ${meta("BookOpen", "Genre", reading.genre || "Fiction")}
                    ${meta("Clock3", "Started", reading.startedAt || "12 Aug 2026")}
                    ${meta("Clock3", "Est. Finish", reading.finishedAt || "25 Aug 2026")}
                    ${meta("MapPin", "Location", formatShelf(reading.shelf))}
                </div>

                <img class="sneaking-peace-person" src="assets/sneaking-peace-user.png" alt="Sneaking person with peace symbol" />
            </div>
        `
        : `
            <div class="empty-reading">
                <div class="empty-reading-icon">
                    ${icon("BookMarked", 30)}
                </div>
                <div>
                    <strong>Your reading space is waiting.</strong>
                    <p>Add a book and mark it as currently reading.</p>
                </div>
            </div>
        `;

    const recentHtml = recent.map(bookTile).join("");

    const content = `
        <section class="welcome-card glass-card">
            <div class="welcome-copy">
                <div class="eyebrow">WELCOME TO YOUR</div>
                <h1>Private Lybreri</h1>
                <div class="title-rule"></div>
                <p>
                    A collection of stories, ideas and worlds<br>
                    that stay with <strong>you.</strong>
                </p>

                <div class="hero-stats">
                    ${miniStat("BookMarked", stats.total, "Books", "all")}
                    ${miniStat("BookOpen", stats.read, "Read", "completed")}
                    ${miniStat("Bookmark", stats.unread, "Unread", "unread")}
                    ${miniStat("LibraryBig", stats.shelves, "Shelves", "all")}
                </div>
            </div>

            <div class="hero-quote glass-inset">
                <p>
                    “You were the chapter<br>
                    I kept rereading<br>
                    even though the ending<br>
                    never changed at all.”
                </p>
                <span>— ANONYMOUS</span>
            </div>
        </section>

        <section class="reading-card glass-card">
            <div class="section-top">
                <h2>Currently Reading</h2>
                <button id="viewReadingDetails">
                    View Details
                    ${icon("ArrowRight", 16)}
                </button>
            </div>
            ${readingHtml}
        </section>

        <section class="bottom-grid">
            <div class="recent-card glass-card">
                <div class="section-top">
                    <h2>Recently Added</h2>
                    <button id="viewAllBooks">
                        View All
                        ${icon("ArrowRight", 16)}
                    </button>
                </div>
                <div class="recent-row">
                    ${recentHtml}
                </div>
            </div>

            <div class="add-card glass-card">
                <div class="section-top">
                    <h2>Add a Book</h2>
                    <em>
                        New stories<br>
                        await...
                    </em>
                </div>

                <div class="add-actions">
                    <button class="action-tile" id="scanButton">
                        <span class="action-icon">
                            ${icon("Camera", 22)}
                        </span>
                        <span>
                            <strong>Scan ISBN</strong>
                            <small>Scan the barcode</small>
                        </span>
                    </button>

                    <button class="action-tile" id="manualButton">
                        <span class="action-icon">
                            ${icon("Plus", 24)}
                        </span>
                        <span>
                            <strong>Add Manually</strong>
                            <small>Enter details yourself</small>
                        </span>
                    </button>
                </div>

                <button class="wishlist-cta" id="wishlistAddButton">
                    ${icon("Heart", 20, 1.8, "currentColor")}
                    <span>
                        Add to Wishlist
                        <small>Save for future purchase</small>
                    </span>
                </button>
            </div>
        </section>
    `;

    setTimeout(() => {
        bindBookTiles();

        if (reading) {
            document.querySelector("#viewReadingDetails")?.addEventListener(
                "click",
                () => openBook(reading.id)
            );
            document.querySelector("#readingContent")?.addEventListener(
                "click",
                () => openBook(reading.id)
            );
            document.querySelector("#continueReadingBtn")?.addEventListener(
                "click",
                () => openBook(reading.id)
            );
        } else {
            document.querySelector("#viewReadingDetails")?.addEventListener(
                "click",
                () => {
                    currentView = "reading";
                    render();
                }
            );
        }

        document.querySelectorAll("[data-stat-filter]").forEach(card => {
            card.addEventListener("click", () => {
                statusFilter = card.dataset.statFilter;
                currentView = "collection";
                render();
            });
        });

        document.querySelector("#viewAllBooks")?.addEventListener("click", () => {
            currentView = "collection";
            render();
        });

        document.querySelector("#scanButton")?.addEventListener(
            "click",
            openScanner
        );

        document.querySelector("#manualButton")?.addEventListener(
            "click",
            openBookForm
        );

        document.querySelector("#wishlistAddButton")?.addEventListener(
            "click",
            openWishlistForm
        );
    });

    return page(content);
}

function bookTile(book) {
    return `
        <button class="book-tile" data-book-id="${book.id}">
            ${cover(book)}

            <strong>${escapeHtml(book.title)}</strong>

            <span>${escapeHtml(book.author)}</span>
        </button>
    `;
}

function bindBookTiles() {
    document.querySelectorAll("[data-book-id]").forEach(button => {
        button.addEventListener("click", () => {
            openBook(button.dataset.bookId);
        });
    });
}

function renderCollection() {
    const ownedBooks = books.filter(b => b.status !== "wishlist");
    const genres = ["all", ...new Set(ownedBooks.map(b => b.genre).filter(Boolean))];
    const rooms = ["all", ...new Set(ownedBooks.map(b => b.room).filter(Boolean))];

    const filtered = ownedBooks.filter(book => {
        const text = `${book.title} ${book.author} ${book.genre} ${book.isbn}`.toLowerCase();
        const matchesQuery = text.includes(query.toLowerCase());

        let matchesStatus = true;
        if (statusFilter === "unread") matchesStatus = book.status === "unread";
        else if (statusFilter === "reading") matchesStatus = book.status === "reading";
        else if (statusFilter === "completed") matchesStatus = book.status === "completed";
        else if (statusFilter === "favorites") matchesStatus = favorites.includes(book.id);

        let matchesGenre = genreFilter === "all" || (book.genre && book.genre.toLowerCase() === genreFilter.toLowerCase());
        let matchesRoom = roomFilter === "all" || (book.room && book.room.toLowerCase() === roomFilter.toLowerCase());

        return matchesQuery && matchesStatus && matchesGenre && matchesRoom;
    });

    const shelfRows = [];
    const chunkSize = 5;
    for (let i = 0; i < filtered.length; i += chunkSize) {
        shelfRows.push(filtered.slice(i, i + chunkSize));
    }

    const bookshelfHtml = shelfRows.length
        ? shelfRows.map((rowBooks, shelfIdx) => `
            <div class="bookshelf-row">
                <div class="bookshelf-row-head">
                    <span class="shelf-label">${icon("LibraryBig", 14)} Shelf ${shelfIdx + 1}</span>
                </div>
                <div class="bookshelf-shelf-unit">
                    <div class="bookshelf-books-grid">
                        ${rowBooks.map(book => `
                            <div class="bookshelf-book-card">
                                <button
                                    class="bookshelf-cover"
                                    data-book-id="${book.id}"
                                >
                                    ${cover(book)}
                                </button>

                                <button
                                    class="heart-btn ${favorites.includes(book.id) ? "saved" : ""}"
                                    data-favorite-id="${book.id}"
                                    title="${favorites.includes(book.id) ? "Remove from Favorites" : "Mark as Favorite"}"
                                >
                                    ${icon(
                                        "Heart",
                                        15,
                                        1.8,
                                        favorites.includes(book.id) ? "currentColor" : "none"
                                    )}
                                </button>

                                <div class="bookshelf-book-info">
                                    <div class="book-title-meta">
                                        <strong title="${escapeHtml(book.title)}">${escapeHtml(book.title)}</strong>
                                        <span>${escapeHtml(book.author)}</span>
                                    </div>
                                </div>
                            </div>
                        `).join("")}
                    </div>

                    <div class="shelf-plank">
                        <div class="shelf-plank-top"></div>
                        <div class="shelf-plank-front"></div>
                    </div>
                </div>
            </div>
        `).join("")
        : `<div class="empty full" style="padding: 40px; text-align: center; color: #666c64;">No books match your current filters.</div>`;

    setTimeout(() => {
        bindBookTiles();

        document.querySelectorAll("[data-favorite-id]").forEach(button => {
            button.addEventListener("click", event => {
                event.stopPropagation();
                toggleFavorite(button.dataset.favoriteId);
            });
        });

        document.querySelectorAll("[data-status-filter]").forEach(btn => {
            btn.addEventListener("click", () => {
                statusFilter = btn.dataset.statusFilter;
                renderContent();
            });
        });
    });

    return page(`
        ${pageHeading(
            "YOUR COLLECTION",
            "My Books",
            `${filtered.length} ${filtered.length === 1 ? "Book" : "Books"} · ${shelfRows.length} ${shelfRows.length === 1 ? "Shelf" : "Shelves"}`
        )}

        <div class="filters-bar">
            <div class="filters">
                <button class="filter ${statusFilter === "all" ? "active" : ""}" data-status-filter="all">All</button>
                <button class="filter ${statusFilter === "unread" ? "active" : ""}" data-status-filter="unread">Unread</button>
                <button class="filter ${statusFilter === "reading" ? "active" : ""}" data-status-filter="reading">Reading</button>
                <button class="filter ${statusFilter === "completed" ? "active" : ""}" data-status-filter="completed">Completed</button>
                <button class="filter ${statusFilter === "favorites" ? "active" : ""}" data-status-filter="favorites">Favorites</button>
                
                <div class="custom-dropdown" id="genreDropdown">
                    <button type="button" class="custom-dropdown-btn" id="genreDropdownBtn">
                        <span>${genreFilter === "all" ? "All Genres" : escapeHtml(genreFilter)}</span>
                        ${icon("ChevronDown", 14)}
                    </button>
                    <div class="custom-dropdown-menu glass-panel" id="genreDropdownMenu">
                        <div class="dropdown-item ${genreFilter === "all" ? "active" : ""}" data-genre-val="all">All Genres</div>
                        ${genres.filter(g => g !== "all").map(g => `
                            <div class="dropdown-item ${genreFilter.toLowerCase() === g.toLowerCase() ? "active" : ""}" data-genre-val="${escapeHtml(g)}">
                                ${escapeHtml(g)}
                            </div>
                        `).join("")}
                    </div>
                </div>
            </div>
        </div>

        <div class="bookshelf-container">
            ${bookshelfHtml}
        </div>
    `);
}

function renderReading() {
    const items = books.filter(book => book.status === "reading");

    setTimeout(() => {
        document.querySelectorAll("[data-reading-id]").forEach(card => {
            card.addEventListener("click", () => {
                openBook(card.dataset.readingId);
            });
        });
    });

    if (!items.length) {
        return page(`
            ${pageHeading(
                "YOUR READING",
                "Reading",
                "0 in progress"
            )}

            <div class="reading-empty-container">
                <div class="reading-empty-content">
                    <div class="reading-empty-icon">
                        ${icon("BookMarked", 38)}
                    </div>
                    <h2>Your reading space is waiting.</h2>
                    <p>Add a book and mark it as currently reading.</p>
                </div>
            </div>
        `);
    }

    return page(`
        ${pageHeading(
            "YOUR READING",
            "Reading",
            `${items.length} in progress`
        )}

        <div class="reading-list">
            ${items.map(book => `
                <div
                    class="reading-list-card glass-card"
                    data-reading-id="${book.id}"
                >
                    ${cover(book, true)}

                    <div>
                        <span class="eyebrow">IN PROGRESS</span>

                        <h2>${escapeHtml(book.title)}</h2>

                        <p>${escapeHtml(book.author)}</p>

                        <div class="progress">
                            <span style="width:${book.progress}%"></span>
                        </div>

                        <small>${book.progress}% complete (${book.pagesRead !== undefined ? book.pagesRead : Math.round(((book.progress || 0) / 100) * (book.pages || 300))} / ${book.pages || 0} pages)</small>
                    </div>

                    ${icon("ChevronRight")}
                </div>
            `).join("")}
        </div>
    `);
}

function renderWishlist() {
    const items = books.filter(book => book.status === "wishlist");

    setTimeout(() => {
        bindBookTiles();

        document.querySelector("#wishlistAddCta")?.addEventListener("click", openWishlistForm);

        document.querySelectorAll("[data-buy-id]").forEach(button => {
            button.addEventListener("click", async event => {
                event.stopPropagation();
                const bookId = button.dataset.buyId;
                const book = books.find(b => b.id === bookId);
                if (book) {
                    book.status = "unread";
                    book.acquisition = "purchased";
                    book.acquiredAt = new Date().toISOString().slice(0, 10);
                    await saveBook(book);
                    await loadBooks();
                    render();
                    showToast(`Purchased! "${book.title}" moved to your library collection.`);
                }
            });
        });

        document.querySelectorAll("[data-remove-wishlist-id]").forEach(button => {
            button.addEventListener("click", async event => {
                event.preventDefault();
                event.stopPropagation();
                const bookId = button.dataset.removeWishlistId;
                await removeBook(bookId);
                await loadBooks();
                render();
                showToast("Removed from wishlist.");
            });
        });
    });

    return page(`
        ${pageHeading(
            "SAVE FOR LATER",
            "Wishlist",
            `${items.length} ${items.length === 1 ? "Book to Purchase" : "Books to Purchase"}`
        )}

        <div style="display: flex; justify-content: flex-end; margin-bottom: 20px;">
            <button class="primary-btn" id="wishlistAddCta" style="white-space: nowrap;">
                ${icon("Plus", 15)} Add to Wishlist
            </button>
        </div>

        ${
            items.length
                ? `
                    <div class="collection-grid">
                        ${items.map(book => `
                            <div class="collection-card glass-card" style="display: flex; flex-direction: column; justify-content: space-between; padding: 14px;">
                                <div style="display: flex; gap: 14px;">
                                    <button class="collection-cover" data-book-id="${book.id}">
                                        ${cover(book)}
                                    </button>

                                    <div class="wishlist-item-info" style="flex: 1; display: flex; flex-direction: column; justify-content: center;">
                                        <div class="eyebrow" style="margin-bottom: 4px; color: #899986;">TO PURCHASE</div>
                                        <h3 style="font: 500 20px Georgia, 'Times New Roman', serif; margin: 0 0 4px; color: var(--ink);">${escapeHtml(book.title)}</h3>
                                        <div style="font-size: 13px; color: var(--muted); margin-bottom: 2px;">${escapeHtml(book.author)}</div>
                                        ${book.genre ? `<div style="font-size: 11px; margin-top: 4px; opacity: 0.85;">Genre: ${escapeHtml(book.genre)}</div>` : ""}
                                        ${book.notes ? `<div style="font-size: 12px; margin-top: 6px; font-style: italic; color: var(--muted);">“${escapeHtml(book.notes)}”</div>` : ""}
                                    </div>
                                </div>

                                <div style="display: flex; gap: 8px; margin-top: 14px; justify-content: flex-end;">
                                    <button class="ghost-btn" data-remove-wishlist-id="${book.id}" style="padding: 6px 10px; font-size: 11px;" title="Remove">
                                        ${icon("Trash2", 13)} Remove
                                    </button>
                                    <button class="primary-btn" data-buy-id="${book.id}" style="padding: 6px 12px; font-size: 11px;">
                                        ${icon("Plus", 13)} Move to Library
                                    </button>
                                </div>
                            </div>
                        `).join("")}
                    </div>
                `
                : `
                    <div class="wishlist-empty" style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 280px; text-align: center; color: var(--muted);">
                        ${icon("Bookmark", 36)}
                        <div style="margin-top: 12px; font-size: 15px; font-weight: 500; color: var(--ink);">Your wishlist is empty</div>
                    </div>
                `
        }
    `);
}

function renderStatistics() {
    const stats = getStats();
    const ownedBooks = books.filter(b => b.status !== "wishlist");

    setTimeout(() => {
        document.querySelectorAll("[data-stat-view]").forEach(card => {
            card.addEventListener("click", () => {
                const targetView = card.dataset.statView;
                if (targetView === "reading") {
                    currentView = "reading";
                } else {
                    statusFilter = targetView;
                    currentView = "collection";
                }
                render();
            });
        });

        document.querySelectorAll("[data-chart-book-id]").forEach(bar => {
            bar.addEventListener("click", () => {
                openBook(bar.dataset.chartBookId);
            });
        });
    });

    return page(`
        ${pageHeading(
            "YOUR LIBRARY",
            "Statistics",
            "Offline"
        )}

        <div class="stat-panels">
            <div class="big-stat glass-card" data-stat-view="all" style="cursor: pointer;" title="View all books">
                <span>Total books</span>
                <strong>${stats.total}</strong>
                <small>Across your physical collection</small>
            </div>

            <div class="big-stat glass-card" data-stat-view="completed" style="cursor: pointer;" title="View completed books">
                <span>Finished</span>
                <strong>${stats.read}</strong>
                <small>
                    ${stats.total ? Math.round(stats.read / stats.total * 100) : 0}%
                    of your library
                </small>
            </div>

            <div class="big-stat glass-card" data-stat-view="unread" style="cursor: pointer;" title="View unread books">
                <span>Unread</span>
                <strong>${stats.unread}</strong>
                <small>Waiting for their turn</small>
            </div>

            <div class="big-stat glass-card" data-stat-view="reading" style="cursor: pointer;" title="View currently reading">
                <span>In progress</span>
                <strong>${stats.reading}</strong>
                <small>Currently being read</small>
            </div>
        </div>

        <div class="glass-card activity-card">
            <h2>Your collection progress</h2>

            <div class="bar-chart">
                ${ownedBooks.slice(0, 12).map((book, index) => `
                    <div data-chart-book-id="${book.id}" style="cursor: pointer;" title="${escapeHtml(book.title)} (${book.progress || 0}%)">
                        <span style="height:${Math.max(
                            14,
                            book.progress || ((index % 4) + 1) * 18
                        )}%"></span>

                        <small style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 45px;">${escapeHtml(book.title.slice(0, 7))}${book.title.length > 7 ? "…" : ""}</small>
                    </div>
                `).join("")}
            </div>
        </div>
    `);
}

function renderSettings() {
    setTimeout(() => {
        document.querySelector("#resetDemo")?.addEventListener("click", async () => {
            await resetDemoBooks();
            await loadBooks();
            currentView = "home";
            render();
            showToast("Demo collection restored successfully!");
        });

        document.querySelector("#settingsThemeBtn")?.addEventListener("click", () => {
            isDarkMode = !isDarkMode;
            if (isDarkMode) {
                document.body.classList.add("dark-theme");
                localStorage.setItem("digital-grand-library-theme", "dark");
            } else {
                document.body.classList.remove("dark-theme");
                localStorage.setItem("digital-grand-library-theme", "light");
            }
            render();
            showToast(`Theme switched to ${isDarkMode ? "Dark" : "Light"} mode.`);
        });

        document.querySelector("#exportBackupBtn")?.addEventListener("click", exportLibraryJSON);

        const fileInput = document.querySelector("#importFileInput");
        document.querySelector("#importBackupBtn")?.addEventListener("click", () => fileInput?.click());
        fileInput?.addEventListener("change", (e) => {
            if (e.target.files && e.target.files[0]) {
                importLibraryJSON(e.target.files[0]);
            }
        });
    });

    return page(`
        ${pageHeading(
            "YOUR LIBRARY",
            "Settings",
            "Offline first"
        )}

        <div class="settings-stack">
            <div class="settings-row glass-card">
                <div>
                    <strong>Local storage</strong>
                    <p>
                        Your collection stays on this device using IndexedDB.
                    </p>
                </div>

                <span class="offline-pill">OFFLINE</span>
            </div>

            <div class="settings-row glass-card">
                <div>
                    <strong>Appearance & Theme</strong>
                    <p>
                        Toggle between Light Mode and Dark Mode.
                    </p>
                </div>

                <button class="ghost-btn" id="settingsThemeBtn">
                    ${icon(isDarkMode ? "Moon" : "Sun", 16)}
                    ${isDarkMode ? "Dark Mode" : "Light Mode"}
                </button>
            </div>

            <div class="settings-row glass-card">
                <div>
                    <strong>Export Library Backup</strong>
                    <p>
                        Save a JSON backup file of all your physical books and wishlist.
                    </p>
                </div>

                <button class="primary-btn" id="exportBackupBtn">
                    ${icon("Download", 16)}
                    Export JSON
                </button>
            </div>

            <div class="settings-row glass-card">
                <div>
                    <strong>Import Library Backup</strong>
                    <p>
                        Restore catalog items from a JSON backup file.
                    </p>
                </div>

                <input type="file" id="importFileInput" accept=".json" style="display:none;">
                <button class="ghost-btn" id="importBackupBtn">
                    ${icon("Upload", 16)}
                    Import JSON
                </button>
            </div>

            <div class="settings-row glass-card danger">
                <div>
                    <strong>Reset demo collection</strong>
                    <p>
                        Restore the original demonstration books.
                    </p>
                </div>

                <button id="resetDemo">
                    ${icon("RotateCcw", 16)}
                    Reset
                </button>
            </div>
        </div>
    `);
}

async function deleteBookAndCleanup(bookId, bookTitle) {
    await removeBook(bookId);

    if (favorites.includes(bookId)) {
        favorites = favorites.filter(id => id !== bookId);
        localStorage.setItem("digital-grand-library-favorites", JSON.stringify(favorites));
    }

    closeModal();
    await loadBooks();
    render();
    showToast(`"${bookTitle || 'Book'}" removed from library.`);
}

function confirmDeleteModal(book) {
    showModal(`
        <div style="text-align: center; padding: 16px 8px;">
            <div style="width: 52px; height: 52px; border-radius: 50%; background: rgba(180,60,60,0.12); color: #a33b3b; display: grid; place-items: center; margin: 0 auto 16px;">
                ${icon("Trash2", 24)}
            </div>
            <h2 style="font: 500 22px Georgia, serif; margin: 0 0 8px; color: var(--ink);">Remove Book?</h2>
            <p style="margin: 0 0 20px; font-size: 14px; color: var(--muted); line-height: 1.5;">
                Are you sure you want to remove <strong>"${escapeHtml(book.title)}"</strong> from your library? This action cannot be undone.
            </p>
            <div class="form-actions" style="justify-content: center; gap: 12px;">
                <button type="button" class="ghost-btn" id="cancelDeleteBtn" style="padding: 9px 18px;">
                    Cancel
                </button>
                <button type="button" class="danger-btn" id="confirmDeleteBtn" style="padding: 9px 18px; background: #a33b3b; color: #fff; border-color: #a33b3b;">
                    ${icon("Trash2", 15)} Remove Book
                </button>
            </div>
        </div>
    `, "Remove Book");

    document.querySelector("#cancelDeleteBtn")?.addEventListener("click", () => {
        openBook(book.id);
    });

    document.querySelector("#confirmDeleteBtn")?.addEventListener("click", async () => {
        await deleteBookAndCleanup(book.id, book.title);
    });
}

function openBook(id) {
    const book = books.find(item => item.id === id);

    if (!book) {
        return;
    }

    selectedBook = book;
    let currentRating = book.rating || 0;
    const totalPages = Number(book.pages) || 300;
    const initialPagesRead = book.pagesRead !== undefined ? Number(book.pagesRead) : Math.round(((book.progress || 0) / 100) * totalPages);
    const initialPct = totalPages > 0 ? Math.min(100, Math.round((initialPagesRead / totalPages) * 100)) : (book.progress || 0);

    showModal(`
        <div class="detail-hero">
            ${cover(book, true)}

            <div>
                <div class="eyebrow">
                    ${book.status.replace("-", " ").toUpperCase()}
                </div>

                <h1>${escapeHtml(book.title)}</h1>
                <p>${escapeHtml(book.author)}</p>

                <div style="margin-top: 8px;">
                    <div id="modalStarRating" class="star-rating">
                        ${[1, 2, 3, 4, 5].map(star => `
                            <button type="button" data-star="${star}" class="${star <= currentRating ? "active" : ""}">
                                ${icon("Star", 18, 1.5, star <= currentRating ? "currentColor" : "none")}
                            </button>
                        `).join("")}
                    </div>
                </div>
            </div>
        </div>

        <div class="detail-grid">
            <div>
                <small>ISBN</small>
                <strong>${escapeHtml(book.isbn || "—")}</strong>
            </div>

            <div>
                <small>YEAR & PAGES</small>
                <strong>${escapeHtml(book.year || "—")} · ${book.pages ? `${book.pages} pages` : "—"}</strong>
            </div>

            <div>
                <small>LOCATION</small>
                <strong>${escapeHtml(formatShelf(book.shelf))}</strong>
            </div>

            <div>
                <small>CONDITION & ACQUISITION</small>
                <strong>${escapeHtml((book.condition || "very-good").replace("-", " "))} · ${escapeHtml(book.acquisition || "purchased")}</strong>
            </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 12px;">
            <div class="note-label">
                Reading Status
                ${renderCustomSelect("bookDetailStatus", book.status, [
                    { value: "unread", label: "Unread" },
                    { value: "reading", label: "Reading" },
                    { value: "completed", label: "Completed" },
                    { value: "dnf", label: "Did Not Finish" }
                ])}
            </div>

            <label class="note-label">
                Pages Read ${book.pages ? `(out of ${book.pages})` : ""}
                <input id="bookPagesReadInput" type="number" min="0" max="${book.pages || 9999}" value="${initialPagesRead}" placeholder="Pages read">
                <small id="calculatedProgressBadge" style="display:block; margin-top:4px; font-weight:700; color:#2b3127;">
                    ${initialPct}% progress (${initialPagesRead} / ${totalPages} pages)
                </small>
            </label>
        </div>

        <label class="note-label">
            Private Notes & Thoughts
            <textarea id="bookNotes">${escapeHtml(book.notes)}</textarea>
        </label>

        <div class="form-actions">
            <button type="button" class="danger-btn" id="deleteBookBtn" style="margin-right: auto;">
                ${icon("Trash2", 15)} Remove Book
            </button>

            <button type="button" class="ghost-btn" id="editFullBook">
                ${icon("Plus", 15)} Edit Details
            </button>

            <button type="button" class="primary-btn" id="saveBook">
                Save Changes
                ${icon("ArrowRight", 15)}
            </button>
        </div>
    `);

    bindCustomSelects();

    const pInput = document.querySelector("#bookPagesReadInput");
    const pBadge = document.querySelector("#calculatedProgressBadge");
    if (pInput && pBadge) {
        pInput.addEventListener("input", () => {
            const pRead = Math.max(0, Number(pInput.value) || 0);
            const pct = totalPages > 0 ? Math.min(100, Math.round((pRead / totalPages) * 100)) : 0;
            pBadge.textContent = `${pct}% progress (${pRead} / ${totalPages} pages)`;
        });
    }

    document.querySelectorAll("#modalStarRating button").forEach(btn => {
        btn.addEventListener("click", () => {
            const clickedStar = Number(btn.dataset.star);
            if (clickedStar === currentRating) {
                currentRating = clickedStar - 1;
            } else {
                currentRating = clickedStar;
            }
            document.querySelectorAll("#modalStarRating button").forEach(b => {
                const s = Number(b.dataset.star);
                b.classList.toggle("active", s <= currentRating);
                b.innerHTML = icon("Star", 18, 1.5, s <= currentRating ? "currentColor" : "none");
            });
        });
    });

    document.querySelector("#deleteBookBtn")?.addEventListener("click", () => {
        confirmDeleteModal(book);
    });

    document.querySelector("#editFullBook").addEventListener("click", () => {
        closeModal();
        showBookForm(book);
    });

    document.querySelector("#saveBook").addEventListener("click", async () => {
        book.notes = document.querySelector("#bookNotes").value;
        const statusElem = document.querySelector("#bookDetailStatus");
        book.status = statusElem ? statusElem.dataset.value : book.status;

        const pagesReadVal = Math.max(0, Number(document.querySelector("#bookPagesReadInput")?.value) || 0);
        book.pagesRead = pagesReadVal;
        book.progress = totalPages > 0 ? Math.min(100, Math.round((pagesReadVal / totalPages) * 100)) : 0;
        book.rating = currentRating;
        if (book.status === "completed") {
            book.progress = 100;
            book.pagesRead = totalPages;
        }

        await saveBook(book);
        closeModal();
        await loadBooks();
        render();
        showToast("Book details updated!");
    });
}

function openBookForm() {
    const book = {
        id: crypto.randomUUID(),
        title: "",
        author: "",
        isbn: "",
        genre: "",
        publisher: "",
        year: "",
        pages: "",
        cover: "",
        status: "unread",
        progress: 0,
        rating: 0,
        room: "Study",
        bookcase: "Bookcase I",
        shelf: "Shelf I",
        position: "",
        condition: "very-good",
        acquisition: "purchased",
        acquiredAt: new Date().toISOString().slice(0, 10),
        startedAt: "",
        finishedAt: "",
        notes: ""
    };

    showBookForm(book);
}

function showBookForm(book) {
    let formRating = book.rating || 0;

    showModal(`
        <div class="form-grid">
            <label class="full">
                ISBN
                <div style="display: flex; gap: 8px;">
                    <input id="f-isbn" value="${escapeHtml(book.isbn)}" placeholder="e.g. 9780735211292">
                    <button type="button" class="ghost-btn" id="fetchIsbnBtn" style="white-space: nowrap;">
                        ${icon("Search", 14)} Auto-Fetch
                    </button>
                </div>
                <div id="fetchBadge" class="fetching-badge" style="display:none;">
                    ${icon("Loader", 12)} Searching Open Library database...
                </div>
            </label>

            <label class="full">
                Title
                <input id="f-title" value="${escapeHtml(book.title)}" placeholder="Book title">
            </label>

            <label>
                Author
                <input id="f-author" value="${escapeHtml(book.author)}" placeholder="Author name">
            </label>

            <label>
                Genre
                <input id="f-genre" value="${escapeHtml(book.genre)}" placeholder="e.g. Fiction, History">
            </label>

            <label>
                Publisher
                <input id="f-publisher" value="${escapeHtml(book.publisher)}">
            </label>

            <label>
                Year
                <input id="f-year" value="${escapeHtml(book.year)}" placeholder="e.g. 2021">
            </label>

            <label>
                Pages
                <input id="f-pages" type="number" value="${book.pages || ""}">
            </label>

            <div class="note-label">
                Status
                ${renderCustomSelect("f-status", book.status, [
                    { value: "wishlist", label: "Wishlist (To Purchase)" },
                    { value: "unread", label: "Unread" },
                    { value: "reading", label: "Reading" },
                    { value: "completed", label: "Completed" },
                    { value: "dnf", label: "Did Not Finish" }
                ])}
            </div>

            <label class="full">
                Cover Image (URL or Photo)
                <div class="cover-upload-box">
                    <input id="f-cover" value="${escapeHtml(book.cover)}" placeholder="Image URL or upload a photo" style="flex:1;">
                    <label class="ghost-btn" style="cursor:pointer; white-space:nowrap;">
                        Upload Photo
                        <input id="f-cover-file" type="file" accept="image/*" style="display:none;">
                    </label>
                </div>
            </label>

            <label class="full">
                Your Rating
                <div id="formStarRating" class="star-rating" style="margin-top:4px;">
                    ${[1, 2, 3, 4, 5].map(star => `
                        <button type="button" data-star="${star}" class="${star <= formRating ? "active" : ""}">
                            ${icon("Star", 20, 1.5, star <= formRating ? "currentColor" : "none")}
                        </button>
                    `).join("")}
                </div>
            </label>

            <label>
                Shelf Location
                <input id="f-shelf" value="${escapeHtml(book.shelf || "Shelf 01")}">
            </label>

            <label>
                Position / Shelf Spot
                <input id="f-position" value="${escapeHtml(book.position || "")}">
            </label>

            <div class="note-label">
                Condition
                ${renderCustomSelect("f-condition", book.condition || "very-good", [
                    { value: "new", label: "New" },
                    { value: "like-new", label: "Like New" },
                    { value: "very-good", label: "Very Good" },
                    { value: "good", label: "Good" },
                    { value: "acceptable", label: "Acceptable" },
                    { value: "damaged", label: "Damaged" }
                ])}
            </div>

            <div class="note-label">
                Acquisition
                ${renderCustomSelect("f-acquisition", book.acquisition || "purchased", [
                    { value: "purchased", label: "Purchased" },
                    { value: "gift", label: "Gift" },
                    { value: "inherited", label: "Inherited" },
                    { value: "other", label: "Other" }
                ])}
            </div>

            <label class="full">
                Notes
                <textarea id="f-notes" placeholder="Personal notes, quotes, or thoughts...">${escapeHtml(book.notes)}</textarea>
            </label>
        </div>

        <div class="form-actions">
            ${book.id && book.title ? `
                <button type="button" class="danger-btn" id="deleteFormBookBtn" style="margin-right: auto;">
                    ${icon("Trash2", 15)} Remove Book
                </button>
            ` : ""}

            <button type="button" class="ghost-btn" id="cancelForm">
                Cancel
            </button>

            <button type="button" class="primary-btn" id="saveForm">
                Save Book
                ${icon("ArrowRight", 15)}
            </button>
        </div>
    `, book.status === "wishlist" ? (book.title ? "Edit Wishlist Item" : "Add to Wishlist") : (book.title ? "Edit Book" : "Add a Book"));

    document.querySelectorAll("#formStarRating button").forEach(btn => {
        btn.addEventListener("click", () => {
            const clickedStar = Number(btn.dataset.star);
            if (clickedStar === formRating) {
                formRating = clickedStar - 1;
            } else {
                formRating = clickedStar;
            }
            document.querySelectorAll("#formStarRating button").forEach(b => {
                const s = Number(b.dataset.star);
                b.classList.toggle("active", s <= formRating);
                b.innerHTML = icon("Star", 20, 1.5, s <= formRating ? "currentColor" : "none");
            });
        });
    });

    const coverFileInput = document.querySelector("#f-cover-file");
    coverFileInput?.addEventListener("change", (e) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (evt) => {
                document.querySelector("#f-cover").value = evt.target.result;
                showToast("Photo attached!");
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    });

    const handleAutoFetch = async () => {
        const isbnVal = document.querySelector("#f-isbn").value.trim();
        if (!isbnVal) {
            showToast("Please enter an ISBN first.", "info");
            return;
        }
        const badge = document.querySelector("#fetchBadge");
        if (badge) badge.style.display = "inline-flex";

        const meta = await fetchOpenLibraryMetadata(isbnVal);
        if (badge) badge.style.display = "none";

        if (meta) {
            if (meta.title && !document.querySelector("#f-title").value) document.querySelector("#f-title").value = meta.title;
            if (meta.author && !document.querySelector("#f-author").value) document.querySelector("#f-author").value = meta.author;
            if (meta.publisher && !document.querySelector("#f-publisher").value) document.querySelector("#f-publisher").value = meta.publisher;
            if (meta.year && !document.querySelector("#f-year").value) document.querySelector("#f-year").value = meta.year;
            if (meta.pages && !document.querySelector("#f-pages").value) document.querySelector("#f-pages").value = meta.pages;
            if (meta.genre && !document.querySelector("#f-genre").value) document.querySelector("#f-genre").value = meta.genre;
            if (meta.cover && !document.querySelector("#f-cover").value) document.querySelector("#f-cover").value = meta.cover;

            showToast("Found book metadata from Open Library!");
        } else {
            showToast("No metadata found for this ISBN. Enter details manually.", "info");
        }
    };

    document.querySelector("#fetchIsbnBtn")?.addEventListener("click", handleAutoFetch);

    document.querySelector("#deleteFormBookBtn")?.addEventListener("click", () => {
        confirmDeleteModal(book);
    });

    document.querySelector("#cancelForm").addEventListener("click", closeModal);

    document.querySelector("#saveForm").addEventListener("click", async () => {
        const title = document.querySelector("#f-title").value.trim();

        if (!title) {
            showToast("Please enter a book title.", "error");
            return;
        }

        const selectedStatus = document.querySelector("#f-status")?.dataset.value || book.status;
        const selectedCondition = document.querySelector("#f-condition")?.dataset.value || book.condition;
        const selectedAcquisition = document.querySelector("#f-acquisition")?.dataset.value || book.acquisition;
        const totalPages = Number(document.querySelector("#f-pages").value) || 0;

        const updatedBook = {
            id: book.id || crypto.randomUUID(),
            title,
            author: document.querySelector("#f-author").value.trim(),
            isbn: document.querySelector("#f-isbn").value.trim(),
            genre: document.querySelector("#f-genre").value.trim(),
            publisher: document.querySelector("#f-publisher").value.trim(),
            year: document.querySelector("#f-year").value.trim(),
            pages: totalPages,
            cover: document.querySelector("#f-cover").value.trim(),
            status: selectedStatus,
            pagesRead: book.pagesRead !== undefined ? book.pagesRead : (selectedStatus === "completed" ? totalPages : 0),
            progress: book.progress || (selectedStatus === "completed" ? 100 : 0),
            rating: formRating,
            shelf: document.querySelector("#f-shelf").value.trim() || "Shelf 01",
            position: document.querySelector("#f-position").value.trim(),
            condition: selectedCondition,
            acquisition: selectedAcquisition,
            acquiredAt: book.acquiredAt || new Date().toISOString().slice(0, 10),
            startedAt: book.startedAt || "",
            finishedAt: book.finishedAt || "",
            notes: document.querySelector("#f-notes").value
        };

        await saveBook(updatedBook);
        closeModal();
        await loadBooks();
        render();
        showToast(`Saved "${updatedBook.title}" to library!`);
    });
}

let scannerMediaStream = null;

function stopScannerCamera() {
    if (scannerMediaStream) {
        scannerMediaStream.getTracks().forEach(track => track.stop());
        scannerMediaStream = null;
    }
}

function openScanner() {
    const hasCameraSupport = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
    const hasBarcodeDetector = typeof window !== "undefined" && "BarcodeDetector" in window;

    showModal(`
        <div class="scanner">
            <div class="scanner-frame" id="scannerFrame" style="position: relative; overflow: hidden; min-height: 180px; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                <video id="scannerVideo" autoplay playsinline style="display: none; width: 100%; height: 100%; object-fit: cover; border-radius: 12px; position: absolute; inset: 0;"></video>
                <div id="scannerPlaceholder" style="display: flex; flex-direction: column; align-items: center; text-align: center; z-index: 2;">
                    ${icon("Camera", 42)}
                    <span style="margin-top: 8px; font-weight: 500;">ISBN Barcode Scanner</span>
                    <small style="margin-top: 4px; color: var(--muted); text-align: center; max-width: 260px;">
                        ${hasCameraSupport ? "Scan a barcode with your camera or enter the ISBN below." : "Enter the 10 or 13-digit ISBN barcode on your book cover."}
                    </small>
                </div>
            </div>

            ${hasCameraSupport ? `
                <div style="display: flex; justify-content: center; margin: 12px 0 6px;">
                    <button type="button" class="ghost-btn" id="toggleCameraBtn" style="font-size: 12px; padding: 6px 12px;">
                        ${icon("Camera", 14)} Start Camera Scanner
                    </button>
                </div>
            ` : ""}

            <div class="scanner-or">
                <span>ENTER ISBN BARCODE</span>
            </div>

            <input
                class="scanner-input"
                id="scannerIsbn"
                placeholder="e.g. 9780735211292"
                autofocus
            >

            <div class="form-actions">
                <button class="ghost-btn" id="cancelScanner" type="button">
                    Cancel
                </button>

                <button class="primary-btn" id="useScanner" type="button">
                    Lookup Book
                    ${icon("ArrowRight", 15)}
                </button>
            </div>
        </div>
    `, "ISBN Lookup");

    const videoElem = document.querySelector("#scannerVideo");
    const placeholderElem = document.querySelector("#scannerPlaceholder");
    const toggleCamBtn = document.querySelector("#toggleCameraBtn");

    let isScanning = false;
    let detector = null;

    if (hasBarcodeDetector) {
        try {
            detector = new window.BarcodeDetector({ formats: ["ean_13", "ean_8", "upc_a", "upc_e"] });
        } catch (e) {
            detector = null;
        }
    }

    const startCamera = async () => {
        try {
            scannerMediaStream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: "environment" }
            });
            if (videoElem) {
                videoElem.srcObject = scannerMediaStream;
                videoElem.style.display = "block";
                if (placeholderElem) placeholderElem.style.display = "none";
                if (toggleCamBtn) toggleCamBtn.textContent = "Stop Camera";
                isScanning = true;
                scanLoop();
            }
        } catch (err) {
            showToast("Camera access denied or unavailable. Enter ISBN manually.", "info");
        }
    };

    const stopCamera = () => {
        isScanning = false;
        stopScannerCamera();
        if (videoElem) videoElem.style.display = "none";
        if (placeholderElem) placeholderElem.style.display = "flex";
        if (toggleCamBtn) {
            toggleCamBtn.innerHTML = `${icon("Camera", 14)} Start Camera Scanner`;
        }
    };

    const scanLoop = async () => {
        if (!isScanning || !videoElem) return;
        if (detector && videoElem.readyState === videoElem.HAVE_ENOUGH_DATA) {
            try {
                const barcodes = await detector.detect(videoElem);
                if (barcodes.length > 0) {
                    const rawVal = barcodes[0].rawValue;
                    if (rawVal) {
                        const input = document.querySelector("#scannerIsbn");
                        if (input) input.value = rawVal;
                        showToast(`Scanned ISBN: ${rawVal}`);
                        stopCamera();
                        handleLookup();
                        return;
                    }
                }
            } catch (e) {}
        }
        if (isScanning) {
            requestAnimationFrame(scanLoop);
        }
    };

    toggleCamBtn?.addEventListener("click", () => {
        if (isScanning) stopCamera();
        else startCamera();
    });

    document.querySelector("#cancelScanner")?.addEventListener("click", () => {
        stopCamera();
        closeModal();
    });

    const handleLookup = async () => {
        stopCamera();
        const isbn = document.querySelector("#scannerIsbn")?.value.trim() || "";

        if (!isbn) {
            showToast("Please enter an ISBN.", "info");
            return;
        }

        showToast("Fetching details from Open Library...");
        const meta = await fetchOpenLibraryMetadata(isbn);
        closeModal();

        const newBook = {
            id: crypto.randomUUID(),
            title: meta?.title || "",
            author: meta?.author || "",
            isbn: isbn,
            genre: meta?.genre || "",
            publisher: meta?.publisher || "",
            year: meta?.year || "",
            pages: meta?.pages || "",
            cover: meta?.cover || "",
            status: "unread",
            progress: 0,
            rating: 0,
            room: "Study",
            bookcase: "Bookcase I",
            shelf: "Shelf I",
            position: "",
            condition: "very-good",
            acquisition: "purchased",
            acquiredAt: new Date().toISOString().slice(0, 10),
            startedAt: "",
            finishedAt: "",
            notes: ""
        };

        showBookForm(newBook);
        if (meta) {
            showToast(`Loaded metadata for "${meta.title}"!`);
        }
    };

    document.querySelector("#useScanner")?.addEventListener("click", handleLookup);
    document.querySelector("#scannerIsbn")?.addEventListener("keydown", (e) => {
        if (e.key === "Enter") handleLookup();
    });
}

function showModal(content, title = "Book Details") {
    document.querySelector("#modal-root").innerHTML = `
        <div class="overlay" id="modalOverlay">
            <div class="modal glass-panel">
                <div class="modal-head">
                    <div>
                        <div class="eyebrow">PRIVATE LYBRERI</div>
                        <h2>${title}</h2>
                    </div>

                    <button class="close" id="closeModal" aria-label="Close Modal">
                        ${icon("X", 20)}
                    </button>
                </div>

                <div class="modal-body">
                    ${content}
                </div>
            </div>
        </div>
    `;

    document
        .querySelector("#closeModal")
        .addEventListener("click", closeModal);

    document
        .querySelector("#modalOverlay")
        .addEventListener("mousedown", event => {
            if (event.target === event.currentTarget) {
                closeModal();
            }
        });
}

function closeModal() {
    stopScannerCamera();
    document.querySelector("#modal-root").innerHTML = "";
}

function openWishlistForm() {
    const book = {
        id: crypto.randomUUID(),
        title: "",
        author: "",
        isbn: "",
        genre: "",
        publisher: "",
        year: "",
        pages: "",
        cover: "",
        status: "wishlist",
        progress: 0,
        rating: 0,
        room: "Study",
        bookcase: "Bookcase I",
        shelf: "Shelf I",
        position: "",
        condition: "new",
        acquisition: "wishlist",
        acquiredAt: "",
        startedAt: "",
        finishedAt: "",
        notes: ""
    };
    showBookForm(book);
}

function toggleFavorite(id) {
    if (favorites.includes(id)) {
        favorites = favorites.filter(item => item !== id);
        showToast("Removed from Favorites.");
    } else {
        favorites.push(id);
        showToast("Marked as Favorite!");
    }

    localStorage.setItem(
        "digital-grand-library-favorites",
        JSON.stringify(favorites)
    );

    render();
}

async function loadBooks() {
    books = await getBooks();
}

async function start() {
    try {
        favorites = JSON.parse(
            localStorage.getItem("digital-grand-library-favorites") || "[]"
        );
    } catch {
        favorites = [];
    }

    await initializeDatabase();
    await loadBooks();
    render();
}

start();
