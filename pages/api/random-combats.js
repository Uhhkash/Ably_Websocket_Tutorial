import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const filePath = path.join(process.cwd(), 'public', 'Chaos_Combats.tsv');
      const fileContent = fs.readFileSync(filePath, 'utf8');
      
      // Split file content by lines and pick a random line
      const lines = fileContent.split('\n').filter(line => line.trim() !== '');
      const randomLine = lines[Math.floor(Math.random() * lines.length)];

      res.status(200).json({ text: randomLine });
    } catch (error) {
      console.error('Error reading TSV file:', error);
      res.status(500).json({ error: 'Failed to read TSV file' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
