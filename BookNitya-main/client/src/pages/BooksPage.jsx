import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function BooksPage() {
  const [data, setData] = useState({ items: [], loading: true });
  const [search, setSearch] = useState('');

  const load = async () => {
    try {
      const res = await axios.get('/api/books', { params: { search } });
      setData({ items: res.data.items, loading: false });
    } catch (e) {
      console.error(e);
      setData({ items: [], loading: false });
    }
  };

  useEffect(() => { load(); }, []); // initial

  const onSearch = (e) => {
    e.preventDefault();
    load();
  };

  const onEdit = (id) => {
    window.location.href = `/edit/${id}`;
  };

  const onDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this book?')) return;
    try {
      await axios.delete(`/api/books/${id}`);
      load();
    } catch (err) {
      alert('Failed to delete book');
    }
  };

  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
      backgroundColor: '#f9f9f9',
      minHeight: '100vh'
    }}>
      <h1 style={{
        textAlign: 'center',
        color: '#333',
        marginBottom: '30px',
        fontSize: '2.5rem',
        fontWeight: 'bold'
      }}>Books</h1>
      <form onSubmit={onSearch} style={{
        display: 'flex',
        gap: '10px',
        marginBottom: '30px',
        justifyContent: 'center'
      }}>
        <input
          placeholder="Search books..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: '12px',
            border: '2px solid #ddd',
            borderRadius: '25px',
            fontSize: '16px',
            width: '300px',
            outline: 'none',
            transition: 'border-color 0.3s'
          }}
          onFocus={(e) => e.target.style.borderColor = '#007bff'}
          onBlur={(e) => e.target.style.borderColor = '#ddd'}
        />
        <button
          type="submit"
          style={{
            padding: '12px 24px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '25px',
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'background-color 0.3s'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
        >
          Search
        </button>
      </form>
      {data.loading ? (
        <p style={{
          textAlign: 'center',
          fontSize: '18px',
          color: '#666'
        }}>Loading...</p>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '20px'
        }}>
          {data.items.map(b => (
            <div key={b._id} style={{
              backgroundColor: 'white',
              borderRadius: '10px',
              padding: '20px',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              transition: 'transform 0.3s, box-shadow 0.3s'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.2)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
            }}>
              <h3 style={{
                margin: '0 0 10px 0',
                color: '#333',
                fontSize: '1.2rem'
              }}>{b.title}</h3>
              <p style={{
                margin: '0 0 10px 0',
                color: '#666',
                fontSize: '1rem'
              }}>by {b.author}</p>
              <p style={{
                margin: '0',
                color: '#007bff',
                fontSize: '1.1rem',
                fontWeight: 'bold'
              }}>${b.price}</p>
              <div style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => onEdit(b._id)}
                  style={{
                    flex: 1,
                    padding: '8px',
                    backgroundColor: '#ffc107',
                    border: 'none',
                    borderRadius: '5px',
                    color: 'white',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    transition: 'background-color 0.3s'
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#e0a800'}
                  onMouseOut={(e) => e.target.style.backgroundColor = '#ffc107'}
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(b._id)}
                  style={{
                    flex: 1,
                    padding: '8px',
                    backgroundColor: '#dc3545',
                    border: 'none',
                    borderRadius: '5px',
                    color: 'white',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    transition: 'background-color 0.3s'
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#bd2130'}
                  onMouseOut={(e) => e.target.style.backgroundColor = '#dc3545'}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <Link
          to="/new"
          style={{
            display: 'inline-block',
            padding: '12px 24px',
            backgroundColor: '#28a745',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '25px',
            fontSize: '16px',
            transition: 'background-color 0.3s'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#218838'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#28a745'}
        >
          Add a new book
        </Link>
      </div>
    </div>
  );
}
