/// <amd-module name="redhat.che-js-plugin"/>
'use strict';
import {initActions} from './actions';
export function activate(ctx:any){
    ctx.imageRegistry.registerFactory("cjp.imageFactory", ()=>{
      let el = document.createElement("img");
      el.src = "https://png.icons8.com/mushroom-cloud/androidL/32";
      return el;
        
    });
    initActions(ctx);
}