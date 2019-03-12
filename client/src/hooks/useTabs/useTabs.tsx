/**
 * Hook for sharing tabs logic
 */
import React from 'react'

export const useTabs = (
  tabs: string[],
  initialIndex?: number,
  infinite: boolean = true
): {
  selectedTab: string | undefined
  setSelectedTab: (tab: string) => void
  selectPreviousTab: () => void
  selectNextTab: () => void
} => {
  const [selectedTab, setSelectedTab] = React.useState(
    typeof initialIndex !== 'undefined' ? tabs[initialIndex] : undefined
  )

  const selectNextTab = () => {
    if (selectedTab) {
      const targetIndex = tabs.indexOf(selectedTab) + 1
      if (targetIndex > tabs.length - 1) {
        if (infinite) {
          setSelectedTab(tabs[0])
        }
      } else {
        setSelectedTab(tabs[targetIndex])
      }
    }
  }

  const selectPreviousTab = () => {
    if (selectedTab) {
      const targetIndex = tabs.indexOf(selectedTab) - 1
      if (targetIndex < 0) {
        if (infinite) {
          setSelectedTab(tabs[tabs.length - 1])
        }
      } else {
        setSelectedTab(tabs[targetIndex])
      }
    }
  }
  return { selectedTab, setSelectedTab, selectPreviousTab, selectNextTab }
}
