import React, {useEffect, useState} from 'react';

const SlideImg = () => {
    // Array of image URLs instead of numbers
    const initialItems = [
        '/assets/framer.png', // Replace with actual image paths
        '/assets/react.svg',
        '/assets/next-js.svg',
        '/assets/typescript.png',
        '/assets/tailwindcss.png',
        '/assets/Three.png',

    ];


    const [currentIndex, setCurrentIndex] = useState(2); // Set active image

    const visibleImg = 6; // Number of visible elements
    const [radius, setRadius] = useState(110); // radius = 110; // Radius for positioning items in a circle
    const angleStep = 360 / visibleImg ;

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;

            if (width <= 450) { // Смартфоны (max-xs)
                setRadius(100); // Маленький радиус

            } else if (width <= 768) { // Планшеты (max-md)
                setRadius(100);

            } else if (width <= 1024) { // Маленькие ноутбуки (max-lg)
                setRadius(110);

            } else if (width <= 1280) { // Маленькие ноутбуки (max-lg)
                setRadius(110);

            } else { // Десктопы и большие экраны
                setRadius(110); // Больше радиус

            }
        };

        handleResize(); // Устанавливаем начальные значения
        window.addEventListener('resize', handleResize); // Реакция на изменение экрана

        return () => window.removeEventListener('resize', handleResize); // Убираем обработчик при размонтировании
    }, []);
// Angle between elements

    // Handle click on an item (image)
    const MouseClick = (index) => {
        if (index === currentIndex) {
            const nextIndex = (currentIndex + 1) % initialItems.length; // Cycle to the next image
            setCurrentIndex(nextIndex);
        } else {
            setCurrentIndex(index);
        }
    };

    const handleCenterClick = () => {
        // Simply cycle to the next item
        const nextIndex = (currentIndex + 1) % initialItems.length;
        setCurrentIndex(nextIndex);
    };

    // Calculate position for each image in a circular layout
    const Position = (index2) => {
        const angle = (index2 - currentIndex) * angleStep - 90;
        const x = radius * Math.cos((angle * Math.PI) / 180);
        const y = radius * Math.sin((angle * Math.PI) / 180);
        return { x, y, angle };
    };




    return (
        <div className="relative w-full h-[300px] max-mb:w-[320px] max-mb:mx-2 max-sm:w-[350px] max-sm:mx-12 max-md:w-[400px] max-md:mx-16 max-lg:w-[350px] max-lg:mx-6   overflow-hidden flex justify-center items-center">
            {/* Central Circle */}
            <div
                className="absolute combined-glow  border border-stone-800 bg-zinc-950 shadow-inner shadow-neutral-700 rounded-full flex items-center justify-center z-10  "
                onClick={handleCenterClick}>
                <span className="text-white text-xl cursor-pointer font-bold z-10">IDP</span>
            </div>
            <div className="absolute left-1/2 -z-1 transform -translate-x-1/2 translate-y-1/2">
                <div className="w-[600px] h-[600px]  bg-transparent border-l-2 border-r-2 border-t-2 border-stone-800 rounded-t-full"/>
            </div>

            {/* Right Semi-Circle */}
            <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-[600px] h-[600px]  bg-transparent border-l-2 border-r-2 border-b-2 border-stone-800 rounded-b-full"/>
            </div>


            {initialItems.map((item, index) => {
                const {x, y} = Position(index);
                const isActive = index === currentIndex;


                return (
                    <div
                        key={index}
                        className={`absolute flex items-center mt-20  rounded-full bg-zinc-950 justify-center cursor-pointer transition-all duration-500 z-15 ${
                            isActive ? 'w-20 h-20 border border-stone-800 shadow-inner shadow-neutral-700 ' : 'w-16 h-16 border border-stone-800  shadow-inner shadow-neutral-700'
                        }`}
                        style={{
                            transform: `translate(${x}px, ${y - 40}px)`, // Position elements in a circle
                            zIndex: isActive ? 10 : 1,
                            transition: 'transform 0.9s ease-in-out, width 0.6s ease-in-out, height 0.6s ease-in-out',
                            filter: isActive ? 'brightness(1.2)' : 'brightness(0.5)',
                        }}
                        onClick={() => MouseClick(index)}
                    >
                        <img
                            src={item}
                            alt={`image-${index}`}
                            className={`object-cover ${isActive ? 'w-10 h-10' : 'w-8 h-8'}`}
                        />
                    </div>
                );
            })}

        </div>
    );
};

export default SlideImg;
