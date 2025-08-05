import Spinner from "./Spinner";

export default function GlobalLoader() {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <Spinner />
    </div>
  );
}
