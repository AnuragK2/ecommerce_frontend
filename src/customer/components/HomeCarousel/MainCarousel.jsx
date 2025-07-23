import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { MainCarouselData } from './MainCarouselData';

const MainCarousel = () => {
  const items = MainCarouselData.map(item => (
    <img
      className="carousel-image cursor-pointer"
      role="presentation"
      src={item.image}
      alt=""
      onDragStart={e => e.preventDefault()}
    />
  ));

  return (
    <AliceCarousel
      items={items}
      disableButtonsControls
      autoPlay
      autoPlayInterval={2000}
      infinite
      mouseTracking
      responsive={{ 0: { items: 1 }, 768: { items: 1 } }}
      stagePadding={{ paddingLeft: 0, paddingRight: 0 }}
    />
  );
};

export default MainCarousel;