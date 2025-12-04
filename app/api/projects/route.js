import db from '@/lib/db';

export async function GET() {
  try {
    const rows = db.prepare('SELECT * FROM projects').all();
    const projects = rows.map(row => ({
      ...row,
      tech: JSON.parse(row.tech)
    }));

    return new Response(JSON.stringify(projects), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
