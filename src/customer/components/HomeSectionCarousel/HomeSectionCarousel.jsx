
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import HomeSectionCard from "../HomeSectionCard/HomeSectionCard";



const HomeSectionCarousel = ({data,sectionName}) => {
  
  const responsive = {
    0: { items: 2 },
    720: { items: 3 },
    1024: { items: 6 },
  };

  

  const items = data.slice(0,20).map(
    (item) => <HomeSectionCard product={item} />
  );

  

  return (
    <div>
      <div className="relative p-5 ">
        <h2 className="text-2xl font-extralight text-gray-800 py-5 uppercase">{sectionName}</h2>
        <AliceCarousel
          items={items}
          disableButtonsControls
          responsive={responsive}
          // disableDotsControls
          // onSlideChanged={syncActiveIndex}
          // activeIndex={activeIndex}
          mouseTracking={true}
          touchTracking={true}
        />
      


        
      </div>
    </div>
  );
};

export default HomeSectionCarousel;
