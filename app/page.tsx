import Header from "@/components/header";
import GitHubGraph from "@/components/github-graph";

const Page = () => {
  return (
    <main className="h-screen flex justify-center relative mx-2">
      <div className="dashed-border-y flex w-full max-w-3xl flex-col gap-16 font-mono">
        <Header />
        <div className="p-4 dashed-border-x">
          <GitHubGraph />
        </div>
      </div>
    </main>
  );
};

export default Page;
