/**
 * Formating text.
 */
interface Props {
  text: string;
  textClass: string;
}

export function Text({ text, textClass }: Props) {
  return (
    <div className={textClass}>
      <span>{text}</span>
    </div>
  );
}
