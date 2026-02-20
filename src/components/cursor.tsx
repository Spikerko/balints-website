import TargetCursor from "./TargetCursor";

const Cursor = () => {
  return (
    <div className="custom-cursor-display">
      <TargetCursor
        spinDuration={2}
        hideDefaultCursor={true}
      />
    </div>
  )
}

export default Cursor;