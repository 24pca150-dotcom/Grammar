const pool = require('../config/db');

exports.getStats = async (req, res) => {
  try {
    const [userRows] = await pool.query('SELECT COUNT(*) as total FROM users WHERE role = "student"');
    const [activeRows] = await pool.query('SELECT COUNT(*) as total FROM users WHERE status = "Active" AND role = "student"');

    const stats = {
      totalUsers: Number(userRows[0].total),
      activeTests: Number(activeRows[0].total),
      systemHealth: '99.9%',
      growth: '+12%',
      lastMonthComparison: 'vs last month'
    };

    console.log('Admin Stats Pulled:', stats);
    res.json(stats);
  } catch (error) {
    console.error('Stats Sync Error:', error);
    res.status(500).json({ message: 'Error fetching stats', error: error.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, name, email, role, status, level, current_module FROM users WHERE role = "student"');
    
    // Formatting for frontend
    const users = rows.map(u => ({
      ...u,
      initials: u.name.split(' ').map(n => n[0]).join(''),
      color: ['rose', 'indigo', 'orange', 'emerald', 'purple'][u.id % 5]
    }));

    res.json({
      data: users,
      total: users.length,
      page: 1,
      limit: 10
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
};

exports.getXpFlow = async (req, res) => {
  // Mocked for visual momentum based on screenshot
  res.json({
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
    dataset: [30, 50, 40, 100, 70, 20, 45]
  });
};
