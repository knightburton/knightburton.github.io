export const links = [
  { key: 'linkedin', url: 'https://www.linkedin.com/in/imre-kiss-8b7778140/' },
  { key: 'facebook', url: 'https://www.facebook.com/imre.kiss.777' },
  { key: 'twitter', url: 'https://twitter.com/KnightBurton' },
  { key: 'instagram', url: 'https://www.instagram.com/knightburton/' },
  { key: 'twitch', url: 'https://www.twitch.tv/knightburton' },
  { key: 'github', url: 'https://github.com/knightburton' },
  { key: 'bitbucket', url: 'https://bitbucket.org/knightburton/' }
];

const gamePlatforms = {
  desktop: 'desktop',
  laptop: 'laptop',
  tablet: 'tablet',
  mobile: 'mobile'
};

const gameEngines = {
  phaser: {
    name: 'Phaser',
    link: 'https://github.com/photonstorm/phaser'
  },
  melonjs: {
    name: 'melonJS',
    link: 'https://github.com/melonjs/melonjs'
  },
  es5: {
    name: 'EcmaScript 5',
    link: 'https://www.w3schools.com/js/js_es5.asp'
  }
};

export const games = [
  {
    key: 'pr0j3ctB4c0n',
    name: 'Project Bacon',
    link: 'https://github.com/MassConfusion/ProjectBacon',
    demo: null,
    image: 'bacon.jpg',
    engine: gameEngines.phaser,
    info: 'Co-op game with socket.io',
    description: `
      This an early stage co-op game project created by the MassConfusion organization (where I am a contributor).
      This is gonna be a browser based multiplayer tank battle 'io' game powered by the Phaser game engine. Be ready...
    `,
    platforms: [
      gamePlatforms.desktop,
      gamePlatforms.laptop
    ]
  },
  {
    key: 'm4n03uvr3',
    name: 'THE manoeuVRe',
    link: 'https://github.com/knightburton/the-manoeuvre',
    demo: null,
    image: 'platformer.jpg',
    engine: gameEngines.melonjs,
    info: 'Platformer rage game',
    description: `
      This one is a bit different than the above, this is my first game with a browser based game engine.
      This is a platformer rage (just a little) game which was inspired by TheVR youtube/twitch channel.
      The first version (I want to say, the first level) uses the Melon JS game engine.
      In the future I would like to rewrite the game and use the Phaser game engine (which has more feature).
    `,
    platforms: [
      gamePlatforms.desktop,
      gamePlatforms.laptop
    ]
  },
  {
    key: 'sp4c3Bubbl35',
    name: 'Space Bubbles',
    link: 'https://github.com/knightburton/SpaceBubbles',
    demo: 'http://knightburton.github.io/SpaceBubbles/',
    image: 'space-bubbles.jpg',
    engine: gameEngines.es5,
    info: 'Bubble shooter game',
    description: `
      This one is my first HTML5 canvas based javascript game.
      This is a traditional 'bubble shooter' game, similar like Zuma, Bubble Witch saga or Puzzle Bubble.
      With the difference that this has an old school design, 8bit graphics, music and sound effects.
    `,
    platforms: [
      gamePlatforms.desktop,
      gamePlatforms.laptop
    ]
  },
  {
    key: 'c0l0r5',
    name: '#Colors',
    link: 'https://github.com/knightburton/Colors',
    demo: 'https://knightburton.github.io/Colors/',
    image: 'colors.jpg',
    engine: gameEngines.es5,
    info: 'Colors magic',
    description: `
      Ok, this is my first browser based javascript game. A little fun with colors.
      If you want to improve your eyesight this will be the best game for you.
      Basically, you have to pair the colors with each other, like a memory game but not really...
    `,
    platforms: [
      gamePlatforms.desktop,
      gamePlatforms.laptop,
      gamePlatforms.tablet,
      gamePlatforms.mobile
    ]
  }
];

export const contributions = [
  {
    key: 'iotjscode',
    name: 'IoT.js VSCode extension',
    link: 'https://github.com/Samsung/iotjs-vscode-extension',
    image: '',
    description: `
      IoT.js VSCode Extension is a debugger and language (like intelliSense, hover, ...)
      extension for Visual Studio Code that lets you debug the code which is running on a device,
      lets you upload your code to the device, directly from the VSCode over websocket communication and helps you to write code with IoT.js.
    `
  },
  {
    key: 'iotjsvscode',
    name: 'IoT.js Code',
    link: 'https://github.com/Samsung/iotjscode',
    image: 'iotjscode.jpg',
    description: `
      IoT.js Code is an online editor with debugger tools for IoT.js that lets you debug the code which is running on a device
      and lets you upload your code to the device, directly from the browser, with the power of WebSocket.
      The users can able to edit their own javascript code, within the integrated Monaco editor.
    `
  },
  {
    key: 'jerryscript',
    name: 'JerryScript',
    link: 'https://github.com/jerryscript-project/jerryscript',
    image: 'jerryscript.jpg',
    description: `
      JerryScript is a lightweight JavaScript engine for resource-constrained devices such as microcontrollers.
      It can run on devices with less than 64 KB of RAM and less than 200 KB of flash memory.
      Features: Full ECMAScript 5.1 standard compliance, 160K binary size when compiled for ARM Thumb-2,
      heavily optimized for low memory consumption, written in C99 for maximum portability,
      snapshot support for precompiling JavaScript source code to byte code, mature C API, easy to embed in applications.
    `
  },
  {
    key: 'iotjs',
    name: 'IoT.js',
    link: 'https://github.com/Samsung/iotjs',
    image: 'iotjs.jpg',
    description: `
      IoT.js aims to provide inter-operable service platform in the world of IoT, based on web technology.
      The target of IoT.js is to run in resource constrained devices such as only few kilobytes of RAM available device.
      Thus it will supports very wide range of "Things".
      IoT.js is just taking the first steps and would like to get together with developers who has interests on our goal.
    `
  },
  {
    key: 'testresults',
    name: 'IoT.js - JerryScript test results',
    link: 'https://github.com/Samsung/iotjs-test-results/tree/merge-webpages',
    image: '',
    description: `
      The purpose of the project is to show the official IoT.js and JerryScript test-suite results on different platforms.
      The testing happens once a day (at UTC 17:00) using the latest master and the result are visible on this project's gh-pages.
    `
  }
];

export const works = [
  {
    key: 'borafa',
    name: 'Borafa',
    link: 'http://www.borafa.hu/',
    image: 'borafa.jpg',
    description: `
      This is a simple webshop where you can buy handmade jewellery which are made of corkwood.
      The website using React.js, Bootsrtap, jQuery and a few useful smart package.
      The source code of this site is not available public. If you find something weird or buggy, just ignore that for now, the site is under development.
    `
  },
  {
    key: 'medgyesiautomento',
    name: 'Medgyesi Autómentő',
    link: 'http://medgyesiautomento.hu/',
    image: 'medgyesiautomento.jpg',
    description: `
      This site was made for a car rescure company. A simple static website with basic text informations and images.
      The site uses javascript, jQuery and Bootstrap and optimalized for mobile devices.
      Single page styled (easy to use on a cell phones) and search engine optimalized.
    `
  },
  {
    key: 'automentesszeged',
    name: 'Autómentés Szeged',
    link: 'http://www.automentes-szeged.hu/',
    image: 'automentesszeged.jpg',
    description: `
      This is similar then the previous one. A sinlge page styled static website for advertising the same thing, car rescue, just for an other company.
      This page is also uses javascript, jQuery and Bootstrap and also optiomalized for mobile devices and you can find it easly in google.
    `
  },
  {
    key: 'adventist',
    name: 'SDA - Hódmezővásárhely',
    link: 'http://sda.hu/hodmezo/',
    image: 'adventist.jpg',
    description: `
      This is the Seventh Day Adventist world church Hódmezővásárhely's website.
      A simple information portal where anyone can read about the locale programs of the church and get information about meetings, events.
      This was made with PHP, javascript and jQuery. This was my first dynamic page what I made from the scratch.
      This is includes user management, event management, email management and uses a medum size database.
      This is a really old work of mine, the new and modern version is under development.
    `
  }
];
