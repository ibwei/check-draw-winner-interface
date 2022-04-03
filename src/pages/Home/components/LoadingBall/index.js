import React, { useEffect } from 'react'
import * as THREE from 'three'
import styled from 'styled-components'
import './three.js'

const Wrap = styled.div`
  position: relative;
  z-index: 9999;
  -webkit-box-reflect: below 0
    linear-gradient(0deg, rgba(250, 250, 250, 0.1), rgba(250, 250, 250, 0.05) 40%, transparent);
  width: 180px;
  height: 180px;
`

export default () => {
  useEffect(() => {
    let camera, scene, renderer, mainEl
    let geometry, mesh
    const numLat = 60
    const numLng = 100

    init()
    animate()

    function init() {
      mainEl = document.getElementById('whitePaperBall')
      if (!mainEl) {
        return
      }
      const { width, height } = mainEl.getBoundingClientRect()
      renderer = new THREE.WebGLRenderer({ antialias: true })
      renderer.setPixelRatio(window.devicePixelRatio)
      renderer.setSize(width, height)
      renderer.setClearColor(0xffffff, 0)
      mainEl.appendChild(renderer.domElement)
      // document.body.appendChild(renderer.domElement);

      scene = new THREE.Scene()

      camera = new THREE.PerspectiveCamera(45, width / height, 0.01, 10)
      camera.position.z = 3.5

      scene.add(new THREE.AmbientLight(0x444444))

      window.addEventListener('resize', onWindowResize)
      addLines(1.2)
    }

    function addLines(radius) {
      geometry = new THREE.BufferGeometry()
      const linePositions = new Float32Array(numLat * numLng * 3 * 2)
      const lineColors = new Float32Array(numLat * numLng * 3 * 2)
      const visible = new Float32Array(numLat * numLng * 2)

      for (let i = 0; i < numLat; ++i) {
        for (let j = 0; j < numLng; ++j) {
          const lat = (Math.random() * Math.PI) / 50.0 + (i / numLat) * Math.PI
          const lng = (Math.random() * Math.PI) / 50.0 + (j / numLng) * 2 * Math.PI

          const index = i * numLng + j

          linePositions[index * 6 + 0] = 0
          linePositions[index * 6 + 1] = 0
          linePositions[index * 6 + 2] = 0
          linePositions[index * 6 + 3] = radius * Math.sin(lat) * Math.cos(lng)
          linePositions[index * 6 + 4] = radius * Math.cos(lat)
          linePositions[index * 6 + 5] = radius * Math.sin(lat) * Math.sin(lng)

          const color = new THREE.Color(0xffffff)

          color.setHSL(lat / Math.PI, 1.0, 0.2)
          lineColors[index * 6 + 0] = color.r
          lineColors[index * 6 + 1] = color.g
          lineColors[index * 6 + 2] = color.b

          color.setHSL(lat / Math.PI, 1.0, 0.7)
          lineColors[index * 6 + 3] = color.r
          lineColors[index * 6 + 4] = color.g
          lineColors[index * 6 + 5] = color.b

          // non-0 is visible
          visible[index * 2 + 0] = 1.0
          visible[index * 2 + 1] = 1.0
        }
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3))
      geometry.setAttribute('vertColor', new THREE.BufferAttribute(lineColors, 3))
      geometry.setAttribute('visible', new THREE.BufferAttribute(visible, 1))

      geometry.computeBoundingSphere()

      const shaderMaterial = new THREE.ShaderMaterial({
        vertexShader: `
      attribute float visible;
      varying float vVisible;
      attribute vec3 vertColor;
      varying vec3 vColor;
      void main() {
      	vColor = vertColor;
      	vVisible = visible;
      	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
      }`,
        fragmentShader: `varying float vVisible;
      varying vec3 vColor;
      void main() {
      	if ( vVisible > 0.0 ) {
      		gl_FragColor = vec4( vColor, 1.0 );
      	} else {
      		discard;
      	}
      }`,
      })

      mesh = new THREE.LineSegments(geometry, shaderMaterial)
      scene.add(mesh)

      updateCount()
    }

    function updateCount() {
      // console.log('updateCount');
    }

    function onWindowResize() {
      mainEl = document.getElementById('whitePaperBall')
      if (!mainEl) {
        return
      }
      const { width, height } = mainEl.getBoundingClientRect()
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }

    function animate() {
      requestAnimationFrame(animate)

      const time = Date.now() * 0.001

      mesh.rotation.x = time * 0.25
      mesh.rotation.y = time * 0.5

      if (!scene) {
        return
      }

      renderer.render(scene, camera)
    }
    return () => {
      scene.remove(mesh)
      scene = null
      mainEl.innerHTML = ''
    }
  }, [])

  return <Wrap id="whitePaperBall"></Wrap>
}
