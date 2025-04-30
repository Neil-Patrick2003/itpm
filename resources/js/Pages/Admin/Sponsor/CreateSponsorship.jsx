import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import { useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import { FaPhone, FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import React, { useState, useEffect } from "react";

const CreateSponsorship = () => {
    const [avatar, setAvatar] = useState('');
    const [items, setItems] = useState([]);
    const [description, setDescription] = useState('');
    const [qty, setQty] = useState('');
    const [editingItemId, setEditingItemId] = useState(null);

    const { data, setData, processing, post, errors } = useForm({
        name: '',
        email: '',
        phone_number: '',
        photo_url: '',
        donation_type: '',
        amount: '',
        items: [],
    });

    // Keep data.items in sync with local items state
    useEffect(() => {
        setData('items', items);
    }, [items]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setAvatar(reader.result);
            reader.readAsDataURL(file);
            setData('photo_url', file);
        }
    };

    const addItem = () => {
        if (description && qty) {
            const newItem = {
                id: Date.now(),
                description,
                qty: parseInt(qty),
            };
            setItems(prev => [...prev, newItem]);
            setDescription('');
            setQty('');
        }
    };

    const removeItem = (id) => {
        setItems(items.filter(item => item.id !== id));
        if (editingItemId === id) cancelEdit();
    };

    const editItem = (id) => {
        const item = items.find(i => i.id === id);
        setDescription(item.description);
        setQty(item.qty);
        setEditingItemId(id);
    };

    const confirmEdit = () => {
        setItems(items.map(item =>
            item.id === editingItemId
                ? { ...item, description, qty: parseInt(qty) }
                : item
        ));
        cancelEdit();
    };

    const cancelEdit = () => {
        setDescription('');
        setQty('');
        setEditingItemId(null);
    };

    const submitCreate = (e) => {
        e.preventDefault();
        if (data.donation_type === 'goods' && items.length === 0) {
            alert('Please add at least one item.');
            return;
        }
        post('/sponsorships/create');
    };

    return (
        <AuthenticatedLayout>
            <div className="p-4 w-full bg-white shadow rounded-md">
                <h1 className="text-3xl font-bold mb-6 text-center text-green-700">Create Sponsorship</h1>
                <form onSubmit={submitCreate} className="space-y-10">
                    {/* Avatar Upload */}
                    <div className="flex flex-col items-center">
                        <label htmlFor="avatar" className="relative cursor-pointer">
                            <img
                                src={avatar || '/storage/images/default_profile.png'}
                                alt="Profile Avatar"
                                className="w-32 h-32 object-cover rounded-full border-4 border-green-600"
                            />
                            <input
                                type="file"
                                id="avatar"
                                className="absolute inset-0 opacity-0"
                                onChange={handleImageChange}
                            />
                        </label>
                    </div>

                    {/* Personal Info */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold text-gray-700">Personal Information</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <InputLabel htmlFor="name" value="Full Name" />
                                <TextInput
                                    id="name"
                                    icon={FaUser}
                                    className="w-full"
                                    value={data.name}
                                    placeholder="Surname, First Name, Middle Name"
                                    onChange={(e) => setData('name', e.target.value)}
                                />
                                <InputError message={errors.name} />
                            </div>

                            <div>
                                <InputLabel htmlFor="email" value="Email Address" />
                                <TextInput
                                    id="email"
                                    icon={MdEmail}
                                    className="w-full"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div>
                                <InputLabel htmlFor="phone_number" value="Phone Number" />
                                <TextInput
                                    id="phone_number"
                                    icon={FaPhone}
                                    className="w-full"
                                    value={data.phone_number}
                                    onChange={(e) => setData('phone_number', e.target.value)}
                                    placeholder="09123-----"
                                />
                                <InputError message={errors.phone_number} />
                            </div>

                            <div>
                                <InputLabel htmlFor="type" value="Donation Type" />
                                <select
                                    id="type"
                                    value={data.donation_type}
                                    onChange={(e) => setData('donation_type', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                                >
                                    <option value="">-- Select Type --</option>
                                    <option value="cash">Cash</option>
                                    <option value="goods">Goods</option>
                                </select>
                                <InputError message={errors.donation_type} />
                            </div>
                        </div>
                    </div>

                    {/* Cash Donation */}
                    {data.donation_type === 'cash' && (
                        <div>
                            <InputLabel htmlFor="amount" value="Amount (₱)" />
                            <textarea
                                id="amount"
                                className="w-full h-40 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                                value={data.amount}
                                placeholder="00"
                                onChange={(e) => setData('amount', e.target.value)}
                            />
                            <InputError message={errors.amount} />
                        </div>
                    )}

                    {/* Goods Donation */}
                    {data.donation_type === 'goods' && (
                        <div>
                            <h2 className="text-xl font-semibold text-gray-700 mb-4">Goods Donation Items</h2>

                            {items.length > 0 && (
                                <ul className="space-y-2 mb-4">
                                    {items.map(item => (
                                        <li key={item.id} className="flex justify-between items-center bg-gray-50 p-2 rounded border">
                                            <span>{item.description} (Qty: {item.qty})</span>
                                            <div className="space-x-2">
                                                <button
                                                    type="button"
                                                    onClick={() => editItem(item.id)}
                                                    className="text-blue-600 text-sm"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => removeItem(item.id)}
                                                    className="text-red-600 text-sm"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    placeholder="Item description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="border p-2 rounded w-full"
                                />
                                <input
                                    type="number"
                                    placeholder="Quantity"
                                    value={qty}
                                    onChange={(e) => setQty(e.target.value)}
                                    className="border p-2 rounded w-full"
                                />
                            </div>

                            <div className="mt-4 text-right">
                                {editingItemId ? (
                                    <>
                                        <button
                                            type="button"
                                            onClick={cancelEdit}
                                            className="mr-2 text-gray-600"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="button"
                                            onClick={confirmEdit}
                                            className="bg-blue-600 text-white px-4 py-2 rounded"
                                        >
                                            Confirm Edit
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={addItem}
                                        className="bg-green-600 text-white px-4 py-2 rounded"
                                    >
                                        Add Item
                                    </button>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Submit */}
                    <div className="text-center">
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded shadow"
                        >
                            {processing ? 'Submitting...' : 'Create Sponsorship'}
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
};

export default CreateSponsorship;
