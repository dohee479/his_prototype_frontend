export const insnRecordColumn = [
  {
    name: 'period',
    type: 'text',
    header: '적용기간'
  },
  {
    name: 'basic_rate',
    type: 'group',
    header: '기본 본인부담액/률',
    columns: [
      {
        name: 'self_pay',
        type: 'group',
        header: '본인부담액/률',
        columns: [
          {
            name: 'drug',
            type: 'text',
            header: '약값 총액'
          },
          {
            name: 'medical_care',
            type: 'text',
            header: '요양급여비용총액',
          },
          {
            name: 'direct',
            type: 'text',
            header: '직접조제'
          },
          {
            name: 'etc',
            type: 'text',
            header: '그 외 경우'
          },
        ]
      },
      {
        name: 'disabled_peroson',
        type: 'group',
        header: '장애인/의료비',
        columns: [
          {
            name: 'drug',
            type: 'text',
            header: '약값 총액'
          },
          {
            name: 'medical_care',
            type: 'text',
            header: '요양급여비용총액'
          },
          {
            name: 'direct',
            type: 'text',
            header: '직접조제'
          },
          {
            name: 'etc',
            type: 'text',
            header: '그 외 경우'
          },
        ]
      },
      {
        name: 'support',
        type: 'group',
        header: '의료지원금',
        columns: [
          {
            name: 'drug',
            type: 'text',
            header: '약값 총액'
          },
          {
            name: 'medical_care',
            type: 'text',
            header: '요양급여비용총액'
          },
          {
            name: 'direct',
            type: 'text',
            header: '직접조제'
          },
          {
            name: 'etc',
            type: 'text',
            header: '그 외 경우'
          },
        ]
      }
    ] 
  },
  {
    name: 'separate_rate',
    type: 'group',
    header: '별도 본인부담액/률',
    columns: [
      {
        name: 'special_eqi',
        type: 'text',
        header: '특수장비'
      },
      {
        name: 'special_material',
        type: 'text',
        header: '특수재료행위료'
      },
      {
        name: 'high_blood',
        type: 'text',
        header: '고혈압/당뇨 지속진료'
      },
      {
        name: 'examination',
        type: 'text',
        header: '검진후 확진검사'
      },
      {
        name: 'hpv',
        type: 'text',
        header: 'HPV/진찰상담 진찰료'
      },
      {
        name: 'mental',
        type: 'text',
        header: '정신요법'
      },
      {
        name: 'remote',
        type: 'text',
        header: '원격협의진찰료 자문료'
      },
    ]
  }
]