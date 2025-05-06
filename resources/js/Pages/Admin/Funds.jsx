import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.jsx';
import DynamicEmptyEstate from '@/Components/DynamicEmptyEstate.jsx';
import Modal from "@/Components/Modal.jsx";
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";

const Funds = ({ sponsors, total_donations, total_expenses, balance, expenses }) => {
    const currencyFormatter = new Intl.NumberFormat('en-PH', {
        style: 'currency',
        currency: 'PHP',
        minimumFractionDigits: 2,
    });

    const [modalVisible, setModalVisible] = React.useState(false);
    const [isEditing, setIsEditing] = React.useState(false);
    const [editingId, setEditingId] = React.useState(null);

    const { data, setData, post, patch, processing, errors, reset } = useForm({
        purpose: '',
        amount: '',
        date_spent: '',
        notes: '',
    });

    const openAddModal = () => {
        reset();
        setIsEditing(false);
        setEditingId(null);
        setModalVisible(true);
    };

    const openEditModal = (expense) => {
        setIsEditing(true);
        setEditingId(expense.id);
        setData({
            purpose: expense.purpose || '',
            amount: expense.amount || '',
            date_spent: expense.date_spent || '',
            notes: expense.notes || '',
        });
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        reset();
        setIsEditing(false);
        setEditingId(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if(isEditing)
            patch(`/funds/${editingId}`, {
                onSuccess: () => {
                    closeModal();
                    setEditingId(null);
                    setIsEditing(false);
                    reset();
                },
            })
        else {
            post('/funds', {
                onSuccess: () => {
                    closeModal();
                    reset();
                }
            })
        }




    };

    return (
        <AuthenticatedLayout>
            <Head title="Funds" />

            <div>
                {/* Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    <div className="bg-green-100 p-4 rounded shadow">
                        <p className="text-sm text-gray-600">Total Donations</p>
                        <p className="text-lg font-semibold text-green-800">
                            {currencyFormatter.format(total_donations)}
                        </p>
                    </div>
                    <div className="bg-red-100 p-4 rounded shadow">
                        <p className="text-sm text-gray-600">Total Expenses</p>
                        <p className="text-lg font-semibold text-red-800">
                            {currencyFormatter.format(total_expenses)}
                        </p>
                    </div>
                    <div className="bg-blue-100 p-4 rounded shadow">
                        <p className="text-sm text-gray-600">Balance</p>
                        <p className="text-lg font-semibold text-blue-800">
                            {currencyFormatter.format(balance)}
                        </p>
                    </div>
                </div>

                {/* Add Expense Button */}
                <div className="flex justify-end mb-2">
                    <button
                        onClick={openAddModal}
                        className="bg-green-400 text-white px-4 py-2 rounded hover:bg-indigo-700"
                    >
                        + Add Expense
                    </button>
                </div>

                {/* Expenses Table */}
                <div className="mt-4 flow-root">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead>
                                <tr>
                                    <th className="py-3.5 px-4 text-left text-sm font-semibold text-green-800">ID</th>
                                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-green-800">Purpose</th>
                                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-green-800">Amount</th>
                                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-green-800">Date Spent</th>
                                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-green-800">Notes</th>
                                    <th className="py-3.5 px-4 text-right text-sm font-semibold text-green-800">Action</th>
                                </tr>
                                </thead>
                                <tbody className="bg-white">
                                {expenses.length > 0 ? (
                                    expenses.map((expense) => (
                                        <tr key={expense.id} className="even:bg-gray-50 hover:bg-gray-100 transition">
                                            <td className="py-4 px-4 text-sm font-medium text-gray-900">{expense.id}</td>
                                            <td className="px-3 py-4 text-sm text-gray-500">{expense.purpose}</td>
                                            <td className="px-3 py-4 text-sm text-gray-500">
                                                {currencyFormatter.format(expense.amount)}
                                            </td>
                                            <td className="px-3 py-4 text-sm text-gray-500">
                                                {new Date(expense.date_spent).toLocaleDateString()}
                                            </td>
                                            <td className="px-3 py-4 text-sm text-gray-500">{expense.notes || '—'}</td>
                                            <td className="py-4 px-4 text-right text-sm">
                                                <button
                                                    onClick={() => openEditModal(expense)}
                                                    className="text-indigo-600 hover:text-indigo-900"
                                                >
                                                    Edit
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="text-center py-8 text-sm text-gray-500">
                                            <DynamicEmptyEstate
                                                title="No expenses yet"
                                                description="Add a new expense and track your spending."
                                                actionLabel="Add New Expense"
                                                onActionClick={openAddModal}
                                            />
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal for Add/Edit Expense */}
            <Modal show={modalVisible} onClose={closeModal} key={editingId ?? 'new'}>
                <div className="p-6">
                    <h2 className="text-lg font-semibold mb-4">
                        {isEditing ? 'Edit Expense' : 'Add New Expense'}
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <InputLabel htmlFor="purpose" label="Purpose">Purpose</InputLabel>
                            <TextInput
                                id="purpose"
                                name="purpose"
                                value={data.purpose}
                                onChange={(e) => setData("purpose", e.target.value)}
                                className="mt-1 block w-full"
                                required
                            />
                            {errors.purpose && <p className="text-sm text-red-500 mt-1">{errors.purpose}</p>}
                        </div>

                        <div>
                            <InputLabel htmlFor="amount" label="Amount (₱)">Amount (₱)</InputLabel>
                            <TextInput
                                id="amount"
                                name="amount"
                                type="number"
                                min="0"
                                step="0.01"
                                value={data.amount}
                                onChange={(e) => setData("amount", e.target.value)}
                                className="mt-1 block w-full"
                                required
                            />
                            {errors.amount && <p className="text-sm text-red-500 mt-1">{errors.amount}</p>}
                        </div>

                        <div>
                            <InputLabel htmlFor="date_spent" label="Date Spent">Date Spent</InputLabel>
                            <TextInput
                                id="date_spent"
                                name="date_spent"
                                type="date"
                                value={data.date_spent}
                                onChange={(e) => setData("date_spent", e.target.value)}
                                className="mt-1 block w-full"
                                required
                            />
                            {errors.date_spent && <p className="text-sm text-red-500 mt-1">{errors.date_spent}</p>}
                        </div>

                        <div>
                            <InputLabel htmlFor="notes" label="Notes (Optional)">Notes (Optional)</InputLabel>
                            {data.notes}
                            <textarea
                                id="notes"
                                name="notes"

                                onChange={(e) => setData("notes", e.target.value)}
                                value={data.notes}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                rows="3"
                            />
                            {errors.notes && <p className="text-sm text-red-500 mt-1">{errors.notes}</p>}
                        </div>

                        <div className="flex justify-end">
                            <PrimaryButton disabled={processing}>
                                {processing
                                    ? (isEditing ? 'Updating...' : 'Saving...')
                                    : (isEditing ? 'Update Expense' : 'Save Expense')}
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
};

export default Funds;
