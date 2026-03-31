const pool = require('../config/db');

exports.getCategories = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM categories');
    if (rows.length === 0) {
      // Fallback for demo if DB isn't seeded
      return res.json([
        { id: 1, name: 'Reading Mastery', slug: 'reading', description: 'Advanced comprehension techniques.' },
        { id: 2, name: 'Creative Writing', slug: 'writing', description: 'Mastering the flow of words.' },
        { id: 3, name: 'Audio Linguistics', slug: 'listening', description: 'Understanding real-world phonetics.' },
        { id: 4, name: 'Speech & Verbal', slug: 'speaking', description: 'Perfecting articulation and pace.' }
      ]);
    }
    res.json(rows);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ message: 'Database error' });
  }
};

exports.getQuestionsByCategory = async (req, res) => {
  const { categoryId } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM questions WHERE category_id = ?', [categoryId]);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ message: 'Database error' });
  }
};
