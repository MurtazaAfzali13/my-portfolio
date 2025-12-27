import { supabase } from '@/lib/supabase/client';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    // تبدیل snake_case به camelCase برای React
    const projects = data.map(row => ({
      id: row.id,
      title: row.title,
      desc: row.description,  // تبدیل description به desc
      tech: row.tech || [],   // JSONB در Supabase خودش آرایه است
      image: row.image,
      liveUrl: row.live_url,  // تبدیل live_url به liveUrl
      githubUrl: row.github_url, // تبدیل github_url به githubUrl
      createdAt: row.created_at
    }));

    return new Response(JSON.stringify(projects), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}