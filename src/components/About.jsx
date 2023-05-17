import React from "react";
import Team from "./Team";

const About = () => {
  return (
    <section className="text-gray-600 body-font">
      <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
          <img
            className="object-cover object-center rounded"
            alt="hero"
            src="https://images.unsplash.com/photo-1608793733118-ee3f16002251?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aGFuZGljcmFmdHN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60"
          />
        </div>
        <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
            Zawiyah: Where Artistry Finds Its Home
            <br className="hidden lg:inline-block" />
            Handcrafted with Love and Soul.
          </h1>
          <p className="mb-8 leading-relaxed">
          Zawiyah is a startup dedicated to connecting handicraft and artifact makers with customers who are passionate about buying and collecting unique, handmade goods. Our online marketplace provides a platform for individuals who create beautiful and authentic handicrafts to showcase their creations and sell them directly to customers.

          Our C2C-based platform enables buyers to browse and purchase an extensive range of handcrafted products from around the world, including pottery, paintings, sculptures, jewelry, and textiles. In addition to traditional e-commerce features, our platform also includes a bidding component, where buyers can place bids on unique and one-of-a-kind products. This bidding system allows buyers to compete for the product they want, ensuring a fair and transparent marketplace for all.

          At Zawiyah, we are committed to promoting the art of handicrafts and artifacts while supporting talented makers from diverse backgrounds. We believe in the value of supporting local economies and empowering individual artists by providing them with an opportunity to showcase and sell their creations on a global platform.

          Our mission is to create a vibrant and inclusive online community that fosters creativity, diversity, and innovation while providing an exceptional shopping experience for buyers. Whether you are a buyer looking for unique, handmade goods or an artisan looking to share your talent with the world, Zawiyah is the ideal platform for you.
          </p>
        </div>
      </div>
      <Team />
    </section>
  );
};

export default About;
