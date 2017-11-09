'use strict';
import { initActions } from './actions';

export default function activate(ctx: CheApi) {
  ctx.imageRegistry.registerFactory("cjp.imageFactory", () => {
    let el = document.createElement("img");
    el.src = "https://png.icons8.com/mushroom-cloud/androidL/32";
    return el;
  });

  initActions(ctx);
}