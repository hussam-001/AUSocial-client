System.register(["./index-legacy-684c45ce.js"],(function(e,t){"use strict";var a,n,r,i;return{setters:[e=>{a=e.W,n=e.C,r=e.o,i=e.q}],execute:function(){class t extends a{async getPhoto(e){return new Promise((async(t,a)=>{if(e.webUseInput||e.source===n.Photos)this.fileInputExperience(e,t);else if(e.source===n.Prompt){let n=document.querySelector("pwa-action-sheet");n||(n=document.createElement("pwa-action-sheet"),document.body.appendChild(n)),n.header=e.promptLabelHeader||"Photo",n.cancelable=!1,n.options=[{title:e.promptLabelPhoto||"From Photos"},{title:e.promptLabelPicture||"Take Picture"}],n.addEventListener("onSelection",(async n=>{0===n.detail?this.fileInputExperience(e,t):this.cameraExperience(e,t,a)}))}else this.cameraExperience(e,t,a)}))}async pickImages(e){return new Promise((async e=>{this.multipleFileInputExperience(e)}))}async cameraExperience(e,t,a){if(customElements.get("pwa-camera-modal")){const o=document.createElement("pwa-camera-modal");o.facingMode=e.direction===r.Front?"user":"environment",document.body.appendChild(o);try{await o.componentOnReady(),o.addEventListener("onPhoto",(async n=>{const r=n.detail;null===r?a(new i("User cancelled photos app")):r instanceof Error?a(r):t(await this._getCameraPhoto(r,e)),o.dismiss(),document.body.removeChild(o)})),o.present()}catch(n){this.fileInputExperience(e,t)}}else console.error("Unable to load PWA Element 'pwa-camera-modal'. See the docs: https://capacitorjs.com/docs/web/pwa-elements."),this.fileInputExperience(e,t)}fileInputExperience(e,t){let a=document.querySelector("#_capacitor-camera-input");const i=()=>{var e;null===(e=a.parentNode)||void 0===e||e.removeChild(a)};a||(a=document.createElement("input"),a.id="_capacitor-camera-input",a.type="file",a.hidden=!0,document.body.appendChild(a),a.addEventListener("change",(n=>{const r=a.files[0];let o="jpeg";if("image/png"===r.type?o="png":"image/gif"===r.type&&(o="gif"),"dataUrl"===e.resultType||"base64"===e.resultType){const a=new FileReader;a.addEventListener("load",(()=>{if("dataUrl"===e.resultType)t({dataUrl:a.result,format:o});else if("base64"===e.resultType){const e=a.result.split(",")[1];t({base64String:e,format:o})}i()})),a.readAsDataURL(r)}else t({webPath:URL.createObjectURL(r),format:o}),i()}))),a.accept="image/*",a.capture=!0,e.source===n.Photos||e.source===n.Prompt?a.removeAttribute("capture"):e.direction===r.Front?a.capture="user":e.direction===r.Rear&&(a.capture="environment"),a.click()}multipleFileInputExperience(e){let t=document.querySelector("#_capacitor-camera-input-multiple");t||(t=document.createElement("input"),t.id="_capacitor-camera-input-multiple",t.type="file",t.hidden=!0,t.multiple=!0,document.body.appendChild(t),t.addEventListener("change",(a=>{const n=[];for(let e=0;e<t.files.length;e++){const a=t.files[e];let r="jpeg";"image/png"===a.type?r="png":"image/gif"===a.type&&(r="gif"),n.push({webPath:URL.createObjectURL(a),format:r})}var r;e({photos:n}),null===(r=t.parentNode)||void 0===r||r.removeChild(t)}))),t.accept="image/*",t.click()}_getCameraPhoto(e,t){return new Promise(((a,n)=>{const r=new FileReader,i=e.type.split("/")[1];"uri"===t.resultType?a({webPath:URL.createObjectURL(e),format:i,saved:!1}):(r.readAsDataURL(e),r.onloadend=()=>{const e=r.result;"dataUrl"===t.resultType?a({dataUrl:e,format:i,saved:!1}):a({base64String:e.split(",")[1],format:i,saved:!1})},r.onerror=e=>{n(e)})}))}async checkPermissions(){if("undefined"==typeof navigator||!navigator.permissions)throw this.unavailable("Permissions API not available in this browser");try{return{camera:(await window.navigator.permissions.query({name:"camera"})).state,photos:"granted"}}catch(e){throw this.unavailable("Camera permissions are not available in this browser")}}async requestPermissions(){throw this.unimplemented("Not implemented on web.")}async pickLimitedLibraryPhotos(){throw this.unavailable("Not implemented on web.")}async getLimitedLibraryPhotos(){throw this.unavailable("Not implemented on web.")}}e("CameraWeb",t),e("Camera",new t)}}}));
