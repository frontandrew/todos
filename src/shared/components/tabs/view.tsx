import { FC } from 'react'
import { Tab } from 'uikit'

import { TabsProps } from './type'
import style from './style.module.css'

export const Tabs: FC<TabsProps> = ({ onClick, tabsNameValueMap: tabs, currentTab }) => (
	<div className={style.tabs} onClick={e => e.stopPropagation()}>
		{Object.entries(tabs).map(([key, value]) =>
			<Tab
				key={key}
				value={key}
				active={currentTab === key}
				onClick={onClick}
			>
				{value}
			</Tab>,
		)}
	</div>
)
