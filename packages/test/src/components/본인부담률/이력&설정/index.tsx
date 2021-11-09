import {
  OBTButton,
  OBTButtonGroup,
  OBTCheckBox,
  OBTConditionItem,
  OBTDataGrid,
  OBTDatePicker,
  OBTFormPanel,
  OBTRadioButton,
  OBTRadioButtonGroup,
  OBTTab,
  OBTTabs,
  OBTTextField,
} from 'luna-orbit';
import { useEffect, useState } from 'react';
import { getGrid } from '../../../grid/dataGrid';
import { getIntyDetail, updateInty } from '../../../utils/Hooks/api/UschApiService';
import { insnRecordColumn } from './columns/columns';

const today = new Date();
const year = today.getFullYear();
const month = ('0' + (today.getMonth() + 1)).slice(-2);
const day = ('0' + today.getDate()).slice(-2);
var dateString = year + month + day;

function RecordAndSetting(props: any) {
  // TAB State
  const [tabState, setTabState] = useState({
    value: '1',
  });

  // 보험유형별 본임부담액/룰 이력 ListGrid state
  const [grid, setGrid] = useState(() => getGrid(insnRecordColumn));

  // useEffect(() => {
  //   grid.readData();
  // }, [grid])

  // 본인부담액/률 설정 적용기간
  const [dateValue, setDateValue] = useState({
    from: '20211012',
    to: '20501231',
  });

  // 기본 본인부담액/률 설정
  const [basicRate, setBasicRate] = useState({
    self_pay: true,
    disabled_person: false,
    support: false,
  });

  // 기본 본인부담률 건강보험외래 radio button
  const [hInsnOutRate, setHInsnOutRate] = useState('');

  // 한 보험 유형의 데이터
  const [intyDetail, setIntyDetail] = useState({
    basc_drug_valu_tamt: '0',
    basc_rcpy_expn_tamt: '0',
    basc_hsin_mnfc: '0',
    basc_hsin_mnfc_etc: '0',
    dspp_drug_valu_tamt: '0',
    dspp_rcpy_expn_tamt: '0',
    dspp_hsin_mnfc: '0',
    dspp_hsin_mnfc_etc: '0',
    adfn_drug_valu_tamt: '0',
    adfn_rcpy_expn_tamt: '0',
    adfn_hsin_mnfc: '0',
    adfn_hsin_mnfc_etc: '0',
    sprt_spcl_eqpm: '0',
    sprt_rwmt_actn: '0',
    sprt_hptn_glyc: '0',
    sprt_fndg_exmn: '0',
    sprt_hpv: '0',
    sprt_psyh_thpy: '0',
    sprt_tlcf_mcch: '0',
  });

  // 해당 보험유형의 데이터 불러오는 useEffect
  useEffect(() => {
    async function fetchAndsetIntyData() {
      const result = await getIntyDetail(props.inty);
      // setIntyDetail(result);
      grid.setProvider({
        read: (e: any) => {
          return new Promise((resolve) => {
            resolve(result);
          });
        },
      });
      grid.readData();
      // grid.readData({readPageCallback: () => {
      //   return new Promise((resolve) => {
      //     console.log('Promise 안에', result);
      //     resolve(result)
      //   })
      // }});
    }
    if (props.inty.inty_lcls) {
      fetchAndsetIntyData();
    }
  }, [grid, props.inty]);

  //
  useEffect(() => {
    grid.onAfterChangeRowSelection.add((e) => {
      const gridRowData = grid.getRow(e.rowIndex);
      setIntyDetail(gridRowData);
      setDateValue({ ...dateValue, from: gridRowData.inty_apdy, to: gridRowData.inty_endy });
    });
  }, []);

  // 보험 이력/내용을 업데이트 한다
  const updateIntyDetail = async () => {
    const updateData = { ...props.inty, ...intyDetail };
    await updateInty(updateData);
  };

  return (
    <>
      <div>
        {/* TAB */}
        <OBTTabs value={tabState.value} onChange={(e) => setTabState({ ...tabState, value: e.value })} className="insn-tab">
          <OBTTab labelText="외래" value="1"></OBTTab>
          <OBTTab labelText="입원" value="2"></OBTTab>
        </OBTTabs>
        <div>
          <div style={{ fontWeight: 'bold' }}>보험유형별 본인부담액/률 이력</div>
          <div>
            <OBTDataGrid height="350px" width="98%" interface={grid} />
          </div>
        </div>
        <div>
          <div style={{ fontWeight: 'bold' }}>본인부담액/률 설정</div>
          <div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', width: '96%' }}>
              <div>
                <OBTConditionItem labelText="적용기간">
                  <OBTDatePicker
                    format={OBTDatePicker.Format.YYYYMMDD}
                    value={dateValue}
                    type={OBTDatePicker.Type.period}
                    onChange={(e) => setDateValue(e.value)}
                    useControlButton={false}
                    inputStyle={{ width: '75px' }}
                  />
                </OBTConditionItem>
              </div>
              <div>{/* <OBTTextField value="" onChange={() => {}} /> */}</div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
            <div className="insn-formpanel-border">
              <div style={{ fontWeight: 'bold' }}>기본 본인부담액/률 설정</div>
              <OBTFormPanel disabled={false} labelTextAlign={OBTFormPanel.Align.center}>
                <colgroup>
                  <col data-type="label" width="150px" />
                  <col width="500px" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>
                      <OBTCheckBox
                        value={basicRate.self_pay}
                        onChange={(e) => setBasicRate({ ...basicRate, self_pay: e.value })}
                        labelText="본인부담액/률"
                      />
                    </th>
                    <td>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <OBTRadioButtonGroup value={hInsnOutRate} onChange={(e) => setHInsnOutRate(e.value)}>
                            <OBTRadioButton
                              value="self_pay"
                              labelText="약값 총액의"
                              onChange={(e) => {
                                setHInsnOutRate(e.value);
                              }}
                            />
                          </OBTRadioButtonGroup>
                          <OBTTextField
                            value={intyDetail.basc_drug_valu_tamt}
                            onChange={(e) => {
                              setIntyDetail({ ...intyDetail, basc_drug_valu_tamt: e.value });
                              setDateValue({ ...dateValue, from: dateString, to: '20501231' });
                            }}
                            width="50px"
                          />
                          <span style={{ marginLeft: '8px' }}>%</span>
                        </div>
                        <div style={{ marginLeft: '16px' }}>
                          <span style={{ marginRight: '8px' }}>+ (나머지) 요양급여비용총액의</span>
                          <OBTTextField
                            value={intyDetail.basc_rcpy_expn_tamt}
                            onChange={(e) => {
                              setIntyDetail({ ...intyDetail, basc_rcpy_expn_tamt: e.value });
                              setDateValue({ ...dateValue, from: dateString, to: '20501231' });
                            }}
                          />
                          <span style={{ marginLeft: '8px' }}>%</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', marginTop: '8px' }}>
                          <OBTRadioButtonGroup value={hInsnOutRate} onChange={(e) => setHInsnOutRate(e.value)}>
                            <OBTRadioButton
                              value="self_pay"
                              labelText="직접조제"
                              onChange={(e) => {
                                setHInsnOutRate(e.value);
                              }}
                            />
                          </OBTRadioButtonGroup>
                          <OBTTextField
                            value={intyDetail.basc_hsin_mnfc}
                            onChange={(e) => {
                              setIntyDetail({ ...intyDetail, basc_hsin_mnfc: e.value });
                              setDateValue({ ...dateValue, from: dateString, to: '20501231' });
                            }}
                            width="50px"
                          />
                          <span style={{ marginLeft: '8px' }}>원</span>
                          <span style={{ marginLeft: '8px', marginRight: '8px' }}>/ 그 외 경우</span>
                          <OBTTextField
                            value={intyDetail.basc_hsin_mnfc_etc}
                            onChange={(e) => {
                              setIntyDetail({ ...intyDetail, basc_hsin_mnfc_etc: e.value });
                              setDateValue({ ...dateValue, from: dateString, to: '20501231' });
                            }}
                            width="50px"
                          />
                          <span style={{ marginLeft: '8px' }}>원</span>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th>
                      <OBTCheckBox
                        value={basicRate.disabled_person}
                        onChange={(e) => setBasicRate({ ...basicRate, disabled_person: e.value })}
                        labelText="장애인의료비"
                      />
                    </th>
                    <td>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <OBTRadioButtonGroup value={hInsnOutRate} onChange={(e) => setHInsnOutRate(e.value)}>
                            <OBTRadioButton
                              value="self_pay"
                              labelText="약값 총액의"
                              onChange={(e) => {
                                setHInsnOutRate(e.value);
                              }}
                            />
                          </OBTRadioButtonGroup>
                          <OBTTextField
                            value={intyDetail.dspp_drug_valu_tamt}
                            onChange={(e) => {
                              setIntyDetail({ ...intyDetail, dspp_drug_valu_tamt: e.value });
                              setDateValue({ ...dateValue, from: dateString, to: '20501231' });
                            }}
                            width="50px"
                          />
                          <span style={{ marginLeft: '8px' }}>%</span>
                        </div>
                        <div style={{ marginLeft: '16px' }}>
                          <span style={{ marginRight: '8px' }}>+ (나머지) 요양급여비용총액의</span>
                          <OBTTextField
                            value={intyDetail.dspp_rcpy_expn_tamt}
                            onChange={(e) => {
                              setIntyDetail({ ...intyDetail, dspp_rcpy_expn_tamt: e.value });
                              setDateValue({ ...dateValue, from: dateString, to: '20501231' });
                            }}
                          />
                          <span style={{ marginLeft: '8px' }}>%</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', marginTop: '8px' }}>
                          <OBTRadioButtonGroup value={hInsnOutRate} onChange={(e) => setHInsnOutRate(e.value)}>
                            <OBTRadioButton
                              value="self_pay"
                              labelText="직접조제"
                              onChange={(e) => {
                                setHInsnOutRate(e.value);
                              }}
                            />
                          </OBTRadioButtonGroup>
                          <OBTTextField
                            value={intyDetail.dspp_hsin_mnfc}
                            onChange={(e) => {
                              setIntyDetail({ ...intyDetail, dspp_hsin_mnfc: e.value });
                              setDateValue({ ...dateValue, from: dateString, to: '20501231' });
                            }}
                            width="50px"
                          />
                          <span style={{ marginLeft: '8px' }}>원</span>
                          <span style={{ marginLeft: '8px', marginRight: '8px' }}>/ 그 외 경우</span>
                          <OBTTextField
                            value={intyDetail.dspp_hsin_mnfc_etc}
                            onChange={(e) => {
                              setIntyDetail({ ...intyDetail, dspp_hsin_mnfc_etc: e.value });
                              setDateValue({ ...dateValue, from: dateString, to: '20501231' });
                            }}
                            width="50px"
                          />
                          <span style={{ marginLeft: '8px' }}>원</span>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th>
                      <OBTCheckBox
                        value={basicRate.support}
                        onChange={(e) => setBasicRate({ ...basicRate, support: e.value })}
                        labelText="의료지원금"
                      />
                    </th>
                    <td>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <OBTRadioButtonGroup value={hInsnOutRate} onChange={(e) => setHInsnOutRate(e.value)}>
                            <OBTRadioButton
                              value="self_pay"
                              labelText="약값 총액의"
                              onChange={(e) => {
                                setHInsnOutRate(e.value);
                              }}
                            />
                          </OBTRadioButtonGroup>
                          <OBTTextField
                            value={intyDetail.adfn_drug_valu_tamt}
                            onChange={(e) => {
                              setIntyDetail({ ...intyDetail, adfn_drug_valu_tamt: e.value });
                              setDateValue({ ...dateValue, from: dateString, to: '20501231' });
                            }}
                            width="50px"
                          />
                          <span style={{ marginLeft: '8px' }}>%</span>
                        </div>
                        <div style={{ marginLeft: '16px' }}>
                          <span style={{ marginRight: '8px' }}>+ (나머지) 요양급여비용총액의</span>
                          <OBTTextField
                            value={intyDetail.adfn_rcpy_expn_tamt}
                            onChange={(e) => {
                              setIntyDetail({ ...intyDetail, adfn_rcpy_expn_tamt: e.value });
                              setDateValue({ ...dateValue, from: dateString, to: '20501231' });
                            }}
                          />
                          <span style={{ marginLeft: '8px' }}>%</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', marginTop: '8px' }}>
                          <OBTRadioButtonGroup value={hInsnOutRate} onChange={(e) => setHInsnOutRate(e.value)}>
                            <OBTRadioButton
                              value="self_pay"
                              labelText="직접조제"
                              onChange={(e) => {
                                setHInsnOutRate(e.value);
                              }}
                            />
                          </OBTRadioButtonGroup>
                          <OBTTextField
                            value={intyDetail.adfn_hsin_mnfc}
                            onChange={(e) => {
                              setIntyDetail({ ...intyDetail, adfn_hsin_mnfc: e.value });
                              setDateValue({ ...dateValue, from: dateString, to: '20501231' });
                            }}
                            width="50px"
                          />
                          <span style={{ marginLeft: '8px' }}>원</span>
                          <span style={{ marginLeft: '8px', marginRight: '8px' }}>/ 그 외 경우</span>
                          <OBTTextField
                            value={intyDetail.adfn_hsin_mnfc_etc}
                            onChange={(e) => {
                              setIntyDetail({ ...intyDetail, adfn_hsin_mnfc_etc: e.value });
                              setDateValue({ ...dateValue, from: dateString, to: '20501231' });
                            }}
                            width="50px"
                          />
                          <span style={{ marginLeft: '8px' }}>원</span>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </OBTFormPanel>
            </div>
            <div className="insn-formpanel-border">
              <div style={{ fontWeight: 'bold' }}>별도 본인부담액/률 설정</div>
              <OBTFormPanel disabled={false} labelTextAlign={OBTFormPanel.Align.center}>
                <colgroup>
                  <col data-type="label" />
                  <col width="300px" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>
                      특수장비
                      <br />
                      (CT, MRI, PET)
                    </th>
                    <td>
                      <div style={{ display: 'flex' }}>
                        <OBTTextField
                          value={intyDetail.sprt_spcl_eqpm}
                          onChange={(e) => {
                            setIntyDetail({ ...intyDetail, sprt_spcl_eqpm: e.value });
                            setDateValue({ ...dateValue, from: dateString, to: '20501231' });
                          }}
                        />
                        <OBTButtonGroup value="%" onChange={() => {}}>
                          <OBTButton labelText="%" key="%" />
                          <OBTButton labelText="원" key="원" />
                        </OBTButtonGroup>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th>
                      특수재료 및 행위료
                      <br />
                      (인공성대, 장루)
                    </th>
                    <td>
                      <OBTTextField
                        value={intyDetail.sprt_rwmt_actn}
                        onChange={(e) => {
                          setIntyDetail({ ...intyDetail, sprt_rwmt_actn: e.value });
                          setDateValue({ ...dateValue, from: dateString, to: '20501231' });
                        }}
                      />
                      <span style={{ marginLeft: '8px' }}>원</span>
                    </td>
                  </tr>
                  <tr>
                    <th>고혈압, 당뇨 지속진료</th>
                    <td>
                      <span style={{ marginRight: '8px' }}>해당 비용의</span>
                      <OBTTextField
                        value={intyDetail.sprt_hptn_glyc}
                        onChange={(e) => {
                          setIntyDetail({ ...intyDetail, sprt_hptn_glyc: e.value });
                          setDateValue({ ...dateValue, from: dateString, to: '20501231' });
                        }}
                      />
                      <span style={{ marginLeft: '8px' }}>%</span>
                    </td>
                  </tr>
                  <tr>
                    <th>
                      검진 후 확진검사
                      <br />
                      (결핵, 고혈압, 당뇨)
                    </th>
                    <td>
                      <OBTTextField
                        value={intyDetail.sprt_fndg_exmn}
                        onChange={(e) => {
                          setIntyDetail({ ...intyDetail, sprt_fndg_exmn: e.value });
                          setDateValue({ ...dateValue, from: dateString, to: '20501231' });
                        }}
                      />
                      <span style={{ marginLeft: '8px' }}>%</span>
                    </td>
                  </tr>
                  <tr>
                    <th>HPV/진찰상담 진찰료</th>
                    <td>
                      <OBTTextField
                        value={intyDetail.sprt_hpv}
                        onChange={(e) => {
                          setIntyDetail({ ...intyDetail, sprt_hpv: e.value });
                          setDateValue({ ...dateValue, from: dateString, to: '20501231' });
                        }}
                      />
                      <span style={{ marginLeft: '8px' }}>%</span>
                    </td>
                  </tr>
                  <tr>
                    <th>정신요법</th>
                    <td>
                      <span style={{ marginRight: '8px' }}>해당 비용의</span>{' '}
                      <OBTTextField
                        value={intyDetail.sprt_psyh_thpy}
                        onChange={(e) => {
                          setIntyDetail({ ...intyDetail, sprt_psyh_thpy: e.value });
                          setDateValue({ ...dateValue, from: dateString, to: '20501231' });
                        }}
                      />
                      <span style={{ marginLeft: '8px' }}>%</span>
                    </td>
                  </tr>
                  <tr>
                    <th>원격협의진찰료 자문료</th>
                    <td>
                      <span style={{ marginRight: '8px' }}>해당 비용의</span>{' '}
                      <OBTTextField
                        value={intyDetail.sprt_tlcf_mcch}
                        onChange={(e) => {
                          setIntyDetail({ ...intyDetail, sprt_tlcf_mcch: e.value });
                          setDateValue({ ...dateValue, from: dateString, to: '20501231' });
                        }}
                      />
                      <span style={{ marginLeft: '8px' }}>%</span>
                    </td>
                  </tr>
                </tbody>
              </OBTFormPanel>
              <div>
                <OBTButton labelText="취소" />
                <OBTButton labelText="저장" onClick={updateIntyDetail} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RecordAndSetting;
