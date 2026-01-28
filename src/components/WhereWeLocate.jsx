import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import LeafletMap from './LeafletMap';

function WhereWeLocate() {
  return (
    <section id="location" className="section-padding bg-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-8">
          <div className="max-w-xl">
            <span className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block">
              Our Presence
            </span>
            <h2 className="heading-lg">
              Where We <span className="text-gradient">Locate</span>
            </h2>
          </div>
          <div className="flex items-center gap-4 p-6 glass-card rounded-2xl">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <MapPin size={24} />
            </div>
            <div>
              <p className="text-slate-900 font-bold">Main Headquarters</p>
              <p className="text-slate-500 text-sm">N0 20 Zamfara Road, Sokoto State.</p>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="rounded-3xl border border-slate-100 shadow-2xl overflow-hidden h-[500px] z-10 relative"
        >
          <LeafletMap />
        </motion.div>
      </div>
    </section>
  )
}

export default WhereWeLocate;
