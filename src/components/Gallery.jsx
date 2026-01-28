import React, { useState } from "react";
import { useGalleryImages } from "../ApiHook";
import { API_URL } from "../../config";
import { motion, AnimatePresence } from "framer-motion";
import { X, Maximize2 } from "lucide-react";

const PhotoGallery = () => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const { data: photos } = useGalleryImages();

  return (
    <section id="gallery" className="section-padding bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block">
            Visual Journey
          </span>
          <h2 className="heading-lg mb-6">
            Our <span className="text-gradient">Gallery</span>
          </h2>
          <p className="text-slate-600 text-lg">
            Capturing the transformation of Sokoto's landscapes and the impact of our projects on local communities.
          </p>
        </div>

        {!photos || photos.length === 0 ? (
          <div className="text-center p-20 glass-card rounded-3xl">
            <p className="text-slate-500 font-medium italic">Gallery is being updated. Check back soon!</p>
          </div>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {photos.map((photo, i) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative group cursor-pointer break-inside-avoid rounded-2xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-2xl"
                onClick={() => setSelectedPhoto(photo)}
              >
                <img
                  src={`${API_URL}${photo?.image}`}
                  alt={photo?.description}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-6">
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <Maximize2 size={20} />
                  </div>
                  <p className="text-white text-lg font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                    {photo.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/95 backdrop-blur-sm flex items-center justify-center z-[100] p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"
            >
              <X size={40} />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-5xl w-full h-[80vh] flex flex-col items-center justify-center"
              onClick={e => e.stopPropagation()}
            >
              <img
                src={`${API_URL}${selectedPhoto.image}`}
                alt={selectedPhoto.description}
                className="max-w-full max-h-full rounded-2xl shadow-2xl object-contain mb-6"
              />
              <div className="text-center">
                <h3 className="text-white text-2xl font-bold mb-2">
                  {selectedPhoto.description}
                </h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PhotoGallery;
