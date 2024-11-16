// src/PhotoGallery.js
import React, { useState } from "react";

const photos = [
  { id: 1, url: "/images/img1.jpeg", title: "Photo 1" },
  { id: 2, url: "/images/img2.jpeg", title: "Photo 2" },
  { id: 3, url: "/images/img3.jpeg", title: "Photo 3" },
  { id: 4, url: "/images/img4.jpeg", title: "Photo 4" },
  { id: 5, url: "/images/img5.jpeg", title: "Photo 5" },
  { id: 6, url: "/images/img6.jpeg", title: "Photo 6" },
];

const PhotoGallery = () => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  return (
    <section id="gallery" className="py-10 px-4 bg-blue-50">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-6">Photo Gallery</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="relative group cursor-pointer"
              onClick={() => setSelectedPhoto(photo)}
            >
              <img
                src={photo.url}
                alt={photo.title}
                className="w-full h-60 object-cover rounded-lg shadow-md"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-lg transition-opacity duration-300">
                <p className="text-white text-lg font-semibold">{photo.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for viewing selected photo */}
      {selectedPhoto && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 motion-preset-slide-right ">
          <div className="bg-white p-4 rounded-lg shadow-lg max-w-lg w-full">
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 text-white hover:text-black"
            >
              ✖
            </button>
            <img
              src={selectedPhoto.url}
              alt={selectedPhoto.title}
              className="w-full rounded-lg"
            />
            <h3 className="mt-4 text-lg font-bold text-center">
              {selectedPhoto.title}
            </h3>
          </div>
        </div>
      )}
    </section>
  );
};

export default PhotoGallery;
