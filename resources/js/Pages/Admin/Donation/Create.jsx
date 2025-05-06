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


      </div>
    </AuthenticatedLayout>
  );
};

export default Create;
