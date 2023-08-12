import React from 'react'

const Statistic = () => {
  return (
    <section className="text-gray-600 body-font text-center sm:text-left">
  <div className="container px-5 md:py-24 mx-auto flex flex-wrap">
    <div className="flex flex-wrap -mx-4 mt-auto mb-auto lg:w-1/2 sm:w-2/3 content-start sm:pr-10">
      <div className="w-full sm:p-4 px-4 mb-6">
        <h1 className="title-font font-medium text-customHeading text-4xl mb-2">Zawiyah by the Numbers</h1>
        <div className="leading-relaxed text-customText">Discover Zawiyah's success story through our statistics. With more than 3K registered users and around 4K transactions completed, our platform is a trusted destination for unique handmade crafts. Our commitment to quality and security has earned us unnumbered positive reviews and a loyal following of art enthusiasts. Join us as we continue to reach new milestones and support artisans from around the world.</div>
      </div>
      <div className='flex justify-between m-auto md:m-0'>
        <div className="p-4 sm:w-1/2 lg:w-1/4 w-1/2">
          <h2 className="title-font font-medium text-3xl text-customHeading">3.7K</h2>
          <p className="leading-relaxed text-customText">Users</p>
        </div>
        <div className="p-4 sm:w-1/2 lg:w-1/4 w-1/2">
          <h2 className="title-font font-medium text-3xl text-customHeading">3.9K</h2>
          <p className="leading-relaxed text-customText">Transactions</p>
        </div>
        <div className="p-4 sm:w-1/2 lg:w-1/4 w-1/2">
          <h2 className="title-font font-medium text-3xl text-customHeading">6.5K</h2>
          <p className="leading-relaxed text-customText">Products</p>
        </div>
      </div>
    </div>
    <div className="lg:w-1/2 sm:w-1/3 w-full rounded-lg overflow-hidden mt-6 sm:mt-0">
      <img className="object-cover object-center w-full h-full" src="https://images.unsplash.com/photo-1678082309527-7c47ac57d738?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjM5fHxoYW5kaWNyYWZ0c3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60" alt="stats" />
    </div>
  </div>
</section>
  )
}

export default Statistic