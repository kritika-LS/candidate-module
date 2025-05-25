import axios from 'axios';

interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

interface GeocodeResult {
  address_components: AddressComponent[];
  formatted_address: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
}

export interface PlaceGeoCodeResponse {
  city: string;
  state: string;
  country: string;
  countryName: string;
  zipcode: string;
  stateName: string;
}

interface PlacePrediction {
  description: string;
  place_id: string;
  structured_formatting: {
    main_text: string;
    secondary_text: string;
  };
}

interface PlaceAutocompleteResponse {
  predictions: PlacePrediction[];
  status: string;
}

const INITIAL_GEOCODE_VALUES: PlaceGeoCodeResponse = {
  city: '',
  state: '',
  country: '',
  zipcode: '',
  stateName: '',
  countryName: '',
};

export type GetCityACResp = {value: string; placeId: string};

const getCity = async (input: string): Promise<GetCityACResp[]> => {
  try {
    const response = await axios.get<PlaceAutocompleteResponse>(
      `https://submissions-service.thehummingbird.pro/api/v1/google/places/autocomplete?input=${input}`,
    );

    return response.data.predictions.map(prediction => ({
      value: prediction.description,
      placeId: prediction.place_id,
    }));
  } catch (error) {
    console.error('Error fetching place suggestions:', error);
    return [];
  }
};

const getGeoCoding = async (placeId: string): Promise<PlaceGeoCodeResponse> => {
  try {
    const response = await axios.get<{
      result: GeocodeResult;
      status: string;
    }>(
      `https://submissions-service.thehummingbird.pro/api/v1/google/places/details?placeId=${placeId}`,
    );

    if (response.data.status === 'OK') {
      const addressComponents = response.data.result.address_components;
      const parsedAddress: PlaceGeoCodeResponse = INITIAL_GEOCODE_VALUES;
      console.log("tag response",addressComponents)
      addressComponents.forEach(component => {
        if (component.types.includes('locality')) {
          parsedAddress.city = component.long_name;
        } else if (
          component.types.includes('administrative_area_level_1') ||
          component.types.includes('administrative_area_level_2')
        ) {
          parsedAddress.state = component.short_name;
          parsedAddress.stateName = component.long_name;
        } else if (component.types.includes('country')) {
          parsedAddress.country = component.short_name;
          parsedAddress.countryName = component.long_name;
        } else if (component.types.includes('postal_code')) {
          parsedAddress.zipcode = component.long_name;
        }
      });

      return parsedAddress;
    } else {
      console.error(`Geocoding failed: ${response.data.status}`);
      return INITIAL_GEOCODE_VALUES;
    }
  } catch (error) {
    console.error('Error fetching geocoding details:', error);
    return INITIAL_GEOCODE_VALUES;
  }
};

export {getCity, getGeoCoding};
