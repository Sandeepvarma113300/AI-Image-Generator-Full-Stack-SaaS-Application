import React from 'react'
import Header from '../components/Header'
import MarqueeStrip from '../components/MarqueeStrip'
import ShowcaseGrid from '../components/ShowcaseGrid'
import Steps from '../components/Steps'
import Description from '../components/Description'
import Testimonials from '../components/Testimonials'
import GenrateButton from '../components/GenrateButton'

const Home = () => {
  return (
    <div>
      <Header />
      <MarqueeStrip />
      <ShowcaseGrid />
      <Steps />
      <Description />
      <Testimonials />
      <GenrateButton />
    </div>
  )
}

export default Home