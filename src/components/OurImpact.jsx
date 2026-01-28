import React from 'react';
import { motion } from 'framer-motion';
import { Sprout, BarChart3, Users } from 'lucide-react';

const impactData = [
  {
    icon: <Sprout size={32} className="text-primary-light" />,
    image: 'https://img.freepik.com/free-photo/growing-organic-ecological-plants-fields-background_1268-30622.jpg?w=826',
    title: 'Land Restoration',
    desc: 'Restoring over 50,000 hectares of land, contributing to a nationwide target of 1 million hectares.'
  },
  {
    icon: <BarChart3 size={32} className="text-primary-light" />,
    image: 'https://img.freepik.com/free-photo/smart-agriculture-iot-with-hand-planting-tree-background_53876-124627.jpg?w=360',
    title: 'Food Productivity',
    desc: 'Strengthening land use planning and food productivity for a more resilient agriculture sector.'
  },
  {
    icon: <Users size={32} className="text-primary-light" />,
    image: 'https://img.freepik.com/premium-photo/adventure-tents-cars-park-forest-outdoor-landscape-morning_1417-26257.jpg?w=740',
    title: 'Community Empowerment',
    desc: 'Including and empowering women, youth, elderly, and marginalized groups across local communities.'
  }
];

function OurImpact() {
  return (
    <section id="impact" className="section-padding bg-slate-50">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block"
          >
            The Difference We Make
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="heading-lg mb-6"
          >
            Sustainable <span className="text-gradient">Impact</span>
          </motion.h2>
          <p className="text-slate-600 text-lg">
            Transforming Land, Transforming Lives. Our projects are designed to create lasting environmental and social change.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {impactData.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="glass-card rounded-3xl overflow-hidden group hover:-translate-y-2 transition-all duration-500"
            >
              <div className="relative h-48 overflow-hidden">
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
              <div className="p-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default OurImpact;
