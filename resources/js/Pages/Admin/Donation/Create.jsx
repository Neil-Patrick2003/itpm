import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React, { useState } from 'react';
import { Link, useForm, usePage } from '@inertiajs/react';


const Create = ( {sponsor} ) => {
  const { data, setData, post, processing, errors } = useForm({
    donation_type: '',
    amount: '',
    description: '',
    qty: ''
  });

  const [items, setItems] = useState([]);
  const [description, setDescription] = useState('');
  const [qty, setQty] = useState('');
  const [editingItemId, setEditingItemId] = useState(null);
  
  

  function submitCreate(e) {
    e.preventDefault();
  
    console.log(data);
    if (data.donation_type === 'goods' && items.length === 0) {
      alert('Please add at least one item.'); 
      return;
    }

    if (data.donation_type === 'goods' && items.length === 0) {
      data.items = [];  
    } else {
      data.items = items; 
    }

    console.log(`/sponsorships/${sponsor.id}/donation`)

    post(`/sponsorships/${sponsor.id}/donation`);
  }

  const addItem = () => {
    if (description && qty) {
      setItems([
        ...items,
        {
          id: items.length + 1,
          description,
          qty: parseInt(qty),
        }
      ]);
      setDescription('');
      setQty('');
    }
  };

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const editItem = (id) => {
    const itemToEdit = items.find(item => item.id === id);
    setDescription(itemToEdit.description);
    setQty(itemToEdit.qty);
    setEditingItemId(id);
  };

  const confirmEdit = () => {
    setItems(items.map(item => 
      item.id === editingItemId 
        ? { ...item, description, qty: parseInt(qty) }
        : item
    ));
    setEditingItemId(null);
    setDescription('');
    setQty('');
  };

  const cancelEdit = () => {
    setEditingItemId(null);
    setDescription('');
    setQty('');
  };

  return (
    <AuthenticatedLayout>
      <div className="flex flex-col w-full h-screen gap-2 sm:p-6 lg:p-8">
        
        <div className="bg-white p-6 h-full rounded-lg shadow-md">
          
          

          <h1 className="text-center text-2xl font-semibold text-gray-800 mb-6">Add Donation</h1>
            
          <form onSubmit={submitCreate} className="space-y-6">
            <div className="bg-gray-100 p-4 rounded-md shadow-sm">
              <p className="text-xl font-semibold text-gray-700 mb-4">Personal Information</p>
              

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                
              </div>
            </div>

            <div className="bg-gray-100 p-4 rounded-md shadow-sm mt-6">
              <p className="text-xl font-semibold text-gray-700 mb-4">Donation Type</p>

              <div className="flex items-center gap-6">
                <label htmlFor="cash" className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="donation_type"
                    id="cash"
                    className="h-4 w-4 text-green-500 focus:ring-green-500"
                    onChange={() => setData('donation_type', 'cash')}
                    checked={data.donation_type === 'cash'}
                  />
                  Cash
                </label>

                <label htmlFor="goods" className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="donation_type"
                    id="goods"
                    className="h-4 w-4 text-green-500 focus:ring-green-500"
                    onChange={() => setData('donation_type', 'goods')}
                    checked={data.donation_type === 'goods'}
                  />
                  Goods
                </label>
                {errors.donation_type && <div className="text-red-500 text-xs mt-1">{errors.donation_type}</div>}


                {data.donation_type === 'cash' && (
                  <div className="flex items-center gap-4">
                    <label htmlFor="amount" className="font-semibold text-sm text-gray-700">Amount</label>
                    <input
                      type="number"
                      step={0.01}
                      id="amount"
                      value={data.amount || ''}
                      onChange={(e) => setData('amount', e.target.value)}
                      className="mt-1 block w-full sm:w-auto px-4 py-2 border-b-2 border-gray-300 focus:ring-green-500 focus:border-green-500 focus:outline-none sm:text-sm"
                    />
                    {/* Error Message */}
                    {errors.amount && (
                      <div className="text-red-500 text-xs mt-1">{errors.amount}</div>
                    )}
                  </div>
                )}
              </div>
              
            </div>

            {data.donation_type === 'goods' && (
              <div className="bg-gray-100 p-4 rounded-md shadow-sm mt-6">
                <p>Goods Item</p>
                
                {items.length > 0 && (
                  <ul className="mb-4">
                    {items.map(item => (
                      <li key={item.id} className="flex justify-between items-center border-b py-2">
                        <span>{item.description} (Qty: {item.qty})</span>
                        <div>
                          <button type="button" onClick={() => editItem(item.id)} className="mr-2 text-blue-500">Edit</button>
                          <button type="button" onClick={() => removeItem(item.id)} className="text-red-500">Remove</button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                  <div>
                    <input
                      type="text"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="ex. Bearbrand sulit pack"
                      className="p-2 w-full border border-gray-300 rounded-md w-1/2"
                    />
                    {errors.description && (
                      <div className="text-red-500 text-xs mt-1">{errors.description}</div>
                    )}
                  </div>
                  <div>
                    <input
                      type="number"
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                      placeholder="Quantity"
                      className="p-2 w-full border border-gray-300 rounded-md w-1/2"
                    />
                    {errors.qty && (
                      <div className="text-red-500 text-xs mt-1">{errors.qty}</div>
                    )}
                  </div>
                </div>

                <div className="flex justify-end mt-4">
                  {editingItemId ? (
                    <>
                      <button type="button" onClick={cancelEdit} className="text-gray-600 mr-2">Cancel</button>
                      <button type="button" onClick={confirmEdit} className="bg-blue-500 text-white px-4 py-2 rounded-md">Confirm Edit</button>
                    </>
                  ) : (
                    <button type="button" onClick={addItem} className="bg-green-500 text-white px-4 py-2 rounded-md">Add Item</button>
                  )}
                </div>
              </div>
            )}

            <div className="text-center mt-6">
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded-md"
                disabled={processing}
              >
                {processing ? 'Processing...' : 'Submit'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default Create;
