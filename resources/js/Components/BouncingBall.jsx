import React from 'react'
import { useEffect, useState } from "react";


const BouncingBall = () => {
    const numBalls = 8; // 🎾 Adjust the number of balls
    const [balls, setBalls] = useState([]);

    useEffect(() => {
        const screenHeight = document.body.scrollHeight;
        const newBalls = Array.from({ length: numBalls }, () => ({
            x: Math.random() * window.innerWidth,
            y: Math.random() * screenHeight,
            dx: (Math.random() - 0.5) * 4, // Slower speed
            dy: (Math.random() - 0.5) * 4, // Slower speed
        }));
        setBalls(newBalls);

        const moveBalls = () => {
            setBalls((prevBalls) =>
                prevBalls.map((ball) => {
                    let newX = ball.x + ball.dx;
                    let newY = ball.y + ball.dy;

                    if (newX <= 0 || newX >= window.innerWidth) ball.dx *= -1; // Bounce off sides
                    if (newY <= 40 || newY >= screenHeight - 160) ball.dy *= -1; // Bounce off with a 40px margin

                    return { ...ball, x: newX, y: newY };
                })
            );
            requestAnimationFrame(moveBalls); // Smooth animation
        };

        moveBalls();
    }, []);

    return (
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            {balls.map((ball, index) => (
                <div
                    key={index}
                    className="absolute w-6 h-6 bg-blue-500 rounded-full shadow-lg"
                    style={{
                        transform: `translate(${ball.x}px, ${ball.y}px)`,
                    }}
                ></div>
            ))}
        </div>
    );
}

export default BouncingBall