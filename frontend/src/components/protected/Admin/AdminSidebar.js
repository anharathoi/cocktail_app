import React from 'react'
import { slide as Menu } from 'react-burger-menu'
import './AdminSidebar.css'

export default props => {
    return (
        <Menu>  
            <a className="menu-item" href="/admin/dashboard">
            My Dashboard
            </a>
            <a className="menu-item" href="/admin/customers">
            Customers
            </a>
            <a className="menu-item" href="/admin/cocktails">
            Cocktails
            </a>
            <a className="menu-item" href="/admin/pages">
            Pages
            </a>
            <a className="menu-item" href="/admin/messages">
            Messages
            </a>
            <a className="menu-item" href="/admin/marketing_vault">
            Marketing Vault
            </a>
            <a className="menu-item" href="/admin/settings">
            Settings
            </a>
        </Menu>
    )
}

//Change the above <a> tags to Link to="" for routing purposes