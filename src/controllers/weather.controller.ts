import { Request, Response } from 'express'
import { AppDataSource } from '../config/data-source'
import { City } from '../entities/City'
import { User } from '../entities/User'
import { WeatherHistory } from '../entities/WeatherHistory'
import axios from 'axios'

const cityRepo = AppDataSource.getRepository(City)
const userRepo = AppDataSource.getRepository(User)
const historyRepo = AppDataSource.getRepository(WeatherHistory)

export const getWeatherByCity = async (req: Request, res: Response): Promise<void> => {
  try {
    const cityName = req.params.city
    // const apiKey = process.env.OPENWEATHER_API_KEY
    

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&units=metric&appid=${process.env.OPENWEATHER_API_KEY}`
    )

    const weatherData = response.data
     const temperature = weatherData.main?.temp;
  const humidity = weatherData.main?.humidity;
  const condition = weatherData.weather?.[0]?.description;
  const country = weatherData.sys?.country;

  // Validate all required fields
  if (temperature == null || humidity == null || !condition || !country) {
    throw new Error('Incomplete weather data from API');
  }

    let city = await cityRepo.findOne({ where: { name: cityName } })
    if (!city) {
      city = cityRepo.create({ name: cityName, country: country })
      await cityRepo.save(city)
    }

    const userId = (req as any).user.id
    const user = await userRepo.findOneBy({ id: userId })

    if (!user) {
      res.status(404).json({ message: 'User not found' })
      return
    }

    const newEntry = historyRepo.create({
      user,
      city,
      temperature,
       humidity,
      condition,
    })
    await historyRepo.save(newEntry)

    res.status(200).json(weatherData)
  } catch (error) {
    console.error('Weather error:', error)
    res.status(500).json({ message: 'Failed to fetch weather' })
  }
}

export const getWeatherHistory = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.id

    const history = await historyRepo.find({
      where: { user: { id: userId } },
      relations: ['city'],
      order: { fetchedAt: 'DESC' },
    })

    res.status(200).json(history)
  } catch (error) {
    console.error('History error:', error)
    res.status(500).json({ message: 'Failed to fetch history' })
  }
}
