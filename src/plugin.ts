'use strict';
import { initActions } from './actions';

export function activate(ctx: PluginContext) {
  let d = ctx.getApi().imageRegistry.registerFactory("cjp.imageFactory", () => {
    let el = document.createElement("img");
    el.src = "https://png.icons8.com/mushroom-cloud/androidL/32";
    return el;
  });

  ctx.addDisposable(d);
  initActions(ctx);

}

export function deactivate(ctx: PluginContext){

}