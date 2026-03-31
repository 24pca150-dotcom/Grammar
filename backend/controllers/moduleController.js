const pool = require('../config/db');

exports.createModule = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Module name is required' });
  }

  try {
    // Check for duplicates
    const [existing] = await pool.query('SELECT * FROM modules WHERE name = ?', [name]);
    if (existing.length > 0) {
      return res.status(400).json({ message: 'Module already exists' });
    }

    const [result] = await pool.query('INSERT INTO modules (name) VALUES (?)', [name]);
    res.status(201).json({
      message: 'Module created successfully',
      moduleId: result.insertId,
      name
    });
  } catch (error) {
    console.error('Error creating module:', error);
    res.status(500).json({ message: 'Database error' });
  }
};

exports.getAllModules = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM modules ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching modules:', error);
    res.status(500).json({ message: 'Database error' });
  }
};

exports.deleteModule = async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query('DELETE FROM modules WHERE id = ?', [id]);
    res.json({ message: 'Module deleted successfully' });
  } catch (error) {
    console.error('Error deleting module:', error);
    res.status(500).json({ message: 'Database error' });
  }
};
