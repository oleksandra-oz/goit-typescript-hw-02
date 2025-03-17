import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { API_KEY } from "../../api";
import ImageGallery from "../ImageGallery/ImageGallery";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ImageModal from "../ImageModal/ImageModal";
import { Toaster } from "react-hot-toast";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import SearchBar from "../SearchBar/SearchBar";

// Define interfaces for the data structures
interface UnsplashImage {
  id: string;
  urls: {
    regular: string;
    full: string;
  };
  alt_description: string | null;
  likes: number;
  user: {
    name: string;
  };
}

interface UnsplashResponse {
  total: number;
  total_pages: number;
  results: UnsplashImage[];
}

function App() {
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [images, setImages] = useState<UnsplashImage[]>([]);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const [perPage, setPerPage] = useState<number>(1);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [modalSrc, setModalSrc] = useState<string>("");
  const [modalAlt, setModalAlt] = useState<string>("");
  const [modalLikes, setModalLikes] = useState<number | null>(null);
  const [modalUser, setModalUser] = useState<string | null>(null);

  useEffect(() => {
    if (!query) return;

    const fetchPhotos = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const { total, total_pages, results } = (
          await axios.get<UnsplashResponse>(
            `https://api.unsplash.com/search/photos?query=${query}&client_id=${API_KEY}&per_page=15&orientation=landscape&page=${page}`
          )
        ).data;

        setImages((prev) => [...prev, ...results]);
        setPerPage(Math.ceil(total / 15));
        
        if (!results.length) {
          return setIsEmpty(true);
        }
        setIsVisible(page < total_pages);
      } catch (error) {
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPhotos();
  }, [page, query]);

  const onHandleSubmit = (value: string): void => {
    setQuery(value);
    setPage(1);
    setImages([]);
    setError(null);
    setIsEmpty(false);
    setIsVisible(false);
  };

  const onLoadMore = (): void => {
    setPage((prevPage) => prevPage + 1);
  };

  const openModal = (
    src: string,
    alt: string,
    likes: number,
    user: string
  ): void => {
    setModalIsOpen(true);
    setModalAlt(alt);
    setModalSrc(src);
    setModalLikes(likes);
    setModalUser(user);
  };

  const closeModal = (): void => {
    setModalIsOpen(false);
    setModalAlt("");
    setModalSrc("");
    setModalLikes(null);
    setModalUser(null);
  };

  return (
    <>
      <header>
        <Toaster position="top-right" reverseOrder={false} />
        <SearchBar onSubmit={onHandleSubmit} />
      </header>
      {error ? (
        <ErrorMessage message={error.message} />
      ) : (
        <ImageGallery results={images} openModal={openModal} />
      )}

      {isVisible && (
        <LoadMoreBtn onClick={onLoadMore} disabled={isLoading}>
          {isLoading ? <Loader /> : "Load More"}
        </LoadMoreBtn>
      )}
      <ImageModal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        src={modalSrc}
        alt={modalAlt}
        likes={modalLikes}
        user={modalUser}
      />
    </>
  );
}

export default App;