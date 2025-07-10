import { Router } from 'express'
import { getWeatherByCity, getWeatherHistory } from '../controllers/weather.controller'
import { authenticate } from '../middleware/auth.middleware'

const router = Router()

// Get current weather by city (authenticated)
router.get('/city/:city', authenticate, getWeatherByCity)

// Get user's weather search history (authenticated)
router.get('/history', authenticate, getWeatherHistory)

export default router
