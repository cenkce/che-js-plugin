'use strict';
import { initActions } from './actions';
import { HelloPart } from './HelloPart';
import {handleEvents} from './events';
import './clock/clock.css';

const  snowflake = require('./snowflake.svg');
const inter = require('./internet.png');
export function activate(ctx: PluginContext) {
  let d = ctx.getApi().imageRegistry.registerFactory("cjp.imageFactory", () => {
    let el = document.createElement("img");
    el.src = "https://png.icons8.com/mushroom-cloud/androidL/32";
    return el;
  });

  ctx.getApi().imageRegistry.registerHtml("js.plugin.svg", snowflake);
  ctx.getApi().imageRegistry.registerUrl("js.plugin.png", inter);

  ctx.addDisposable(d);
  handleEvents(ctx);
  initActions(ctx);
}

export function deactivate(ctx: PluginContext){

}