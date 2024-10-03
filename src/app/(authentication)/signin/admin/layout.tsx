// src/app/(authentication)/signin/admin/layout.tsx
import React from "react";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div>
      {/* Add any layout-specific components or styles here */}
      {children}
    </div>
  );
};

export default AdminLayout;
