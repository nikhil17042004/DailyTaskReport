const express = require('express');
const TaskReport = require('../models/TaskReport');
const auth = require('../middleware/auth');

const router = express.Router();

router.use(auth);

router.post('/', async (req, res) => {
  try {
    const { date, description, hoursWorked, status } = req.body;
    const task = new TaskReport({
      user: req.user.id,
      date,
      description,
      hoursWorked,
      status
    });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const tasks = await TaskReport.find({ user: req.user.id }).sort({ date: -1, createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const task = await TaskReport.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Not found' });
    if (task.user.toString() !== req.user.id) return res.status(403).json({ message: 'Forbidden' });
    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const task = await TaskReport.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Not found' });
    if (task.user.toString() !== req.user.id) return res.status(403).json({ message: 'Forbidden' });

    const { date, description, hoursWorked, status } = req.body;
    task.date = date ?? task.date;
    task.description = description ?? task.description;
    task.hoursWorked = hoursWorked ?? task.hoursWorked;
    task.status = status ?? task.status;

    await task.save();
    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:id',auth, async (req, res) => {
  try {
    const task = await TaskReport.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Not found' });
    if (task.user.toString() !== req.user.id) return res.status(403).json({ message: 'Forbidden' });

    await task.deleteOne();
    res.json({ message: 'Deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
