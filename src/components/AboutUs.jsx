import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, Leaf, Shield } from 'lucide-react';

function AboutUs() {
  const features = [
    {
      icon: <Target className="text-primary-light" size={32} />,
      title: "Our Mission",
      desc: "To drive sustainable land management practices across Sokoto, reducing community vulnerability and promoting environmental stewardship through climate-resilient interventions."
    },
    {
      icon: <Eye className="text-primary-light" size={32} />,
      title: "Our Vision",
      desc: "A future where Sokoto’s landscapes flourish with restored vitality, and communities are empowered to thrive sustainably through resilience and inclusivity."
    }
  ];

  return (
    <section id="about" className="section-padding bg-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -ml-48 -mb-48" />

      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-8">
              <span className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block">
                Welcome to ACReSAL Sokoto
              </span>
              <h2 className="heading-lg mb-6">
                Agro-Climatic Resilience In <span className="text-gradient">Semi-Arid Landscapes</span>
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                The ACReSAL Project (Sokoto SPMU) is a pioneering initiative dedicated to revitalizing our landscapes and uplifting our communities. We focus on sustainable landscape management as a cornerstone for growth and stability.
              </p>
            </div>

            <div className="space-y-8">
              {features.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  className="flex gap-6 p-6 rounded-2xl bg-slate-50 border border-slate-100 transition-hover hover:shadow-xl hover:shadow-primary/5"
                >
                  <div className="shrink-0 w-16 h-16 rounded-xl bg-white shadow-sm flex items-center justify-center">
                    {f.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{f.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl">
              <img
                className="w-full h-[600px] object-cover"
                src="/images/acresalfront.jpg"
                alt="ACReSAL Field Work"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
            </div>

            {/* Stats Overlay */}
            <div className="absolute -bottom-8 -left-8 glass-card p-8 rounded-2xl hidden md:block z-20">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Leaf size={24} />
                </div>
                <div>
                  <div className="text-3xl font-bold text-slate-900 font-popins">50K+</div>
                  <div className="text-sm text-slate-500 uppercase font-bold tracking-tight">Hectares Restored</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Shield size={24} />
                </div>
                <div>
                  <div className="text-3xl font-bold text-slate-900 font-popins">100%</div>
                  <div className="text-sm text-slate-500 uppercase font-bold tracking-tight">Community Driven</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;