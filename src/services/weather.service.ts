// src/services/weather.service.ts
import { AppDataSource } from '../config/data-source';
import { WeatherHistory } from '../entities/WeatherHistory';
import { City } from '../entities/City';
import { User } from '../entities/User';
// import { generateCSV } from '../utils/csv-export';
import axios from 'axios';

const weatherRepo = AppDataSource.getRepository(WeatherHistory);
const cityRepo = AppDataSource.getRepository(City);
const userRepo = AppDataSource.getRepository(User);

export const fetchAndSaveWeather = async (cityName: string, userId: number) => {
  const apiKey = process.env.OPENWEATHER_API_KEY;
  if (!apiKey) throw new Error('API key not set');

  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&units=metric&appid=${apiKey}`
  );

  const weatherData = response.data;
  // ✅ Extract and validate values


  // Log to inspect the response structure
  console.log('Weather API response:', weatherData);

  const temperature = weatherData.main?.temp;
  const humidity = weatherData.main?.humidity;
  const condition = weatherData.weather?.[0]?.description;
  const country = weatherData.sys?.country;

  // Validate all required fields
  if (temperature == null || humidity == null || !condition || !country) {
    throw new Error('Incomplete weather data from API');
  }

 
  let city = await cityRepo.findOne({ where: { name: cityName } });
  if (!city) {
    city = cityRepo.create({
      name: cityName,
      country:country,
    });
    await cityRepo.save(city);
  }

  const user = await userRepo.findOneBy({ id: userId });
  if (!user) throw new Error('User not found');

  const weather = weatherRepo.create({
    city,
    user,
    temperature,
    humidity,
    condition,
  });


  await weatherRepo.save(weather);

  return {
    city: city.name,
    temperature,
    humidity,
    condition,
  };
};

// export const getUserWeatherHistory = async (userId: number) => {
//   return await weatherRepo.find({
//     where: { user: { id: userId } },
//     relations: ['city'],
//     order: { fetchedAt: 'DESC' },
//   });
// };

// export const exportWeatherHistoryCSV = async () => {
//   const histories = await weatherRepo.find({
//     relations: ['city', 'user'],
//   });

//   const records = histories.map((h) => ({
//     City: h.city.name,
//     Country: h.city.country,
//     Temperature: h.temperature,
//     Humidity: h.humidity,
//     Condition: h.condition,
//     FetchedAt: h.fetchedAt.toISOString(),
//     UserEmail: h.user?.email ?? 'Anonymous',
//   }));

//   return generateCSV(records);
// };
