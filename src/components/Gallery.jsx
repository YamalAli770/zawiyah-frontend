import React from 'react'

const Gallery = () => {
  return (
    <section className="text-gray-600 body-font">
  <div className="container px-5 py-24 mx-auto flex flex-wrap">
    <div className="flex w-full mb-20 flex-wrap">
      <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 lg:w-1/3 lg:mb-0 mb-4">The Art of Handmade: A Gallery of Wonders</h1>
      <p className="lg:pl-6 lg:w-2/3 mx-auto leading-relaxed text-base">Our gallery is a curated collection of stunning, one-of-a-kind handmade crafts from around the world. Discover the beauty of textiles, jewelry, pottery, woodwork, and more. Each piece is a testament to the skill and creativity of the talented artisans who made them. Immerse yourself in a world of intricate designs, bold colors, and unique textures, and experience the wonder of handmade artistry. Join us in celebrating the art of handmade and discover the perfect piece to add to your collection.</p>
    </div>
    <div className="flex flex-wrap md:-m-2 -m-1">
      <div className="flex flex-wrap w-1/2">
        <div className="md:p-2 p-1 w-1/2">
          <img alt="gallery" className="w-full object-cover h-full object-center block" src="https://images.unsplash.com/photo-1667924779335-9b03c021ebed?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OTZ8fGhhbmRpY3JhZnRzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60" />
        </div>
        <div className="md:p-2 p-1 w-1/2">
          <img alt="gallery" className="w-full object-cover h-full object-center block" src="https://images.unsplash.com/photo-1671212684942-5c8a3dc3234e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OTl8fGhhbmRpY3JhZnRzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60" />
        </div>
        <div className="md:p-2 p-1 w-full">
          <img alt="gallery" className="w-full h-full object-cover object-center block" src="https://images.unsplash.com/photo-1653402320451-2d5debd7453a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTIwfHxoYW5kaWNyYWZ0c3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60" />
        </div>
      </div>
      <div className="flex flex-wrap w-1/2">
        <div className="md:p-2 p-1 w-full">
          <img alt="gallery" className="w-full h-full object-cover object-center block" src="https://images.unsplash.com/photo-1661446492896-bc07e9711995?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTMyfHxoYW5kaWNyYWZ0c3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60" />
        </div>
        <div className="md:p-2 p-1 w-1/2">
          <img alt="gallery" className="w-full object-cover h-full object-center block" src="https://images.unsplash.com/photo-1641582163466-e4d573078f98?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTExfHxoYW5kaWNyYWZ0c3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60" />
        </div>
        <div className="md:p-2 p-1 w-1/2">
          <img alt="gallery" className="w-full object-cover h-full object-center block" src="https://plus.unsplash.com/premium_photo-1677456380663-effbd62f0c0d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTYzfHxoYW5kaWNyYWZ0c3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60" />
        </div>
      </div>
    </div>
  </div>
</section>
  )
}

export default Gallery