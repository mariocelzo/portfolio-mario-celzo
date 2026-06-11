// TxAscii3D — Torus knot 3D renderizzato come caratteri ASCII (Three.js + AsciiEffect)
// L'oggetto ruota lentamente e reagisce al mouse con un parallax delicato.
// Three viene importato dinamicamente: resta fuori dal bundle principale.

import { useEffect, useRef } from "react";

export function TxAscii3D() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Rispetta prefers-reduced-motion: nessun effetto animato
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    (async () => {
      // Import dinamici: il chunk three viene scaricato solo quando serve
      const THREE = await import("three");
      const { AsciiEffect } = await import("three/examples/jsm/effects/AsciiEffect.js");
      if (cancelled || !ref.current) return;

      const container = ref.current;
      const W = container.clientWidth;
      const H = container.clientHeight;

      // ── Scena: torus knot con materiale flat per chiaroscuro netto ──
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(50, W / H, 1, 1000);
      camera.position.z = 28;

      // Luci direzionali (niente decay fisico → luminosità prevedibile)
      const key = new THREE.DirectionalLight(0xffffff, 2.2);
      key.position.set(8, 10, 12);
      const fill = new THREE.DirectionalLight(0xffffff, 0.6);
      fill.position.set(-10, -6, -8);
      scene.add(key, fill, new THREE.AmbientLight(0xffffff, 0.15));

      const mesh = new THREE.Mesh(
        new THREE.TorusKnotGeometry(8, 2.6, 180, 28),
        new THREE.MeshPhongMaterial({ flatShading: true })
      );
      scene.add(mesh);

      // ── Renderer WebGL → AsciiEffect lo converte in tabella di caratteri ──
      const renderer = new THREE.WebGLRenderer({ antialias: false });
      renderer.setSize(W, H);
      const effect = new AsciiEffect(renderer, " .:-+*=%@#", { invert: true, resolution: 0.2 });
      effect.setSize(W, H);
      // Override stile: crema su trasparente, font del sito
      effect.domElement.style.color = "var(--ink)";
      effect.domElement.style.backgroundColor = "transparent";
      effect.domElement.style.fontFamily = '"JetBrains Mono", monospace';
      container.appendChild(effect.domElement);

      // ── Parallax: il mouse inclina leggermente l'oggetto ──
      let mx = 0, my = 0;
      const onMouse = (e: MouseEvent) => {
        mx = (e.clientX / window.innerWidth - 0.5) * 0.6;
        my = (e.clientY / window.innerHeight - 0.5) * 0.6;
      };
      window.addEventListener("mousemove", onMouse, { passive: true });

      // ── Loop animazione — in pausa quando fuori viewport ──
      let raf = 0;
      let running = true;
      const start = Date.now();
      const animate = () => {
        if (!running) return;
        const t = (Date.now() - start) * 0.0004;
        mesh.rotation.x = t * 0.9 + my;
        mesh.rotation.y = t * 1.3 + mx;
        effect.render(scene, camera);
        raf = requestAnimationFrame(animate);
      };
      const io = new IntersectionObserver(([e]) => {
        running = e.isIntersecting;
        if (running) animate();
        else cancelAnimationFrame(raf);
      });
      io.observe(container);

      cleanup = () => {
        running = false;
        cancelAnimationFrame(raf);
        io.disconnect();
        window.removeEventListener("mousemove", onMouse);
        renderer.dispose();
        mesh.geometry.dispose();
        (mesh.material as { dispose(): void }).dispose();
        effect.domElement.remove();
      };
    })();

    return () => { cancelled = true; cleanup?.(); };
  }, []);

  return <div ref={ref} className="tx-fx tx-fx--ascii" aria-hidden="true" />;
}
