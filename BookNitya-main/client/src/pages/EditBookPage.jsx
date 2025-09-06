import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditBookPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', author: '', price: '', category: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`/api/books/${id}`);
        setForm({
          title: res.data.title || '',
          author: res.data.author || '',
          price: res.data.price || '',
          category: res.data.category || ''
        });
      } catch (err) {
        setError('Failed to load book');
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      await axios.put(`/api/books/${id}`, { ...form, price: Number(form.price) });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Error updating book');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading book data...</p>;

  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      maxWidth: '600px',
      margin: '0 auto',
      padding: '20px',
      backgroundColor: '#f9f9f9',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <h1 style={{
        color: '#333',
        marginBottom: '30px',
        fontSize: '2.5rem',
        fontWeight: 'bold'
      }}>Edit Book</h1>
      <form onSubmit={onSubmit} style={{
        display: 'grid',
        gap: '15px',
        width: '100%',
        maxWidth: '400px',
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
      }}>
        <input
          required
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={onChange}
          style={{
            padding: '12px',
            border: '2px solid #ddd',
            borderRadius: '5px',
            fontSize: '16px',
            outline: 'none',
            transition: 'border-color 0.3s'
          }}
          onFocus={(e) => e.target.style.borderColor = '#007bff'}
          onBlur={(e) => e.target.style.borderColor = '#ddd'}
        />
        <input
          required
          name="author"
          placeholder="Author"
          value={form.author}
          onChange={onChange}
          style={{
            padding: '12px',
            border: '2px solid #ddd',
            borderRadius: '5px',
            fontSize: '16px',
            outline: 'none',
            transition: 'border-color 0.3s'
          }}
          onFocus={(e) => e.target.style.borderColor = '#007bff'}
          onBlur={(e) => e.target.style.borderColor = '#ddd'}
        />
        <input
          required
          name="price"
          type="number"
          step="0.01"
          placeholder="Price"
          value={form.price}
          onChange={onChange}
          style={{
            padding: '12px',
            border: '2px solid #ddd',
            borderRadius: '5px',
            fontSize: '16px',
            outline: 'none',
            transition: 'border-color 0.3s'
          }}
          onFocus={(e) => e.target.style.borderColor = '#007bff'}
          onBlur={(e) => e.target.style.borderColor = '#ddd'}
        />
        <input
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={onChange}
          style={{
            padding: '12px',
            border: '2px solid #ddd',
            borderRadius: '5px',
            fontSize: '16px',
            outline: 'none',
            transition: 'border-color 0.3s'
          }}
          onFocus={(e) => e.target.style.borderColor = '#007bff'}
          onBlur={(e) => e.target.style.borderColor = '#ddd'}
        />
        <button
          disabled={saving}
          style={{
            padding: '12px',
            backgroundColor: saving ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            fontSize: '16px',
            cursor: saving ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.3s'
          }}
          onMouseOver={(e) => {
            if (!saving) e.target.style.backgroundColor = '#0056b3';
          }}
          onMouseOut={(e) => {
            if (!saving) e.target.style.backgroundColor = '#007bff';
          }}
        >
          {saving ? 'Saving...' : 'Update'}
        </button>
        {error && (
          <p style={{
            color: '#dc3545',
            margin: '0',
            fontSize: '14px',
            textAlign: 'center'
          }}>
            {error}
          </p>
        )}
      </form>
    </div>
  );
}
