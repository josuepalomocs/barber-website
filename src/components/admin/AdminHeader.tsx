interface AdminHeaderProps {}

export default function AdminHeader({}: AdminHeaderProps) {
  return (
    <header className="grid content-center sticky top-0 h-16 text-xs text-neutral-900 bg-white border-b border-neutral-200">
      <div className="px-4">Dashboard</div>
    </header>
  );
}
