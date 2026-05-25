export default function App() {
  return (
    <div className="bg-white min-h-screen text-gray-900" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* Header */}
      <header className="border-b border-gray-200 px-12 py-8 text-center">
        <h1 className="text-2xl font-semibold tracking-wide text-gray-800">Welcome to my Portfolio</h1>
        <p className="text-gray-400 text-sm mt-1 font-mono">Maxime Malouf</p>
      </header>

      {/* Nav */}
      <nav className="sticky top-0 bg-white border-b border-gray-200 px-12 flex gap-2 pt-4 z-50">
        <a href="#about" className="px-6 py-3 text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors">About Me</a>
        <a href="#process" className="px-6 py-3 text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors">How I Work</a>
        <a href="#work" className="px-6 py-3 text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors">Case Studies</a>
      </nav>

      <main className="px-12 py-12 space-y-12">

        {/* About */}
        <section id="about" className="bg-blue-600 rounded-md p-10">
          <h2 className="text-3xl font-semibold text-white mb-6">About Me</h2>
          <p className="text-blue-100 text-lg leading-relaxed mb-4">
            Hello, my name is Maxime. I'm currently studying Computer Science, building a strong foundation in programming, design, and problem-solving.
          </p>
          <p className="text-blue-100 text-lg leading-relaxed mb-4">
            I'm passionate about creating clean, user-friendly digital experiences that actually make sense to people.
          </p>
          <p className="text-blue-100 text-lg leading-relaxed">
            Outside of school, I love sports — I play hockey and follow it closely. Whether it's on the ice or watching a game, hockey is a big part of who I am.
          </p>
        </section>

  {/* Process */}
<section id="process" className="bg-emerald-600 rounded-md p-10">
  <h2 className="text-3xl font-semibold text-white mb-6">How I Work</h2>
  <div className="space-y-4 text-emerald-100 text-lg leading-relaxed">
    <p>
      I have hands-on experience building projects with <span className="text-white font-medium">HTML, CSS, and JavaScript</span> — including a fully designed <span className="text-white font-medium">Amazon mockup</span> where I recreated the layout and shopping experience from scratch.
    </p>
    <p>
      I'm comfortable working with the fundamentals of the web — structuring pages, styling components, and adding interactivity — and I'm always looking to improve my craft with each project.
    </p>
    <p>
      I'm currently taking a <span className="text-white font-medium">UI design course</span> where I'm learning core design elements, user interface principles, and how to think about digital products from a user's perspective.
    </p>
    <p>
      As the semester progresses, I'll be building on these skills — exploring <span className="text-white font-medium">user-centered design</span>, <span className="text-white font-medium">heuristic evaluation</span>, and translating that knowledge into real case studies.
    </p>
  </div>
</section>

        {/* Case Studies */}
        <section id="work" className="bg-violet-600 rounded-md p-10">
          <h2 className="text-3xl font-semibold text-white mb-8">Case Studies</h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              { n: "01", title: "Shear Perfection", sub: "Hairdresser Service Site", tag: "Service Design", img: "/Hair.jpg" },
              { n: "02", title: "Flip & Remember", sub: "Memory Card Game", tag: "Game Design", img: "/Memory.PNG" },
              { n: "03", title: "Thread & Form", sub: "Clothing E-Commerce", tag: "E-Commerce", img: "/Commerce.PNG" },
              { n: "04", title: "StatEdge", sub: "Sport Analytics Dashboard", tag: "Data Visualization", img: "/Analytics.png" },
            ].map(({ n, title, sub, tag, img }) => (
              <div key={n} className="bg-white/10 hover:bg-white/20 transition-colors p-6 rounded-sm cursor-pointer">
                <div className="flex justify-between items-start mb-6">
                  <span className="text-xs font-mono text-violet-300">{n}</span>
                  <span className="text-xs font-mono bg-white/10 px-2 py-1 rounded-full text-violet-200">{tag}</span>
                </div>
                <img src={img} alt={title} className="w-full h-36 object-cover rounded-sm mb-4" />
                <h3 className="text-white font-semibold text-lg">{title}</h3>
                <p className="text-violet-200 text-sm">{sub}</p>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="px-12 py-6 border-t border-gray-200 flex justify-between text-gray-400 text-xs font-mono">
        <span>Maxime Malouf</span>
        <span>© 2026</span>
      </footer>

    </div>
  )
}