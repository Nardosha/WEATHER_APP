const tabContainer = document.querySelector('.tabs__items')
const tabBlockContainer = document.querySelector('.tabs__content')

tabContainer.addEventListener('click', toggleTab)

function toggleTab(e) {
    e.preventDefault()

    if (e.target.dataset) {
        const currentTab = e.target
        const currentTabAttribute = currentTab.dataset.tab
        const tabsBlock = Array.from(tabBlockContainer.children)
        const currentTabBlock = document.getElementById(`tab_${currentTabAttribute}`)
        const tabs = Array.from(tabContainer.children)

        tabs.map(tab => {
            if (tab.classList.contains('_active')) {
                tab.classList.remove('_active')
            }
        })
        tabsBlock.map(tabBlock => {
            if (tabBlock.classList.contains('_active')) {
                tabBlock.classList.remove('_active')
            }
        })

        currentTab.classList.toggle('_active')
        currentTabBlock.classList.toggle('_active')
    }
}
