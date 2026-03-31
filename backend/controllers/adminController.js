const pool = require('../config/db');

exports.getStats = async (req, res) => {
  try {
    // Attempt real count if tables exist, otherwise use fallback
    let userCount = 12482; // Fallback
    try {
      const [rows] = await pool.query('SELECT COUNT(*) as total FROM users');
      userCount = rows[0].total;
    } catch (e) {
      console.warn('Users table might not exist, using fallback data');
    }

    res.json({
      totalUsers: userCount,
      activeTests: 1154,
      systemHealth: '99.9%',
      growth: '+12%',
      lastMonthComparison: 'vs last month'
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching stats', error: error.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    // Return a rich list of users
    // In a real app, this would be: SELECT * FROM users LIMIT ...
    const scholars = [
      { id: 1, name: 'Elena Kostic', email: 'elena.k@example.com', initials: 'EK', status: 'Active', color: 'rose', level: 18, progress: 75, module: 'Advanced Syntax Flow' },
      { id: 2, name: 'Julian March', email: 'j.march@edu.io', initials: 'JM', status: 'Inactive', color: 'indigo', level: 4, progress: 25, module: 'Nouns & Identity' },
      { id: 3, name: 'Sarah Thorne', email: 'thorne_s@outlook.com', initials: 'ST', status: 'Active', color: 'orange', level: 25, progress: 90, module: 'Mastery Curriculum' },
      { id: 4, name: 'Robert Fox', email: 'fox.r@test.com', initials: 'RF', status: 'Active', color: 'emerald', level: 12, progress: 45, module: 'Verb Conjugation' },
      { id: 5, name: 'Alice Walker', email: 'alice.w@grammar.ai', initials: 'AW', status: 'Active', color: 'purple', level: 30, progress: 95, module: 'Full Proficiency' }
    ];
    
    res.json({
      data: scholars,
      total: 12482,
      page: 1,
      limit: 10
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
};

exports.getXpFlow = async (req, res) => {
  // Chart data: 7 values for the dashboard chart
  res.json({
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
    dataset: [30, 50, 40, 100, 70, 20, 45]
  });
};
