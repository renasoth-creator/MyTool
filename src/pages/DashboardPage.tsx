import React from "react";
import Layout from "../components/Layout";
import ToolCard from "../components/ToolCard";
import { tools } from "../config/pdfToolsConfig";

interface DashboardPageProps {
  onLogout: () => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ onLogout }) => {
  return (
    <Layout onLogout={onLogout}>
      <section className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-900">
          All PDF & document tools
        </h1>
        <p className="mt-1 max-w-2xl text-sm text-slate-500">
          Convert, compress, merge, split, protect and more all for free. Click
          a tool below to get started.
        </p>
      </section>

      <section>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {tools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default DashboardPage;
