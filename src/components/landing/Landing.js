export default function Landing() {
  return (
    <div className="h-screen bg-gray-800">
      <div className="pt-64">
        <h1 className="text-center text-white text-xl">
          Invite your friend to a group
        </h1>
        <h1 className="text-center text-white text-xl">
          or browse for yourself
        </h1>
      </div>
      <div className="text-center mt-3">
        <button className="bg-green-500 text-white rounded font-semibold">
          Click to create a group
        </button>
      </div>
      <div className="text-center mt-3">
        <h1 className="text-center text-white text-xl">
          Or enter a code to join a group
        </h1>
      </div>
      <div className="text-center mt-3">
        <input />
      </div>
    </div>
  );
}
