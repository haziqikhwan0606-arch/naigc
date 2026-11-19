import json, struct, math, os

def norm3(v):
    l = math.sqrt(v[0]*v[0] + v[1]*v[1] + v[2]*v[2])
    return [v[0]/l, v[1]/l, v[2]/l] if l > 1e-6 else [0, 1, 0]

def cross(a, b):
    return [
        a[1]*b[2] - a[2]*b[1],
        a[2]*b[0] - a[0]*b[2],
        a[0]*b[1] - a[1]*b[0]
    ]

def add_quad(p_list, n_list, u_list, ind_list, v0, v1, v2, v3, n=None):
    if n is None:
        e1 = [v1[0]-v0[0], v1[1]-v0[1], v1[2]-v0[2]]
        e2 = [v2[0]-v0[0], v2[1]-v0[1], v2[2]-v0[2]]
        n = norm3(cross(e1, e2))
    base = len(p_list)
    p_list.extend([v0, v1, v2, v3])
    n_list.extend([n, n, n, n])
    u_list.extend([[0, 1], [1, 1], [1, 0], [0, 0]])
    ind_list.extend([base, base+1, base+2, base, base+2, base+3])

def add_box_chamfered(p_list, n_list, u_list, ind_list, w, h, d, ox=0, oy=0, oz=0, chamfer=0.04):
    hw, hh, hd = w/2, h/2, d/2
    c = min(chamfer, hw*0.4, hd*0.4)
    # Create an 8-sided cylinder-like prism extruded vertically
    # Top and bottom 8-gon + 8 side quads
    # Profile points around Y
    prof = [
        [-hw+c, -hd],
        [hw-c, -hd],
        [hw, -hd+c],
        [hw, hd-c],
        [hw-c, hd],
        [-hw+c, hd],
        [-hw, hd-c],
        [-hw, -hd+c]
    ]
    # Side quads
    for i in range(len(prof)):
        p1 = prof[i]
        p2 = prof[(i+1)%len(prof)]
        v0 = [p1[0] + ox, -hh + oy, p1[1] + oz]
        v1 = [p2[0] + ox, -hh + oy, p2[1] + oz]
        v2 = [p2[0] + ox, hh + oy, p2[1] + oz]
        v3 = [p1[0] + ox, hh + oy, p1[1] + oz]
        add_quad(p_list, n_list, u_list, ind_list, v0, v1, v2, v3)
        
    # Top face
    top_center = [ox, hh + oy, oz]
    bot_center = [ox, -hh + oy, oz]
    for i in range(len(prof)):
        p1 = prof[i]
        p2 = prof[(i+1)%len(prof)]
        # Top tri
        base = len(p_list)
        p_list.extend([top_center, [p1[0]+ox, hh+oy, p1[1]+oz], [p2[0]+ox, hh+oy, p2[1]+oz]])
        n_list.extend([[0, 1, 0], [0, 1, 0], [0, 1, 0]])
        u_list.extend([[0.5, 0.5], [0, 1], [1, 1]])
        ind_list.extend([base, base+1, base+2])
        # Bottom tri
        base = len(p_list)
        p_list.extend([bot_center, [p2[0]+ox, -hh+oy, p2[1]+oz], [p1[0]+ox, -hh+oy, p1[1]+oz]])
        n_list.extend([[0, -1, 0], [0, -1, 0], [0, -1, 0]])
        u_list.extend([[0.5, 0.5], [1, 1], [0, 1]])
        ind_list.extend([base, base+1, base+2])

def create_swept_wing(p_list, n_list, u_list, ind_list, side=1):
    # side = 1 for right, -1 for left
    # A sleek futuristic wing sweeping back
    x_in = 0.28 * side
    x_out = 0.44 * side
    y_bot = 0.35
    y_top = 1.82
    z_front = 0.12
    z_back = -0.26
    
    # Wing profile: outer beveled aerofoil
    v0 = [x_in, y_bot, z_front]
    v1 = [x_out, y_bot + 0.1, z_front - 0.05]
    v2 = [x_out, y_top - 0.1, z_front - 0.08]
    v3 = [x_in, y_top, z_front]
    
    v4 = [x_in, y_bot, z_back]
    v5 = [x_out, y_bot + 0.1, z_back + 0.05]
    v6 = [x_out, y_top - 0.1, z_back + 0.05]
    v7 = [x_in, y_top, z_back]
    
    if side > 0:
        add_quad(p_list, n_list, u_list, ind_list, v0, v1, v2, v3) # Front
        add_quad(p_list, n_list, u_list, ind_list, v5, v4, v7, v6) # Back
        add_quad(p_list, n_list, u_list, ind_list, v1, v5, v6, v2) # Outer side
        add_quad(p_list, n_list, u_list, ind_list, v4, v0, v3, v7) # Inner side
        add_quad(p_list, n_list, u_list, ind_list, v3, v2, v6, v7) # Top
        add_quad(p_list, n_list, u_list, ind_list, v4, v5, v1, v0) # Bottom
    else:
        add_quad(p_list, n_list, u_list, ind_list, v1, v0, v3, v2)
        add_quad(p_list, n_list, u_list, ind_list, v4, v5, v6, v7)
        add_quad(p_list, n_list, u_list, ind_list, v5, v1, v2, v6)
        add_quad(p_list, n_list, u_list, ind_list, v0, v4, v7, v3)
        add_quad(p_list, n_list, u_list, ind_list, v2, v3, v7, v6)
        add_quad(p_list, n_list, u_list, ind_list, v5, v4, v0, v1)

def pack_mesh_buffers(p_list, n_list, u_list, ind_list):
    pos_bytes = bytearray()
    min_pos = [float('inf')]*3
    max_pos = [float('-inf')]*3
    for p in p_list:
        pos_bytes += struct.pack("<3f", *p)
        for i in range(3):
            min_pos[i] = min(min_pos[i], p[i])
            max_pos[i] = max(max_pos[i], p[i])
            
    norm_bytes = bytearray()
    for n in n_list:
        norm_bytes += struct.pack("<3f", *n)
        
    uv_bytes = bytearray()
    for u in u_list:
        uv_bytes += struct.pack("<2f", *u)
        
    ind_bytes = bytearray()
    for idx in ind_list:
        ind_bytes += struct.pack("<H", idx)
        
    return {
        "pos": (bytes(pos_bytes), 34962, {"componentType": 5126, "count": len(p_list), "type": "VEC3", "min": min_pos, "max": max_pos}),
        "norm": (bytes(norm_bytes), 34962, {"componentType": 5126, "count": len(n_list), "type": "VEC3"}),
        "uv": (bytes(uv_bytes), 34962, {"componentType": 5126, "count": len(u_list), "type": "VEC2"}),
        "ind": (bytes(ind_bytes), 34963, {"componentType": 5123, "count": len(ind_list), "type": "SCALAR"}),
    }

# 1. BODY PANEL (Titanium Cyber Slate)
p_body, n_body, u_body, ind_body = [], [], [], []

# Floating multi-tier futuristic pedestal base
add_box_chamfered(p_body, n_body, u_body, ind_body, 0.94, 0.06, 0.88, ox=0, oy=0.03, oz=0.02, chamfer=0.18)
add_box_chamfered(p_body, n_body, u_body, ind_body, 0.82, 0.05, 0.76, ox=0, oy=0.08, oz=0.02, chamfer=0.14)
add_box_chamfered(p_body, n_body, u_body, ind_body, 0.68, 0.04, 0.64, ox=0, oy=0.12, oz=0.02, chamfer=0.10)

# Sculpted Central Spine (Waisted, chamfered column)
# Lower spine (angled slightly backwards)
add_box_chamfered(p_body, n_body, u_body, ind_body, 0.52, 0.55, 0.42, ox=0, oy=0.41, oz=0.01, chamfer=0.09)
# Mid spine / power junction
add_box_chamfered(p_body, n_body, u_body, ind_body, 0.46, 0.35, 0.38, ox=0, oy=0.82, oz=0.03, chamfer=0.08)
# Upper spine / screen backing
add_box_chamfered(p_body, n_body, u_body, ind_body, 0.56, 0.68, 0.34, ox=0, oy=1.34, oz=-0.02, chamfer=0.07)

# Side Aerodynamic Wings (Left & Right)
create_swept_wing(p_body, n_body, u_body, ind_body, side=-1)
create_swept_wing(p_body, n_body, u_body, ind_body, side=1)

# Touch control deck (Floating angled glass & titanium pedestal)
add_box_chamfered(p_body, n_body, u_body, ind_body, 0.66, 0.045, 0.32, ox=0, oy=1.03, oz=0.22, chamfer=0.06)

# Top floating sensor arch / crown
add_box_chamfered(p_body, n_body, u_body, ind_body, 0.62, 0.09, 0.36, ox=0, oy=1.83, oz=0.02, chamfer=0.08)

# Screen mounting floating brackets (precision titanium arms)
add_box_chamfered(p_body, n_body, u_body, ind_body, 0.04, 0.48, 0.06, ox=-0.28, oy=1.45, oz=0.08, chamfer=0.01)
add_box_chamfered(p_body, n_body, u_body, ind_body, 0.04, 0.48, 0.06, ox=0.28, oy=1.45, oz=0.08, chamfer=0.01)

body_packed = pack_mesh_buffers(p_body, n_body, u_body, ind_body)

# 2. CONTINUOUS NEON CYAN EDGE CONDUITS (Continuous_blue_edge_-1)
p_edge, n_edge, u_edge, ind_edge = [], [], [], []

# Glowing neon light blades tracing the outer swept wings
add_box_chamfered(p_edge, n_edge, u_edge, ind_edge, 0.02, 1.40, 0.02, ox=-0.44, oy=1.12, oz=-0.04, chamfer=0.005)
add_box_chamfered(p_edge, n_edge, u_edge, ind_edge, 0.02, 1.40, 0.02, ox=0.44, oy=1.12, oz=-0.04, chamfer=0.005)

# Glowing front wing accents
add_box_chamfered(p_edge, n_edge, u_edge, ind_edge, 0.015, 1.35, 0.015, ox=-0.43, oy=1.10, oz=0.10, chamfer=0.004)
add_box_chamfered(p_edge, n_edge, u_edge, ind_edge, 0.015, 1.35, 0.015, ox=0.43, oy=1.10, oz=0.10, chamfer=0.004)

# Base concentric neon light ring
add_box_chamfered(p_edge, n_edge, u_edge, ind_edge, 0.86, 0.012, 0.80, ox=0, oy=0.085, oz=0.02, chamfer=0.15)

# Deck glowing cyan perimeter lip
add_box_chamfered(p_edge, n_edge, u_edge, ind_edge, 0.68, 0.012, 0.015, ox=0, oy=1.045, oz=0.37, chamfer=0.003)

# Screen top and bottom holographic projector light bars
add_box_chamfered(p_edge, n_edge, u_edge, ind_edge, 0.58, 0.018, 0.03, ox=0, oy=1.69, oz=0.04, chamfer=0.004)
add_box_chamfered(p_edge, n_edge, u_edge, ind_edge, 0.58, 0.018, 0.03, ox=0, oy=1.21, oz=0.19, chamfer=0.004)

edge_packed = pack_mesh_buffers(p_edge, n_edge, u_edge, ind_edge)

# 3. GOLD NEURAL ACCENTS (Circuit Conduits & Touch Interface)
p_gold, n_gold, u_gold, ind_gold = [], [], [], []

# Golden spine heat-sink conduits
for i in range(5):
    y_pos = 0.40 + i * 0.16
    add_box_chamfered(p_gold, n_gold, u_gold, ind_gold, 0.44, 0.016, 0.018, ox=0, oy=y_pos, oz=0.22, chamfer=0.003)

# Interactive neural touch nodes (4 glowing gold contact rings)
for ox in [-0.20, -0.07, 0.07, 0.20]:
    add_box_chamfered(p_gold, n_gold, u_gold, ind_gold, 0.055, 0.008, 0.055, ox=ox, oy=1.058, oz=0.24, chamfer=0.012)

# Top marquee NAIGC gold crest plate
add_box_chamfered(p_gold, n_gold, u_gold, ind_gold, 0.42, 0.025, 0.012, ox=0, oy=1.85, oz=0.19, chamfer=0.003)

gold_packed = pack_mesh_buffers(p_gold, n_gold, u_gold, ind_gold)

# 4. HOLOGRAPHIC SCREEN GLASS (Screen_glass)
# Tilted 17.8 degrees (0.310 rad), w=0.54, h=0.44, centered at [0, 1.45, 0.11]
# We make it a full thin 3D beveled glass plate so Ad(e, t) gets proper bounding box!
hw, hh, hd = 0.54/2, 0.44/2, 0.008
ca = math.cos(0.310)
sa = math.sin(0.310)
ox, oy, oz = 0, 1.45, 0.11

# Vertices rotated around X
def rot_pt(x, y, z):
    return [x + ox, y*ca - z*sa + oy, y*sa + z*ca + oz]

sc_p, sc_n, sc_u, sc_ind = [], [], [], []
v0 = rot_pt(-hw, -hh, hd)
v1 = rot_pt(hw, -hh, hd)
v2 = rot_pt(hw, hh, hd)
v3 = rot_pt(-hw, hh, hd)
n_front = [0, sa, ca]
add_quad(sc_p, sc_n, sc_u, sc_ind, v0, v1, v2, v3, n_front)

v4 = rot_pt(hw, -hh, -hd)
v5 = rot_pt(-hw, -hh, -hd)
v6 = rot_pt(-hw, hh, -hd)
v7 = rot_pt(hw, hh, -hd)
n_back = [0, -sa, -ca]
add_quad(sc_p, sc_n, sc_u, sc_ind, v4, v5, v6, v7, n_back)

# Sides
add_quad(sc_p, sc_n, sc_u, sc_ind, v1, v4, v7, v2)
add_quad(sc_p, sc_n, sc_u, sc_ind, v5, v0, v3, v6)
add_quad(sc_p, sc_n, sc_u, sc_ind, v3, v2, v7, v6)
add_quad(sc_p, sc_n, sc_u, sc_ind, v4, v1, v0, v5)

screen_packed = pack_mesh_buffers(sc_p, sc_n, sc_u, sc_ind)

# PBR Materials with high specular and metallic luster
materials = [
    # 0: Dark Cyber Titanium Body (Sleek dark graphite with specular sheen)
    {
        "name": "Dark_cyber_titanium",
        "pbrMetallicRoughness": {
            "baseColorFactor": [0.08, 0.12, 0.18, 1.0],
            "metallicFactor": 0.88,
            "roughnessFactor": 0.28
        }
    },
    # 1: Neon Cyan Light Blade (Emissive glow)
    {
        "name": "Neon_cyan_blade",
        "pbrMetallicRoughness": {
            "baseColorFactor": [0.0, 0.95, 1.0, 1.0],
            "metallicFactor": 0.0,
            "roughnessFactor": 0.08
        },
        "emissiveFactor": [0.0, 0.95, 1.0]
    },
    # 2: Radiant Gold Neural Accent
    {
        "name": "Radiant_gold_neural",
        "pbrMetallicRoughness": {
            "baseColorFactor": [0.96, 0.64, 0.08, 1.0],
            "metallicFactor": 0.92,
            "roughnessFactor": 0.16
        },
        "emissiveFactor": [0.55, 0.35, 0.02]
    },
    # 3: Holographic Screen Glass
    {
        "name": "Holographic_screen_glass",
        "pbrMetallicRoughness": {
            "baseColorFactor": [0.0, 0.02, 0.06, 1.0],
            "metallicFactor": 0.12,
            "roughnessFactor": 0.05
        }
    }
]

buffers_data = []

def register_part(packed_dict, mat_idx):
    pos_idx = len(buffers_data)
    buffers_data.append(packed_dict["pos"])
    norm_idx = len(buffers_data)
    buffers_data.append(packed_dict["norm"])
    uv_idx = len(buffers_data)
    buffers_data.append(packed_dict["uv"])
    ind_idx = len(buffers_data)
    buffers_data.append(packed_dict["ind"])
    return {
        "primitives": [{
            "attributes": {
                "POSITION": pos_idx,
                "NORMAL": norm_idx,
                "TEXCOORD_0": uv_idx
            },
            "indices": ind_idx,
            "material": mat_idx,
            "mode": 4
        }]
    }

meshes = [
    register_part(body_packed, 0),
    register_part(edge_packed, 1),
    register_part(gold_packed, 2),
    register_part(screen_packed, 3)
]

nodes = [
    {"name": "Body_panel_00", "mesh": 0},
    {"name": "Continuous_blue_edge_-1", "mesh": 1},
    {"name": "Gold_accents", "mesh": 2},
    {"name": "Screen_glass", "mesh": 3}
]

import build_kiosk
glb_bytes = build_kiosk.build_glb(nodes, meshes, materials, buffers_data)

out_path = "memory-quest/landing-v4/cyber-kiosk.glb"
with open(out_path, "wb") as f:
    f.write(glb_bytes)

print(f"Generated High-Poly Advanced Cyber Kiosk ({len(glb_bytes)} bytes) at {out_path}")
