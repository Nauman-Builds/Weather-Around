import {
  responsiveHeight as rh,
  responsiveWidth as rw,
  responsiveFontSize as rf,
} from 'react-native-responsive-dimensions';
import Icons from '../Assets/Icons';

export const getTitleByTemp = temp => {
  switch (true) {
    case temp > 40:
      return 'Feel like too hot today';
    case temp >= 30 && temp <= 40:
      return "It's quite warm outside";
    case temp >= 20 && temp < 30:
      return 'Feels like a pleasant day';
    case temp >= 10 && temp < 20:
      return 'Cool breeze in the air';
    case temp >= 0 && temp < 10:
      return 'Chilly weather ahead';
    case temp < 0:
      return 'Brrr... freezing outside!';
    default:
      return 'Weather status unavailable';
  }
};

export const getTitleByHumidity = humidity => {
  switch (true) {
    case humidity > 80:
      return "It's quite muggy and humid today";
    case humidity > 60 && humidity <= 80:
      return 'The air feels moist and humid';
    case humidity > 40 && humidity <= 60:
      return 'Moderate humidity, feels comfortable';
    case humidity > 20 && humidity <= 40:
      return 'The air feels a bit dry today';
    case humidity >= 0 && humidity <= 20:
      return 'Very dry air, stay hydrated';
    default:
      return 'Humidity status unavailable';
  }
};

export const getTitleByVisibility = visibilityInKm => {
  switch (true) {
    case visibilityInKm > 10:
      return 'Perfect for outdoor activities!';
    case visibilityInKm > 5 && visibilityInKm <= 10:
      return 'Good visibility, See clearly!';
    case visibilityInKm > 2 && visibilityInKm <= 5:
      return 'Moderate visibility, be cautious!';
    case visibilityInKm > 1 && visibilityInKm <= 2:
      return 'Low visibility, take extra care!';
    case visibilityInKm <= 1:
      return 'Consider staying indoors!';
    default:
      return 'Visibility status unavailable';
  }
};

export const getTitleByUV = UVindex => {
  switch (true) {
    case UVindex > 10:
      return 'Extreme';
    case UVindex > 7 && UVindex <= 10:
      return 'Very High';
    case UVindex > 5 && UVindex <= 7:
      return 'High';
    case UVindex > 2 && UVindex <= 5:
      return 'Moderate';
    case UVindex <= 2:
      return 'Low';
  }
};

export const getTitleByAQI = aqi => {
  switch (true) {
    case aqi === 1:
      return 'Good - Enjoy outside!';
    case aqi === 2:
      return 'Moderate - Acceptable';
    case aqi === 3:
      return '- Unhealthy Air Quality';
    case aqi === 4:
      return '- Very Unhealthy Quality';
    case aqi === 5:
      return '- Hazardous Air Quality';
  }
};

export const getIndicatorByAQI = aqi => {
  switch (true) {
    case aqi === 1:
      return 10;
    case aqi === 2:
      return 18;
    case aqi === 3:
      return 35;
    case aqi === 4:
      return 50;
    case aqi === 5:
      return 66;
  }
};

export const getWeatherIcon = condition => {
  switch (condition) {
    case 'snow':
      return Icons.snow;
    case 'rain':
      return Icons.rain3D;
    case 'fog':
      return Icons.fog;
    case 'wind':
      return Icons.Wind;
    case 'cloudy':
      return Icons.cloudy;
    case 'partly-cloudy-day':
      return Icons.partlyCloudynDay;
    case 'partly-cloudy-night':
      return Icons.moonCloudFastWindIcon;
    case 'clear-day':
      return Icons.clearDay;
    case 'clear-night':
      return Icons.clearNight;
    default:
      return Icons.appLogo;
  }
};

export const getWeatherIconSize = condition => {
  switch (condition) {
    case 'snow':
      return {
        width: rw(34),
        height: rh(15),
      };
    case 'rain':
      return {
        width: rw(36),
        height: rh(17),
        top: -4,
        marginBottom: -15,
      };
    case 'fog':
      return {
        width: rw(35),
        height: rh(15.5),
      };
    case 'wind':
      return {
        width: rw(41),
        height: rh(18),
        top: -10,
        marginBottom: -24,
      };
    case 'cloudy':
      return {
        width: rw(39),
        height: rh(16.5),
        top: -10,
        marginBottom: -10,
      };
    case 'partly-cloudy-day':
      return {
        width: rw(38),
        height: rh(20),
        top: -15,
        marginBottom: -40,
      };
    case 'partly-cloudy-night':
      return {
        width: rw(36),
        height: rh(18),
        top: -10,
        marginBottom: -23,
      };
    case 'clear-day':
      return {
        width: rw(35),
        height: rh(20),
        top: -17,
        marginBottom: -38,
      };
    case 'clear-night':
      return {
        width: rw(36),
        height: rh(22),
        top: -20,
        marginBottom: -55,
      };
    default:
      return {
        width: rw(34),
        height: rh(19),
        top: -15,
        marginBottom: -32,
      };
  }
};
