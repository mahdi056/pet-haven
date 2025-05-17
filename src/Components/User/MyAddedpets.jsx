import React, { useEffect, useState, useContext } from 'react';
import { useReactTable, getCoreRowModel, getSortedRowModel, flexRender } from '@tanstack/react-table';
import axios from 'axios';
import { AuthContext } from '../Provider/AuthProvider';
import Modal from 'react-modal';
import { useNavigate } from 'react-router';

const MyAddedPets = () => {
  const { user } = useContext(AuthContext);
  const [pets, setPets] = useState([]);
  const [selectedPetId, setSelectedPetId] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    if (!user?.email) return; 
    // console.log(user.email);
    axios.get(`https://pet-haven-server-mu.vercel.app/pet-list-email?email=${user.email}`)
     
      .then(res => {
        // console.log(res.data);
        setPets(res.data)}
      )
      .catch(err => console.error(err));
  }, [user.email]);

  const handleDelete = async () => {
    try {
      await axios.delete(`https://pet-haven-server-mu.vercel.app/pet-list/${selectedPetId}`);
      setPets(pets.filter(pet => pet._id !== selectedPetId));
      setModalIsOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAdopt = async (id) => {
    try {
      await axios.patch(`https://pet-haven-server-mu.vercel.app/pet-list/${id}`, { adopted: true });
      setPets(pets.map(pet => pet._id === id ? { ...pet, adopted: true } : pet));
    } catch (err) {
      console.error(err);
    }
  };

  const columns = [
    {
      header: 'Serial',
      cell: info => info.row.index + 1
    },
    {
      header: 'Name',
      accessorKey: 'name'
    },
    {
      header: 'Category',
      accessorKey: 'category'
    },
    {
      header: 'Image',
      accessorKey: 'image',
      cell: info => <img src={info.getValue()} alt="pet" className="w-16 h-16 rounded" />
    },
    {
      header: 'Status',
      accessorKey: 'adopted',
      cell: info => info.getValue() ? 'Adopted' : 'Not Adopted'
    },
    {
      header: 'Actions',
      cell: info => {
        const pet = info.row.original;
        return (
          <div className="flex gap-2">
            <button onClick={() => navigate(`/dashboard/updatepet/${pet._id}`)} className="btn btn-sm btn-primary">Update</button>
            <button onClick={() => { setSelectedPetId(pet._id); setModalIsOpen(true); }} className="btn btn-sm btn-error">Delete</button>
         
            {
              pet.adopted ? ( <button onClick={() => handleAdopt(pet._id)} className="btn btn-sm btn-success">Adopted</button>)
              :
              ( <button onClick={() => handleAdopt(pet._id)} className="btn btn-sm btn-success">Adopt</button>)
            }
          </div>
        );
      }
    }
  ];

  const table = useReactTable({
    data: pets,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {}
  });

  return (
    <div className="overflow-x-auto p-4">
      <h2 className="text-2xl font-bold mb-4">My Added Pets</h2>
      <table className="table w-full">
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} className="p-6 bg-white rounded shadow max-w-md mx-auto mt-20">
        <h2 className="text-xl font-bold mb-4">Are you sure you want to delete this pet?</h2>
        <div className="flex justify-end gap-4">
          <button className="btn" onClick={() => setModalIsOpen(false)}>No</button>
          <button className="btn btn-error" onClick={handleDelete}>Yes</button>
        </div>
      </Modal>
    </div>
  );
};

export default MyAddedPets;
