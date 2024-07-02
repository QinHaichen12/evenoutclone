"use client";
import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client'; 
import { useRouter } from "next/navigation";

export default function CreatePredictionPage() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [choices, setChoices] = useState<string[]>(['']);
    const [expiresAt, setExpiresAt] = useState<string>('');
    const [isOpen, setIsOpen] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [user, setUser] = useState<any>(null);
    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
      const getUser = async () => {
        const { data } = await supabase.auth.getUser();
        setUser(data.user);
      };
  
      getUser();
    }, []);
  
    const addChoice = () => setChoices([...choices, '']);
  
    const handleChoiceChange = (index: number, value: string) => {
      const newChoices = choices.slice();
      newChoices[index] = value;
      setChoices(newChoices);
    };
  
    const handleSubmit = async (event: React.FormEvent) => {
      event.preventDefault();
      setError(null);
    
      if (!user) {
        setError('You must be logged in to create a prediction.');
        console.log("user not logged in!");
        return;
      }
      console.log("try");
      try {
        const { data, error } = await supabase
          .from('posts')
          .insert([
            {
              title,
              content,
              choices,
              expires_at: expiresAt ? new Date(expiresAt).toISOString() : null,
              isOpen,
              created_by: user.id,
            },
          ]);
        console.log("Error: " + error?.message);
        if (error) throw error;
  
        router.push('/forum');
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred.');
        }
      }
    };
  
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold">Create a Prediction</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="content">Content</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="expiresAt">Expires At</label>
            <input
              id="expiresAt"
              type="datetime-local"
              value={expiresAt}
              onChange={(e) => setExpiresAt(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Choices</label>
            {choices.map((choice, index) => (
              <input
                key={index}
                type="text"
                value={choice}
                onChange={(e) => handleChoiceChange(index, e.target.value)}
                className="w-full p-2 border rounded mb-2"
                required
              />
            ))}
            <button type="button" onClick={addChoice} className="text-blue-500">Add another choice</button>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Is Open</label>
            <input
              id="isOpen"
              type="checkbox"
              checked={isOpen}
              onChange={(e) => setIsOpen(e.target.checked)}
              className="mr-2 leading-tight"
            />
          </div>
          {error && <div className="text-red-500">{error}</div>}
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">Create Prediction</button>
        </form>
      </div>
    );
  }
