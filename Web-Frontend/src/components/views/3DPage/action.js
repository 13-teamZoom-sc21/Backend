/* import React, { useEffect, useState } from 'react'
import './style.css'
import * as THREE from 'three'
import OBJLoader from 'three-obj-loader';
OBJLoader(THREE);

function Index() {
    useEffect(() => {
        let three = THREE;
        const canvas = document.querySelector('#c');
        const renderer = new THREE.WebGLRenderer({ canvas });

        const fov = 45;
        const aspect = 2;  // the canvas default
        const near = 0.1;
        const far = 100;
        const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        camera.position.set(0, 10, 20);


        const scene = new THREE.Scene();
        scene.background = new THREE.Color('black');

        {
            const planeSize = 40;

            const loader = new THREE.TextureLoader();
            const texture = loader.load('https://threejsfundamentals.org/threejs/resources/images/checker.png');
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;
            texture.magFilter = THREE.NearestFilter;
            const repeats = planeSize / 2;
            texture.repeat.set(repeats, repeats);

            const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize);
            const planeMat = new THREE.MeshPhongMaterial({
                map: texture,
                side: THREE.DoubleSide,
            });
            const mesh = new THREE.Mesh(planeGeo, planeMat);
            mesh.rotation.x = Math.PI * -.5;
            scene.add(mesh);
        }

        {
            const skyColor = 0xB1E1FF;  // light blue
            const groundColor = 0xB97A20;  // brownish orange
            const intensity = 1;
            const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
            scene.add(light);
        }

        {
            const color = 0xFFFFFF;
            const intensity = 1;
            const light = new THREE.DirectionalLight(color, intensity);
            light.position.set(0, 10, 0);
            light.target.position.set(-5, 0, 0);
            scene.add(light);
            scene.add(light.target);
        }

        {
            const objLoader = new three.OBJLoader(`C:/Users/woasi/Downloads/megurigaoka-gakuin-koutou-gakkou-classroom/GeneralClassroom_uv.obj`, (root) => {
                console.log(root);
                scene.add(root);
            });

            console.log(objLoader);
            console.log(`${process.env.PUBLIC_URL}/images`);
        }

        function resizeRendererToDisplaySize(renderer) {
            const canvas = renderer.domElement;
            const width = canvas.clientWidth;
            const height = canvas.clientHeight;
            const needResize = canvas.width !== width || canvas.height !== height;
            if (needResize) {
                renderer.setSize(width, height, false);
            }
            return needResize;
        }

        function render() {

            if (resizeRendererToDisplaySize(renderer)) {
                const canvas = renderer.domElement;
                camera.aspect = canvas.clientWidth / canvas.clientHeight;
                camera.updateProjectionMatrix();
            }

            renderer.render(scene, camera);

            requestAnimationFrame(render);
        }

        requestAnimationFrame(render);
    }, [])

    return (
        <canvas width="1200" height='600' id="c"></canvas>
    )
}

export default Index
 */