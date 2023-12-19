import { SetStateAction, useState } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDotFilled } from 'react-icons/rx';
const Carousel = () => {
    const slides = [
        {
            url: 'https://images.unsplash.com/photo-1699801571393-cf5f39a52332?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4NHx8fGVufDB8fHx8fA%3D%3D',
        },
        {
            url: 'https://images.unsplash.com/photo-1699803895016-72cabdd79107?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5N3x8fGVufDB8fHx8fA%3D%3D',
        },
    ];

    const [currentIndex, setCurrentIndex] = useState<number>(0);
    // prev
    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };
    //next
    const nextSlide = () => {
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };
    //
    const goToSlide = (slideIndex: number) => {
        setCurrentIndex(slideIndex);
    };

    return (
        <div className='max-w-[1400px] h-[780px] w-full m-auto py-16 px-4 relative'>
            <div
                style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
                className='w-full h-full rounded-2xl bg-center be-cover duration-500'
            >
                {/* Left Arrow */}
                <div className='hidden group-hover:block absolute tio-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
                    <BsChevronCompactLeft onClick={prevSlide} size={30} />
                </div>
                {/* Right Arrow */}
                <div className='hidden group-hover:block absolute tio-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
                    <BsChevronCompactRight onClick={nextSlide} size={30} />
                </div>
                {/* dotdotdot */}
                <div className='flex top-4 justify-center py-2'>
                    {slides.map((slides, slideIndex) => {
                        return (
                            <div
                                key={slideIndex}
                                onClick={() => {
                                    goToSlide(slideIndex);
                                }}
                                className='text-2xl cursor=pointerF'
                            >
                                <RxDotFilled />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Carousel;
