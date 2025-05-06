import React, { useState, useEffect } from "react";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";

// AutoImageSlider Component
const AutoImageSlider = ({ programs, autoSlideInterval = 3000 }) => {
    const imageUrl = '/storage/';
    const [index, setIndex] = useState(0);

    // Update index to show the correct image
    useEffect(() => {
        const lastIndex = programs.length - 1;

        // Auto slide functionality with interval
        const slider = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % programs.length); // Loop back to the first image after the last
        }, autoSlideInterval);

        return () => clearInterval(slider); // Clear interval on component unmount or index change
    }, [programs.length, autoSlideInterval]);

    // Next and Previous button handlers
    const goToNext = () => {
        setIndex((prevIndex) => (prevIndex + 1) % programs.length);
    };

    const goToPrevious = () => {
        setIndex((prevIndex) =>
            prevIndex === 0 ? programs.length - 1 : prevIndex - 1
        );
    };

    return (
        <div className="relative w-full  mx-auto overflow-hidden">
            <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${index * 100}%)` }}>
                {programs.map((program) => (
                    <div key={program.id} className="w-full flex-shrink-0">
                        {/*<img src={imageUrl + sponsor.profile_photo_url}*/}
                        <img
                            src={imageUrl + program.program_background_url} // Access the photo attribute
                            alt={program.name}   // Use the program's name for the alt text
                            className="w-full h-80 object-fit "
                        />
                    </div>
                ))}
            </div>

            {/* Previous and Next buttons */}
            <button
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
                onClick={goToPrevious}
            >
                <FiChevronLeft className="w-6 h-6" />
            </button>

            <button
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
                onClick={goToNext}
            >
                <FiChevronRight className="w-6 h-6" />
            </button>
        </div>
    );
};

export default AutoImageSlider;
