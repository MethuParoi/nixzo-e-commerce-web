// src/app/(authentication)/signin/admin/layout.tsx
import React from "react";

const AdminLayout: React.FC = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      {/* Add any layout-specific components or styles here */}
      {children}
    </div>
  );
};

export default AdminLayout;
