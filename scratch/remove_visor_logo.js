const fs = require('fs');

let code = fs.readFileSync('build/assets/engine-BRf7lQZ-.js', 'utf8');

// Replace se.visible=!0 with se.visible=!1 in ze
const oldZeEnd = "le.uniforms.uTime.value=t%6500,D.visible=!1,T.visible=!1,ce.visible=!1,se.visible=!0}}";
const newZeEnd = "le.uniforms.uTime.value=t%6500,D.visible=!1,T.visible=!1,ce.visible=!1,se.visible=!1}}";

if (code.includes(oldZeEnd)) {
  code = code.replace(oldZeEnd, newZeEnd);
  console.log("Replaced oldZeEnd successfully!");
} else {
  console.log("Could not find oldZeEnd!");
}

// Also in He: for(let e of me)e.visible=s;
// Change me=[se] to me=[]
code = code.replace("me=[se]", "me=[]");

fs.writeFileSync('build/assets/engine-BRf7lQZ-.js', code);
console.log("Written updated engine-BRf7lQZ-.js!");
