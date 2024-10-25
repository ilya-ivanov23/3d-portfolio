import React, {useEffect, useState} from 'react';


const SlideNum = () => {
    const initialItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
    const [tickMarks, setTickMarks] = useState(50); // tickMarks = 50;// Массив чисел
    const [currentIndex, setCurrentIndex] = useState(7); // Активный индекс числа (начнем с 8)

    const visibleItems = 5; // Количество видимых элементов
    const [radius, setRadius] = useState(200); // radius = 200; // Радиус для позиционирования по кругу
    const [angleStep, setAngleStep] = useState(85.9); // angleStep = 85.9 / (visibleItems - 1); // Угол между элементами

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;

            if (width <= 450) { // Смартфоны (max-xs)
                setRadius(190); // Маленький радиус
                setAngleStep(87 / (visibleItems - 1));
                setTickMarks(40)
            } else if (width <= 768) { // Планшеты (max-md)
                setRadius(200);
                setAngleStep(89 / (visibleItems - 1));
                setTickMarks(40)
            } else if (width <= 1024) { // Маленькие ноутбуки (max-lg)
                setRadius(195);
                setAngleStep(90 / (visibleItems - 1));
                setTickMarks(50)
            } else if (width <= 1280) { // Маленькие ноутбуки (max-lg)
                setRadius(240);
                setAngleStep(80 / (visibleItems - 1));
                setTickMarks(45)
            } else { // Десктопы и большие экраны
                setRadius(200); // Больше радиус
                setAngleStep(85.9 / (visibleItems - 1));
                setTickMarks(50)// Увеличенный угол
            }
        };

        handleResize(); // Устанавливаем начальные значения
        window.addEventListener('resize', handleResize); // Реакция на изменение экрана

        return () => window.removeEventListener('resize', handleResize); // Убираем обработчик при размонтировании
    }, []);

    // Обработчик клика по числу
    // Обработчик кликов по числам
    const handleClick = (index) => {
        // Если клик по активному элементу, меняем индекс на следующий
        if (index === currentIndex) {
            const nextIndex = (currentIndex + 1) % initialItems.length; // Следующий индекс с циклом
            setCurrentIndex(nextIndex);
        } else {
            // В противном случае просто меняем индекс на кликнутый
            setCurrentIndex(index);
        }
    };

    // Функция для расчёта позиции по кругу
    const calculatePosition = (index) => {
        const angle = (index - currentIndex) * angleStep - 90;
        const x = radius * Math.cos((angle * Math.PI) / 180);
        const y = radius * Math.sin((angle * Math.PI) / 180);
        return { x, y, angle };
    };

    const calculateTickPosition = (index) => {
        const angle = (index * (360 / tickMarks)) - 90; // Равномерное распределение
        const x = (radius + 50) * Math.cos((angle * Math.PI) / 180); // Насечки чуть выше чисел
        const y = (radius + 50) * Math.sin((angle * Math.PI) / 180);
        return { x, y, angle };
    };

    return (
        <div className="relative w-full h-[200px]   pt-28  lg:pt-48 xl:pt-28 overflow-hidden flex justify-center items-center">
            {initialItems.map((item, index) => {
                const { x, y } = calculatePosition(index);
                const isActive = index === currentIndex;
                const isNearActive = (index === (currentIndex + 1) % initialItems.length || index === (currentIndex - 1 + initialItems.length) % initialItems.length);

                return (
                    <div
                        key={index}
                        className={`absolute flex items-center justify-center rounded-full mt-96   cursor-pointer transition-all duration-500 ${
                            isActive ? 'w-14 h-28  border border-stone-800 bg-zinc-950 shadow-inner shadow-neutral-700 text-white' : 'w-14 h-14  bg-zinc-950 shadow-inner shadow-neutral-800 text-gray-300'
                        }`}
                        style={{
                            transform: `translate(${x}px, ${y - 40}px)`, // Поднятие активного элемента вверх
                            zIndex: isActive ? 10 : 1,
                            transition: 'transform 0.7s ease-in-out,width 0.6s ease-in-out, height 0.6s ease-in-out',
                            filter: isActive || isNearActive ? 'brightness(1.2)' : 'brightness(1)',
                        }}
                        onClick={() => handleClick(index)}
                    >
                        {item}
                    </div>
                );
            })}
            {Array.from({ length: tickMarks }).map((_, index) => {
                const { x, y } = calculateTickPosition(index);
                return (
                    <div
                        key={index}
                        className="absolute brightness-50 mt-52 max-lg:mt-60 w-[0.8px] h-[6px] bg-gray-400"
                        style={{
                            transform: `translate(${x}px, ${y}px) rotate(${index * (360 / tickMarks)}deg)`,
                        }}
                    ></div>
                );
            })}
        </div>
    );
};
            export default SlideNum
