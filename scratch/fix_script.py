with open('scratch/build_all_active_theory_pillars.js', 'r', encoding='utf-8') as f:
    content = f.read()

target1 = """    // --- 2. Direct Instant Initialization (Zero Lag & 120 FPS Composited) ---
    sound.init();
}

    // --- 3. Modules Data Set ---"""

repl1 = """    // --- 2. Direct Instant Initialization (Zero Lag & 120 FPS Composited) ---
    const currentPillarNum = ${pillarNum};
    const isCurrentLeft = ${isLeftWing ? 'true' : 'false'};

    // --- 3. Modules Data Set ---"""

target2 = """    // --- 6. Spatial Directional Transition Orchestration (Left for 1-4, Right for 5-8) ---
    const currentPillarNum = ${pillarNum};
    const isCurrentLeft = ${isLeftWing ? 'true' : 'false'};
    function navigateWithDirection(targetUrl, direction) {"""

repl2 = """    // --- 6. Spatial Directional Transition Orchestration (Left for 1-4, Right for 5-8) ---
    function navigateWithDirection(targetUrl, direction) {"""

if target1 in content:
    content = content.replace(target1, repl1)
    print("Replaced target1")
else:
    print("Target1 not found")

if target2 in content:
    content = content.replace(target2, repl2)
    print("Replaced target2")
else:
    print("Target2 not found")

with open('scratch/build_all_active_theory_pillars.js', 'w', encoding='utf-8') as f:
    f.write(content)
print("Saved build_all_active_theory_pillars.js")

