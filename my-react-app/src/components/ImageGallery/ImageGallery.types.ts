 export default interface ImageCardProps {
  description: string | null;
  urls: {
    regular: string;
    full: string;
  };
  likes: number;
  user: {
    name: string;
  };
  openModal: (src: string, alt: string, likes: number, user: string) => void;
}