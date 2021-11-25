export default function Backdrop(props) {
  return (
    <div
      id="backdrop"
      className="fixed z-10 h-screen w-screen bg-black opacity-75"
      onClick={props.modal}
    />
  );
}
