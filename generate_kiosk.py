import json, struct, math, os

def create_box_mesh(w, h, d, ox=0, oy=0, oz=0):
    hw, hh, hd = w/2, h/2, d/2
    # 6 faces * 4 vertices = 24 vertices
    # Each vertex has (position: 3f, normal: 3f, uv: 2f)
    faces = [
        # Front (+Z)
        ([-hw, -hh, hd], [hw, -hh, hd], [hw, hh, hd], [-hw, hh, hd], [0, 0, 1]),
        # Back (-Z)
        ([hw, -hh, -hd], [-hw, -hh, -hd], [-hw, hh, -hd], [hw, hh, -hd], [0, 0, -1]),
        # Top (+Y)
        ([-hw, hh, hd], [hw, hh, hd], [hw, hh, -hd], [-hw, hh, -hd], [0, 1, 0]),
        # Bottom (-Y)
        ([-hw, -hh, -hd], [hw, -hh, -hd], [hw, -hh, hd], [-hw, -hh, hd], [0, -1, 0]),
        # Right (+X)
        ([hw, -hh, hd], [hw, -hh, -hd], [hw, hh, -hd], [hw, hh, hd], [1, 0, 0]),
        # Left (-X)
        ([-hw, -hh, -hd], [-hw, -hh, hd], [-hw, hh, hd], [-hw, hh, -hd], [-1, 0, 0]),
    ]
    
    positions = []
    normals = []
    uvs = []
    indices = []
    
    uv_coords = [[0, 1], [1, 1], [1, 0], [0, 0]]
    v_idx = 0
    for v0, v1, v2, v3, norm in faces:
        for i, v in enumerate([v0, v1, v2, v3]):
            positions.append([v[0] + ox, v[1] + oy, v[2] + oz])
            normals.append(norm)
            uvs.append(uv_coords[i])
        indices.extend([v_idx, v_idx + 1, v_idx + 2, v_idx, v_idx + 2, v_idx + 3])
        v_idx += 4
        
    return positions, normals, uvs, indices

def create_tilted_quad(w, h, angle_rad, ox=0, oy=0, oz=0):
    # Quad rotated around X by angle_rad
    hw, hh = w/2, h/2
    ca = math.cos(angle_rad)
    sa = math.sin(angle_rad)
    # normal points outward (+Z tilted by angle)
    norm = [0, sa, ca]
    
    # 4 corners
    raw_corners = [
        [-hw, -hh],
        [hw, -hh],
        [hw, hh],
        [-hw, hh]
    ]
    positions = []
    normals = []
    uvs = []
    uv_coords = [[0, 1], [1, 1], [1, 0], [0, 0]]
    for i, (x, y) in enumerate(raw_corners):
        # Rotate around X: y_rot = y*ca, z_rot = -y*sa
        py = y * ca
        pz = -y * sa
        positions.append([x + ox, py + oy, pz + oz])
        normals.append(norm)
        uvs.append(uv_coords[i])
        
    indices = [0, 1, 2, 0, 2, 3]
    return positions, normals, uvs, indices

def pack_mesh_data(positions, normals, uvs, indices):
    pos_bytes = bytearray()
    min_pos = [float('inf')]*3
    max_pos = [float('-inf')]*3
    for p in positions:
        pos_bytes += struct.pack("<3f", *p)
        for i in range(3):
            min_pos[i] = min(min_pos[i], p[i])
            max_pos[i] = max(max_pos[i], p[i])
            
    norm_bytes = bytearray()
    for n in normals:
        norm_bytes += struct.pack("<3f", *n)
        
    uv_bytes = bytearray()
    for u in uvs:
        uv_bytes += struct.pack("<2f", *u)
        
    ind_bytes = bytearray()
    for idx in indices:
        ind_bytes += struct.pack("<H", idx)
        
    return {
        "pos": (bytes(pos_bytes), 34962, {"componentType": 5126, "count": len(positions), "type": "VEC3", "min": min_pos, "max": max_pos}),
        "norm": (bytes(norm_bytes), 34962, {"componentType": 5126, "count": len(normals), "type": "VEC3"}),
        "uv": (bytes(uv_bytes), 34962, {"componentType": 5126, "count": len(uvs), "type": "VEC2"}),
        "ind": (bytes(ind_bytes), 34963, {"componentType": 5123, "count": len(indices), "type": "SCALAR"}),
    }

# Build the complete Cyber Kiosk components!
# 1. Body: Sleek Pedestal Base, Slender Tapered Spine, Touch Shelf, Screen Hood
pos_all = []
norm_all = []
uv_all = []
ind_all = []

def add_part(p, n, u, ind):
    base_v = len(pos_all)
    pos_all.extend(p)
    norm_all.extend(n)
    uv_all.extend(u)
    ind_all.extend([i + base_v for i in ind])

# Base platform (hexagonal/wide futuristic pod)
p, n, u, ind = create_box_mesh(0.88, 0.08, 0.88, ox=0, oy=0.04, oz=0)
add_part(p, n, u, ind)
# Base tier 2
p, n, u, ind = create_box_mesh(0.76, 0.06, 0.76, ox=0, oy=0.10, oz=0.02)
add_part(p, n, u, ind)

# Main spine / vertical pillar (sleek dark titanium)
p, n, u, ind = create_box_mesh(0.56, 1.15, 0.38, ox=0, oy=0.72, oz=-0.04)
add_part(p, n, u, ind)

# Control deck shelf / neural interface
p, n, u, ind = create_box_mesh(0.68, 0.06, 0.34, ox=0, oy=1.02, oz=0.22)
add_part(p, n, u, ind)

# Top hood / crown (Marquee canopy)
p, n, u, ind = create_box_mesh(0.62, 0.14, 0.36, ox=0, oy=1.84, oz=0.02)
add_part(p, n, u, ind)

# Side aerodynamic wings
p, n, u, ind = create_box_mesh(0.04, 1.40, 0.46, ox=-0.34, oy=1.15, oz=0.04)
add_part(p, n, u, ind)
p, n, u, ind = create_box_mesh(0.04, 1.40, 0.46, ox=0.34, oy=1.15, oz=0.04)
add_part(p, n, u, ind)

body_packed = pack_mesh_data(pos_all, norm_all, uv_all, ind_all)

# 2. Glowing Edge Conduits (Continuous_blue_edge_-1)
p_edge, n_edge, u_edge, ind_edge = [], [], [], []
def add_edge_part(p, n, u, ind):
    base_v = len(p_edge)
    p_edge.extend(p)
    n_edge.extend(n)
    u_edge.extend(u)
    ind_edge.extend([i + base_v for i in ind])

# Edge rails left and right
p, n, u, ind = create_box_mesh(0.025, 1.42, 0.025, ox=-0.36, oy=1.15, oz=0.25)
add_edge_part(p, n, u, ind)
p, n, u, ind = create_box_mesh(0.025, 1.42, 0.025, ox=0.36, oy=1.15, oz=0.25)
add_edge_part(p, n, u, ind)
# Base ring edge
p, n, u, ind = create_box_mesh(0.90, 0.015, 0.90, ox=0, oy=0.075, oz=0)
add_edge_part(p, n, u, ind)
# Deck front edge
p, n, u, ind = create_box_mesh(0.70, 0.02, 0.02, ox=0, oy=1.04, oz=0.38)
add_edge_part(p, n, u, ind)
# Top canopy light
p, n, u, ind = create_box_mesh(0.64, 0.025, 0.025, ox=0, oy=1.89, oz=0.18)
add_edge_part(p, n, u, ind)

edge_packed = pack_mesh_data(p_edge, n_edge, u_edge, ind_edge)

# 3. Holographic Screen Glass (Screen_glass)
# Tilted 17.8 degrees (0.310 rad), w=0.54, h=0.44, centered at [0, 1.44, 0.12]
screen_p, screen_n, screen_u, screen_ind = create_tilted_quad(0.54, 0.44, 0.310, ox=0, oy=1.44, oz=0.12)
screen_packed = pack_mesh_data(screen_p, screen_n, screen_u, screen_ind)

# 4. Touch Sensor Nodes (Interactive touch pads)
p_touch, n_touch, u_touch, ind_touch = [], [], [], []
def add_touch_part(p, n, u, ind):
    base_v = len(p_touch)
    p_touch.extend(p)
    n_touch.extend(n)
    u_touch.extend(u)
    ind_touch.extend([i + base_v for i in ind])

# 4 circular/square touch nodes with gold/cyan emissive
for i, ox in enumerate([-0.20, -0.07, 0.07, 0.20]):
    p, n, u, ind = create_box_mesh(0.065, 0.012, 0.065, ox=ox, oy=1.055, oz=0.25)
    add_touch_part(p, n, u, ind)

touch_packed = pack_mesh_data(p_touch, n_touch, u_touch, ind_touch)

# Build Materials
materials = [
    # 0: Dark Cyber Titanium (Body)
    {
        "name": "Dark_cyber_titanium",
        "pbrMetallicRoughness": {
            "baseColorFactor": [0.04, 0.07, 0.12, 1.0],
            "metallicFactor": 0.88,
            "roughnessFactor": 0.22
        }
    },
    # 1: Neon Cyan Light Rail
    {
        "name": "Neon_cyan_light",
        "pbrMetallicRoughness": {
            "baseColorFactor": [0.0, 0.9, 1.0, 1.0],
            "metallicFactor": 0.0,
            "roughnessFactor": 0.1
        },
        "emissiveFactor": [0.0, 0.9, 1.0]
    },
    # 2: Holographic Screen Glass
    {
        "name": "Holographic_screen_glass",
        "pbrMetallicRoughness": {
            "baseColorFactor": [0.0, 0.02, 0.05, 1.0],
            "metallicFactor": 0.1,
            "roughnessFactor": 0.08
        }
    },
    # 3: Gold Neural Touch Node
    {
        "name": "Gold_neural_touch",
        "pbrMetallicRoughness": {
            "baseColorFactor": [0.96, 0.62, 0.05, 1.0],
            "metallicFactor": 0.9,
            "roughnessFactor": 0.15
        },
        "emissiveFactor": [0.7, 0.45, 0.02]
    }
]

# Assemble buffers and accessors
buffers_data = []

def register_part(packed_dict, mat_idx):
    # packed_dict has pos, norm, uv, ind
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
    register_part(screen_packed, 2),
    register_part(touch_packed, 3)
]

nodes = [
    {"name": "Body_panel_00", "mesh": 0},
    {"name": "Continuous_blue_edge_-1", "mesh": 1},
    {"name": "Screen_glass", "mesh": 2},
    {"name": "Touch_interface", "mesh": 3}
]

import build_kiosk
glb_bytes = build_kiosk.build_glb(nodes, meshes, materials, buffers_data)

out_path = "memory-quest/landing-v4/cyber-kiosk.glb"
with open(out_path, "wb") as f:
    f.write(glb_bytes)

print(f"Successfully generated {out_path} ({len(glb_bytes)} bytes)")
