import ImageCard from "../ImageCard/ImageCard";
import s from "./ImageGallery.module.css";

// Define the interface for a single image object
interface Image {
  id: string;
  description: string | null;
  urls: {
    regular: string;
    full: string;
  };
  likes: number;
  user: {
    name: string;
  };
}

// Define props interface for the component
interface ImageGalleryProps {
  results: Image[];
  openModal: (src: string, alt: string, likes: number, user: string) => void;
}

const ImageGallery = ({ results, openModal }: ImageGalleryProps) => {
  return (
    <ul className={s.gallery}>
      {results.map(({ id, description, urls, likes, user }) => (
        <li key={id}>
          <ImageCard
            description={description}
            urls={urls}
            likes={likes}
            user={user}
            openModal={openModal}
          />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;