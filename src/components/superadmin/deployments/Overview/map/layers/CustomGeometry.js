import {SimpleMeshLayer} from '@deck.gl/mesh-layers';
import { Geometry } from '@luma.gl/engine';
import * as THREE from 'three';

/**
 * Geometry helper, 2D shape -> 3D geometry(luma.gl)
 * @function
 * @param {number} size - scaling
 * @return {Geometry} geometry
 * @see {@link https://threejs.org/docs/index.html#api/en/geometries/ExtrudeBufferGeometry|THREE.ExtrudeBufferGeometry}
 * @see {@link https://threejs.org/docs/index.html#api/en/extras/core/Shape|THREE.Shape}
 */
export function CustomGeometry ({ size, m, holed }) {

    const shape = new THREE.Shape();

    shape.moveTo(0, 0);
    shape.lineTo(size, 0);
    shape.lineTo(size, size );
    shape.lineTo(0, size);
    shape.lineTo(0, 0);

    // 3D shape (extruded)
    const geometry = new THREE.ExtrudeBufferGeometry(shape, {
        depth: size/350,
        bevelEnabled: false, bevelSegments: 8, steps: 12, bevelSize: 1, bevelThickness: 1
    });

    // face indices generation
    const indices = Array.from(Array(geometry.attributes.position.count), (x, i) => i);

    // luma.gl custom geometry
    return new Geometry({
        attributes: {
            indices: new Uint16Array(indices),
            positions: geometry.attributes.position.array,
            texCoords: geometry.attributes.uv.array,
            normals: geometry.attributes.normal.array
        },
    });

};
