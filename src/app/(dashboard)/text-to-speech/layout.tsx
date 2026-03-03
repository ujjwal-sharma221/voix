import { PageHeader } from "@/components/page-header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden">
      <PageHeader title="Text to Speech" />
      {children}
    </div>
  );
};

export default Layout;
