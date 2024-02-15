import Image from "next/image";
import { Text } from "../atoms/Text";

/**
 * Image with label.
 */
interface Props {
  text: string;
  textClass: string;
  imageClass: string;
  path: string;
  alt: string;
  width: number;
  height: number;
}

export function LabelImage({
  text,
  textClass,
  imageClass,
  path,
  alt,
  width,
  height,
}: Props) {
  return (
    <div className="flex flex-col items-center space-y-1">
      <div className={imageClass}>
        <Image src={path} alt={alt} width={width} height={height} />
      </div>
      <Text text={text} textClass={textClass} />
    </div>
  );
}
