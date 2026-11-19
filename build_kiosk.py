import json, struct, math, os

# Helper to pack a GLB file
def build_glb(nodes, meshes, materials, buffers_data):
    # Combine buffers
    bin_chunk = bytearray()
    buffer_views = []
    accessors = []
    
    # buffers_data is a list of (data_bytes, target_buffer_view_type, accessor_info)
    byte_offset = 0
    for data, target, acc_info in buffers_data:
        # Align to 4 bytes
        pad = (4 - (len(data) % 4)) % 4
        padded_data = data + b'\x00' * pad
        
        bv_idx = len(buffer_views)
        buffer_views.append({
            "buffer": 0,
            "byteOffset": byte_offset,
            "byteLength": len(data),
            "target": target
        })
        byte_offset += len(padded_data)
        bin_chunk += padded_data
        
        acc_dict = {
            "bufferView": bv_idx,
            "byteOffset": 0,
            "componentType": acc_info["componentType"],
            "count": acc_info["count"],
            "type": acc_info["type"],
        }
        if "min" in acc_info:
            acc_dict["min"] = acc_info["min"]
        if "max" in acc_info:
            acc_dict["max"] = acc_info["max"]
            
        accessors.append(acc_dict)
        
    gltf = {
        "asset": {"version": "2.0", "generator": "NAIGC Cyber Kiosk Builder"},
        "scenes": [{"nodes": list(range(len(nodes)))}],
        "scene": 0,
        "nodes": nodes,
        "meshes": meshes,
        "materials": materials,
        "accessors": accessors,
        "bufferViews": buffer_views,
        "buffers": [{"byteLength": len(bin_chunk)}]
    }
    
    json_str = json.dumps(gltf, separators=(',', ':'))
    json_bytes = json_str.encode('utf-8')
    pad_json = (4 - (len(json_bytes) % 4)) % 4
    json_bytes += b' ' * pad_json
    
    # GLB Header (12 bytes) + JSON Chunk Header (8 bytes) + JSON Chunk + BIN Chunk Header (8 bytes) + BIN Chunk
    total_len = 12 + 8 + len(json_bytes) + 8 + len(bin_chunk)
    glb = bytearray()
    glb += struct.pack("<4sII", b'glTF', 2, total_len)
    glb += struct.pack("<I4s", len(json_bytes), b'JSON')
    glb += json_bytes
    glb += struct.pack("<I4s", len(bin_chunk), b'BIN\x00')
    glb += bin_chunk
    return bytes(glb)

print("GLB builder library ready")
