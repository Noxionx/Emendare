import * as React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

enzyme.configure({ adapter: new Adapter() })

import { NotificationAlert } from './notificationAlert'
import { Providers } from '../../../components'

it('should render a NotificationAlert', () => {
  const component = shallow(
    <Providers>
      <NotificationAlert />
    </Providers>
  )
  expect(component).toBeTruthy()
})
