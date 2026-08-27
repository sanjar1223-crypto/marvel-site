// ================= MARVEL TIMELINE JAVASCRIPT =================

const catalogItems = [
    {
        title: "Iron Man",
        year: 2008,
        type: "movie",
        phase: "Фаза 1",
        image: "images/iron-man.jpg",
        description: "Начало кинематографической вселенной Marvel."
    },

    {
        title: "Iron Man 2",
        year: 2010,
        type: "movie",
        phase: "Фаза 1",
        image: "images/iron-man-2.jpg",
        description: "Тони Старк сталкивается с новыми противниками."
    },

    {
        title: "The Avengers",
        year: 2012,
        type: "movie",
        phase: "Фаза 1",
        image: "images/the-avengers.jpg",
        description: "Герои объединяются впервые."
    },

    {
        title: "Captain America: Civil War",
        year: 2016,
        type: "movie",
        phase: "Фаза 3",
        image: "images/civil-war.jpg",
        description: "Конфликт внутри команды Avengers."
    },

    {
        title: "Avengers: Infinity War",
        year: 2018,
        type: "movie",
        phase: "Фаза 3",
        image: "images/infinity-war.jpg",
        description: "Одна из главных точек Infinity Saga."
    },

    {
        title: "Avengers: Endgame",
        year: 2019,
        type: "movie",
        phase: "Фаза 3",
        image: "images/endgame.jpg",
        description: "Финальная глава Infinity Saga."
    },

    {
        title: "WandaVision",
        year: 2021,
        type: "series",
        phase: "Фаза 4",
        image: "images/wandavision.jpg",
        description: "История Ванды и Вижна после событий Endgame."
    },

    {
        title: "Loki",
        year: 2021,
        type: "series",
        phase: "Фаза 4",
        image: "images/loki.jpg",
        description: "Приключения альтернативной версии Локи."
    },

    {
        title: "What If...?",
        year: 2021,
        type: "series",
        phase: "Фаза 4",
        image: "images/what-if.jpg",
        description: "Альтернативные варианты событий MCU."
    },

    {
        title: "The Falcon and the Winter Soldier",
        year: 2021,
        type: "series",
        phase: "Фаза 4",
        image: "images/the-falcon-and-the-winter-soldier.jpg",
        description: "Сэм Уилсон и Баки Барнс продолжают историю наследия Капитана Америки."
    }
];


// ================= ПОКАЗ КАРТОЧЕК =================

function renderCatalog() {

    const grid = document.getElementById("catalogGrid");

    if (!grid) return;

    const search = (
        document.getElementById("movieSearch")?.value || ""
    ).trim().toLowerCase();

    const activeButton =
        document.querySelector(".catalog-filter.active");

    const filter =
        activeButton?.dataset.filter || "all";


    const filtered = catalogItems.filter(item => {

        const matchesType =
            filter === "all" || item.type === filter;

        const text = (
            `${item.title} ${item.year} ${item.phase} ${item.description}`
        ).toLowerCase();

        return matchesType && text.includes(search);
    });


    grid.innerHTML = filtered.map(item => `

        <article class="catalog-card">

            ${
                item.image
                    ? `
                        <img
                            class="catalog-poster"
                            src="${item.image}"
                            alt="${item.title}"
                        >
                    `
                    : `
                        <div class="catalog-placeholder">
                            📺
                        </div>
                    `
            }


            <div class="catalog-info">

                <span class="catalog-type">
                    ${
                        item.type === "movie"
                            ? "Фильм"
                            : "Сериал"
                    }
                </span>


                <h3>
                    ${item.title}
                </h3>


                <p>
                    ${item.description}
                </p>


                <div class="catalog-year">
                    ${item.year} • ${item.phase}
                </div>


                <button
                    class="watch-button"
                    onclick="openWatchPage('${encodeURIComponent(item.title)}')"
                >
                    ▶ Смотреть
                </button>

            </div>

        </article>

    `).join("");


    const empty =
        document.getElementById("emptyCatalog");

    if (empty) {

        empty.hidden =
            filtered.length !== 0;

    }
}


// ================= НАСТРОЙКА КАТАЛОГА =================

function setupCatalog() {

    const search =
        document.getElementById("movieSearch");

    if (!search) return;


    // Поиск
    search.addEventListener(
        "input",
        renderCatalog
    );


    // Кнопки «Все / Фильмы / Сериалы»
    document
        .querySelectorAll(".catalog-filter")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    document
                        .querySelectorAll(".catalog-filter")
                        .forEach(btn => {

                            btn.classList.remove(
                                "active"
                            );

                        });


                    button.classList.add(
                        "active"
                    );


                    renderCatalog();

                }
            );

        });


    renderCatalog();
}


// ================= ОТКРЫТИЕ ПЛЕЕРА =================

function openWatchPage(title) {

    window.location.href =
        "watch.html?movie=" + title;

}


// ================= СТРАНИЦА ПРОСМОТРА =================

function setupWatchPage() {

    const titleElement =
        document.getElementById("watchTitle");

    if (!titleElement) return;


    const params =
        new URLSearchParams(
            window.location.search
        );

    const movieTitle =
        params.get("movie");


    if (!movieTitle) {

        titleElement.textContent =
            "Фильм не выбран";

        return;
    }


    const item =
        catalogItems.find(
            movie =>
                movie.title.toLowerCase() ===
                movieTitle.toLowerCase()
        );


    if (!item) {

        titleElement.textContent =
            "Фильм не найден";

        return;
    }


    document.title =
        "Marvel Timeline — " +
        item.title;


    titleElement.textContent =
        item.title;


    const yearElement =
        document.getElementById("watchYear");

    const descriptionElement =
        document.getElementById(
            "watchDescription"
        );

    const typeElement =
        document.getElementById(
            "watchType"
        );

    const videoElement =
        document.getElementById(
            "watchVideo"
        );

    const sourceElement =
        document.getElementById(
            "videoSource"
        );


    if (yearElement) {

        yearElement.textContent =
            item.year +
            " • " +
            item.phase;

    }


    if (descriptionElement) {

        descriptionElement.textContent =
            item.description;

    }


    if (typeElement) {

        typeElement.textContent =
            (
                item.type === "movie"
                    ? "ФИЛЬМ"
                    : "СЕРИАЛ"
            ) +
            " • " +
            item.phase;

    }


    if (videoElement && item.image) {

        videoElement.poster =
            item.image;

    }


    if (videoElement && sourceElement) {

        sourceElement.src =
            "videos/" +
            getVideoFileName(
                item.title
            );

        videoElement.load();

    }

}


// ================= ВИДЕОФАЙЛЫ =================

function getVideoFileName(title) {

    const names = {

        "Iron Man":
            "iron-man.mp4",

        "Iron Man 2":
            "iron-man-2.mp4",

        "The Avengers":
            "the-avengers.mp4",

        "Captain America: Civil War":
            "civil-war.mp4",

        "Avengers: Infinity War":
            "infinity-war.mp4",

        "Avengers: Endgame":
            "endgame.mp4"

    };


    return (
        names[title] ||
        "placeholder.mp4"
    );

}


// ================= ЗАПУСК =================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        setupCatalog();

        setupWatchPage();

    }
)