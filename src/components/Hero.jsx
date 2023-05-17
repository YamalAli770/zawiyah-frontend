import React from 'react'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <section className="text-gray-600 body-font">
  <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
    <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
      <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
        Experience the Beauty of Handicrafts from Around the World
      </h1>
      <p className="mb-8 leading-relaxed">Step into a world of artistry and craftsmanship at Zawiyah. Our online store is a treasure trove of unique handmade items from talented artisans around the globe. From exquisite textiles and jewelry to beautiful pottery and woodwork, our collection has something for everyone. Join our community of art lovers and support these skilled artists by bidding on your favorite pieces. Experience the beauty of handmade crafts, only at Zawiyah.</p>
      <div className="flex justify-center">
        <Link to="/shop" className="inline-flex text-white bg-customButton border-0 py-2 px-6 focus:outline-none hover:brightness-50 rounded text-lg">Shop Now</Link>
      </div>
    </div>
    <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
      <img className="object-cover object-center rounded" alt="hero" src="https://plus.unsplash.com/premium_photo-1677456380268-813e7a11bc57?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OTd8fGhhbmRpY3JhZnRzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60" />
    </div>
  </div>
</section>
  )
}

export default Hero