import { supabase } from '@/lib/supabase/client';

export async function GET() {
  try {
    // یک query ساده می‌زنیم فقط برای تست اتصال
    const { data, error } = await supabase
      .from('projects')
      .select('id')
      .limit(1);

    if (error) {
      throw error;
    }

    return new Response(
      JSON.stringify({ status: 'ok', message: 'Supabase connected!', sample: data }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ status: 'error', message: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}
