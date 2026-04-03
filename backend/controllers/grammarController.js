const pool = require('../config/db');

exports.getCategories = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM modules');
    if (rows.length === 0) {
      // Fallback for demo if DB isn't seeded
      return res.json([
        { id: 1, name: 'Reading Mastery', slug: 'reading' },
        { id: 2, name: 'Creative Writing', slug: 'writing' },
        { id: 3, name: 'Audio Linguistics', slug: 'listening' },
        { id: 4, name: 'Speech & Verbal', slug: 'speaking' }
      ]);
    }
    
    // Ensure rows have slug for frontend routing if not in DB
    const processedRows = rows.map(row => ({
      ...row,
      slug: row.slug || row.name.toLowerCase().replace(/\s+/g, '-')
    }));
    
    res.json(processedRows);
  } catch (error) {
    console.error('Error fetching categories (modules):', error);
    res.status(500).json({ message: 'Database error' });
  }
};

exports.getQuestionsByCategory = async (req, res) => {
  const { categoryId } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM questions WHERE module_id = ?', [categoryId]);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ message: 'Database error' });
  }
};
