type Props = {
  children: React.ReactNode;
  title: string;
  childrenClassName?: string;
};

export default function Card({ children, title, childrenClassName }: Props) {
  return (
    <div className="p-4  bg-linear-to-br from-card to-card/60 shadow-md">
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className={childrenClassName}>{children}</div>
    </div>
  );
}
