import Left from "./Left";
import Right from "./Right";

function Edi(props : any) {
  return (
    <>
      <div className="edi-frame">
        <div className="edi-grid">
          <div>
            <Left/>
          </div>
          <div>
            <Right/>
          </div>
        </div>
      </div>
    </>
  );  
}

export default Edi;