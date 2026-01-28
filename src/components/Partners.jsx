import React from 'react';
import { motion } from 'framer-motion';
import PartnerLogo from './PartnerLogo';

function Partners() {
  return (
    <section id="partners" className="section-padding bg-white">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-8">
          <div className="max-w-xl">
            <span className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block">
              Strategic Collaboration
            </span>
            <h2 className="heading-lg">
              Our <span className="text-gradient">Partners</span>
            </h2>
          </div>
          <p className="text-slate-600 max-w-md text-lg">
            Working hand-in-hand with national and international institutions to achieve sustainable environmental resilience.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
          <PartnerLogo />
        </div>
      </div>
    </section>
  )
}

export default Partners;
