'use client';

import { GlobeIcon } from '@heroicons/react/solid';
import { City, Country } from 'country-state-city';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Select from 'react-select';

type Props = {};

const options = Country.getAllCountries().map((country) => ({
  value: {
    latitude: country.latitude,
    longitude: country.longitude,
    isoCode: country.isoCode,
  },
  label: country.name,
}));
type option = {
  value: {
    latitude: string;
    longitude: string;
    isoCode: string;
  };
  label: string;
} | null;
type cityOption = {
  value: {
    latitude: string;
    longitude: string;
    countryCode: string;
    name: string;
    stateCode: string;
  };
  label:string;
} | null;

export default function CityPicker({}: Props) {
  const [selectedCountry, setSelectedCountry] = useState<option>(null);
  const [selectedCity, setSelectedCity] = useState<cityOption>(null);
  const router = useRouter();

  const handleSelectedCountry = (option: option) => {
    setSelectedCountry(option);
    setSelectedCity(null);
  };
  const handleSelectedCity = (option:cityOption)=>{
    setSelectedCity(option);
    console.log(selectedCity)
    router.push(`location/${option?.value.latitude}/${option?.value.longitude}`);
  }
  return (
    <div className='space-y-4'>
      <div className='space-y-2'>
        <div className='flex items-center space-x-2 text-white/80'>
          <GlobeIcon className='h-5 w-5 text-white' />
          <label htmlFor='country'>Country</label>
        </div>
        <Select
          value={selectedCountry}
          onChange={handleSelectedCountry}
          options={options}
        />
      </div>
      {selectedCountry &&(
        <div className='space-y-2'>
        <div className='flex items-center space-x-2 text-white/80'>
          <GlobeIcon className='h-5 w-5 text-white' />
          <label htmlFor='country'>City</label>
        </div>
        <Select
          value={selectedCity}
          onChange={handleSelectedCity}
          options={
            City.getCitiesOfCountry(selectedCountry.value.isoCode)?.map(state=>({
              value: {
                latitude: state.latitude,
                longitude: state.longitude,
                countryCode: state.countryCode,
                name: state.name,
                stateCode: state.stateCode,
              },
              label: state.name,
            }))
          }
        />
      </div>
      )}
      
    </div>
  );
}