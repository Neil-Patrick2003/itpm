import React from 'react';
import Modal from '@/Components/Modal';

export default function EditUserModal({ user, isEditUserOpen, closeEditUser, closeAddUser }) {
  return (
    <Modal show={isEditUserOpen} onClose={closeEditUser} maxWidth='2xl' closeable={true}>
      <div className="p-4">
        <h2 className="text-xl font-semibold">Edit {user.name}</h2>
        <p className="mt-2">T\</p>
        <div className="flex justify-end gap-2">
          <div className="mt-4 flex text-black justify-end">
            <button
              className="px-6 py-2 border bg-green-400 text-white rounded-lg"
              onClick={closeAddUser}
            >
              Create
            </button>
          </div>
          <div className="mt-4 flex text-black justify-end">
            <button
              className="px-6 py-2 border bg-gray-200 text-white rounded-lg"
              onClick={closeEditUser}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
