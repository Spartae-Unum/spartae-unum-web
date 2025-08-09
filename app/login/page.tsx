'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function LoginPage() {
  const r = useRouter();
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [msg, setMsg] = useState<string|null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password: pwd });
    setLoading(false);
    if (error) { setMsg(error.message); return; }
    r.push('/accueil');
  }

  return (
    <main style={{maxWidth:420, margin:'80px auto', padding:16, fontFamily:'system-ui'}}>
      <h1>Connexion</h1>
      <form onSubmit={onSubmit} style={{display:'grid', gap:12}}>
        <input placeholder="Email" type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
        <input placeholder="Mot de passe" type="password" value={pwd} onChange={e=>setPwd(e.target.value)} required />
        <button disabled={loading} type="submit">{loading ? 'Connexion…' : 'Se connecter'}</button>
      </form>
      {msg && <p style={{color:'crimson'}}>{msg}</p>}
    </main>
  );
}
