const fs = require('fs');
const path = require('path');

const enginePath = path.join(__dirname, '../build/assets/engine-BRf7lQZ-.js');
let code = fs.readFileSync(enginePath, 'utf8');

// 1. Update initial exposure and environmentIntensity in Xt
code = code.replace(
  /g\.toneMapping=4,g\.toneMappingExposure=\.42,/g,
  "g.toneMapping=4,g.toneMappingExposure=0.92,"
);

code = code.replace(
  /b\.environment=_e,b\.environmentIntensity=\.04/g,
  "b.environment=_e,b.environmentIntensity=0.85"
);

// 2. Update initial HemisphereLight sky/ground colors and intensity
code = code.replace(
  /let te=new se\(1708068,197128,\.04\),w=new F\(16771282,\.1\);/g,
  "let te=new se(13691647,10535136,0.9),w=new F(16775920,1.4);"
);

// 3. Update dynamic light update in _t(e)
const oldLightUpdate = "te.intensity=.03+n*.03+a*.02+o*.2,w.intensity=.08+n*.08+a*.08+o*.7,T.intensity=.015+n*.02+a*.02+o*.12,ce.intensity=.48+a*.16+o*.28,le.intensity=.05+a*.1+o*.14,E.intensity=o*.28,D.intensity=a*.12+o*.18,de.intensity=o*.62,O.intensity=1.6+o*.85,Oe.intensity=.06+o*.16,g.toneMappingExposure=.36+n*.05+o*.3,b.environmentIntensity=.02+o*.14";

const newLightUpdate = "te.intensity=0.85+n*0.2+a*0.2+o*0.45,w.intensity=1.2+n*0.4+a*0.4+o*1.1,T.intensity=0.45+n*0.15+a*0.15+o*0.35,ce.intensity=0.85+a*0.25+o*0.45,le.intensity=0.55+a*0.2+o*0.35,E.intensity=0.45+o*0.35,D.intensity=0.35+a*0.15+o*0.25,de.intensity=0.75+o*0.45,O.intensity=1.6+o*0.85,Oe.intensity=0.2+o*0.25,g.toneMappingExposure=0.88+n*0.1+o*0.22,b.environmentIntensity=0.7+o*0.4";

if (code.includes(oldLightUpdate)) {
  code = code.replace(oldLightUpdate, newLightUpdate);
  console.log("Successfully replaced dynamic light updates in _t(e)");
} else {
  console.error("Could not find oldLightUpdate in engine-BRf7lQZ-.js");
}

fs.writeFileSync(enginePath, code, 'utf8');
console.log("engine-BRf7lQZ-.js updated successfully with bright daylight 3D model lighting!");
