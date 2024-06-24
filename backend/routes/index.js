import express from 'express';
import UserController from '../controllers/UserController';
import AuthController from '../controllers/AuthController';
import QuoteController from '../controllers/QuoteController';
import JournalController from '../controllers/JournalController';
import { authenticateToken } from '../utils/jwt';

const router = express.Router();

// Create a New User
router.post('/signup', UserController.createUser);

// Login a User
router.post('/login', AuthController.loginUser);

// Get User Details
router.get('/user', authenticateToken, UserController.getUser);

// Create a New Routes
router.post('/quote', authenticateToken, QuoteController.createQuote);

// Get all Quotes
router.get('/quotes', authenticateToken, QuoteController.getQuotes);

// Delete Quotes By Id
router.delete('/quote/:id', authenticateToken, QuoteController.deleteQuoteById);

// Create a New Journal 
router.post('/journal', authenticateToken, JournalController.createJournal);

// Get all Journals
router.get('/journals', authenticateToken, JournalController.getAllJournal);

// Get Journal By Id
router.get('/journal/:id', authenticateToken, JournalController.getJournalById);

// Update a Journal
router.put('/journal/:id', authenticateToken, JournalController.updateJournalById);

// Delete a Journal
router.delete('/journal/:id', authenticateToken, JournalController.deleteJournalById);

// Route to fetch mood data
router.get('/moods', authenticateToken, JournalController.getMoodData);



export default router;