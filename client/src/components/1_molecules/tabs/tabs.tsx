import React from 'react'
import { useTabs, useGesture } from '../../../hooks'
import { getIndexDefaultTab } from './helper'

interface ITabsProps {
  /** Children node */
  children: React.ReactNode
  /** Name of each tabs */
  tabsName: string[]
  /** location */
  location?: Location
  /** default tab */
  defaultTab?: string
}

interface ITabProps {
  /** Children node */
  children: React.ReactNode
  /** Link to its Content */
  to: string
}

interface ITabsMenuProps {
  /** Children node */
  children: React.ReactNode
  /** Additional CSS UI class */
  className?: string
}

interface ITabContentProps {
  /** Children node */
  children: React.ReactNode
  /** Link to its item */
  for: string
}

// Create context
const TabsContext = React.createContext({
  selectedTab: '',
  setSelectedTab: (field: string) => {
    return field
  }
})

// Check if the component is in the context
const useTabsContext = () => {
  const context = React.useContext(TabsContext)
  if (!context) {
    throw new Error('Component cannot be render outside the Tabs component')
  }
  return context
}

export const Tabs = ({
  children,
  tabsName,
  location,
  defaultTab
}: ITabsProps) => {
  const {
    selectedTab,
    setSelectedTab,
    selectNextTab,
    selectPreviousTab
  } = useTabs(tabsName, getIndexDefaultTab(tabsName)(defaultTab))

  const { ref }: any = useGesture([
    { effect: 'panright', callback: selectPreviousTab },
    { effect: 'panleft', callback: selectNextTab }
  ])

  React.useEffect(() => {
    if (location) {
      const url: any = new URLSearchParams(location.search)
      if (url.get('tab')) {
        setSelectedTab(location ? url.get('tab') : 'text')
      }
    }
  }, [location])

  React.useEffect(() => {
    const eventHandler = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        selectNextTab()
      } else if (event.key === 'ArrowLeft') {
        selectPreviousTab()
      }
    }

    document.addEventListener('keyup', eventHandler)
    return () => {
      document.removeEventListener('keyup', eventHandler)
    }
  })

  return (
    <TabsContext.Provider value={{ selectedTab, setSelectedTab } as any}>
      <div ref={ref}>{children}</div>
    </TabsContext.Provider>
  )
}

/**
 * Static components
 */
const Menu = React.memo(({ children, className }: ITabsMenuProps) => (
  <div className={`tabs ${className}`}>
    <ul>{children}</ul>
  </div>
))

const Tab = React.memo(({ children, to }: ITabProps) => {
  const { selectedTab, setSelectedTab } = useTabsContext()
  return (
    <li className={selectedTab === to ? 'is-active' : ''}>
      <a onClick={() => setSelectedTab(to)}>{children}</a>
    </li>
  )
})

const Content = React.memo((props: ITabContentProps) => {
  const { selectedTab }: any = useTabsContext()
  return selectedTab === props.for ? (
    <React.Fragment>{props.children}</React.Fragment>
  ) : null
})

Tabs.Menu = Menu
Tabs.Tab = Tab
Tabs.Content = Content
