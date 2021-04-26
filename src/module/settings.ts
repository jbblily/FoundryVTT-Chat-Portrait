import { debug, log, setDebugLevel, warn, i18n } from '../main';
//@ts-ignore
import ColorSetting from '/modules/colorsettings/colorSetting.js';
import { ChatPortraitForm } from './ChatPortraitForm';
import { ChatPortrait } from './ChatPortrait';

export const MODULE_NAME = 'chat-portrait';

/**
 * Because typescript doesn't know when in the lifecycle of foundry your code runs, we have to assume that the
 * canvas is potentially not yet initialized, so it's typed as declare let canvas: Canvas | {ready: false}.
 * That's why you get errors when you try to access properties on canvas other than ready.
 * In order to get around that, you need to type guard canvas.
 * Also be aware that this will become even more important in 0.8.x because no canvas mode is being introduced there.
 * So you will need to deal with the fact that there might not be an initialized canvas at any point in time.
 * @returns
 */
 export function getCanvas(): Canvas {
  if (!(canvas instanceof Canvas) || !canvas.ready) {
      throw new Error("Canvas Is Not Initialized");
  }
  return canvas;
}

export const registerSettings = function () {

  game.settings.registerMenu(MODULE_NAME, MODULE_NAME, {
      name: i18n(MODULE_NAME+".form"),
      label: i18n(MODULE_NAME+".form-title"),
      hint: i18n(MODULE_NAME+".form-hint"),
      icon: "fas fa-portrait",
      type: ChatPortraitForm,
      restricted: true
  });

  game.settings.register(MODULE_NAME, "settings", {
      name: "Chat Portrait Settings",
      scope: "world",
      default: ChatPortrait.defaultSettings,
      type: Object,
      config: false,
      onChange: (x: any) => {
        window.location.reload();
      }
  });

  // Form setitngs

  game.settings.register(MODULE_NAME, 'useTokenImage', {
    scope: 'world',
    config: false,
    type: Boolean,
    default: false
  });

  game.settings.register(MODULE_NAME, 'portraitSize', {
    scope: 'world',
    config: false,
    type: Number,
    default: 36
  });

  game.settings.register(MODULE_NAME, 'borderShape', {
      scope: 'world',
      config: false,
      type: String,
      default: "square"
  });

  game.settings.register(MODULE_NAME, 'useUserColorAsBorderColor', {
    scope: 'world',
    config: false,
    type: Boolean,
    default: true
  });

  new ColorSetting(MODULE_NAME, 'borderColor', {
      label: "Pick color",
      restricted: false,
      defaultColor: hexToRGBAString(0x000000, 1),
      scope: "client"
  });

  game.settings.register(MODULE_NAME, 'borderWidth', {
    scope: 'world',
    config: false,
    type: Number,
    default: 2
  });

  game.settings.register(MODULE_NAME, 'useUserColorAsChatBackgroundColor', {
    scope: 'world',
    config: false,
    type: Boolean,
    default:false
  });

  game.settings.register(MODULE_NAME, 'useUserColorAsChatBorderColor', {
    scope: 'world',
    config: false,
    type: Boolean,
    default: false
  });

  game.settings.register(MODULE_NAME, 'flavorNextToPortrait', {
    scope: 'world',
    config: false,
    type: Boolean,
    default: false
  });

  game.settings.register(MODULE_NAME, 'forceNameSearch', {
    scope: 'world',
    config: false,
    type: Boolean,
    default: false
  });

}

// function setup(templateSettings) {
// 	templateSettings.settings().forEach(setting => {
// 		let options = {
// 			name: i18n(templateSettings.name()+"."+setting.name+'.Name'),
// 			hint: i18n(`${templateSettings.name()}.${setting.name}.Hint`),
// 			scope: setting.scope,
// 			config: true,
// 			default: setting.default,
// 			type: setting.type,
// 			choices: {}
// 		};
// 		if (setting.choices) options.choices = setting.choices;
// 		game.settings.register(templateSettings.name(), setting.name, options);
// 	});
// }
