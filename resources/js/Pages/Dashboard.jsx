import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import Modal from '@/Components/Modal';

export default function Dashboard({user}) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);

    const closeModal = () => setIsModalOpen(false);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Dashboard
                </h2>
                
            }
        >
            <Head title="Dashboard" />

            <div className="">
                <div className="w-full sm:p-4 md:p-6">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            You're logged in  {user.name}
                        </div>
                        <button className="border px-4 py-2" onClick={openModal}>Open modal</button>
                    </div>
                    <Modal show={isModalOpen} onClose={closeModal} maxWidth='lg' closable={true}>
                        <div className="p-4">
                            <h2 className="text-xl font-semibold">Create new ewxample</h2>
                            <p className="mt-2">T\</p>
                            <div className="mt-4 flex justify-end">
                                <button
                                className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700"
                                onClick={closeModal}
                                >
                                Close Modal
                                </button>
                            </div>
                        </div>
                    </Modal>
                </div>


            </div>
        </AuthenticatedLayout>
    );
}
