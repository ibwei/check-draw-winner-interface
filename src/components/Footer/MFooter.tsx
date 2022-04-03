import { Collapse } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import { FOOTER_LIST } from '../../constants/footerList'

const { Panel } = Collapse

const genExtra = () => <DownOutlined style={{ color: '#fff', fontSize: '10px' }} />

const HeaderText = styled.span`
  color: #fff;
  font-weight: 500;
`

const NavText = styled.div`
  font-size: 12px;
  color: #fff;
  line-height: 30px;
  position: relative;
  left: 0px;
`

export default function MFooter() {
  const nav2Target = ({ navText, navRoute }: { navText: string; navRoute: string }) => {
    let route = navRoute
    if (route) {
      if (route.startsWith('/')) {
        // router.push(route)
      } else if (route.startsWith('http')) {
        window.open(route, '_blank')
      } else if (route.startsWith('id')) {
        const translateLanguageTable: any = {
          en: 'en-us',
          'zh-CN': 'zh-cn',
          'es-ES': 'es-es',
          'de-DE': 'de-de',
        }
        // Open the corresponding document address according to the current language
        const url = ``
        window.open(url, '_blank')
      }
    }
  }

  const List = FOOTER_LIST.map((item, index) => {
    const children = item.children
    const subList = children.map((item, k) => {
      return (
        <NavText key={k} onClick={nav2Target.bind(null, item)}>
          {item.navText}
        </NavText>
      )
    })
    return (
      <Panel
        header={<HeaderText>{item.title}</HeaderText>}
        key={index}
        extra={genExtra()}
        showArrow={false}
        style={{ color: '#fff' }}
      >
        {subList}
      </Panel>
    )
  })

  return (
    <>
      <Collapse defaultActiveKey={[]} accordion={true} bordered={false} ghost style={{ color: '#fff' }}>
        {List}
      </Collapse>
    </>
  )
}
