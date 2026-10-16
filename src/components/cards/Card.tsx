type Props = {
  children: React.ReactNode;
  title: string;
};

export default function Card({ children, title }: Props) {
  return (
    <div className="p-4 rounded-xl bg-zinc-900 shadow-md">
      <h2>{title}</h2>
      {children}
    </div>
  );
}
