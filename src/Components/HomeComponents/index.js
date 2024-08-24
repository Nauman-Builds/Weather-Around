import React from 'react';
import {Text, View} from 'react-native';
import {
  useGetWeatherByCityQuery,
  useGetWeatherByCoordsQuery,
} from '../../Redux-Toolkit/WeatherSlice/weatherApi';

const WeatherComponent = ({city, lat, lon}) => {
  const {
    data: cityWeather,
    error: cityError,
    isLoading: cityLoading,
  } = useGetWeatherByCityQuery(city);
  const {
    data: coordsWeather,
    error: coordsError,
    isLoading: coordsLoading,
  } = useGetWeatherByCoordsQuery({lat, lon});

  console.log(coordsWeather);

  if (cityLoading || coordsLoading) return <Text>Loading...</Text>;
  if (cityError || coordsError)
    return (
      <Text>Error occurred: {cityError?.message || coordsError?.message}</Text>
    );

  return (
    <View>
      <Text>City Weather: {JSON.stringify(cityWeather)}</Text>
      <Text>Coords Weather: {JSON.stringify(coordsWeather)}</Text>
    </View>
  );
};

export default WeatherComponent;
