/**
 * This is your TypeScript entry file for Foundry VTT.
 * Register custom settings, sheets, and constants using the Foundry API.
 * Change this heading to be more descriptive to your module, or remove it.
 * Author: [your name]
 * Content License: [copyright and-or license] If using an existing system
 * 					you may want to put a (link to a) license or copyright
 * 					notice here (e.g. the OGL).
 * Software License: [your license] Put your desired license here, which
 * 					 determines how others may use and modify your module
 */
// Import JavaScript modules

// Import TypeScript modules
import { registerSettings } from './module/settings';
import { preloadTemplates } from './module/preloadTemplates';
import { initHooks, readyHooks, setupHooks } from './module/module';
import CONSTANTS from './module/constants';
import type API from './module/api';

/* ------------------------------------ */
/* Initialize module					*/
/* ------------------------------------ */
Hooks.once('init', async () => {
  console.log(`${CONSTANTS.MODULE_NAME} | Initializing ${CONSTANTS.MODULE_NAME}`);

  // Register custom module settings
  registerSettings();

  initHooks();
  // Assign custom classes and constants here

  // Register custom module settings
  //registerSettings();
  //fetchParams();

  // Preload Handlebars templates
  await preloadTemplates();
  // Register custom sheets (if any)
});

/* ------------------------------------ */
/* Setup module							*/
/* ------------------------------------ */
Hooks.once('setup', function () {
  // Do anything after initialization but before ready
  //setupModules();

  setupHooks();

  //registerSettings();
});

/* ------------------------------------ */
/* When ready							*/
/* ------------------------------------ */
Hooks.once('ready', () => {
  // Do anything once the module is ready
  // if (!game.modules.get("lib-wrapper")?.active && game.user.isGM){
  // 	ui.notifications.error(`The '${MODULE_NAME}' module requires to install and activate the 'libWrapper' module.`);
  // 	return;
  // }

  readyHooks();
});

/* ------------------------------------ */
/* Other Hooks							*/
/* ------------------------------------ */

export interface ChatPortraitModuleData {
  api: typeof API;
  socket: any;
}

/**
 * Initialization helper, to set API.
 * @param api to set to game module.
 */
export function setApi(api: typeof API): void {
  const data = game.modules.get(CONSTANTS.MODULE_NAME) as unknown as ChatPortraitModuleData;
  data.api = api;
}

/**
 * Returns the set API.
 * @returns Api from games module.
 */
export function getApi(): typeof API {
  const data = game.modules.get(CONSTANTS.MODULE_NAME) as unknown as ChatPortraitModuleData;
  return data.api;
}

/**
 * Initialization helper, to set Socket.
 * @param socket to set to game module.
 */
export function setSocket(socket: any): void {
  const data = game.modules.get(CONSTANTS.MODULE_NAME) as unknown as ChatPortraitModuleData;
  data.socket = socket;
}

/*
 * Returns the set socket.
 * @returns Socket from games module.
 */
export function getSocket() {
  const data = game.modules.get(CONSTANTS.MODULE_NAME) as unknown as ChatPortraitModuleData;
  return data.socket;
}

Hooks.once('libChangelogsReady', function () {
  //@ts-ignore
  libChangelogs.register(
    CONSTANTS.MODULE_NAME,
    `
    - Complete rewriting of the project and application of a better design pattern to manage the multisystem css.
    - Each system now has its own css file to customize, here I ask the community for help to find the best style to apply to each system, there remains the possibility for the individual player to apply their own customized style.
    - Update of the settings panel, abandoned the customized dialogue in favor of the standard foundry method and moved most of the settings from the 'world' scope to the 'client' scope so each player can apply their own preferences.
    - Readme update where I try to explain as best I can how to apply the css for your system and or the image mapping for the "ImageReplacer" feature.
    - I certainly foresee problems in case you can install the latest version of the 0.6.X series at this url https://github.com/ShoyuVanilla/FoundryVTT-Chat-Portrait/releases/download/v0.6.4/module.json
    `,
    'minor',
  );
});
