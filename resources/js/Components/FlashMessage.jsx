import React, { useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FlashMessage = () => {
    const { flash } = usePage().props;

    useEffect(() => {
        if (flash.message) {
            toast.success(flash.message); // Display success message from flash data
        }
        if (flash.error) {
            toast.error(flash.error); // Display error message from flash data (if any)
        }
    }, [flash]); // Re-run the effect when flash message changes

    return (
        <ToastContainer
            position="top-right" // Change position to top-right
            autoClose={5000} // Auto close after 5 seconds
            hideProgressBar={false} // Show the progress bar
            newestOnTop={true} // Newest toast will appear at the top
            closeOnClick={true} // Close toast on click
            rtl={false} // Set to true for right-to-left languages
            pauseOnFocusLoss={false} // Pause when the window is not focused
            draggable
        />
    );
};

export default FlashMessage;
