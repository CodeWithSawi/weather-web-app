type Props = {
  children: React.ReactNode;
  title: string;
  childrenClassName?: string;
};

export default function Card({ children, title, childrenClassName }: Props) {
  return (
    <div className="p-4 rounded-xl bg-zinc-900 shadow-md">
      <h2>{title}</h2>
      <div className={childrenClassName}>{children}</div>
    </div>
  );
}
