import './selfpay.css';
import InsuranceType from './보험유형';
import RecordAndSetting from './이력&설정';

function SelfPay(props : any) {
  return (
    <>
      <div className="selfpay-frame">
        <div className="selfpay-container">
          <div><InsuranceType/></div>
          <div><RecordAndSetting/></div>
        </div>
      </div>
    </>
  );  
}

export default SelfPay;