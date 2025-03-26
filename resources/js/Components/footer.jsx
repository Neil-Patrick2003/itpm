import React from 'react'

const footer = () => {
    return (
        <div>
            <footer className="bg-green-900 text-white py-4 mt-8 w-full">
                <div className="container mx-auto px-4">
                    <div className="text-center">
                        <p>&copy; {new Date().getFullYear()} Healthy Living. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default footer