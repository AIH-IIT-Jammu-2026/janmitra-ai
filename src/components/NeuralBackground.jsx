import { useEffect, useRef } from 'react'

export default function NeuralBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationId
    let particles = []
    let nodes = []

    function resize() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Create nodes
    for (let i = 0; i < 18; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 2 + 1,
        pulse: Math.random() * Math.PI * 2,
      })
    }

    // Create particles
    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        radius: Math.random() * 1 + 0.3,
        opacity: Math.random() * 0.4 + 0.1,
      })
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw background gradient
      const grad = ctx.createRadialGradient(
        canvas.width * 0.3, canvas.height * 0.3, 0,
        canvas.width * 0.3, canvas.height * 0.3, canvas.width * 0.7
      )
      grad.addColorStop(0, 'rgba(37, 99, 235, 0.04)')
      grad.addColorStop(0.5, 'rgba(11, 36, 71, 0.02)')
      grad.addColorStop(1, 'rgba(4, 13, 26, 0)')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const time = Date.now() * 0.001

      // Move nodes
      nodes.forEach(n => {
        n.x += n.vx
        n.y += n.vy
        n.pulse += 0.02
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1
      })

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 220) {
            const opacity = (1 - dist / 220) * 0.18
            const gradient = ctx.createLinearGradient(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y)
            gradient.addColorStop(0, `rgba(56, 189, 248, ${opacity})`)
            gradient.addColorStop(0.5, `rgba(96, 165, 250, ${opacity * 1.5})`)
            gradient.addColorStop(1, `rgba(56, 189, 248, ${opacity})`)
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.strokeStyle = gradient
            ctx.lineWidth = 0.8
            ctx.stroke()
          }
        }
      }

      // Draw nodes
      nodes.forEach(n => {
        const pulseFactor = 0.6 + 0.4 * Math.sin(n.pulse)
        const r = n.radius * pulseFactor
        const glow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r * 6)
        glow.addColorStop(0, `rgba(56, 189, 248, ${0.6 * pulseFactor})`)
        glow.addColorStop(0.5, `rgba(37, 99, 235, ${0.2 * pulseFactor})`)
        glow.addColorStop(1, 'rgba(37, 99, 235, 0)')
        ctx.beginPath()
        ctx.arc(n.x, n.y, r * 6, 0, Math.PI * 2)
        ctx.fillStyle = glow
        ctx.fill()

        ctx.beginPath()
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(96, 165, 250, ${0.8 * pulseFactor})`
        ctx.fill()
      })

      // Draw particles
      particles.forEach(p => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(96, 165, 250, ${p.opacity})`
        ctx.fill()
      })

      animationId = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  )
}
