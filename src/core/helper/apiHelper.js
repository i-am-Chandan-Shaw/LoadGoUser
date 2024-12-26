import {get} from './services';

const calculateFare = async totalDistance => {
  const fareData = await getFareDetails();

  const baseFare = parseInt(fareData?.baseFare || 0, 10);
  const perKmCharge = parseInt(fareData?.perKm || 0, 10) * totalDistance;

  if (isNaN(baseFare) || isNaN(perKmCharge)) {
    console.warn('Invalid fare data received. Using fallback fare.');
    return 200;
  }

  const calculatedFare = baseFare + perKmCharge;

  return Math.ceil(calculatedFare);
};

const getFareDetails = async () => {
  try {
    const data = await get('getFare');
    if (data) {
      return data;
    } else {
      throw new Error('No fare data received from the API.');
    }
  } catch (error) {
    console.error('Error fetching fare details:', error);

    return {
      baseFare: 300,
      perKm: 70,
    };
  }
};

export const initializeFareAmount = distance => {
  const minimumDistanceThreshold = 5;
  const fallbackFare = 200;

  return distance > minimumDistanceThreshold
    ? calculateFare(distance)
    : fallbackFare;
};
