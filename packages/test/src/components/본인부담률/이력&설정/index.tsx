import { OBTButton, OBTButtonGroup, OBTCheckBox, OBTConditionItem, OBTDataGrid, OBTDatePeriodPicker, OBTDatePicker, OBTFormPanel, OBTRadioButton, OBTRadioButtonGroup, OBTTab, OBTTabs, OBTTextField } from "luna-orbit";
import { useEffect, useState } from "react";
import { getGrid } from "../../../grid/dataGrid";
import { insnRecordColumn } from "./columns/columns";

function RecordAndSetting(props : any) {
  // TAB State
  const [tabState, setTabState] = useState(
    {
      value: '1',
    }
  );

  // 보험유형별 본임부담액/룰 이력 DataGrid state
  const [grid, setGrid] = useState(() => getGrid(insnRecordColumn))

  useEffect(() => {
    grid.readData();
  }, [grid])

  // 본인부담액/률 설정 적용기간
  const [dateValue, setDateValue] = useState(
    {
      from: '20211012',
      to: '20501231'
    }
  )

  // 기본 본인부담액/률 설정
  const [basicRate, setBasicRate] = useState(
    {
      self_pay: false,
      disabled_person: false,
      support: false
    }
  )

  const [hInsnOutRate, setHInsnOutRate] = useState('')



  return (
    <>
      <div>
        {/* TAB */}
        <OBTTabs
          value={tabState.value}
          onChange={(e) => setTabState({ ...tabState, value: e.value})}
          className="insn-tab"
        >
          <OBTTab labelText="외래" value="1"></OBTTab>
          <OBTTab labelText="입원" value="2"></OBTTab>
        </OBTTabs>
        <div>
          <div style={{ fontWeight: 'bold'}}>보험유형별 본인부담액/률 이력</div>
          <div>
            <OBTDataGrid width="100%" height="350px" interface={grid} />
          </div>
        </div>
        <div>
          <div style={{ fontWeight: 'bold'}}>본인부담액/률 설정</div>
          <div> 
            <div>
              <OBTConditionItem labelText='적용기간' >
                <OBTDatePicker
                  format={OBTDatePicker.Format.YYYYMMDD}
                  value={dateValue}
                  type={OBTDatePicker.Type.period}
                  onChange={(e) => setDateValue(e.value)} 
                  useControlButton={false}
                  inputStyle={{ width: '75px' }}
                  />
              </OBTConditionItem>
              {/* <OBTTextField value="" onChange={() => {}}/> */}
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr'}}>
            <div>
              <div style={{ fontWeight: 'bold'}}>기본 본인부담액/률 설정</div>
              <OBTFormPanel disabled={false} labelTextAlign={OBTFormPanel.Align.center}>
                <colgroup>
                  <col data-type='label' width="150px"/>
                  <col width='500px'/>
                </colgroup>
                <tbody>
                  <tr>
                    <th><OBTCheckBox value={basicRate.self_pay} onChange={(e) => setBasicRate({...basicRate, self_pay: e.value })} labelText="본인부담액/률" /></th>
                    <td>
                      <div style={{ display: 'flex', flexDirection: 'column'}}>
                        <div style={{ display: 'flex', alignItems: 'center'}}>
                          <OBTRadioButtonGroup value={hInsnOutRate} onChange={(e) => setHInsnOutRate(e.value)}>
                            <OBTRadioButton value='self_pay' labelText='약값 총액의' onChange={(e)=> {setHInsnOutRate(e.value)}} />
                          </OBTRadioButtonGroup>
                          <OBTTextField value='0' onChange={() => {}} width='50px' />
                          <span style={{ marginLeft: '8px' }}>%</span>
                        </div>
                        <div style={{ marginLeft: '16px' }}>
                          <span style={{ marginRight: '8px' }}>+ (나머지) 요양급여비용총액의</span>
                          <OBTTextField value="0" onChange={() => {}}/>
                          <span style={{ marginLeft: '8px' }}>%</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', marginTop: '8px'}}>
                          <OBTRadioButtonGroup value={hInsnOutRate} onChange={(e) => setHInsnOutRate(e.value)}>
                            <OBTRadioButton value='self_pay' labelText='직접조제' onChange={(e)=> {setHInsnOutRate(e.value)}} />
                          </OBTRadioButtonGroup>
                          <OBTTextField value='0' onChange={() => {}} width='50px' />
                          <span style={{ marginLeft: '8px' }}>원</span>
                          <span style={{ marginLeft: '8px', marginRight: '8px'}}>/ 그 외 경우</span>
                          <OBTTextField value='0' onChange={() => {}} width='50px' />
                          <span style={{ marginLeft: '8px' }}>원</span>
                        </div>
                      </div>
                    </td> 
                  </tr>  
                  <tr>
                    <th><OBTCheckBox value={basicRate.disabled_person} onChange={(e) => setBasicRate({...basicRate, disabled_person: e.value})} labelText="장애인의료비"/></th>
                    <td>                      
                      <div style={{ display: 'flex', flexDirection: 'column'}}>
                        <div style={{ display: 'flex', alignItems: 'center'}}>
                          <OBTRadioButtonGroup value={hInsnOutRate} onChange={(e) => setHInsnOutRate(e.value)}>
                            <OBTRadioButton value='self_pay' labelText='약값 총액의' onChange={(e)=> {setHInsnOutRate(e.value)}} />
                          </OBTRadioButtonGroup>
                          <OBTTextField value='0' onChange={() => {}} width='50px' />
                          <span style={{ marginLeft: '8px' }}>%</span>
                        </div>
                        <div style={{ marginLeft: '16px' }}>
                          <span style={{ marginRight: '8px' }}>+ (나머지) 요양급여비용총액의</span>
                          <OBTTextField value="0" onChange={() => {}}/>
                          <span style={{ marginLeft: '8px' }}>%</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', marginTop: '8px'}}>  
                          <OBTRadioButtonGroup value={hInsnOutRate} onChange={(e) => setHInsnOutRate(e.value)}>
                            <OBTRadioButton value='self_pay' labelText='직접조제' onChange={(e)=> {setHInsnOutRate(e.value)}} />
                          </OBTRadioButtonGroup>
                          <OBTTextField value='0' onChange={() => {}} width='50px' />
                          <span style={{ marginLeft: '8px' }}>원</span>
                          <span style={{ marginLeft: '8px', marginRight: '8px' }}>/ 그 외 경우</span>
                          <OBTTextField value='0' onChange={() => {}} width='50px' />
                          <span style={{ marginLeft: '8px' }}>원</span>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th><OBTCheckBox value={basicRate.support} onChange={(e) => setBasicRate({...basicRate, support: e.value})} labelText="의료지원금"/></th>
                    <td>
                      <div style={{ display: 'flex', flexDirection: 'column'}}>
                        <div style={{ display: 'flex', alignItems: 'center'}}>
                          <OBTRadioButtonGroup value={hInsnOutRate} onChange={(e) => setHInsnOutRate(e.value)}>
                            <OBTRadioButton value='self_pay' labelText='약값 총액의' onChange={(e)=> {setHInsnOutRate(e.value)}} />
                          </OBTRadioButtonGroup>
                          <OBTTextField value='0' onChange={() => {}} width='50px' />
                          <span style={{ marginLeft: '8px' }}>%</span>
                        </div>
                        <div style={{ marginLeft: '16px' }}>
                          <span style={{ marginRight: '8px' }}>+ (나머지) 요양급여비용총액의</span>
                          <OBTTextField value="0" onChange={() => {}}/>
                          <span style={{ marginLeft: '8px' }}>%</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', marginTop: '8px'}}>
                          <OBTRadioButtonGroup value={hInsnOutRate} onChange={(e) => setHInsnOutRate(e.value)}>
                            <OBTRadioButton value='self_pay' labelText='직접조제' onChange={(e)=> {setHInsnOutRate(e.value)}} />
                          </OBTRadioButtonGroup>
                          <OBTTextField value='0' onChange={() => {}} width='50px' />
                          <span style={{ marginLeft: '8px' }}>원</span>
                          <span style={{ marginLeft: '8px', marginRight: '8px'}}>/ 그 외 경우</span>
                          <OBTTextField value='0' onChange={() => {}} width='50px' />
                          <span style={{ marginLeft: '8px' }}>원</span>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </OBTFormPanel>
            </div>
            <div>
              <div style={{ fontWeight: 'bold'}}>별도 본인부담액/률 설정</div>
              <OBTFormPanel disabled={false} labelTextAlign={OBTFormPanel.Align.center}>
                <colgroup>
                  <col data-type='label' />
                  <col width='300px'/>
                </colgroup>
                <tbody>
                  <tr>
                    <th>특수장비<br/>(CT, MRI, PET)</th>
                    <td>
                      <div style={{ display: 'flex' }}>
                        <OBTTextField value="0" onChange={() => {}}/>
                        <OBTButtonGroup value="%" onChange={() => {}}>
                          <OBTButton labelText="%" key="%"/>
                          <OBTButton labelText="원" key="원"/>
                        </OBTButtonGroup>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th>특수재료 및 행위료<br/>(인공성대, 장루)</th>
                    <td><OBTTextField value="0" onChange={() => {}}/><span style={{ marginLeft: '8px' }}>원</span></td>
                  </tr>
                  <tr>
                    <th>고혈압, 당뇨 지속진료</th>
                    <td><span style={{ marginRight: '8px' }}>해당 비용의</span><OBTTextField value="0" onChange={() => {}}/><span style={{ marginLeft: '8px' }}>%</span></td>
                  </tr>
                  <tr>
                    <th>검진 후 확진검사<br/>(결핵, 고혈압, 당뇨)</th>
                    <td><OBTTextField value="0" onChange={() => {}}/><span style={{ marginLeft: '8px' }}>%</span></td>
                  </tr>
                  <tr>
                    <th>HPV/진찰상담 진찰료</th>
                    <td><OBTTextField value="0" onChange={() => {}}/><span style={{ marginLeft: '8px' }}>%</span></td>
                  </tr>
                  <tr>
                    <th>정신요법</th>
                    <td><span style={{ marginRight: '8px' }}>해당 비용의</span> <OBTTextField value="0" onChange={() => {}}/><span style={{ marginLeft: '8px' }}>%</span></td>
                  </tr>
                  <tr>
                    <th>원격협의진찰료 자문료</th>
                    <td><span style={{ marginRight: '8px' }}>해당 비용의</span> <OBTTextField value="0" onChange={() => {}}/><span style={{ marginLeft: '8px' }}>%</span></td>
                  </tr>
                </tbody>
              </OBTFormPanel>
            </div>
          </div>
        </div>
      </div>
    </>
  );  
}

export default RecordAndSetting;