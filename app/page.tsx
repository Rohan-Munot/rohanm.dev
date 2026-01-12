import Header from "@/components/header";

const Page = () => {
  return (
    <main className="h-screen flex justify-center relative mx-2">
      <div className="dashed-border-y p-3 sm:p-4 flex w-full max-w-3xl">
        <Header />
      </div>
    </main>
  );
};

export default Page;
