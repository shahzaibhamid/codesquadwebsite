export interface FaqItem {
  question: string;
  answer: string;
}

export default function Faq({ items }: { items: FaqItem[] }) {
  if (!items.length) return null;
  return (
    <div className="cs-faq">
      {items.map((item) => (
        <details className="cs-faq__item" key={item.question}>
          <summary>{item.question}</summary>
          <p>{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
