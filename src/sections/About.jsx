import {Suspense, useEffect, useRef, useState} from 'react';
import Globe from 'react-globe.gl';

import Button from '../components/Button.jsx';
import SlideNum from '../components/SlideNum.jsx';
import {Canvas} from "@react-three/fiber";
import CanvasLoader from "../components/CanvasLoader.jsx";
import {PerspectiveCamera} from "@react-three/drei";
import HeroCamera from "../components/HeroCamera.jsx";
import {Leva, useControls} from "leva";
import HackerRoom from "../components/HackerRoom.jsx";
import Robot from "../components/Robot.jsx";
import {motion, useAnimation} from "framer-motion";
import SlideImg from "../components/SlideImg.jsx";





const About = () => {
    const [hasCopied, setHasCopied] = useState(false);
    // const x = useControls('Odometer', {
    //     positionX: {
    //         value: 2.5,
    //         min: -10,
    //         max: 10
    //     },
    //     positionY: {
    //         value: 2.5,
    //         min: -30,
    //         max: 10
    //     },
    //     positionZ: {
    //         value: 2.5,
    //         min: -10,
    //         max: 60
    //     },
    //     rotationX: {
    //         value: 0,
    //         min: -10,
    //         max: 10
    //     },
    //     rotationY: {
    //         value: 0,
    //         min: -10,
    //         max: 10
    //     },
    //     rotationZ: {
    //         value: 0,
    //         min: -10,
    //         max: 10
    //     },
    //     scale: {
    //         value: 1,
    //         min: 0.1,
    //         max: 100
    //     }
    // })
    const globeEl = useRef();


    useEffect(() => {
        // Rotate the globe
        const interval = setInterval(() => {
            globeEl.current.controls().autoRotate = true;
            globeEl.current.controls().autoRotateSpeed = 1.0; // Speed of rotation
            globeEl.current.controls().update(); // Ensure controls are updated
        }, 20);
          return () => clearInterval(interval);
          }, []);

    const handleCopy = () => {
        navigator.clipboard.writeText(' illanemagay@gmail.com');
        setHasCopied(true);

        setTimeout(() => {
            setHasCopied(false);
        }, 2000);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3
            }
        },
        exit: { opacity: 0, transition: { duration: 0.5 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, rotateY: -90 },
        visible: { opacity: 1, rotateY: 0, transition: { duration: 0.5, ease: "easeOut" } },
        exit: { opacity: 0, rotateY: 90, transition: { duration: 0.5 } }
    };

    return (
        <motion.section
            className="c-space my-20 max-mb:-my-5 max-sm:mx-3 max-lg:-my-3"
            id="about"
            variants={containerVariants}
            initial="hidden"
            animate="show"
            exit="exit"
        >
            <div className="grid xl:grid-cols-3 xl:grid-rows-6 md:grid-cols-2 grid-cols-1 gap-5 sm:gap-10 md:gap-5 h-full">
                <motion.div
                    className="col-span-1 xl:row-span-3"
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    <div className="grid-container">
                        <Canvas className="w-full h-full">
                            <Suspense fallback={<CanvasLoader />}>
                                <PerspectiveCamera makeDefault position={[0, 0, 20]} />
                                <HeroCamera>
                                    <Robot position={[-0.4, -15.3, 10]} rotation={[0, 0, 0]} scale={[7, 7, 7]} />
                                </HeroCamera>
                                <ambientLight intensity={3} />
                                <directionalLight position={[15, 15, 15]} intensity={1.5} />
                            </Suspense>
                        </Canvas>
                        <div>
                            <p className="grid-headtext">Hi, I’m Ilya Nemagay</p>
                            <p className="grid-subtext">With 5 years of experience, I have honed my skills in both
                                frontend and backend dev, creating dynamic and responsive websites.</p>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    className="col-span-1 xl:row-span-3"
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    <div className="grid-container">
                        <SlideImg />
                        <div>
                            <p className="grid-headtext">Tech Stack</p>
                            <p className="grid-subtext">I specialize in a variety of languages, frameworks, and tools
                                that allow me to build robust and scalable applications.</p>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    className="col-span-1 xl:row-span-4"
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    <div className="grid-container">
                        <div className="rounded-3xl w-full sm:h-[326px] h-fit flex justify-center items-center">
                            <Globe
                                ref={globeEl}
                                height={326}
                                width={326}
                                backgroundColor="rgba(0, 0, 0, 0)"
                                backgroundImageOpacity={0.5}
                                showAtmosphere
                                showGraticules
                                globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                                bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                                labelsData={[{ lat: 51, lng: 17, text: 'Wroclaw, Poland', color: 'white', size: 40 }]}
                            />
                        </div>
                        <div>
                            <p className="grid-headtext">I’m very flexible with time zone communications & locations</p>
                            <p className="grid-subtext">I&apos;m based in Wroclaw, Poland and open to remote work
                                worldwide.</p>
                            <Button name="Contact Me" isBeam containerClass="w-full mt-10" />
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    className="xl:col-span-2 xl:row-span-3"
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    <div className="grid-container">
                        <img src="/assets/grid3.png" alt="grid-3" className="w-full sm:h-[266px] h-fit object-contain" />
                        <div>
                            <p className="grid-headtext">My Passion for Coding</p>
                            <p className="grid-subtext">I love solving problems and building things through code.
                                Programming isn&apos;t just my profession—it&apos;s my passion. I enjoy exploring new
                                technologies, and enhancing my skills.</p>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    className="xl:col-span-1 xl:row-span-2"
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    <div className="grid-container">
                        <SlideNum />
                        <div className="space-y-2 max-sm:mb-5">
                            <p className="grid-subtext text-center">Contact me</p>
                            <div className="copy-container" onClick={handleCopy}>
                                <img src={hasCopied ? 'assets/tick.svg' : 'assets/copy.svg'} alt="copy" />
                                <p className="lg:text-2xl md:text-xl font-medium text-gray_gradient text-white">illanemagay@gmail.com</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.section>
    );
}

export default About
