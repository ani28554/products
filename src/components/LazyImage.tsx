import "react-lazy-load-image-component/src/effects/blur.css";
import { LazyLoadImage } from "react-lazy-load-image-component";

interface ImageProps {
  src: string;
  placeholderSrc: string;
  alt: string;
  className: string;
  width: string;
  height: string;
}
const LazyImage: React.FC<ImageProps> = ({
  src,
  placeholderSrc,
  alt,
  className,
  width,
  height,
}) => {
  return (
    <LazyLoadImage
      alt={alt}
      src={src}
      placeholderSrc={placeholderSrc}
      effect="blur"
      className={className}
      width={width}
      height={height}
    />
  );
};

export default LazyImage;
