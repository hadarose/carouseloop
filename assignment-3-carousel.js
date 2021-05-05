function carouseLoop(
  items,
  { enabled, speed },
  loop,
  { showDots, maxDotsToDisplay },
  itemNumbering,
  { width, height },
  classNames
) {
  // Building the DOM
  let main = document.createElement("div");
  main.className = "main";

  document.body.appendChild(main);
  let carousel = document.createElement("div");
  carousel.className = classNames.carouselContainer;

  main.appendChild(carousel);
  items.forEach((item, index) => {
    let itemContainer = document.createElement("div");
    itemContainer.className = classNames.itemContainer;
    carousel.appendChild(itemContainer);
    let singleItem = document.createElement("img");
    singleItem.className = classNames.singleItem;
    singleItem.src = item;
    // singleItem.style.width = width + "px";
    // singleItem.style.height = height + "px";
    itemContainer.appendChild(singleItem);

    if (itemNumbering) {
      let itemPagination = document.createElement("div");
      itemPagination.className = classNames.itemPagination;
      itemPagination.textContent = index + 1 + "/" + items.length;
      itemContainer.appendChild(itemPagination);
    }
  });

  let leftArrow = document.createElement("button");
  leftArrow.className = leftArrow.id = classNames.leftArrow;
  leftArrow.textContent = "\u2190";
  carousel.appendChild(leftArrow);

  let rightArrow = document.createElement("button");
  rightArrow.className = rightArrow.id = classNames.rightArrow;
  rightArrow.textContent = "\u2192";
  carousel.appendChild(rightArrow);

  let goBackButton = document.getElementById(classNames.leftArrow);
  let nextButton = document.getElementById(classNames.rightArrow);

  carousel.addEventListener("click", setAutoPlay);
  goBackButton.addEventListener("click", displayPreviousSlide);
  nextButton.addEventListener("click", displayNextSlide);
  document.body.addEventListener("keydown", handleArrowKey);

  // dots
  let dots;
  if (showDots) {
    dots = document.createElement("div");
    carousel.appendChild(dots);
    dots.className = classNames.dotsBar;
    for (let i = 0; i < maxDotsToDisplay; i++) {
      let dot = document.createElement("span");
      dot.className = classNames.dot;
      dot.textContent = "\u00a0" + "⚫" + "\u00a0";
      dot.addEventListener("click", (event) => handleDotClick(event, i));
      dots.appendChild(dot);
    }

    dots = Array.from(document.getElementsByClassName(classNames.dot));
  }

  // Script
  let currentItemIndex = 0;
  let currentDotIndex = 0;
  let slides = Array.from(document.getElementsByClassName("item-container"));
  let timeout = "";
  let isAutoPlay = enabled;

  setSlidesToDisplayNone();
  setDotsToDefault();
  slides[currentItemIndex].style.display = "block";
  dots[currentDotIndex].className = classNames.dot + " current";

  if (enabled) {
    displayAutoCarousel();
  }

  function displayAutoCarousel() {
    timeout = setTimeout(displayAutoCarousel, speed);
    setSlidesToDisplayNone();
    setDotsToDefault();

    slides[currentItemIndex].style.display = "block";
    dots[currentDotIndex].className = classNames.dot + " current";
    ++currentItemIndex;
    ++currentDotIndex;

    if (currentItemIndex > slides.length - 1) {
      --currentItemIndex;
      --currentDotIndex;

      if (loop) {
        currentItemIndex = 0;
        currentDotIndex = 0;
      } else {
        clearTimeout(timeout);
      }
    }

    if (currentDotIndex === maxDotsToDisplay) {
      dots[currentDotIndex - 1].className = classNames.dot + " current";
      currentDotIndex = 0;
    }
  }

  function setAutoPlay() {
    isAutoPlay = !isAutoPlay;
    if (isAutoPlay && enabled) {
      displayAutoCarousel();
    } else {
      clearTimeout(timeout);
    }
  }

  function displayNextSlide(e) {
    e.stopPropagation();
    setSlidesToDisplayNone();
    setDotsToDefault();
    ++currentItemIndex;
    ++currentDotIndex;

    if (currentItemIndex > slides.length - 1) {
      currentItemIndex = 0;
    }
    if (currentDotIndex > maxDotsToDisplay - 1) {
      currentDotIndex = 0;
    }

    slides[currentItemIndex].style.display = "block";
    dots[currentDotIndex].className = classNames.dot + " current";
  }

  function displayPreviousSlide(event) {
    event.stopPropagation();
    setSlidesToDisplayNone();
    setDotsToDefault();

    if (currentItemIndex === 0) {
      currentItemIndex = slides.length;
    }

    if (currentDotIndex === 0) {
      currentDotIndex = maxDotsToDisplay;
    }

    --currentItemIndex;
    --currentDotIndex;
    slides[currentItemIndex].style.display = "block";
    dots[currentDotIndex].className = classNames.dot + " current";
  }

  function handleArrowKey(e) {
    switch (e.key) {
      case "ArrowRight":
        displayNextSlide(e);
        break;
      case "ArrowLeft":
        displayPreviousSlide(e);
        break;
    }
  }

  function handleDotClick(event, index) {
    event.stopPropagation();
    setSlidesToDisplayNone();
    setDotsToDefault();
    currentItemIndex = currentDotIndex = index;
    slides[currentItemIndex].style.display = "block";
    dots[currentDotIndex].className = classNames.dot + " current";
  }

  // Assist functions to turn slides and dots to inactive state
  function setSlidesToDisplayNone() {
    slides.forEach((slide) => (slide.style.display = "none"));
  }

  function setDotsToDefault() {
    dots.forEach((dot) => (dot.className = classNames.dot));
  }
}

// Calling the function
let movies = [
  {
    score: 17.95163,
    show: {
      id: 139,
      url: "https://www.tvmaze.com/shows/139/girls",
      name: "Girls",
      type: "Scripted",
      language: "English",
      genres: ["Drama", "Romance"],
      status: "Ended",
      runtime: 30,
      premiered: "2012-04-15",
      officialSite: "http://www.hbo.com/girls",
      schedule: { time: "22:00", days: ["Sunday"] },
      rating: { average: 6.6 },
      weight: 92,
      network: {
        id: 8,
        name: "HBO",
        country: {
          name: "United States",
          code: "US",
          timezone: "America/New_York",
        },
      },
      webChannel: null,
      dvdCountry: null,
      externals: { tvrage: 30124, thetvdb: 220411, imdb: "tt1723816" },
      image: {
        medium:
          "https://static.tvmaze.com/uploads/images/medium_portrait/31/78286.jpg",
        original:
          "https://static.tvmaze.com/uploads/images/original_untouched/31/78286.jpg",
      },
      summary:
        "<p>This Emmy winning series is a comic look at the assorted humiliations and rare triumphs of a group of girls in their 20s.</p>",
      updated: 1611310521,
      _links: {
        self: { href: "https://api.tvmaze.com/shows/139" },
        previousepisode: { href: "https://api.tvmaze.com/episodes/1079686" },
      },
    },
  },
  {
    score: 15.346094,
    show: {
      id: 23542,
      url: "https://www.tvmaze.com/shows/23542/good-girls",
      name: "Good Girls",
      type: "Scripted",
      language: "English",
      genres: ["Drama", "Comedy", "Crime"],
      status: "Running",
      runtime: 60,
      averageRuntime: 60,
      premiered: "2018-02-26",
      officialSite: "https://www.nbc.com/good-girls",
      schedule: { time: "22:00", days: ["Sunday"] },
      rating: { average: 7.4 },
      weight: 99,
      network: {
        id: 1,
        name: "NBC",
        country: {
          name: "United States",
          code: "US",
          timezone: "America/New_York",
        },
      },
      webChannel: null,
      dvdCountry: null,
      externals: { tvrage: null, thetvdb: 328577, imdb: "tt6474378" },
      image: {
        medium:
          "https://static.tvmaze.com/uploads/images/medium_portrait/297/744253.jpg",
        original:
          "https://static.tvmaze.com/uploads/images/original_untouched/297/744253.jpg",
      },
      summary:
        '<p><b>Good Girls</b> follows three "good girl" suburban wives and mothers who suddenly find themselves in desperate circumstances and decide to stop playing it safe, and risk everything to take their power back.</p>',
      updated: 1620050621,
      _links: {
        self: { href: "https://api.tvmaze.com/shows/23542" },
        previousepisode: { href: "https://api.tvmaze.com/episodes/2070100" },
        nextepisode: { href: "https://api.tvmaze.com/episodes/2074226" },
      },
    },
  },
  {
    score: 15.011682,
    show: {
      id: 33320,
      url: "https://www.tvmaze.com/shows/33320/derry-girls",
      name: "Derry Girls",
      type: "Scripted",
      language: "English",
      genres: ["Comedy"],
      status: "Running",
      runtime: 30,
      premiered: "2018-01-04",
      officialSite: "http://www.channel4.com/programmes/derry-girls",
      schedule: { time: "22:00", days: ["Tuesday"] },
      rating: { average: 8 },
      weight: 93,
      network: {
        id: 45,
        name: "Channel 4",
        country: {
          name: "United Kingdom",
          code: "GB",
          timezone: "Europe/London",
        },
      },
      webChannel: null,
      dvdCountry: null,
      externals: { tvrage: null, thetvdb: 338903, imdb: "tt7120662" },
      image: {
        medium:
          "https://static.tvmaze.com/uploads/images/medium_portrait/184/460240.jpg",
        original:
          "https://static.tvmaze.com/uploads/images/original_untouched/184/460240.jpg",
      },
      summary:
        "<p>16-year-old Erin Quinn lives with her uncompromising mother, her long-suffering father and the fearsome ‘Granda Joe', a man whose love for his daughters and granddaughters is surpassed only by his contempt for his son-in-law.</p><p>It's the early 90s, and Erin is used to seeing her country on the nightly news and speaking in acronyms (The IRA, The UDA, The RUC). This is a time of armed police in armoured Land Rovers and British Army check points. But it's also the time of Murder She Wrote, The Cranberries, MJ and Lisa Marie, Doc Martens, bomber jackets, The X Files, Nirvana and Wayne's World. And while The Troubles may hang over her home town, Erin has troubles of her own</p>",
      updated: 1608838190,
      _links: {
        self: { href: "https://api.tvmaze.com/shows/33320" },
        previousepisode: { href: "https://api.tvmaze.com/episodes/1631064" },
      },
    },
  },
  {
    score: 14.908456,
    show: {
      id: 722,
      url: "https://www.tvmaze.com/shows/722/the-golden-girls",
      name: "The Golden Girls",
      type: "Scripted",
      language: "English",
      genres: ["Drama", "Comedy"],
      status: "Ended",
      runtime: 30,
      premiered: "1985-09-14",
      officialSite: null,
      schedule: { time: "21:00", days: ["Saturday"] },
      rating: { average: 8.5 },
      weight: 90,
      network: {
        id: 1,
        name: "NBC",
        country: {
          name: "United States",
          code: "US",
          timezone: "America/New_York",
        },
      },
      webChannel: null,
      dvdCountry: null,
      externals: { tvrage: 5820, thetvdb: 71292, imdb: "tt0088526" },
      image: {
        medium:
          "https://static.tvmaze.com/uploads/images/medium_portrait/6/15097.jpg",
        original:
          "https://static.tvmaze.com/uploads/images/original_untouched/6/15097.jpg",
      },
      summary:
        "<p><b>The Golden Girls</b> follows four South Florida seniors sharing a house, their dreams, and a whole lot of cheesecake. Bright, promiscuous, clueless, and hilarious, these lovely mismatched ladies form the perfect circle of friends.</p>",
      updated: 1617572610,
      _links: {
        self: { href: "https://api.tvmaze.com/shows/722" },
        previousepisode: { href: "https://api.tvmaze.com/episodes/64040" },
      },
    },
  },
  {
    score: 14.871001,
    show: {
      id: 52731,
      url: "https://www.tvmaze.com/shows/52731/lbx-girls",
      name: "LBX Girls",
      type: "Animation",
      language: "Japanese",
      genres: ["Action", "Anime", "Science-Fiction"],
      status: "Running",
      runtime: 25,
      premiered: "2021-01-06",
      officialSite: null,
      schedule: { time: "07:00", days: ["Wednesday"] },
      rating: { average: null },
      weight: 0,
      network: {
        id: 132,
        name: "Tokyo MX",
        country: { name: "Japan", code: "JP", timezone: "Asia/Tokyo" },
      },
      webChannel: null,
      dvdCountry: null,
      externals: { tvrage: null, thetvdb: 391883, imdb: "tt12415562" },
      image: {
        medium:
          "https://static.tvmaze.com/uploads/images/medium_portrait/291/728664.jpg",
        original:
          "https://static.tvmaze.com/uploads/images/original_untouched/291/728664.jpg",
      },
      summary:
        "<p>In an unplanned field trip, Riko is transported to an alternate Japan where metal-based life forms known as Mimesis ravage the world. Only girls equipped with LBX armored weaponry can stand up to this scourge. Joined by four other displaced young women, Riko will have to adapt to save humanity. The hope of a planet now rests on these heavy metal soldiers who desire one wish—to return home again!</p>",
      updated: 1614189155,
      _links: {
        self: { href: "https://api.tvmaze.com/shows/52731" },
        previousepisode: { href: "https://api.tvmaze.com/episodes/2004426" },
      },
    },
  },
  {
    score: 14.426917,
    show: {
      id: 32087,
      url: "https://www.tvmaze.com/shows/32087/chicken-girls",
      name: "Chicken Girls",
      type: "Scripted",
      language: "English",
      genres: ["Drama", "Children", "Music"],
      status: "Running",
      runtime: 16,
      averageRuntime: 14,
      premiered: "2017-09-05",
      officialSite:
        "https://www.youtube.com/playlist?list=PLVewHiZp3_LPhqzbcZFmS3iuDm9HymTsy",
      schedule: { time: "15:00", days: ["Tuesday"] },
      rating: { average: 5.7 },
      weight: 68,
      network: null,
      webChannel: {
        id: 274,
        name: "Brat",
        country: {
          name: "United States",
          code: "US",
          timezone: "America/New_York",
        },
      },
      dvdCountry: null,
      externals: { tvrage: null, thetvdb: 339854, imdb: null },
      image: {
        medium:
          "https://static.tvmaze.com/uploads/images/medium_portrait/250/627433.jpg",
        original:
          "https://static.tvmaze.com/uploads/images/original_untouched/250/627433.jpg",
      },
      summary:
        "<p>Rhyme and her friends — known by their 'ship name, \"The Chicken Girls\" — have been dancing together forever. But this year, everything's changing...</p>",
      updated: 1619559679,
      _links: {
        self: { href: "https://api.tvmaze.com/shows/32087" },
        previousepisode: { href: "https://api.tvmaze.com/episodes/2053200" },
        nextepisode: { href: "https://api.tvmaze.com/episodes/2053201" },
      },
    },
  },
  {
    score: 13.987385,
    show: {
      id: 525,
      url: "https://www.tvmaze.com/shows/525/gilmore-girls",
      name: "Gilmore Girls",
      type: "Scripted",
      language: "English",
      genres: ["Drama", "Comedy", "Romance"],
      status: "Ended",
      runtime: 60,
      premiered: "2000-10-05",
      officialSite: null,
      schedule: { time: "21:00", days: ["Tuesday"] },
      rating: { average: 8.4 },
      weight: 84,
      network: {
        id: 5,
        name: "The CW",
        country: {
          name: "United States",
          code: "US",
          timezone: "America/New_York",
        },
      },
      webChannel: null,
      dvdCountry: null,
      externals: { tvrage: 3683, thetvdb: 76568, imdb: "tt0238784" },
      image: {
        medium:
          "https://static.tvmaze.com/uploads/images/medium_portrait/4/11308.jpg",
        original:
          "https://static.tvmaze.com/uploads/images/original_untouched/4/11308.jpg",
      },
      summary:
        "<p><b>Gilmore Girls</b> is a drama centering around the relationship between a thirtysomething single mother and her teen daughter living in Stars Hollow, Connecticut.</p>",
      updated: 1618158592,
      _links: {
        self: { href: "https://api.tvmaze.com/shows/525" },
        previousepisode: { href: "https://api.tvmaze.com/episodes/47639" },
      },
    },
  },
  {
    score: 13.782615,
    show: {
      id: 1591,
      url: "https://www.tvmaze.com/shows/1591/funny-girls",
      name: "Funny Girls",
      type: "Reality",
      language: "English",
      genres: ["Comedy"],
      status: "Ended",
      runtime: 60,
      premiered: "2015-04-07",
      officialSite: "http://www.oxygen.com/funny-girls",
      schedule: { time: "21:00", days: ["Tuesday"] },
      rating: { average: null },
      weight: 0,
      network: {
        id: 79,
        name: "Oxygen",
        country: {
          name: "United States",
          code: "US",
          timezone: "America/New_York",
        },
      },
      webChannel: null,
      dvdCountry: null,
      externals: { tvrage: 33049, thetvdb: 294185, imdb: "tt2884106" },
      image: {
        medium:
          "https://static.tvmaze.com/uploads/images/medium_portrait/12/31653.jpg",
        original:
          "https://static.tvmaze.com/uploads/images/original_untouched/12/31653.jpg",
      },
      summary:
        "<p>The series follows the professional and personal lives of six female comics in Los Angeles who are climbing their way to the top of the stand-up ladder. While the comediennes differ in their levels of experience, styles of comedy and ultimate career goals, they share the ambition - and the passion - needed to make it in the City of Dreams. From working multiple jobs, to clashing with parents' expectations, to yet another bad date, the comics provide a fresh, witty perspective on experiences to which young millennial women can relate.</p>",
      updated: 1521533918,
      _links: {
        self: { href: "https://api.tvmaze.com/shows/1591" },
        previousepisode: { href: "https://api.tvmaze.com/episodes/157051" },
      },
    },
  },
  {
    score: 13.445683,
    show: {
      id: 42726,
      url: "https://www.tvmaze.com/shows/42726/florida-girls",
      name: "Florida Girls",
      type: "Scripted",
      language: "English",
      genres: ["Comedy"],
      status: "Ended",
      runtime: 30,
      premiered: "2019-07-10",
      officialSite: "https://poptv.com/floridagirls",
      schedule: { time: "22:00", days: ["Wednesday"] },
      rating: { average: 6.5 },
      weight: 71,
      network: {
        id: 88,
        name: "Pop",
        country: {
          name: "United States",
          code: "US",
          timezone: "America/New_York",
        },
      },
      webChannel: null,
      dvdCountry: null,
      externals: { tvrage: null, thetvdb: 363682, imdb: "tt8548870" },
      image: {
        medium:
          "https://static.tvmaze.com/uploads/images/medium_portrait/203/508390.jpg",
        original:
          "https://static.tvmaze.com/uploads/images/original_untouched/203/508390.jpg",
      },
      summary:
        "<p><b>Florida Girls</b> follows four women who are forced to confront their stagnant lives when their only ambitious friend moves away to follow her dreams. Bound by their friendship, they will attempt to navigate life's curveballs while living below the poverty line.</p>",
      updated: 1583390100,
      _links: {
        self: { href: "https://api.tvmaze.com/shows/42726" },
        previousepisode: { href: "https://api.tvmaze.com/episodes/1673960" },
      },
    },
  },
];

let movies_images = movies.map((movie) => movie.show.image.medium);
let items = ["hamburger.png", "sandwich.png", "hot-dog.png"];

carouseLoop(
  items,
  { enabled: false, speed: 2000 },
  false,
  {
    showDots: true,
    maxDotsToDisplay: 3,
  },
  true,
  { width: 500, height: 250 },
  {
    carouselContainer: "carousel-container",
    itemContainer: "item-container",
    singleItem: "single-item",
    rightArrow: "next-item-arrow",
    leftArrow: "previous-item-arrow",
    dotsBar: "dots-bar",
    dot: "dot",
    itemPagination: "item-pagination",
  }
);
