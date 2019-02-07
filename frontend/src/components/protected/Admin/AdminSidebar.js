import React from 'react'
import { slide as Menu } from 'react-burger-menu'
import './AdminSidebar.css'
import Logout from '../../public/Logout';
import { Link } from 'react-router-dom';

function AdminSidebar(props) {
	return (
		<Menu>  
			<Link className="menu-item" to="/admin/dashboard">
				My Dashboard
			</Link>
			<Link className="menu-item" to="/admin/#customers">
				Customers
			</Link>
			<Link className="menu-item" to="/admin/cocktails">
				Cocktails
			</Link>
			<Link className="menu-item" to="/admin/pages">
				Pages
			</Link>
			<Link className="menu-item" to="/admin/messages">
				Messages
			</Link>
			<Link className="menu-item" to="/admin/marketing_vault">
				Marketing Vault
			</Link>
			<Link className="menu-item" to="/admin/settings">
				Settings
			</Link>
			<Logout {...props}/>
		</Menu>
	)
}

export default AdminSidebar