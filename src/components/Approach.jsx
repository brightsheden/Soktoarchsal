import React from 'react';

const OurApproachSection = () => {
  return (
    <div className="card  p-4 lg:card-side bg-base-100 shadow-xl my-12">
      <figure>
        <img
          src="/images/img5.jpeg"
          alt="Our Approach"
          className="rounded-lg"
        />
      </figure>
      <div className="card-body text-left">
        <h2 className="card-title">
          <strong>Our Approach:</strong>
          <br />
          <strong>Sustainable Practices, Inclusive Growth</strong>
        </h2>
        <p>
          Through ACReSAL Sokoto, we are committed to supporting farmers, local
          communities, and government partners in adapting to evolving dryland
          conditions. With an emphasis on inclusion, we ensure vulnerable groups
          are at the core of our initiatives, fostering a community-driven
          approach to environmental restoration.
        </p>
      </div>
    </div>
  );
};

export default OurApproachSection;