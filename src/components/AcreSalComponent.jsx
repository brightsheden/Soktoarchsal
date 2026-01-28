import React from 'react';
import { motion } from 'framer-motion';
import { Cloud, Home, Landmark, AlertTriangle } from 'lucide-react';

const components = [
  {
    icon: <Cloud size={32} className="text-primary-light" />,
    image: "https://img.freepik.com/premium-photo/ground-drought-fields-ground-drought-sunrise-background_416458-247.jpg?w=740",
    title: "COMPONENT A",
    subtitle: "Dryland Management​",
    desc: "Implementing integrated watershed management planning and addressing challenges of large-scale watershed degradation in northern Nigeria."
  },
  {
    icon: <Home size={32} className="text-primary-light" />,
    image: "https://img.freepik.com/premium-photo/comparing-green-earth-effect-air-pollution-from-human-action-glbal-warming-concept-green-tree-green-earth-with-light-arid-land-with-air-pollusion-background_521740-329.jpg?w=740",
    title: "COMPONENT B",
    subtitle: "Community Climate Resilience",
    desc: "Supporting local level resilience with targeted investments to put new approaches into effect in targeted microwatersheds."
  },
  {
    icon: <Landmark size={32} className="text-primary-light" />,
    image: "https://img.freepik.com/free-photo/side-view-women-shaking-hands_23-2149894715.jpg?w=740",
    title: "COMPONENT C",
    subtitle: "Policy Strengthening",
    desc: "Improving the enabling institutional and policy foundation for multisectoral integrated landscape management and climate resilience."
  },
  {
    icon: <AlertTriangle size={32} className="text-primary-light" />,
    image: "https://img.freepik.com/free-photo/reforestation-done-by-voluntary-group_23-2149500874.jpg?w=740",
    title: "COMPONENT D",
    subtitle: "Emergency Response",
    desc: "Contingent emergency response programs to support educational success and community stability during environmental crises."
  }
];

function AcreSalComponent() {
  return (
    <section className="section-padding bg-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block">
            Our Core Strategy
          </span>
          <h2 className="heading-lg mb-6">
            Project <span className="text-gradient">Components</span>
          </h2>
          <p className="text-slate-600 text-lg">
            ACReSAL operates through four strategic components designed to address the complex challenges of climate change and land degradation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {components.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group flex flex-col"
            >
              <div className="relative h-64 rounded-3xl overflow-hidden mb-6 shadow-xl">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                <div className="absolute bottom-4 left-4 w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/30">
                  {item.icon}
                </div>
              </div>

              <div className="flex-grow">
                <span className="text-primary-light font-bold text-sm tracking-widest uppercase mb-2 block">
                  {item.title}
                </span>
                <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-primary transition-colors">
                  {item.subtitle}
                </h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AcreSalComponent;