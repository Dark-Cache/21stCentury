import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export default function SupabaseTest() {
  const [status, setStatus] = useState('Testing connection...');

  useEffect(() => {
    const testConnection = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          setStatus(`❌ Error: ${error.message}`);
        } else {
          setStatus('✅ Supabase Connected Successfully!');
        }
      } catch (err) {
        setStatus(`❌ Connection Failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
      }
    };
    testConnection();
  }, []);

  return (
    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
      <p className="text-sm font-medium">{status}</p>
    </div>
  );
}