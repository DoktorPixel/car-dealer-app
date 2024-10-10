'use client';

const ResultClient = ({ models, error }: { models: any[]; error: string }) => {
  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl font-bold">Vehicle Models</h1>
      <ul className="mt-4">
        {models.map((model) => (
          <li key={model.Model_ID} className="text-lg">
            {model.Model_Name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResultClient;
