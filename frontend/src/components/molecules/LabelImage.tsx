import Image from "next/image";
import { Text } from "../atoms/Text";

/**
 * Image with label.
 */
interface Props {
  text: string;
  textClass: string;
  path: string;
  alt: string;
  width: number;
  height: number;
}

export function LabelImage({
  text,
  textClass,
  path,
  alt,
  width,
  height,
}: Props) {
  return (
    <div className="flex flex-col">
      <Image src={path} alt={alt} width={width} height={height} />
      <Text text={text} textClass={textClass} />
    </div>
  );
}
