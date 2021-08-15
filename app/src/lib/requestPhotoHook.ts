import { useEffect, useState } from "react";
import { Photo } from "./types/Photo";
import { getPaginatedPhotos } from "./requests/getPaginatedPhotos";

export const requestPhotoHook = (
  skip: number,
  initPhotos: Photo[],
  initMore: boolean
) => {
  const [photos, setPhotos] = useState<Photo[]>(initPhotos);
  const [more, setMore] = useState<boolean>(initMore);

  const fetchMorePhotos = async () => {
    if (skip === 0) {
      return {
        photos,
        more,
      };
    }

    if (more === false) {
      return;
    }

    const { more: dataMore, photos: photosMore } = await getPaginatedPhotos({
      skip,
    });

    setMore(dataMore);
    setPhotos((photos) => [...photos, ...photosMore]);
  };

  useEffect(() => {
    fetchMorePhotos();
  }, [skip]);

  return {
    photos,
    more,
  };
};
