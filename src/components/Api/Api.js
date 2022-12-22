import axios from 'axios';
import { useState, useEffect } from 'react';

const API_KEY = '29396920-d4426056c3f6851287cd3980f';

export const useFetch = (query, page, perPage) => {
  const [images, setImages] = useState([]);

  const [error, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const clearImages = () => setImages([]);

  useEffect(() => {
    if (query === '') return;
    // handleLoadingTrue(); //bez sensu
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await axios
          .get(
            `https://pixabay.com/api/?key=${API_KEY}&q=${query}&page=${page}&image_type=photo&orientation=horizontal&per_page=${perPage}&safesearch=true`
          )
          .then(response => {
            setImages(oldImages => [...oldImages, ...response.data.hits]);
          });
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [query, page, perPage]);

  return {
    images,
    error,
    isLoading,
    clearImages,
  };
};
